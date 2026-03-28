const { generateToken } = require("../middleware/verify");
const User = require("../model/File.model");
const { forgotFormat, sendMailer } = require("../utils/mailer");
const { plainToHash, hashToPlain } = require("../utils/password");
const { successResponse, errorResponse } = require("../utils/response");
const otpGenerator = require('otp-generator')


exports.signup = async(req,res)=>{

//    console.log("TYPE:", req.headers["content-type"]);
// console.log("BODY:", req.body);

    try {
        const { username, email, mobile, password } = req.body;

        const hash_pass = await plainToHash(password);

        await User.create({username,email,mobile,password: hash_pass});

        return successResponse(res, "User Signup Successfully");

    } catch (err) {
        return errorResponse(res, err);
    }

}


exports.login = async(req,res)=>{
    
        const {email,password} = req.body;
        const existUser = await User.findOne({email})
        if(!existUser){
            return errorResponse(res, "User ID not found");
        }
            // password matching
            const match = await hashToPlain(password,existUser?.password)
            if(!match){
                return errorResponse(res, "Invalid Password");
            
            }else{

                const payload = {
                    id : existUser._id,
                    email: existUser.email,
                    name : existUser.username
                }
                
                // ✅ Generate JWT Token
                const token = generateToken(payload);
                // req.session.user = payload; // create session
                
                return successResponse(res,"Login Successfully",{token});
            }  
}


// It is sign in or not check karne ke liye bana ya hai 
exports.getProfile = async(req,res)=>{
    return successResponse(res,"get profile",req.user)
}

// check user is login or not
// exports.checkAuth = async(req,res)=>{
//     const token = await req.user;
//     if(!token){
//         return errorResponse(res,"Unauthorized User !!");
//     }else{
//         return successResponse(res,"Authorized User !!",token);
//     }
// }

exports.checkAuth = async (req, res) => {
    return successResponse(res, "Authorized User !!", req.user);
};

//Log out logic and cookie remove
exports.removeCookie = async(req,res)=>{
    const token = req.session.user;
    if(token){
        req.session = null; // remove session
        return successResponse(res,"Logout Successfully");
    }
}

exports.sendOtp = async(req,res)=>{
    const {email} = req.body;
    const existEmail = await User.findOne({email})
    if(!existEmail){
        return errorResponse(res, "Email ID not found");
    }
    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    await sendMailer(existEmail.email,"forgot password OTP is: ",forgotFormat(otp));

    await User.findByIdAndUpdate(existEmail._id,{otp})
    return successResponse(res,"OTP sent to your email")
}


// exports.verifyOtpMatch = async(req,res)=>{
//     const {otp} = req.body;
//     const otpMatch = await User.findOne({otp})
    
//     if(!otpMatch){
//         return errorResponse(res, "OTP is incorrect");
//     }
   
//     return successResponse(res,"Otp succesfully matched");
// }

exports.verifyOtp = async(req,res)=>{
    const {otp,password} = req.body;
    const otpMatch = await User.findOne({otp})
    
    if(!otpMatch){
        return errorResponse(res, "OTP is incorrect");
    }

    // I added this because frontend mai passoword abhi nhi otp verify ke baad send kar rahi hu that's why  
    if (!password) {
        return successResponse(res, "OTP verified successfully");
    }

    const hash_pass = await plainToHash(password);
    await User.findByIdAndUpdate(otpMatch._id,{otp:"",password:hash_pass});
    return successResponse(res,"Password updated successfully")
} 