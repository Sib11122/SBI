const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken')
//to create new user 
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
    res.cookie('token',token);
    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    });
}
const userLoginController = async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel
        .findOne({ email })
        .select("+password");

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful"
    });

};
module.exports={userRegistrationController,userLoginController};