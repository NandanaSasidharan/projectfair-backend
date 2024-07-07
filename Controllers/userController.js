const {json} = require('express');
const users = require('../Models/userSchema')
//import jsonwebtoken
const jwt = require('jsonwebtoken')

exports.register=async(req,res)=>{
    console.log("Inside register function");

    const {username,email,password} = req.body
    const existingUser = await users.findOne({email})
   try{
    if(existingUser){
        res.status(401).json("User already registered")
    }
    else{
       const newUser = await users({
        username,email,password,github:"",link:"",profile:""
       })
       await newUser.save()
       res.status(200).json("User registration successful")
    }
   }
   catch(err){
    res.status(500).json("user error:" +err.message)
   }
}
//logic 
exports.login = async(req,res)=>{
    const{email,password} = req.body
    try{
        const user = await users.findOne({email,password})
        if(user){
            //token generate
            const token = jwt.sign({userId:user._id},"superkey2024")
            console.log(token);
            res.status(200).json({user,token})
        }
        else{
            res.status(404).json("Invalid login")
        }
    }
    catch(err) {
        res.status(500).json("Server error:" + err.message)
    }
}