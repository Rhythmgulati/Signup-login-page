require('dotenv').config({path:'../.env'});
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const registration = require("../models/registration");

async function auth(req,res,next){
    try {
        const token = req.cookies.jwt;
        const verifyuser = jwt.verify(token,process.env.SECRET_KEY);
        console.log(verifyuser);
        const userdata = await registration.findOne({_id:verifyuser._id});
        console.log(userdata);
        next();
    } catch (error) {
        res.status(401).render("index",{msg:"register or login first"});
    }
}
module.exports=auth;