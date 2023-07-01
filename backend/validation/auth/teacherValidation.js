const Joi = require("joi");

const TeacherValidation = Joi.object({
    name:Joi.string().required(),
    firstName:Joi.string().required(),
    phoneNumber:Joi.string().required(),
    birthDay:Joi.date().required(),
    password:Joi.string().required(),
    confirmPassword:Joi.ref("password"),
    spase:Joi.array().items(Joi.string().required()).required(),
    location:Joi.object({viloyat:Joi.string().required() , tuman:Joi.string() , mahalla:Joi.string().required()}).required()

})

module.exports = TeacherValidation