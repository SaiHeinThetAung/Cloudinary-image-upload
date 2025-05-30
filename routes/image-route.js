const express=require('express')
const { uploadImage, getAllImage } = require('../controllers/image-controller')
const imageMiddleware = require('../middleware/image-middleware')
const { authmiddleware } = require('../middleware/auth-middleware')

const router=express.Router()

router.post('/upload',authmiddleware,imageMiddleware.single("image"),uploadImage)
router.get('/',getAllImage)

module.exports=router