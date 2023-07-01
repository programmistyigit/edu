const { Router } = require("express");
const motherValidate = require("../../../validation/auth/mother");
const _ = require("lodash");
const MotherSchema = require("../../../MongoDB/Schema/MotherSchema");
const { GenerateToken } = require("../../../jwt/jsonwebtoken");
const TeacherSchema = require("../../../MongoDB/Schema/TeacherSchema");
const StudentSchema = require("../../../MongoDB/Schema/StudentSchema");

const routes = Router();

routes.post("/" , async (req, res)=>{
    const {value , error} = motherValidate.validate(_.pick(req.body , ["name" , "firstName" , "password" , "confirmPassword" , "birthDay"]))

    // esli error
    if(error){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"validatsiya tog'ri kelmadi",
                        data:error,
                        target:error.details[0].path
                    }
                )
        )
    }
    // esli error
    const onTheBaza = await MotherSchema.findOne(_.pick(value , ["name" , "firstName" , "birthDay"]))
    const onTheBazaStudent = await TeacherSchema.findOne(_.pick(value , ["name" , "firstName" , "birthDay"]))
    const onTheBazaTeacher = await StudentSchema.findOne(_.pick(value , ["name" , "firstName" , "birthDay"]))

    if(onTheBaza || onTheBazaStudent || onTheBazaTeacher){
        return(
            res
                .status(200)
                .json(
                    {
                        status:"warning",
                        message:"bunday malumotlar bazada aniqlandi iltimos boshqa ism ostida kirib koring"
                    }
                )
        )
    }
    try {
        const createBaza = await MotherSchema.create(value);
        const token = GenerateToken(_.pick(createBaza ,["_id" , "name" , "firstName"]));
        res
            .cookie("auth" , token)
            .status(200)
            .json(
                {
                    status:"success",
                    message:"royhatdan o'tildi Tizimga hush kelibsiz"
                }
            )
    } catch (error) {
        throw error
    }
})

module.exports = routes;
