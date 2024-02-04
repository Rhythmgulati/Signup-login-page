require('dotenv').config({path:'../.env'});
const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");
var cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;
const auth = require("./middleware/auth")

require("./db/conn");
const registration = require("./models/registration");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
const staticpath = path.join(__dirname,"../public");
app.use(express.static(staticpath));
app.set("view engine","hbs");
app.set('views', path.join(__dirname, '../views'))

// app.get("/error",(req,res)=>{
//   res.render("error")
// });
app.get("/",(req,res)=>{
    res.render("index")
})
app.post("/register",async (req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
       console.log(password,cpassword)
        if(password == cpassword){
        const newregistration = await new registration({
          name:req.body.username,
          email:req.body.email,
          password:req.body.password
        })
        const token = await newregistration.generateAuthToken();
        console.log(token);
        res.cookie("jwt",token,{
            expires:new Date(Date.now() + 30000),
            httpOnly:true
        });
        newregistration.save();
        res.render("index");
    }else{
        res.render("index",{msg:"password not matching"});
    }
    } catch (error) {
        res.status(501).send(error);
    } 
})
app.post("/login",async (req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email,password);
        const data = await registration.findOne({email:email});
        console.log(data);
        console.log(password)
        const isMatch =await bcrypt.compare(password, data.password);
        const token = await data.generateAuthToken();
        
        res.cookie("jwt",token,{
            httpOnly:true
        });
        console.log(isMatch);
        console.log("token is " + req.cookies.jwt);
        if(isMatch){
            res.render("index")
        }else{
            res.send("invalid login credentials");
        }
    } catch (error) {
       res.status(400).send("invalid email") 
    }
})

app.get('/main',auth,(req,res)=>{
    res.render("main")
})
app.listen(port);