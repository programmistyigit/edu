const { Router } = require("express");
const TeacherValidation = require("../../../validation/auth/teacherValidation");
const _ = require("lodash");
const TeacherSchema = require("../../../MongoDB/Schema/TeacherSchema");
const { GenerateToken } = require("../../../jwt/jsonwebtoken");
const reverse_obj = require("../../../utils/reverse/in_bazaSchema_object");
const CoursesSchema = require("../../../MongoDB/Schema/CoursesSchema");
const bcrypt = require("bcrypt")
const routes = Router();



routes.post("/", async (req, res) => {
    const allCourse = await CoursesSchema.find().lean()
    if (allCourse.length == 0) return res.status(200).json({ status: "warning", message: "hali yonalishlar qoshilmadi admin tizim malumotlarini togirlashini kuting" })

    const { value, error } = (await TeacherValidation()).validate(_.pick(req.body, ["name", "firstName", "login", "phoneNumber", "birthDay", "password", "confirmPassword", "spase", "location"]))
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
    value.spase = value.spase.map(e => allCourse.map(g => g._id)[allCourse.findIndex(f => f.cours_name == e)])
    const teacher_obj = reverse_obj("teacher", value)

    const onTheBazaTeacher = await TeacherSchema.findOne(_.pick(teacher_obj, ["teacher_login"]))

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
    const hashPassword = await bcrypt.hash(value.password, 10)



    const createBaza = await TeacherSchema.create({
        ...teacher_obj,
        teacher_password:hashPassword
    })
    value.spase.map(async (id) => await CoursesSchema.findByIdAndUpdate(id, { $push: { cours_follow_teacher: createBaza._id } }))
    const token = GenerateToken({ ..._.pick(createBaza, ["teacher_login", "_id", ]), role: "teacher" });

    res
        .cookie("auth", token)
        .status(200)
        .json(
            {
                status: "success",
                message: "Welcome success!"
            }
        )

})

module.exports = routes;
