const { image } = require("../config/cloudinary");
const { cloudinaryUploader } = require("../helpers/cloudinaryHelper");
const Image=require("../models/image")


//create image

const uploadImage=async(req,res)=>{
    console.log(req.file)
    try {
        if(!req.file){
            res.status(400).json({
                success:false,
                message:"file is required"
            })
        }
        //get data from cloudinary 
        const {secure_url,public_id}=await cloudinaryUploader(req.file.path)
        console.log("From cloudinary:",secure_url,public_id)
        //store to db
        const newUploadedImage=new Image({
            url:secure_url,
            publicId:public_id
        })
        await newUploadedImage.save()

        res.status(201).json({
            success:true,
            message:"image successfully save to cloudinary",
            image:newUploadedImage
        })
        

    } catch (error) {
        console.error("error uploading to db");
        
    }
}

const getAllImage=async(req,res)=>{
    const images=await Image.find({})
    res.json({
        success:true,
        image:images
    })
}

module.exports={uploadImage,getAllImage}