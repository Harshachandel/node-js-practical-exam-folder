// const {  errorResponse } = require("../utils/response")

// exports.verifyUser = (req,res,next)=>{
//     const verify = req.session.user 
//         if(!verify)
//         {
//             return errorResponse(res, "Unauthorized Access, Please Login First");
//         }
//     next();
// }

const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");

exports.generateToken = (payload)=>{
    return  jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn : "1d"
    }) 
}


exports.verifyToken = (token)=>{
    return jwt.verify(token,process.env.JWT_SECRET)
}


exports.verifyUser = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization 
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return errorResponse(res,"Unauthorized: No token provided")
        }
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded // attach user data
        next() 

    }catch(err){
        errorResponse(res,err.message||"Invalid or Expired Token")
    }
}


// exports.verifyUser = (req, res, next) => {
//     if (!req.session || !req.session.user) {
//         return res.json({
//             success: false,
//             message: "Unauthorized: Please login first"
//         });
//     }
//     next();
// };

