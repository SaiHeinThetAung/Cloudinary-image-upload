const express=require('express')
const { authmiddleware } = require('../middleware/auth-middleware')


const router=express.Router()

router.get('/welcome',authmiddleware,(req,res)=>{
    const data=req.userInfo
    res.status(200).json({
        success:true,
        message:"welcome page",
        userId:data.userId,
        username:data.username,
        role:data.role
    })
})

module.exports=router