const Joi = require("joi");

const LoginValidate = Joi.object({
    login:Joi.string().required(),
    password:Joi.string().required(),
    birthDay:Joi.date().required()
})

module.exports = LoginValidate