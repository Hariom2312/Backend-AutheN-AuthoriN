// import Controller
const express =  require("express");
const router = express.Router();
const {signup, login} = require("../controller/Auth");
const {auth,isStudent,isAdmin} = require("../middlewares/Auth");

// default route
router.get("/home",(req,res)=>{
    return req.send(`This is Home Page`);
});

router.post("/signup",signup);
router.post("/login",login);

//Protect Route

// testing Route for single middleware
router.get("/test",auth,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"welcome to the Protectec route for Tests"
   });
});

// Students Protected
 router.get("/student",auth,isStudent,(req,res)=>{
   return res.status(200).json({
        success:true,
        message:"welcome to the Protectec route for Students"
   });
});

// Admin Protected
router.get("/admin",auth,isAdmin,(req,res)=>{
  return res.status(200).json({
        success:true,
        message:"welcome to the Protectec route for Admin"
   });
});

// exports
module.exports = router;

