const { Router } = require("express");
const _ = require("lodash")
const studentValidate = require("../../../validation/auth/students")
const routes = Router();
const {GenerateToken} = require("../../../jwt/jsonwebtoken");
const StudentSchema = require("../../../MongoDB/Schema/StudentSchema");
const reverse_obj = require("../../../utils/reverse/in_bazaSchema_object");
const bcrypt = require("bcrypt")
/*
    * -----     route         =>   auth/singup/student                   -------
    * -----     method        =>   POST                                  -------
    * -----     description   =>   sing up student                       -------
    * -----     whoami        =>   guest                                 -------
*/

routes.post("/" , async ( req, res ) => {
    const { value ,  error } = studentValidate.validate(_.pick(req.body , ["name" , "firstName" , "login", "password" , "phoneNumber" , "email" , "birthDay" , "confirmPassword" , "location"]))
    
    if(error){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"validationError",
                        message:"malumotlar togri toldirilganligiga ishonch hosil qiling",
                        target:error.details[0].path,
                        error
                    }
                )
        )
    }


    const student_obj = reverse_obj("student" , value)

    const onTheBaza = await StudentSchema.findOne(_.pick(student_obj , ["student_login"]))

    if(onTheBaza){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"bunday oquvchi oldindan mavjud"
                    }
                )
        )
    }


    const hashPassword = await bcrypt.hash(value.password, 10)
    
    const create_student = await StudentSchema.create({
        ...student_obj,
        student_password:hashPassword
    })


    const token = GenerateToken({..._.pick(create_student , ["_id" , "student_login"]) , role:"student"})
    
    res
        .cookie("auth" , token , {maxAge : 60*60*24*100})
        .status(200)
        .json(
            {
                status:"success",
                message:"success!"
            }
        )
})

module.exports = routes