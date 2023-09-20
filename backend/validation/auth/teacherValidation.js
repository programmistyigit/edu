const Joi = require("joi");
const CoursesSchema = require("../../MongoDB/Schema/CoursesSchema");

const UzbekPhoneNumberPattern = /^(99|93|94|95|91|90|97|98|55|77)\d{7}$/;

const TeacherValidation = async () => {
    const allCourse = await CoursesSchema.find().lean();
    const courseNames = allCourse.map(e => e.cours_name);

    return Joi.object({
        name: Joi.string().required(),
        firstName: Joi.string().trim().required(),
        login: Joi.string().trim().lowercase().required(),
        phoneNumber: Joi.string().trim().pattern(UzbekPhoneNumberPattern).required(),
        birthDay: Joi.date().required(),
        password: Joi.string()
            .required()
            .min(5)
            .max(25)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
            .message('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'),
        confirmPassword: Joi.ref("password"),
        spase: Joi.array().items(Joi.string().valid(...courseNames).required()).unique((a, b) => a.toLowerCase() === b.toLowerCase()).required(),
        location: Joi.object({
            viloyat: Joi.string().required(),
            tuman: Joi.string().required()
        }).required()
    });
};

module.exports = TeacherValidation;
