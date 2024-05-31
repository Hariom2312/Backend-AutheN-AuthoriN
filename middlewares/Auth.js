// const  User  = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth IsStudent IsAdmin
exports.auth = async(req,res,next)=>{
  try{
    // extract  JWT token
    // Pending : other ways to fetch token like cookies
    const token = req.body.token;
   
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Token Missing",
        });
    }

    // Verify the Token
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;

    }catch(err){
     return res.status(401).json({
      success:false,
      message:"token is invalid",
      });
    }
   
    next();

  }catch(err){
    return res.status(500).json({
      success:false,
      message:"Plss Check Correct Details"
    })
  }

}


// Student middleware
exports.isStudent = async(req,res,next)=>{
    try{
      //  check authorization
      if(req.user.role !== "Student" ){
        return res.status(401).json({
            success:false,
            message:"Invalid This is protected route for student"
          })
      }else{
        return res.status(201).json({
          success:true,
          message:"Yahh ! You can access the Studend Protected Route"
        });
      }
       
      next();
    }catch(err){
      return res.status(500).json({
        success:false,
        message:"User Role is not Matching for Student",
      })
    }
}


// Admin middleware
exports.isAdmin = async( req,res)=>{
    try{
        //  check authorization
        if(req.user.role !== "Admin" ){
          return res.status(401).json({
              success:false,
              message:"Invalid This is protected route for admin"
            })
        }else{
          return res.status(201).json({
            success:true,
            message:"Yahh ! You can access the Admin Protected Route"
          });
        }
         
        next();
      }catch(err){
        return res.status(500).json({
          success:false,
          message:"User Role is not Matching for Admin",
        })
      }
}

