const { Router } = require("express");
const TeacherValidation = require("../../../validation/auth/teacherValidation");
const _ = require("lodash");
const TeacherSchema = require("../../../MongoDB/Schema/TeacherSchema");
const { GenerateToken } = require("../../../jwt/jsonwebtoken");
const MotherSchema = require("../../../MongoDB/Schema/MotherSchema");
const StudentSchema = require("../../../MongoDB/Schema/StudentSchema");

const routes = Router();
routes.post("/" , async (req, res)=>{
    const {value , error} = TeacherValidation.validate(_.pick(req.body , ["name" , "firstName" , "phoneNumber" , "birthDay" , "password" , "confirmPassword", "spase" , "location"]))
    // esli error 
    if(error){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"validatsiyadan o'tmadi",
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
    // esli yest baza 
    try {
        const createBaza = await TeacherSchema.create(value)
        const token = GenerateToken(_.pick(createBaza , ["name" , "_id" , "firstName"]));
        res
            .cookie("auth" , token)
            .status(200)
            .json(
                {
                    status:"success",
                    message:"royhatdan otildi tizimga hush kelibsiz"
                }
            )
            
    } catch (error) {
        throw error
    }

})

module.exports = routes;
