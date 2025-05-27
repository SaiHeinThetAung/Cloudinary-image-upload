
const jwt=require("jsonwebtoken")
const authmiddleware=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    const token= authHeader && authHeader.split(" ")[1]
    if(!token){
        return res.status(400).json({
            success:false,
            message:"access denied.Token required."
        })
    }
    try {
        const verifyToken= jwt.verify(token,process.env.SECRET_KEY)
    if(verifyToken){
        req.userInfo=verifyToken
        next()
    }
    } catch (error) {
        console.error("error authentication");
        
    }
}
module.exports={authmiddleware}