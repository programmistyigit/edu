const Joi = require("joi")
const { ReGenerateToken } = require("../../jwt/jsonwebtoken")
const _ = require("lodash")

const router = require("express").Router()
router.get("/" , ( req , res ) => {
    const authToken = req.cookies["auth"]
    if(!authToken) return res.status(200).json({status:"error" , data: { isLogin : false } } )

    try {
        const dataUser = ReGenerateToken(authToken)
        const {value , error} = Joi.object(
            {
                _id : Joi.string().required(),
                role:Joi.string().valid("student" , "teacher" , "mother" , "businesmen").required()
            }
        ).validate(_.pick(dataUser , ["_id" , "role"]))

        if(error) return res.status(200).json({status:"error" , data: { isLogin : false } } )
        
        res.status(200).json( { status : "success" , data : { isLogin : true , ...value}})
    } catch (error) {
        return res.status(200).json({status:"error" , data: { isLogin : false } } )
    }
})

module.exports = router