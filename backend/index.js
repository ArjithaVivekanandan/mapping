const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const pinRoute = require("./routes/pin")
const userRoute = require("./routes/user")

const app=express();

dotenv.config();

app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
    console.log("Mongo DB Connected")
})
.catch((err)=>{
    console.log(err)})

app.use("/api/pins/",pinRoute)
app.use("/api/users/",userRoute)

app.get('/',(req,res)=>{
    console.log("Hello")
})
    


app.listen(1800,()=>{
    console.log("Running")
})