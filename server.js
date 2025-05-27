require('dotenv').config()
const express=require('express')
const connectDb=require("./databases/db")
const user_route=require('./routes/user-route')
const image_route=require('./routes/image-route')
const welcome_route=require('./routes/welcome-route')
const admin_route=require("./routes/admin-route")
const change_route=require('./routes/change-password-route')
const app =express()

//database
connectDb()

//middleware
app.use(express.json())

//routes
app.use('/api/auth',user_route)
app.use('/api/image',image_route)
app.use('/admin',admin_route)
app.use('/api/auth',change_route)
app.use('/',welcome_route)

const port=process.env.PORT || 5000 
app.listen(port,()=>{
    console.log("server running on port 3000")
})
