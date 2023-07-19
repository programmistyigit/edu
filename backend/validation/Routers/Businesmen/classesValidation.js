const Joi = require("joi");
const BusinesMenSChema = require("../../../MongoDB/Schema/BusinesMenSChema");

const classValidation = async (id) => {
    const space = (await BusinesMenSChema.findById(id)).businesmen_course_space.map(e=>e.space_name)
    return Joi.object({
        name: Joi.string().required(),
        groupSpase: Joi.string().valid(...space).required(),
        durationDays: Joi.string().required(),
        BigTeacherId: Joi.string().required(),
        maxNumberStudent: Joi.number().required(),
        table: Joi.array().items(Joi.object({ hours: Joi.string().required(), duration: Joi.number().required().min(30).max(300) , day:Joi.number().min(1).max(7).required() })).max(7).min(1).required()
    })
}
module.exports = classValidation