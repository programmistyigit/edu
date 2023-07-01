const Joi = require("joi");

const studentValidate = Joi.object({
    name: Joi.string().required(),
    firstName: Joi.string().required(),
    password: Joi.string().min(4).max(12).required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().required(),
    birthDay: Joi.date().required(),
    confirmPassword: Joi.ref("password"),
    location: Joi.object({ viloyat: Joi.string().required(), tuman: Joi.string(), mahalla: Joi.string().required() }).required()
})

module.exports = studentValidate