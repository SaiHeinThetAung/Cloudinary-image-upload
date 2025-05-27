const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
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

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const isUser = await user.findOne({ username });

    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "Username incorrect",
      });
    }

    const isPassword = await bcrypt.compare(password, isUser.password);

    if (!isPassword) {
      return res.status(400).json({
        success: false,
        message: "Password incorrect",
      });
    }

    //  generate a JWT token here 
    const accessToken=jwt.sign({
      userId:isUser._id,
      username:isUser.username,
      role:isUser.role
    },
    process.env.SECRET_KEY,{
      expiresIn:"3m"
    })

    return res.status(200).json({
      success: true,
      message: "User successfully logged in",
      accessToken:accessToken
    });

  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const changePassword=async(req,res)=>{
  const id=req.userInfo.userId
  const isUser=await user.findById(id)

  const {oldPassword,newPassword}=req.body
  const checkPassword=await bcrypt.compare(oldPassword,isUser.password)

 try {
   if(checkPassword){
    const newlyPassword=await bcrypt.hash(newPassword,10)
    isUser.password=newlyPassword;
    isUser.save()
    return res.status(200).json({
      success:true,
      message:"password successfully changed."
    })
  } 
 } catch (error) {
  return res.status(400).json({
      success:false,
      message:"error changing password."
    })
 }

}


module.exports={registerUser,loginUser,changePassword}