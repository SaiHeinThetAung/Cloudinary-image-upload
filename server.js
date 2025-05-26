require('dotenv').config()
const express=require('express')
const connectDb=require("./databases/db")
const user_route=require('./routes/user-route')
const app =express()

//database
connectDb()

//middleware
app.use(express.json())

//routes
app.use('/api/auth',user_route)

const port=process.env.PORT || 5000 
app.listen(port,()=>{
    console.log("server running on port 3000")
})