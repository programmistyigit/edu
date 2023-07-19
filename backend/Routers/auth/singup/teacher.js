const { Router } = require("express");
const TeacherValidation = require("../../../validation/auth/teacherValidation");
const _ = require("lodash");
const TeacherSchema = require("../../../MongoDB/Schema/TeacherSchema");
const { GenerateToken } = require("../../../jwt/jsonwebtoken");
const reverse_obj = require("../../../utils/reverse/in_bazaSchema_object");

const routes = Router();
routes.post("/", async (req, res) => {
    const { value, error } = TeacherValidation.validate(_.pick(req.body, ["name", "firstName", "phoneNumber", "birthDay", "password", "confirmPassword", "spase", "location"]))
    // esli error 
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "validatsiyadan o'tmadi",
                        data: error,
                        target: error.details[0].path
                    }
                )
        )
    }
    // esli error 
    const teacher_obj = reverse_obj("teacher", value)

    const onTheBazaTeacher = await TeacherSchema.findOne(_.pick(teacher_obj, ["teacher_name", "teacher_firstName", "teacher_birthDay"]))

    if (onTheBazaTeacher) {
        return (
            res
                .status(200)
                .json(
                    {
                        status: "warning",
                        message: "bunday malumotlar bazada aniqlandi iltimos boshqa ism ostida kirib koring"
                    }
                )
        )
    }

    // esli yest baza 
    const createBaza = await TeacherSchema.create(teacher_obj)
    const token = GenerateToken({..._.pick(createBaza, ["teacher_name", "_id", "teacher_firstName"]) , role:"teacher"});
    res
        .cookie("auth", token)
        .status(200)
        .json(
            {
                status: "success",
                message: "success!"
            }
        )

})

module.exports = routes;
