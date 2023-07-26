const Joi = require("joi");
const CoursesSchema = require("../../MongoDB/Schema/CoursesSchema");

const TeacherValidation = async () => {
    const allCourse = await CoursesSchema.find().lean()
    console.log(...allCourse.map(e=>e.cours_name));
    return Joi.object({
        name: Joi.string().required(),
        firstName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        birthDay: Joi.date().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.ref("password"),
        spase: Joi.array().items(Joi.string().valid(...allCourse.map(e=>e.cours_name)).required()).required(),
        location: Joi.object({ viloyat: Joi.string().required(), tuman: Joi.string(), mahalla: Joi.string().required() }).required()

    })
}

module.exports = TeacherValidation