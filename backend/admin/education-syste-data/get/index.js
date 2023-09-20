const Joi = require("joi")
const BusinesMenSChema = require("../../../MongoDB/Schema/BusinesMenSChema")
const ClassesSchema = require("../../../MongoDB/Schema/ClassesSchema")
const CoursesSchema = require("../../../MongoDB/Schema/CoursesSchema")
const StudentSchema = require("../../../MongoDB/Schema/StudentSchema")
const TeacherSchema = require("../../../MongoDB/Schema/TeacherSchema")
const _ = require("lodash")
const router = require("express").Router()

/*
    * -----     route         =>   admin/education-system-data/get/all      -------
    * -----     method        =>   GET                                      -------
    * -----     description   =>   education-system-data get all length     -------
    * -----     whoami        =>   admin                                    -------
*/


router.get("/all" , async ( req , res ) => {
    const allStudents = (await StudentSchema.find()).length
    const allBusinesmen = (await BusinesMenSChema.find()).length
    const allClass = (await ClassesSchema.find()).length
    const allCourse = (await CoursesSchema.find()).length
    const allTeacher = (await TeacherSchema.find()).length
    res.status(200).json({allBusinesmen , allStudents , allTeacher , allClass , allCourse})
})
/*
    * -----     route         =>   admin/education-system-data/get/:role/:count/:position          -------
    * -----     method        =>   GET                                                             -------
    * -----     description   =>   education-system-data get data with role                        -------
    * -----     whoami        =>   admin                                                           -------
*/

router.get("/:role/:count/:position" , async ( req , res ) => {
    const {value , error} = Joi.object({role : Joi.string().valid("businesmen" , "student" , "teacher" , "class" , "cours").required() , count:Joi.number().required() , position:Joi.number().required()}).validate(_.pick(req.params , ["role" , "count" , "position"]))
    
    if(error){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"error",
                        target:error.details[0].path,
                        message:"validatsiya hatosi",
                        data:null,
                    }
                )
        )
    }    
    
    const { role , count , position } = value
    let result = []
    if(role == "businesmen"){ result = await BusinesMenSChema.find()}

    if(role == "student"){ result = await StudentSchema.find() }

    if(role == "teacher"){ result = await TeacherSchema.find() }

    if(role == "class") { result = await ClassesSchema.find() }

    if(role == "cours") { result = await CoursesSchema.find() }
    
    
    if(result.length < count){
        res.status(200).json({status:"warning" , data:result , disablet:true , role})
    }
    if(parseInt(count) * (parseInt(position) - 1) > result.length ){
        res.status(400).json({status:"warning" , data:null , role , disablet : true})
    }

    const resultArr = _(result).slice(parseInt(count) * (parseInt(position) - 1)).take(count).value()
    res.status(200).json({status:"success" , data:resultArr , disablet:false , role})
})

module.exports = router