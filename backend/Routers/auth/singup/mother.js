const { Router } = require("express");
const motherValidate = require("../../../validation/auth/mother");
const _ = require("lodash");
const MotherSchema = require("../../../MongoDB/Schema/MotherSchema");
const { GenerateToken } = require("../../../jwt/jsonwebtoken");
const reverse_obj = require("../../../utils/reverse/in_bazaSchema_object");
const bcrypt = require("bcrypt")

const routes = Router();

routes.post("/", async (req, res) => {
    const { value, error } = motherValidate.validate(_.pick(req.body, ["name", "firstName", "login", "password", "confirmPassword", "birthDay"]))

    // esli error
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "validatsiya tog'ri kelmadi",
                        data: error,
                        target: error.details[0].path
                    }
                )
        )
    }
    // esli error

    const mother_obj = reverse_obj("mother", value)
    const onTheBaza = await MotherSchema.findOne(_.pick(mother_obj, ["mother_login"]))

    if (onTheBaza) {
        return (
            res
                .status(200)
                .json(
                    {
                        status: "warning",
                        message: "Username already exists"
                    }
                )
        )
    }

    const { password } = value
    const hashPassword = await bcrypt.hash(password, 10)

    const createBaza = await MotherSchema.create({
        ...mother_obj,
        mother_password: hashPassword,
    });

    const token = GenerateToken({ ..._.pick(createBaza, ["_id", "login"]), role: "mother" });
    res
        .cookie("auth", token, { maxAge: 60 * 60 * 24 * 100 })
        .status(200)
        .json(
            {
                status: "success",
                message: "Welcom success!"
            }
        )
})



module.exports = routes;
