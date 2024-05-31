const  mongoose  = require("mongoose");
require("dotenv").config();

const dbConnect = async(req,res)=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DATABASE CONNECTED SUCCESSFULLY !!");
    }
    catch(err){
        console.log("DB Connection Issue");
        console.error(err);
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
};

module.exports = dbConnect;
