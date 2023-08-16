const { Router } = require("express")
const { default: mongoose } = require("mongoose")
const BusinesMenSChema = require("../../../MongoDB/Schema/BusinesMenSChema")
const ClassesSchema = require("../../../MongoDB/Schema/ClassesSchema")
const Joi = require("joi")
const router = Router()
const _ = require("lodash")
const StudentSchema = require("../../../MongoDB/Schema/StudentSchema")
const generateMessage = require("../../../helpers/classes/studentOnRemoveGenerateMessage")


/*
    * -----     route         =>   businesmen/follow_student                                    -------
    * -----     method        =>   delete                                                       -------
    * -----     description   =>   guruxga yozilish uchun ariza jonatganlar bilan ishlash       -------
    * -----     whoami        =>   businesmen                                                   -------
*/


router.delete("/:id" , async ( req , res ) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
    if(!isValidId) return res.status(400).json( { status : "error" , message : "yaroqsiz malumotlar!" } )
    
    const businesmen = await BusinesMenSChema.findById(req.id);
    if(!businesmen.businesmen_classesID.map(e=>e._id.toString()).includes(req.params.id)) return res.status(400).json( { status : "warning" , message : "gurux sizga tegishli emas !" } )
    
    const classes = await ClassesSchema.findById(req.params.id)
    if(!classes) return res.status(400).json( { status : "warning" , message : "gurux topilmadi" } )
    
    const { value , error } = Joi.object(
        {
            studentId : Joi.string().valid(...classes.class_follow_studentsId.map(e=>e._id.toString())).required(),
            message : Joi.string().required()
        }
    ).validate(_.pick( req.body , ["studentId" , "message"] ))

    if(error) return res.status(400).json( { status : "validateError" , message : error.details[0].message , target : error.details[0].path , error } )
    
    const notification = await generateMessage({_id:req.id , role:businesmen.businesmen_companyName} , value.message)
    await ClassesSchema.findByIdAndUpdate(classes._id , { $pull : { class_follow_studentsId : value.studentId } } )
    const student = await StudentSchema.findByIdAndUpdate(value.studentId , { $pull : { student_classesID : classes._id } , $push : { student_notification : notification._id } } )
    res.status(200).json( { status : "success" , message : `${student.student_name}ga rad habaringiz yuborildi !`})
})


/*
    * -----     route         =>   businesmen/follow_student                                    -------
    * -----     method        =>   post                                                         -------
    * -----     description   =>   guruxga yozilish uchun ariza jonatganlar bilan ishlash       -------
    * -----     whoami        =>   businesmen                                                   -------
*/


router.post("/:id" , async ( req , res ) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
    if(!isValidId) return res.status(400).json( { status : "error" , message : "yaroqsiz malumotlar!" } )
    
    const businesmen = await BusinesMenSChema.findById(req.id);
    if(!businesmen.businesmen_classesID.map(e=>e._id.toString()).includes(req.params.id)) return res.status(400).json( { status : "warning" , message : "gurux sizga tegishli emas !" } )
    
    const classes = await ClassesSchema.findById(req.params.id)
    if(!classes) return res.status(400).json( { status : "warning" , message : "gurux topilmadi" } )

    const { value , error } = Joi.object(
        {
            studentId : Joi.string().valid(...classes.class_follow_studentsId.map(e=>e._id.toString())).required(),
        }
    ).validate(_.pick( req.body , ["studentId"] ))

    if(error) return res.status(400).json( { status : "validateError" , message : error.details[0].message , target : error.details[0].path , error } )

    const student = await StudentSchema.findById(value.studentId)
    if(!student){
        await ClassesSchema.findByIdAndUpdate(classes._id , { $pull : {class_follow_studentsId : value.studentId } } )
        return res.status(400).json( { status : "error" , message : "oquvchi bazadan topilmadi!" , target : value.studentId } )
    }

    if(!student.student_classesID.map(e=>e._id.toString()).includes(classes._id.toString())) {
        await ClassesSchema.findByIdAndUpdate(classes._id , { $pull : { class_follow_studentsId : student._id}})
        return res.status(400).json( { status : "error" , message : "o'quvchi malumotlarida gurux topilmadi u sizga ariza qoldirmaganga o'xshaydi !"})
    }

    await ClassesSchema.findByIdAndUpdate(classes._id , { $pull : { class_follow_studentsId : student._id } , $push : {class_studentsId : student._id } } )
    const message = `yana ${parseInt(classes.class_maxNumberStudent)-parseInt(classes.class_studentsId.length)} oquvchi yigilgandan song dars boshlanadi !`
    const notification = await generateMessage({_id : req.id , role : businesmen.businesmen_companyName} , `${classes.class_name} guruxiga ${classes.class_studentsId.length}-qouvchi bolib qabul qilindingiz , ${parseInt(classes.class_maxNumberStudent) == classes.class_studentsId.length ? message : "gurux toldi . oquv markaz tomonidan dars boshlanish habarini kuting !"} `   )
    await StudentSchema.findByIdAndUpdate(student._id , { $push : { student_notification : notification._id } } )

    if(classes.class_follow_studentsId.length > 0){
        const notSuccessMessage = await generateMessage({ _id : req.id , role : businesmen.businesmen_companyName } , businesmen.businesmen_not_success_message_default_text)
    }
    res.status(200).json( { status : "success" , message : `${student.student_name}ga sorovini qabul qilganligingiz xabari yuborildi!`})
})

module.exports = router