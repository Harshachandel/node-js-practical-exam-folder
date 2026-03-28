//  create schema 

const { Schema, model } = require("mongoose");
const { commonString } = require("../utils/common");

const userSchema = new Schema({
    username : commonString,
    email:{
        ...commonString,
        unique: [true, "Email already exists"]
    },
    mobile:{
        ...commonString,
        unique: [true, "Mobile already exists"]
    },
    password: commonString, 
    otp: {
        type: String,
        default: null
    }
},{
    timestamps: true
})


//Create Table 

const User = model("User", userSchema);

module.exports = User;