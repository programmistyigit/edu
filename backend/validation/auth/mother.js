const Joi = require("joi");

const motherValidate = Joi.object({
    name:Joi.string().required(),
    firstName:Joi.string().required(),
    password:Joi.string().required(),
    confirmPassword:Joi.ref("password"),
    birthDay:Joi.date().required()
})

module.exports = motherValidate