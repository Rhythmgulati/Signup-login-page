const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
require("./db/conn");
const registration = require("./models/registration");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
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
        res.send("comleted")
    } catch (error) {
        
    }
})
app.listen(port);