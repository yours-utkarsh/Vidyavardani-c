const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// createRating
exports.createRating = async (req, res) => {
  try {
    // get user id
    const userId = req.user.id;

    // fetch data from req body
    const { rating, review, courseId } = req.body;

    // validate user is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

     if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "User has already reviewed for this course",
      });
    }

    // create  new rating & review
    const newReview = await RatingAndReview.create({
      user: userId,
      rating,
      review,
      course: courseId,
    });

    // update course with new rating & review

    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingAndReviews: newReview._id,
        },
      },
      { new: true }
    );

    // return response 
    return res.status(200).json({
      success: true,
      message: "Rating and Review created successfully",
      newReview,
    });

   
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Create rating controller error",
      error: error.message,
    });
  }
};

// Avg Rating

exports.getAverageRating = async (req , res) =>{
    try{

        // get course Id 
        const courseId = req.body;

        // calculate avg rating 

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
              $group: {
                _id: null,
                averageRating : {
                  $avg: "$rating",
                }
              }
            }
        ])

        // return rating 
        if(result.length > 0){
          return res.status(200).json({
            success: true,
            averageRating: result[0].averageRating,
          });
        }


    }
    catch(error){
    return res.status(500).json({
      success: false,
      message: "Get Average Rating controller error",
      error: error.message, 

    })
}
}


// get All Ratings and Reviews

exports.getAllRating = async (req,res) =>{
  try{

    const allRatings  = await RatingAndReview.find({}).sort({rating: "desc"}).populate({
      path: "user",
      select: "firstName lastName email image"
    })
    .populate({
      path: "course",
      select: "courseName"
    }).exec();

    return res.status(200).json({
      success: true,
      message: "All Ratings and Reviews fetched successfully",
      data: allRatings,
    });

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message: "Get All Ratings and Reviews controller error",
      error: error.message,
  })
}

}


