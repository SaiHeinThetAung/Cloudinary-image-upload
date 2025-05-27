const cloudinary=require("cloudinary")

const cloudinaryUploader=async(filepath)=>{
    try {
        
        const result=await cloudinary.uploader.upload(filepath)

        console.log('upload to cloud',result.secure_url,result.public_id)
        return {
            secure_url:result.secure_url,
            public_id:result.public_id
        }    


    } catch (error) {
        console.error("error uploading to cloudinary");
        
    }
}

module.exports={cloudinaryUploader}