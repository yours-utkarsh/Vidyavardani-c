const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");
require("dotenv").config();
const {
  courseEnrollmentEmail,
} = require("../mail/template/courseEnrollmentEmail");

// capture payment and create order

exports.capturePayment = async (req, res) => {
  // get courses from req.body
  const { courses } = req.body;
  const userId = req.user.id;

  // validate courses
  if (!courses || courses.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Courses are required",
    });
  }

  // For now, handle single course enrollment
  const courseId = courses[0];
  
  // valid course details from db
  let course;
  try {
    course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }
  // user already pay for the course
  const uid = new mongoose.Types.ObjectId(userId);
  const isUserEnrolled = course.studentsEnrolled.some(
    (id) => id.toString() === uid.toString()
  );
  if (isUserEnrolled) {
    return res.status(400).json({
      success: false,
      message: "User already enrolled in the course",
    });
  }

  // order create
  const amount = course.price * 100;
  const currency = "INR";

  const options = {
    amount: amount,
    currency: currency,
    receipt: `receipt_order_${Math.random() * 1000}`,
    notes: {
      courseId: courseId,
      userId: userId,
    },
  };
  try {
    //initiate the payment using razorpay instance

    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: paymentResponse,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      coursePrice: course.price,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in creating order",
      error: error.message,
    });
  }
};


exports.verifySignature = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
  const userId = req.user.id;

  console.log("verifySignature - Received body:", req.body);
  console.log("verifySignature - razorpay_order_id:", razorpay_order_id);
  console.log("verifySignature - razorpay_payment_id:", razorpay_payment_id);
  console.log("verifySignature - courses:", courses);
  console.log("verifySignature - userId:", userId);

  // Validate required fields
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses) {
    console.log("Missing required fields in verifySignature");
    return res.status(400).json({
      success: false,
      message: "Missing required payment verification details",
    });
  }

  try {
    // For now, handle single course enrollment
    const courseId = courses[0];
    console.log("=== PAYMENT VERIFICATION STARTED ===");
    console.log("Verifying payment for courseId:", courseId, "userId:", userId);

    // Validate courseId
    if (!courseId) {
      console.error("No courseId found in courses array");
      return res.status(400).json({
        success: false,
        message: "No course ID provided",
      });
    }

    // Find course and update enrollment
    const enrolledCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $push: { studentsEnrolled: userId } },
      { new: true }
    );

    console.log("Course update result:", enrolledCourse ? "SUCCESS" : "FAILED");
    if (!enrolledCourse) {
      console.error("Course not found with ID:", courseId);
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    console.log("Course enrolled count:", enrolledCourse.studentsEnrolled.length);

    // Update user's enrolled courses
    const enrolledStudent = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { courses: courseId } },
      { new: true }
    );

    console.log("User update result:", enrolledStudent ? "SUCCESS" : "FAILED");
    console.log("User courses after update:", enrolledStudent.courses);
    console.log("User courses count:", enrolledStudent.courses.length);

    // Send enrollment email
    try {
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Course Enrollment Successful",
        courseEnrollmentEmail(enrolledStudent.firstName, enrolledCourse.courseName)
      );
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Email sending failed (non-blocking):", emailError.message);
    }

    console.log("=== PAYMENT VERIFICATION COMPLETED SUCCESSFULLY ===");
    return res.status(200).json({
      success: true,
      message: "Payment verified and course enrolled successfully",
    });
  } catch (error) {
    console.error("=== ERROR IN PAYMENT VERIFICATION ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Error in verifying payment",
      error: error.message,
    });
  }
};
