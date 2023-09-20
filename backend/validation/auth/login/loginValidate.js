const Joi = require("joi");

const LoginValidate = Joi.object({
    login:Joi.string().trim().lowercase().required(),
    password:Joi.string().required(),
})

module.exports = LoginValidate