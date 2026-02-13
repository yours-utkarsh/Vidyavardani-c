const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create profile controller

exports.updateProfile = async (req , res) => {
    try{
        //  get data from req.user
        const {dateOfBirth = "" , about = "" , contactNumber , gender} = req.body;

        // get User ID from req.user
        const userId = req.user.id;

        // data validation
        if(!dateOfBirth || !contactNumber){
            return res.status(400).json({
                success: false,
                message: "Date of Birth and Contact Number are required",
            });
        }

        // find Profile by userId
        const UserDetails = await User.findById(userId);
        const profileId = UserDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);


        // update profile details

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;

        await profileDetails.save();

        // Fetch updated user with populated profile
        const updatedUser = await User.findById(userId)
            .populate("additionalDetails")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Update profile controller error",
            error: error.message,
          });
    }
}


// delete account controller

exports.deleteAccount = async (req, res) => {
    try{
        // get user id from req.user
        const userId = req.user.id;
        // validation user from db
        const userDetails = await User.findById(userId);

        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        // delete profile details

        await Profile.findByIdAndDelete({_id : userDetails.additionalDetails});

        // unenroll user from all courses
        userDetails.courses = [];
        await userDetails.save();

        // delete profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails);

        // delete user from db
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Delete account controller error",
            error: error.message,
          });
    }
}

// get all usesrs controller

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .populate({ path: "courses", select: "courseName price" })
            .lean()
            .exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            user: userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get all users controller error",
            error: error.message,
        });
    }
};


exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId)
            .populate({
                path: "courses",
                populate: [
                    { path: "category", select: "name" },
                    { path: "instructor", select: "firstName lastName image" },
                    { path: "ratingAndReviews" },
                    {
                        path: "courseContent",
                        populate: {
                            path: "subSection",
                        }
                    }
                ],
            })
            .exec();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        console.log("User enrolled courses:", user.courses);
        console.log("Courses count:", user.courses?.length || 0);

        return res.status(200).json({
            success: true,
            message: "Enrolled courses fetched successfully",
            data: user.courses || [],
        });
    } catch (error) {
        console.error("getEnrolledCourses error:", error);
        return res.status(500).json({
            success: false,
            message: "Get enrolled courses controller error",
            error: error.message,
        });
    }
};


exports.updateDisplayPicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const displayPicture = req.files?.displayPicture;

        if (!displayPicture) {
            return res.status(400).json({
                success: false,
                message: "Display picture file is required",
            });
        }

        const uploadDetails = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME || "profile-photos"
        );

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: uploadDetails.secure_url },
            { new: true }
        )
            .populate("additionalDetails")
            .exec();

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Display picture updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Update display picture controller error",
            error: error.message,
        });
    }
};


exports.instructorDashboard = async (req, res) => {
    try {
        const instructorId = req.user.id;

        const courses = await Course.find({ instructor: instructorId })
            .populate("studentsEnrolled", "_id")
            .lean()
            .exec();

        const dashboardData = courses.map((course) => {
            const totalStudents = course.studentsEnrolled?.length || 0;
            const totalRevenue = totalStudents * (course.price || 0);

            return {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                price: course.price,
                totalStudents,
                totalRevenue,
                status: course.status,
            };
        });

        return res.status(200).json({
            success: true,
            data: {
                courses: dashboardData,
                totalRevenue: dashboardData.reduce(
                    (sum, course) => sum + course.totalRevenue,
                    0
                ),
                totalStudents: dashboardData.reduce(
                    (sum, course) => sum + course.totalStudents,
                    0
                ),
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Instructor dashboard controller error",
            error: error.message,
        });
    }
};

