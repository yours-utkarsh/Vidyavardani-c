const SubSection = require('../models/SubSection')
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

// create subsection controller

exports.createSubsection = async (req, res) =>{
    try{
        // fetch data from req.body

        const {sectionId , title , timeDuration , description} = req.body;

        // extract video file

        const videoFile = req.files?.video;
        
        console.log("Create SubSection - Received body:", {sectionId , title , timeDuration , description});
        console.log("Create SubSection - Video file present:", !!videoFile);
        
        // data validation
        if(!sectionId || !title || !videoFile){
            return res.status(400).json({
                success: false,
                message: "Section ID, title, and video file are required",
            });
        }

        // upload video to cloudinary

        const uploadDetails = await uploadImageToCloudinary(videoFile , process.env.FOLDER_NAME);
        
        console.log("Create SubSection - Upload details:", uploadDetails);

        // create subsection in db

        const subSectionDetails = await SubSection.create({
            title,
            timeDuration: timeDuration || "",
            description,
            videoUrl: uploadDetails.secure_url,
        })
        
        console.log("Create SubSection - SubSection created:", subSectionDetails);

        // update section with subsection id

        const updatedSection = await Section.findByIdAndUpdate(sectionId, 
            {
                $push: {
                    subSection: subSectionDetails._id
                }
            },
            {new: true}
        ).populate('subSection')

        // print update section details in console

        console.log("update Section Details: " , updatedSection);

        return res.status(201).json({
            success: true,
            message: "Subsection created successfully",
            data: updatedSection
        });

    }
    catch(error){
        console.error("Create SubSection Error:", error);
        return res.status(500).json({
            success: false,
            message: "Create subsection controller error",
            error: error.message,
          });
    }
}


// update subsection controller

exports.updateSubsection = async (req, res) => {
    try{
            // fetch data from req.body

        const {subSectionId , sectionId, title , description} = req.body;

        // extract video file

        const videoFile = req.files?.video;
        // data validation
        if(!subSectionId || !title){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const updatedData = await SubSection.findByIdAndUpdate(subSectionId, {
            title,
            description,
            videoUrl: videoFile ? (await uploadImageToCloudinary(videoFile , process.env.FOLDER_NAME)).secure_url : undefined,
        }, {new: true});

        // get updated section with all subsections
        const updatedSection = await Section.findById(sectionId).populate('subSection');

        return res.status(200).json({
            success: true,
            message: "Subsection updated successfully",
            data: updatedSection
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Update subsection controller error",
            error: error.message,
          });
    }
}


// delete Subsection controller

exports.deleteSubsection = async (req, res) => {
    try{

        const {subSectionId , sectionId} = req.body;

        // data validation
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success: false,
                message: "Subsection ID and Section ID are required",
            });
        }

        // delete subsection from db
        await SubSection.findByIdAndDelete(subSectionId);

        // update section by removing subsection id
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $pull: {
                    subSection: subSectionId
                }
            },
            {new: true}
        ).populate('subSection');

        return res.status(200).json({
            success: true,
            message: "Subsection deleted successfully",
            data: updatedSection
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Delete subsection controller error",
            error: error.message,
          });
    }
}



