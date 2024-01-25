const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/signup-loginform").then(()=>console.log("db connected")).catch(()=>console.log("Db connnection failed"));