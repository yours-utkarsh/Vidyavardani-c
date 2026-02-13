const Course = require("../models/Course");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Category = require("../models/Category");
// create course controller

exports.createCourse = async (req, res) => {
  try {
    // fetch data from req.body
    const { courseName, courseDescription, whatYouWillLearn, price , Tags = [], category , requirements = [] } = req.body;
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
        requirements,
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
      data: newCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Create course controller error",
      error: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try{
    const userId = req.user.id;
    const instructorCourses = await Course.find({ instructor: userId });
    return res.status(200).json({
      success: true,
      message: "Instructor courses fetched successfully",
      data: instructorCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Get instructor courses controller error",
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
      data: courses,
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
    ).populate("category")
    .populate({  
      path: "courseContent",
      populate:{
        path: "subSection",
      }
    }).exec();

    if(!courseDetails){
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails,
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


exports.editCourse = async (req, res) => {
  try{
    // get data from req.body

    const { courseId, courseName, courseDescription, whatYouWillLearn, price , Tags = [], category , requirements = []} = req.body;

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

    // find course by id and update
    const updatedCourse = await Course.findByIdAndUpdate(
      {_id: courseId},
      {
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        Tags,
         category: categoryDetails._id,
        requirements,
        thumbnail: thumbnailImage.secure_url,
      },
      { new: true }
    );

    if(!updatedCourse){
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Edit course controller error",
      error: error.message,
    });
  }
};

// delete course controller

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
      data: deletedCourse,
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

// update course status
exports.updateCourseStatus = async (req, res) => {
  try{
    const { courseId, status } = req.body;
    
    if(!courseId || !status){
      return res.status(400).json({
        success: false,
        message: "Course ID and status are required",
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { status },
      { new: true }
    ).populate({path: 'courseContent', populate: { path: 'subSection' }}).exec();

    if(!updatedCourse){
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course status updated successfully",
      data: updatedCourse,
    });
  }
  catch(error){
    return res.status(500).json({
      success: false,
      message: "Update course status controller error",
      error: error.message,
    });
  }
};







