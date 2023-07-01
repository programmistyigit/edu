const Joi = require("joi");

const classValidation = Joi.object({
    name:Joi.string().required(),
    groupSpase:Joi.string().required(),
    durationDays:Joi.string().required(),
    MoneyValue:Joi.string().required(),
    BigTeacherId:Joi.string().required(),
    maxNumberStudent:Joi.number().required(),
    table:Joi.array().items(Joi.object({day:Joi.number().min(1).max(7).required() , hour:Joi.string().required() , duration:Joi.string().required()})).required()
})
module.exports = classValidation