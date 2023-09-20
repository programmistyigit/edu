const Joi = require("joi");

const motherValidate = Joi.object({
    name: Joi.string().required(),
    firstName: Joi.string().required(),
    login: Joi.string().lowercase().required(),
    password: Joi.string()
        .min(5)
        .max(25)
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')),
    confirmPassword: Joi.ref("password"),
    birthDay: Joi.date().required()
});

module.exports = motherValidate;
