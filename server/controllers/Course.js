const Course = require("../models/Course");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Category = require("../models/Category");
// create course controller

exports.createCourse = async (req, res) => {
  try {
    // fetch data from req.body
    const { courseName, courseDescription, whatYouWillLearn, price , Tags = [], category } = req.body;
    // add category to course
    const categoryDetails = await Category.findById(category);
    if(!categoryDetails){
        return res.status(404).json({
            success: false,
            message: "Category not found"
        });
    }


    // fetch thumbnail from req.files
    const thumbnail = req.files.thumbnailImage;
    // upload thumbnail to cloudinary
    if(!thumbnail){
        return res.status(400).json({
            success: false,
            message: "Thumbnail image is required"
        });
    }


    if(!courseName || !courseDescription || !whatYouWillLearn || !price){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);

    if(!instructorDetails){
        return res.status(404).json({
            success: false,
            message: "Instructor not found"
        });
    }

    // upload thumbnail to cloudinary

    const thumbnailImage = await uploadImageToCloudinary(
        thumbnail, process.env.FOLDER_NAME, 200, 200
    )

    // create course in db

    const newCourse = await Course.create({
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        thumbnail: thumbnailImage.secure_url,
        instructor: instructorDetails._id,
        Tags,
        category: categoryDetails._id,

    })

    await User.findByIdAndUpdate(
        {_id : instructorDetails._id},
        {
            $push : {
                courses: newCourse._id
            }
        }
    )

    // update category with this course id

    await Category.findByIdAndUpdate(
        {_id : categoryDetails._id},
        {
            $push : {
                courses: newCourse._id
            }
        }
    )

  
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      newCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Create course controller error",
      error: error.message,
    });
  }
};



exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses,
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Get all courses controller error",
      error: error.message,
    });      
  }
};

exports.getCourseDetails = async (req, res) => {
  try{

    // get id 
    const {courseId} = req.body; 
    // find course details 
    const courseDetails = await Course.findById({_id:courseId}).populate(
      {
        path: "instructor",
        populate: {
          path: "additionalDetails",
        }
      }
    )
    // .populate("category")
    // // .populate("ratingAndReviews")
    // // .populate({  
    //   path: "courseContent",
    //   populate:{
    //     path: "subSection",
    //   }
    // }).exec();

    if(!courseDetails){
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      courseDetails,
    });

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message: "Get course details controller error",
      error: error.message,
    });
  }
}

// delet course controller

exports.deleteCourse = async (req, res) => {
  try{
    // get course id from req.body
    const {courseId} = req.body;
    // delete course from db
    const deletedCourse = await Course.findByIdAndDelete({_id:courseId});

    if(!deletedCourse){
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      deletedCourse,
    });
  }
  catch(error){
    return res.status(500).json({
      success: false,
      message: "Delete course controller error",
      error: error.message,
    });
  }
};




