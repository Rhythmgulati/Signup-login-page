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

app.get("/",(req,res)=>{
  res.send("index")
});
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
        res.send("registered");
    }else{
        res.send("password not matching");
    }
    } catch (error) {
        res.status(501).send(error);
    } 
})
app.listen(port);