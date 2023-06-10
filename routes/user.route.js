const express=require('express')
const {UserModel}=require("../model/user.model")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
const {name,email,pass,gender,age,city}=req.body

try {
   bcrypt.hash(pass,5,async(err,hash)=>{
    if(err){
    res.json({err:err.message})
    }else{
        const user= new UserModel({name,email,pass:hash,gender,age,city})
        await user.save()
    }
    res.json({msg:"User has been registered ", user:req.body}) 
   })
   
} catch (error) {
    
    res.json({error:error.message})
}

})


userRouter.post("/login",async(req,res)=>{

const {email,pass}=req.body

try {
    
     const user= await UserModel.findOne({email:email})
     if(user){

bcrypt.compare(pass,user.pass,(err,result)=>{
    if(result){
        const token=jwt.sign({user:user.name,userID:user._id},"masai")
      res.json({msg:"Logged In !",token:token})
    }else{
         res.json("Wrong Credentials!")
    }
})

     }else{
        res.json({msg:"User does not exist !"}) 
     }

} catch (error) {
    res.json({error:error.message})
}


})















module.exports={userRouter}