require('dotenv').config();
const connectDB=require('./src/config/db')
const app = require('./src/app');
connectDB();
app.listen(3000,()=>{
    console.log("server started at port 3000");
});