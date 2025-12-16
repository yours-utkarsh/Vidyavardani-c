const SubSection = require('../models/SubSection')
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

// create subsection controller

exports.createSubsection = async (req, res) =>{
    try{
        // fetch data from req.body

        const {sectionId , title , timeDuration , description} = req.body;

        // extract video file

        const videoFile = req.files.videoFile;
        // data validation
        if(!sectionId || !title || !timeDuration || !videoFile){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // upload video to cloudinary

        const uploadDetails = await uploadImageToCloudinary(videoFile , process.env.FOLDER_NAME);

        // create subsection in db

        const subSectionDetails = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadDetails.secure_url,
        })

        // update section with subsection id

        const updatedSection = await Section.findByIdAndUpdate(sectionId, 
            {
                $push: {
                    subSection: subSectionDetails._id
                }
            },
            {new: true}
        )

        // print update section details in console

        console.log("update Section Details: " , 
await updatedSection.populate('subSection'));

        return res.status(201).json({
            success: true,
            message: "Subsection created successfully",
            data: subSectionDetails
        });

    }
    catch(error){
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

        const {subSectionId , title , timeDuration , description} = req.body;

        // extract video file

        const videoFile = req.files.videoFile;
        // data validation
        if(!subSectionId || !title || !timeDuration){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const updatedData = await SubSection.findByIdAndUpdate(subSectionId, {
            title,
            timeDuration,
            description,
            videoUrl: videoFile ? (await uploadImageToCloudinary(videoFile , process.env.FOLDER_NAME)).secure_url : undefined,
        }, {new: true});

        return res.status(200).json({
            success: true,
            message: "Subsection updated successfully",
            data: updatedData
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

        const {subSectionId , sectionId} = req.params;

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
        await Section.findByIdAndUpdate(
            sectionId,
            {
                $pull: {
                    subSection: subSectionId
                }
            },
            {new: true}
        )

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Delete subsection controller error",
            error: error.message,
          });
    }
}



