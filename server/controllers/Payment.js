const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const { mailSender } = require("../utils/mailSender");
require("dotenv").config();
const {
  courseEnrollmentEmail,
} = require("../mail/template/courseEnrollmentEmail");

// capture payment and create order

exports.capturePayment = async (req, res) => {
  // get courseId from req.body
  const { course_Id } = req.body;
  const userId = req.user.id;

  // validate courseId
  if (!course_Id) {
    return res.status(400).json({
      success: false,
      message: "CourseId is required",
    });
  }
  // valid course details from db
  let course;
  try {
    course = await Course.findById(course_Id);
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
  if (course.studentsEnrolled.includes(uid)) {
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
      courseId: course_Id,
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


exports.verifySignature = async (req, res) =>{
 const webhookSecret = "12345678"; // Replace with your actual webhook secret

 const signature = req.headers["x-razorpay-signature"];
 const shasum = crypto.createHmac("sha256", webhookSecret);
 shasum.update(JSON.stringify(req.body))
 const digest = shasum.digest("hex")
 if(signature === digest){
console.log("payment authorised")
const {courseId, userId} = req.body.payload.payment.entity.notes;

try{
// find course and user from db

const enrolledCourse =await Course.findOneAndUpdate({_id:courseId},
  {$push:{studentsEnrolled : userId}},
  {new:true},
  
)

if(!enrolledCourse){
  return console.log("Course not found");
}
console.log(enrolledCourse)


const enrolledStudent = await User.findOneAndUpdate(
  {_id:userId},
  {$push:{coursesEnrolled:courseId}},
  {new:true}
)

console.log(enrolledStudent)

// send mail to student
const emailResponse = await mailSender(
  enrolledStudent.email,
  "Course Enrollment Successful",
  courseEnrollmentEmail((enrolledStudent.firstName, enrolledCourse.courseName))
)

console.log("Email sent successfully", emailResponse)
return res.status(200).json({
  success:true,
  message:"Signature verified and course enrolled successfully",
})


}
catch(error){
  console.log("Error in enrolling course", error);  
 }

}

else{
  console.log("payment not authorised")
}

}