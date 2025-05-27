const express=require('express')
const { authmiddleware } = require('../middleware/auth-middleware')
const { adminMiddleware } = require('../middleware/admin-middleware')


const router=express.Router()


router.get('/welcome',authmiddleware,adminMiddleware,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"welcome admin page"
    })
})

module.exports=router