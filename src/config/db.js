const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("database connected successfully");
    })
    .catch(err=>{
        console.log("Error while connecting to DB")
        process.exit(1)
    })
}
module.exports=connectDB;