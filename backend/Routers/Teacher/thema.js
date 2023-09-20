const { Router }            = require("express")
const { default: mongoose } = require("mongoose")
const ClassesSchema         = require("../../MongoDB/Schema/ClassesSchema")
const Joi                   = require("joi")
const CoursesSchema         = require("../../MongoDB/Schema/CoursesSchema")
const router                = Router()
const _                     = require("lodash")


/*
    * -----     route         =>   techer/thema/                                           -------
    * -----     method        =>   post                                                    -------
    * -----     description   =>   oquvchilarga baho qoyish                                -------
    * -----     whoami        =>   teacher                                                 -------
*/

router.post("/:id" , async ( req , res ) => {
    const coursesId = req.params?.id
    if(!mongoose.Types.ObjectId.isValid(coursesId)) return res.status(400).json( { status : "error" ,  message : "yaroqsiz ID !" } )

    let oldCourse = await ClassesSchema.findById(coursesId)
    if(!oldCourse) res.status(400).json( { status : "warning" , message : "gurux topilmadi" } )

    if(oldCourse.class_BigTeacherId.toString() != req.id ) return res.status(400).json( { status : "warning" , message : "siz ushbu gurux raxbari emassiz !" } )

    const date = new Date()
    const currentDay = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`

    const tableData = oldCourse.class_table
    const dayTable = tableData.find(e=>e.day == date.getDay())
    const currentDayAttendance = oldCourse.class_attendance.length > 0 ? oldCourse.class_attendance.find(e=>e.date == currentDay) : null

    if(!dayTable) return res.status(400).json({ status : "warning" , message : "mavzuni dars vaqtigacha dars kunida qoying !" })
    if(currentDayAttendance) return res.status(400).json( { status : "warning" , message : "mavzuni darsdan keyin qoyib bolmaydi !" } )

    const groupSpace = await CoursesSchema.findById(oldCourse.class_groupSpase)
    const { value , error } = Joi.object( { thema : Joi.string(...groupSpace.course_thema_list).valid().required() } ).validate(_.pick(req.body , ["thema"]))
    if( error ) return res.status(400).json( { status : "validateError" , message : error.details[0].message , error , target : error.details[0].path } )

    if(oldCourse.class_thema.length == 0) {
        oldCourse = await ClassesSchema.findByIdAndUpdate(oldCourse._id , { $push : {class_thema : { thema : null ,  date : currentDay } } } , { new : true } )
    }
    const isCurrentDayThema = oldCourse.class_thema.find((e) => e.date == currentDay)
    if(!isCurrentDayThema) oldCourse = await ClassesSchema.findByIdAndUpdate(oldCourse._id , { $push : { thema : value.thema , date : currentDay } } ,  { new : true } )
    if(isCurrentDayThema){
        const newClassThemaList = oldCourse.class_thema.map(e => e.date == currentDay ? {...e , thema : value.thema } : e)
        oldCourse = await ClassesSchema.findByIdAndUpdate(oldCourse._id , { $set : { class_thema : newClassThemaList } } , { new : true } )
    }

    res.status(200).json( { status : "success" , message : `Kutilyotgan dars uchun mavzu ${value.thema} etib tayinlandi !`})
    
})

module.exports = router