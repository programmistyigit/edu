const { Router } = require("express");
const motherValidate = require("../../../validation/auth/mother");
const _ = require("lodash");
const MotherSchema = require("../../../MongoDB/Schema/MotherSchema");
const { GenerateToken } = require("../../../jwt/jsonwebtoken");
const reverse_obj = require("../../../utils/reverse/in_bazaSchema_object");

const routes = Router();

routes.post("/", async (req, res) => {
    const { value, error } = motherValidate.validate(_.pick(req.body, ["name", "firstName", "password", "confirmPassword", "birthDay"]))

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
    const onTheBaza = await MotherSchema.findOne(_.pick(mother_obj, ["mother_name", "mother_firstName", "mother_birthDay"]))

    if (onTheBaza) {
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
    const createBaza = await MotherSchema.create(mother_obj);
    const token = GenerateToken({..._.pick(createBaza, ["_id", "mother_name", "mother_firstName"]) , role:"mother"});
    res
        .cookie("auth", token, { maxAge: 60 * 60 * 24 * 100 })
        .status(200)
        .json(
            {
                status: "success",
                message: "success!"
            }
        )
})

module.exports = routes;
