const router = require("express").Router();

const Pin=require("../models/Pin")

//create new pin

router.post("/",async (req,res)=>{
    console.log(req.body)
    const newPin = new Pin(req.body);
    try{
        const savedpin =await newPin.save();
        res.status(200).json(savedpin);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

//get all pins
router.get("/",async (req,res)=>{
    try{
        
        const pins = await Pin.find()
        console.log("getting",pins)
        res.send(pins)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports =router