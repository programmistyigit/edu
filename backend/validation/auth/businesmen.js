const Joi = require("joi");

const businesmenValidate = Joi.object({
    login:Joi.string().required(),
    password:Joi.string().required(),
    confirmPassword:Joi.ref("password")
})

module.exports = businesmenValidate