const { exists } = require("../model/File.model")
const bcrypt = require("bcryptjs");
exports.plainToHash = async (password)=>{
    const salt = await bcrypt.genSalt(10) // 10 times security mainten karta hai but 
    return await bcrypt.hash(password,salt)
}

 
exports.hashToPlain = async(password,hass_pass)=>{
    return await bcrypt.compare(password,hass_pass)
} 