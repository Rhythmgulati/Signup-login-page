const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcryptjs");
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
    }
})

registrationschema.pre("save",async function(next){
  this.password = await bcrypt.hash(this.password,10);
  next();
});

const registration = mongoose.model('Registration',registrationschema);


module.exports = registration;