const Joi = require("joi");

const LoginValidateBusinesmen = Joi.object({
    login:Joi.string().required(),
    password:Joi.string().required()
})

module.exports = LoginValidateBusinesmen