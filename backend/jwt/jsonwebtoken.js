const jwt = require("jsonwebtoken")
const JwtSecretKey = process.env.JwtSecretKey
const GenerateToken = (data)=>{
    return jwt.sign(data , JwtSecretKey)
}


const ReGenerateToken = (token)=>{
    return jwt.verify(token , JwtSecretKey)
}


module.exports = { GenerateToken , ReGenerateToken}