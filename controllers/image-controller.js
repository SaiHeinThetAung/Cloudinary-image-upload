const { image } = require("../config/cloudinary");
const { cloudinaryUploader } = require("../helpers/cloudinaryHelper");
const Image=require("../models/image")

const uploadImage=async(req,res)=>{
    try {
        if(!req.file){
            res.status(400).json({
                success:false,
                message:"file is required"
            })
        }
        //get data from cloudinary 
        const {url,publicId}=cloudinaryUploader(req.file.path)

        //store to db
        const newUploadedImage=new Image({
            url,
            publicId
        })
        res.status(201).json({
            success:true,
            message:"image successfully save to db",
            image:newUploadedImage
        })
        await newUploadedImage.save()

    } catch (error) {
        console.error("error uploading to db");
        
    }
}

module.exports={uploadImage}