const { Router } = require("express");
const _ = require("lodash")
const studentValidate = require("../../../validation/auth/students")
const studentSchema = require("../../../MongoDB/Schema/StudentSchema")
const routes = Router();
const {GenerateToken} = require("../../../jwt/jsonwebtoken");
const TeacherSchema = require("../../../MongoDB/Schema/TeacherSchema");
const MotherSchema = require("../../../MongoDB/Schema/MotherSchema");

routes.post("/" , async (req, res)=>{
    const {value , error} = studentValidate.validate(_.pick(req.body , ["name" , "firstName" , "password" , "confirmPassword" , "phoneNumber" , "email" , "birthDay" , "location"]))
    if(error){
        return (
            res
                .status(400)
                .json(
                    {
                        status:"error",
                        message:"validatsiyadan o'tmadi",
                        data:error,
                        target:error.details[0].path
                    }
                )
        )
    }
    const onTheBaza = await MotherSchema.findOne(_.pick(value , ["name" , "firstName" , "birthDay"]))
    const onTheBazaStudent = await TeacherSchema.findOne(_.pick(value , ["name" , "firstName" , "birthDay"]))
    const onTheBazaTeacher = await studentSchema.findOne(_.pick(value , ["name" , "firstName" , "birthDay"]))

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
        const createStudent = await studentSchema.create(value)
        const token = GenerateToken(_.pick(createStudent , ["_id" , "name" , "phoneNumber"]))
        res
            .cookie("auth" , token)
            .status(200)
            .send(
                    {
                        status:"success" , 
                        data:createStudent
                    }
                )
    } catch (error) {
        throw error
    }
})

module.exports = routes;
