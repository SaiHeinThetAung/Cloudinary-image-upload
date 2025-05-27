

const adminMiddleware=(req,res,next)=>{
    const role= req.userInfo.role
   try {
     if(role!=='admin'){
        return res.status(400).json({
            success:false,
            message:"Not admin"
        })
    }
    next()
   } catch (error) {
    console.error("error ",error)
   }
}

module.exports={adminMiddleware}