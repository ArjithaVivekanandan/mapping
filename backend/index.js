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
    
app.use(express.static("frontend/public"));
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, "frontend", "public", "index.html"));
});


app.listen(1800,()=>{
    console.log("Running")
})
