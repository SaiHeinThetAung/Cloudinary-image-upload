const express=require('express')
const { changePassword } = require('../controllers/auth-controller')
const { authmiddleware } = require('../middleware/auth-middleware')

const router=express.Router()


router.post('/change',authmiddleware,changePassword)

module.exports=router