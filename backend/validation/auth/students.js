const Joi = require("joi");

const studentValidate = Joi.object({
    name: Joi.string().required(),
    firstName: Joi.string().required(),
    login: Joi.string().lowercase().required(),
    password: Joi.string()
        .min(4)
        .max(25)
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .message('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'),
    phoneNumber: Joi.string().required(),
    email: Joi.string().required(),
    birthDay: Joi.date().required(),
    confirmPassword: Joi.ref("password"),
    location: Joi.object({
        viloyat: Joi.string().required(),
        tuman: Joi.string(),
        mahalla: Joi.string().required()
    }).required()
});

module.exports = studentValidate;
