const { Router } = require("express");
const _ = require("lodash")
const LoginValidate = require("../../validation/auth/login/loginValidate");
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema");
const bcrypt = require("bcrypt")

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
    const { value, error } = LoginValidate.validate(_.pick(req.body, ["login", "password"]))
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

    const teacherSeachResult = await TeacherSchema.findOne({ teacher_login: value.login })


    if (!teacherSeachResult) {
        return res
            .status(400)
            .json(
                {
                    status: "warning",
                    message: "foydalanuvchi topilmadi 😔"
                }
            )

    }

    const checkPassword = await bcrypt.compare(value.password, teacherSeachResult.teacher_password)
    if (!checkPassword) {
        return res
            .status(400)
            .json(
                {
                    status: "warning",
                    message: "Passwords do not match",
                    error
                }
            )
    }
    const token = GenerateToken({ ..._.pick(teacherSeachResult, ["_id", "teacher_login"]), role: "teacher" })

    res
        .cookie("auth", token, { maxAge: 60 * 60 * 24 * 100 })
        .status(200)
        .json(
            {
                status: "success",
                message: "tizimga qaytganingizdan hursandmiz ustoz"
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
    const { value, error } = LoginValidate.validate(_.pick(req.body, ["login", "password"]))

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

    const motherSearchresult = await MotherSchema.findOne({ mother_login: value.login })

    if (!motherSearchresult) {
        return res
            .status(400)
            .json(
                {
                    status: "warning",
                    message: "foydalanuvchi topilmadi 😔"
                }
            )
    }

    const checkPassword = await bcrypt.compare(value.password, motherSearchresult.mother_password)

    if (!checkPassword) {
        return res
            .status(400)
            .json(
                {
                    status: "warning",
                    message: "Passwords do not match",
                    error
                }
            )
    }

    const token = GenerateToken({ ..._.pick(motherSearchresult, ["_id", "mother_login"]), role: "mother" })

    return (
        res
            .cookie("auth", token, { maxAge: 60 * 60 * 24 * 100 })
            .status(200)
            .json(
                {
                    status: "success",
                    message: "Fucking Welcome tizimga qaytganingizdan hursandmiz hurmatli ota-ona"
                }
            )
    )

})

/*
    * -----     route         =>   auth/login/student              -------
    * -----     method        =>   POST                                  -------
    * -----     description   =>   login student                          -------
    * -----     whoami        =>   guest                              -------
*/

routes.post("/student", async (req, res) => {
    const { value, error } = LoginValidate.validate(_.pick(req.body, ["login", "password"]))
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

    const studentSearchResult = await StudentSchema.findOne({ student_login: value.login })


    if (!studentSearchResult) {

        res
            .status(400)
            .json(
                {
                    status: "warning",
                    message: "foydalanuvchi topilmadi 😔"
                }
            )
        return;
    }

    const checkPassword = await bcrypt.compare(value.password, studentSearchResult.student_password)

    if (!checkPassword) {
        return res
            .status(400)
            .json(
                {
                    status: "warning",
                    message: "Passwords do not match",
                    error
                }
            )
    }




    const token = GenerateToken({ ..._.pick(studentSearchResult, ["_id", "student_login"]), role: "student" })
    return (
        res
            .cookie("auth", token)
            .status(200)
            .json(
                {
                    status: "success",
                    message: "Fucking Welcome, qaytganinguzdan hursandmiz hurmatli oquvchi oqishlaringizga omad!"
                }
            )
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

    if (error) {
        return res.status(400).json({
            status: "warning",
            message: "validatsiyadan otmadi"
        });
    }

    const onTheBaza = await BusinesMenSChema.findOne({ businesmen_login: value.login });

    if (!onTheBaza) {
        return res.status(200).json({
            status: "warning",
            message: "malumotlar topilmadi"
        });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(value.password, onTheBaza.businesmen_password);

    if (!passwordMatch) {
        return res.status(200).json({
            status: "warning",
            message: "parol noto'g'ri"
        });
    }

    const token = GenerateToken({ ..._.pick(onTheBaza, ["businesmen_companyName", "_id"]), role: "businesmen" });
    res
        .cookie("auth", token)
        .status(200)
        .json({
            status: "success",
            message: "tizimga qaytganingizdan hursandmiz!"
        });
})


module.exports = routes;
