const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken')
async function userRegistrationController(req,res){
    const{email,password,name}=req.body;
    const isExist=await userModel.findOne({
        email:email
    });
    if(isExist){
        return res.status(422).json({
            message:"User already exists with email",
            status:"failed"
        })
    }
    const user=await userModel.create({
        email,password,name
    })
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET);
    
}

module.exports={userRegistrationController};