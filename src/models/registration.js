require('dotenv').config({path:'../.env'});
const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const registrationschema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        validate: {
            validator: (value) => {
              return validator.isEmail(value);
            },
            message: 'Invalid email address',
          },
    },
    password:{
        type:String,
        minlength:6
    },
    tokens:[{
      token:{
        type:String,
        required:true,
      }
    }]
})

registrationschema.methods.generateAuthToken = async function(){
  try {
    const token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    return token;
  } catch (error) {
    console.log(error+"in token");
  }
}


registrationschema.pre("save",async function(next){
  this.password = await bcrypt.hash(this.password,2);
  next();
});

const registration = mongoose.model('Registration',registrationschema);


module.exports = registration;