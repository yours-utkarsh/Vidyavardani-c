const cloudinary = require('cloudinary').v2

// image uploading 

exports.uploadImageToCloudinary = async (file , folder , height , quality) => {
    const options = {folder: folder};

    if(height){
        options.height = height;
        options.crop = "scale";
    }
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath ,options)
}