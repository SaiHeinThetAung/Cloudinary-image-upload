const bcrypt = require('bcrypt');
const user=require("../models/user")

const registerUser=async(req,res)=>{
    const {username,email,password,role}=req.body
    try {
        const existUser= await user.findOne({
            $or:[{username,email}]
        });

        if(existUser){
            res.status(400).
            json({
               success:false,
               message:"user already exists either username or email is duplicate",
               data:req.body 
            })
        }
        
        //hast password
        const hashPassword=await bcrypt.hash(password,10)

        const createNewUser=new user({
            username:username,
            email:email,
            password:hashPassword,
            role:role || 'user'
        })
        await createNewUser.save()

        if(createNewUser){
            res.status(200).
            json(
                {
                success:true,
                message:"user successfully created."
                }
            )
        }
        else{
            res.status(400).json({
                success:false,
                message:"user creation failed."
            })
        }
        




    } catch (error) {
        console.error("error creating a user");
        
    }
}

const loginUser=async(req,res)=>{
    const {username,password}=req.body
    try {
        
        const isUser=await user.findOne({username})
        if(isUser){
            const isPassword=await bcrypt.compare(password,isUser.password)
            if(isPassword){
                res.status(201).json({
                    success:true,
                    message:"user successfully login"
                })
            }
            else{
                res.status(400).json({
                    success:false,
                    message:"password incorrect"
                })
            }
        }
        else{
            res.status(400).json({
                success:false,
                message:"username incorrect "
            })
        }


    } catch (error) {
        console.error("login failed");
        
    }
}

module.exports={registerUser,loginUser}