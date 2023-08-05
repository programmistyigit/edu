const { Router }    = require("express");
const TeacherSchema = require("../../MongoDB/Schema/TeacherSchema");
const ClassesSchema = require("../../MongoDB/Schema/ClassesSchema");
const Joi           = require("joi");
const _             = require("lodash");
const verify        = require("../../utils/function/verifiyHoursClass");
const StudentSchema = require("../../MongoDB/Schema/StudentSchema");
const router        = Router()



/*
    * -----     route         =>   techer/baho//:id                          -------
    * -----     method        =>   POST                                      -------
    * -----     description   =>   oquvchilarga baho qoysih                  -------
    * -----     whoami        =>   teacher                                   -------
*/

router.post("/:id" ,  async ( req , res ) => {
    const courseID = req.params.id
    const teacherData = await TeacherSchema.findById(req.id)
    let oldCourse = await ClassesSchema.findById(courseID)
    
    if(teacherData.teacher_coursesID.map(e=>e._id.toString()).includes(courseID)){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"siz natogri malumotlar jonatyapsiz !"
                    }
                )
        )
    }

    if(oldCourse.class_status.text == "started"){
        return (
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:`${oldCourse.class_name} guruxiga hali start berilmadan ! `
                    }
                )
        )
    }
    
    const date = new Date()

    const tableData = oldCourse.class_table
    const dayTable = tableData.find(e=>e.day == date.getDay())
    const resultVerifyFunction = verify(dayTable.hours.split(":")[0] , dayTable.duration , date.getHours())
    if(!resultVerifyFunction){
        return (
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:`baho qoyish vaqti ${dayTable.hours} dan boshlab ${dayTable.duration} minut vaqt ichida bajarilishi kerak !`
                    }
                )
        )
    }



    const { value , error } = Joi
        .object(
            {
                students : Joi.array()
                    .items(
                        Joi.object(
                            {
                                id:Joi.string()
                                    .valid(...oldCourse.class_studentsId.map(e=>e.toString()))
                                    .required() , 
                                baho : Joi.number().min(1).max(10).required()
                            }
                        )
                    )
            }
        )
    .validate(_.pick(req.body , ["students"]))
    

    if( error ) {
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:error.details[0].message,
                        target:error.details[0].path
                    }
                )
        )
    }
    

    const currentDay = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`
    if(oldCourse.class_rating.reverse()[0].date != currentDay){
        oldCourse = await ClassesSchema.findByIdAndUpdate(courseID , { $push : {class_rating : { data : oldCourse.class_studentsId.map( e => ( { stdentId : e , baho : 0 , change : true  , outOfControl:false} ) ) , date:currentDay } } } , { new : true })
    }

    const newCurrentDayRatingDate = oldCourse.class_rating.reverse()[0].data.map( e => {
        const student = value.students.find(e=> e.id === e.studentId)
        if(student) return { ...e , baho : student.baho }
        else return e
    })

    const allRatingDate = oldCourse.class_rating.reverse().map(( e , i ) => (i == 0 ? newCurrentDayRatingDate : e))

    oldCourse = await ClassesSchema.findOneAndUpdate(oldCourse._id ,  { $set : { class_rating : allRatingDate } } ,  { new : true } )

    res
        .status(200)
        .json(
            {
                status:"status",
                message:"success !",
                data : oldCourse
            }
        )

})


/*
    * -----     route         =>   techer/baho/:id                                                                       -------
    * -----     method        =>   PUT                                                                                   -------
    * -----     description   =>   oquvchilarni bahosini ozgartirish faqat oquvchi tomonidan soralganda                  -------
    * -----     whoami        =>   teacher                                                                               -------
*/

router.put("/:id" , async ( req , res ) => {
    const courseID = req.params.id
    const teacherData = await TeacherSchema.findById(req.id)
    
    if(teacherData.teacher_coursesID.map(e=>e._id.toString()).includes(courseID)){
        return(
            res
            .status(400)
            .json(
                {
                    status:"warning",
                    message:"siz natogri malumotlar jonatyapsiz !"
                }
            )
        )
    }
            
    let oldCourse = await ClassesSchema.findById(courseID)
    // await oldCourse.populate( { path : "class_BusinesmenID" , strictPopulate : false } )
    if(oldCourse.class_status.text == "started"){
        return (
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:`${oldCourse.class_name} guruxiga hali start berilmagan ! `
                    }
                )
        )
    }

    const { value , error } = Joi.object(
            {
                studentId : Joi.string().valid(...oldCourse.class_studentsId.map(e=>e._id.toString())).required(),
                baho:Joi.number().min(1).max(10).required(),
                date:Joi.date().min(new Date(Math.min(oldCourse.class_rating.map(e=>new Date(e.date))))).max(new Date(Math.max(oldCourse.class_rating.map(e=>new Date(e.date))))).required()
            }
        ).validate(_.pick(req.body , ["studentId" , "baho" , "date"]))

    if(error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:error.details[0].message,
                        target:error.details[0].path
                    }
                )
        )
    }
    const oldStudentRatingData = oldCourse.class_rating.find(e=> e.date == value.date).data.filter(e=>e.studentId == value.studentId)
    
    if(!oldStudentRatingData.change){
        const student = await StudentSchema.findById(value.studentId)
        return(
            res
                .status(400)
                .json(
                    {
                        status:"error",
                        message:`${student.student_name} hali bahoni ozgartirish uchun sorov yubormagan !`
                    }
                )
        )
    }


    const newStudentRatingData = oldCourse.class_rating.map((rating) => {
        if(rating.date == value.date) return {...rating.data , ..._.pick(value , ["baho"])}
        else return rating
    })

    oldCourse = await ClassesSchema.findByIdAndUpdate(oldCourse._id , { $set : { class_rating : newStudentRatingData } } )

    res
        .status(200)
        .json(
            {
                status:"succcess",
                message:"success !"
            }
        )


})


module.exports = router