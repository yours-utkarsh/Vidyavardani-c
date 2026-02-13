const Section = require('../models/Section');
const Course = require('../models/Course');

// create section controller

exports.createSection = async (req, res) =>{
    try{
        // data from req.body
        const {sectionName , courseId} = req.body;
        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // create section in db
        const newSection = await Section.create({
            sectionName
        })

        // update course with section id
        // use populate to get updated course details
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push: { courseContent: newSection._id }
        }, { new: true })
        .populate({path: 'courseContent', populate: { path: 'subSection' }})
            .exec();

        return res.status(201).json({
            success: true,
            message: "Section created successfully",
            data: {
                section: newSection,
                course: updatedCourseDetails
            }
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Create section controller error",
            error: error.message,
          });
    }
}


exports.updateSection = async (req , res) => {
    try{
        // data from req.body
        const {sectionId , sectionName, courseId} = req.body;
        // data validation
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // update data in db
        const section = await Section.findByIdAndUpdate(sectionId, {
            sectionName
        }, { new: true });

        // get updated course with populated sections
        const updatedCourse = await Course.findById(courseId)
            .populate({path: 'courseContent', populate: { path: 'subSection' }})
            .exec();

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: updatedCourse
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Update section controller error",
            error: error.message,
          });
    }
}


exports.deleteSection = async (req , res ) =>{
    try{
        // get ID from req.body
        const { sectionId , courseId} = req.body;

        // validation
        if(!sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "Section ID and Course ID are required",
            });
        }

        // delete section from db
        await Section.findByIdAndDelete(sectionId);

        // update course by removing this section id from courseContent array

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $pull : {courseContent : sectionId},
        },
        { new: true }
        ).populate({'path': 'courseContent', 'populate': { 'path': 'subSection' }}).exec();

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data: {
                sectionId,
                course: updatedCourseDetails
            }
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Delete section controller error",
            error: error.message,
          });
    }
}
