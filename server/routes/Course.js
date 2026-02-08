// course route file
const express = require("express");
const router = express.Router();

// import controllers

// course controllers Import
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    deleteCourse,
    getInstructorCourses,
} = require("../controllers/Course");

// categories Controllers Import

const {
    showAllCategories,
    createCategory,
    categoryPageDetails
} = require("../controllers/Category");

// Section Controllers Import

const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section");

// Sub-section Controllers Import

const {
    createSubsection,
    deleteSubsection,
    updateSubsection
} = require("../controllers/SubSection");

// Rating Controllers Import
const {
    createRating, getAverageRating
    , getAllRating
} = require("../controllers/RatingAndReview");

// Importing middlewares
const { auth, isInstructor, isAdmin, isStudent } = require("../middlewares/middle");

// *******************************************************************************
// Course Routes
// *******************************************************************************

// course can only created by instructor
router.post("/createCourse", auth, isInstructor, createCourse);

// add section to course
router.post("/addSection", auth, isInstructor, createSection);

// update a section 
router.post("/updateSection", auth, isInstructor, updateSection);

// Delete a Section 
router.post("/deleteSection", auth, isInstructor, deleteSection);

// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubsection);

// Delete Sub Section
router.post("/deleteSubsection", auth, isInstructor, deleteSubsection);

// Add a sub section to a section
router.post("/addSubSection", auth, isInstructor, createSubsection);


router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

router.get("/getAllCourses", getAllCourses);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

router.post("/getCourseDetails",auth ,isInstructor, getCourseDetails);

// router.post("/getFullCourseDetails", auth, getFullCourseDetails);

// router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// router.delete("/deleteCourse", deleteCourse);



router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
