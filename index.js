const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());

// mount and import Router
const User = require("./router/route");
app.use("/api/v1",User);  // get method, path and handler

// DB Connection
const dbConnect = require("./config/database");
dbConnect();

// default Route
const arr = [];
app.post("/",(req,res)=>{
     arr.push(req.body);
     res.send(arr);
});

app.listen(PORT,()=>{
    console.log(`App Server is Started ${PORT}`);
});
