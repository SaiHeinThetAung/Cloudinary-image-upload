const express=require('express')
const { uploadImage } = require('../controllers/image-controller')
const imageMiddleware = require('../middleware/image-middleware')

const router=express.Router()

router.post('/upload',imageMiddleware.single("image"),uploadImage)

module.exports=router