const mongoose = require("mongoose");
const validator = require('validator');


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

const registration = mongoose.model('Registration',registrationschema);


module.exports = registration;