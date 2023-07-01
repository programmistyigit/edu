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
routes.post("/user", async (req, res) => {
    const { value, error } = LoginValidate.validate(_.pick(req.body, ["login", "password", "birthDay"]))
    if (error) {
        res
            .status(400)
            .json(
                {
                    status: "warning",
                    message: "validatsiyadan otmadi"
                }
            )
    }

    const teacherSeachResult = await TeacherSchema.findOne({ name: value.login, password: value.password, birthDay: value.birthDay })
    if (teacherSeachResult) {
        const token = GenerateToken(_.pick(teacherSeachResult, ["_id", "name", "firstName"]))
        return (
            res
                .cookie("auth", token)
                .status(200)
                .json(
                    {
                        status: "success",
                        message: "tizimga qaytganingizdan hursandmiz ustoz"

                    }
                )
        )
    }

    const motherSearchresult = await MotherSchema.findOne({ name: value.login, password: value.password, birthDay: value.birthDay })
    if (motherSearchresult) {
        const token = GenerateToken(_.pick(motherSearchresult, ["_id", "name", "firstName"]))
        return (
            res
                .cookie("auth", token)
                .status(200)
                .json(
                    {
                        status: "success",
                        message: "tizimga qaytganingizdan hursandmiz hurmatli ota-ona"
                    }
                )
        )
    }

    const studentSearchResult = await StudentSchema.findOne({ name: value.login, password: value.password, birthDay: value.birthDay })
    if (studentSearchResult) {
        const token = GenerateToken(_.pick(studentSearchResult, ["_id", "name", "firstName"]))
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
                status:"warning",
                message:"foydalanuvchi topilmadi 😔"
            }
        )
})


routes.post("/businesmen", async (req, res) => {
    const { value, error } = LoginValidateBusinesmen.validate(_.pick(req.body, ["login", "password"]))
    //    yesli error 
    if (error) {
        res
            .status(400)
            .json(
                {
                    status: "warning",
                    message: "validatsiyadan otmadi"
                }
            )
    }

    const onTheBaza = await BusinesMenSChema.findOne(value)
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

    const token = GenerateToken(_.pick(onTheBaza, ["companyName", "_id"]))
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
