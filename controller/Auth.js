const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// login Route Handler
exports.login = async (req,res)=>{
    try{

        // fetch data fron request body
        const{email,password} = req.body;
        
        // Email or Password is enter NULL Data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Invalid Password or Email. Please fill correct Data ",
            });
        }

        // Db Call to Check Email Present or not
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Email not Present Plss SignUp",
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };
        
        // verify password & generate JWT Token
        if(await bcryptjs.compare(password,user.password) ){
            // Password Match

            // Create token
            let token = jwt.sign(payload,JWT_SECRET,{
                   expiresIn:"2h",
            });

            // Remove sensitive information from user object
             user.toObject();
             console.log("user :" ,user);
             user.token = token;
             console.log("token :",user.token);
             user.password = undefined;
             console.log("password :", user.password);
             console.log("User :", user);


            // options thing 
            const options = {
                expires: new Date( Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            // create cookie
            // cookie name, cookie data, option like validity etc
            return res.cookie("hariomCookie",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in Successfully",
            });
        }
        else{
            // Password  does not Match
            return res.status(403).json({
                success:false,
                message:"Invalid Password try again later",
            });
        }

    }
    catch(err){
        console.log("Error Login");
        return res.status(500).json({
            success:false,
            message:"Error to login failure "
        });
    }
}



// signup Route Handler
exports.signup = async (req,res)=>{
     try{
        // gat data
         const{name,email,password,role} = req.body;
          
        // check if user already exit
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                sucess:false,
                message:'Email Already Exists Try another Email'
            });
        }

        // Secure Password
        let hashedPasswod;
        try{
            hashedPasswod = await bcryptjs.hash(password,10);  // 10 number of rounds
        }catch(err){
            res.status(500).json({
                success:false,
                message:"Error in hashing Password",
            })
        }

        // user Create
        const user = await User.create({
           name,email,password:hashedPasswod,role,
        });

        return res.status(200).json({
            sucess:true,
            data:user,
            message:"User Created Succesfully !",
        })
     }

     catch(err){
        console.error(err);
        return res.status(500).json({sucess:false,data:err,message:"User cannot be register please try again later"})
     }
}