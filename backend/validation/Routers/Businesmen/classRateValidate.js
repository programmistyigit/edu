const Joi = require("joi");

const classRateValidate = Joi.object({
    _id:Joi.string().required(),
    rate:Joi.number().valid(0,1,2,3,4,5).required()
})
 module.exports = classRateValidate