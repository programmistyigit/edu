const Joi = require("joi");

const messageValidate = Joi.object({
    text:Joi.string().required(),
    targetUser:Joi.object({
        id:Joi.string().required(),
        role:Joi.string().required()
    })
})

module.exports = messageValidate