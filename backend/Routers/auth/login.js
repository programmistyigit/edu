const { Router } = require("express");
const _ = require("lodash")
const LoginValidate = require("../../validation/auth/login/loginValidate");
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema");
const { GenerateToken } = require("../../jwt/jsonwebtoken");
const TeacherSchema = require("../../MongoDB/Schema/TeacherSchema");
const MotherSchema = require("../../MongoDB/Schema/MotherSchema");
const StudentSchema = require("../../MongoDB/Schema/StudentSchema");
const LoginValidateBusinesmen = require("../../validation/auth/login/LoginValidateBusinesMen");

const routes = Router();
/*
    * -----     route         =>   auth/login/teacher              -------
    * -----     method        =>   POST                                  -------
    * -----     description   =>   login teacher                          -------
    * -----     whoami        =>   guest                              -------
*/
routes.post("/teacher", async (req, res) => {
    const { value, error } = LoginValidate.validate(_.pick(req.body, ["login", "password", "birthDay"]))
    if (error) {
        res
            .status(400)
            .json(
                {
                    status: "warning",
                    message: "validatsiyadan otmadi",
                    target: error.details[0].path,
                    error
                }
            )
    }

    const teacherSeachResult = await TeacherSchema.findOne({ teacher_name: value.login, teacher_password: value.password, teacher_birthDay: value.birthDay })
    if (teacherSeachResult) {
        const token = GenerateToken({ ..._.pick(teacherSeachResult, ["_id", "teacher_name", "teacher_firstName"]), role: "teacher" })
        return (
            res
                .cookie("auth", token, { maxAge: 60 * 60 * 24 * 100 })
                .status(200)
                .json(
                    {
                        status: "success",
                        message: "tizimga qaytganingizdan hursandmiz ustoz"

                    }
                )
        )
    }
    res
        .status(400)
        .json(
            {
                status: "warning",
                message: "foydalanuvchi topilmadi 😔"
            }
        )
})

/*
    * -----     route         =>   auth/login/mother              -------
    * -----     method        =>   POST                                  -------
    * -----     description   =>   login mother                          -------
    * -----     whoami        =>   guest                              -------
*/

routes.post("/mother", async (req, res) => {
    const { value, error } = LoginValidate.validate(_.pick(req.body, ["login", "password", "birthDay"]))
    if (error) {
        return (

            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "validatsiyadan otmadi",
                        target: error.details[0].path,
                        error
                    }
                )
        )
    }

    const motherSearchresult = await MotherSchema.findOne({ mother_name: value.login, mother_password: value.password, mother_birthDay: value.birthDay })
    if (motherSearchresult) {
        const token = GenerateToken({ ..._.pick(motherSearchresult, ["_id", "mother_name", "mother_firstName"]), role: "mother" })
        return (
            res
                .cookie("auth", token, { maxAge: 60 * 60 * 24 * 100 })
                .status(200)
                .json(
                    {
                        status: "success",
                        message: "tizimga qaytganingizdan hursandmiz hurmatli ota-ona"
                    }
                )
        )
    }

    res
        .status(400)
        .json(
            {
                status: "warning",
                message: "foydalanuvchi topilmadi 😔"
            }
        )
})

/*
    * -----     route         =>   auth/login/student              -------
    * -----     method        =>   POST                                  -------
    * -----     description   =>   login student                          -------
    * -----     whoami        =>   guest                              -------
*/

routes.post("/student", async (req, res) => {
    const { value, error } = LoginValidate.validate(_.pick(req.body, ["login", "password", "birthDay"]))
    if (error) {
        return (

            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "validatsiyadan otmadi",
                        target: error.details[0].path,
                        error
                    }
                )
        )
    }

    const studentSearchResult = await StudentSchema.findOne({ student_name: value.login, student_password: value.password, student_birthDay: value.birthDay })
    if (studentSearchResult) {
        const token = GenerateToken({ ..._.pick(studentSearchResult, ["_id", "student_name", "student_firstName"]), role: "student" })
        return (
            res
                .cookie("auth", token)
                .status(200)
                .json(
                    {
                        status: "success",
                        message: "qaytganinguzdan hursandmiz hurmatli oquvchi oqishlaringizga omad!"
                    }
                )
        )
    }

    res
        .status(400)
        .json(
            {
                status: "warning",
                message: "foydalanuvchi topilmadi 😔"
            }
        )

})

/*
    * -----     route         =>   auth/login/businesmen              -------
    * -----     method        =>   POST                                  -------
    * -----     description   =>   login businesmen                          -------
    * -----     whoami        =>   guest                              -------
*/
routes.post("/businesmen", async (req, res) => {
    const { value, error } = LoginValidateBusinesmen.validate(_.pick(req.body, ["login", "password"]))
    //    yesli error 
    if (error) {
        return (

            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "validatsiyadan otmadi"
                    }
                )
        )
    }

    const onTheBaza = await BusinesMenSChema.findOne({ businesmen_login: value.login, businesmen_password: value.password })
    if (!onTheBaza) {
        return (
            res
                .status(200)
                .json(
                    {
                        status: "warning",
                        message: "malumotlar topilmadi"
                    }
                )
        )
    }

    const token = GenerateToken({ ..._.pick(onTheBaza, ["businesmen_companyName", "_id"]), role: "businesmen" })
    res
        .cookie("auth", token)
        .status(200)
        .json(
            {
                status: "success",
                message: "tizimga qaytganingizdan hursandmiz!"
            }
        )
})


module.exports = routes;
