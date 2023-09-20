const { Router }    = require("express");
const TeacherSchema = require("../../MongoDB/Schema/TeacherSchema");
const ClassesSchema = require("../../MongoDB/Schema/ClassesSchema");
const Joi           = require("joi");
const _             = require("lodash");
const verify        = require("../../utils/function/verifiyHoursClass");
const StudentSchema = require("../../MongoDB/Schema/StudentSchema");
const { default: mongoose } = require("mongoose");
const router        = Router()



/*
    * -----     route         =>   techer/baho/:id                           -------
    * -----     method        =>   POST                                      -------
    * -----     description   =>   oquvchilarga baho qoysih                  -------
    * -----     whoami        =>   teacher                                   -------
*/

router.post("/:id" ,  async ( req , res ) => {
    const courseID = req.params.id
    if(!mongoose.Types.ObjectId.isValid(courseID)) return res.status(400).json({status:"error" , message:"invalid class id"})
    const teacherData = await TeacherSchema.findById(req.id)
    let oldCourse = await ClassesSchema.findById(courseID)
    
    if(!teacherData.teacher_coursesID.map(e=>e._id.toString()).includes(courseID)){
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

    if(oldCourse.class_status.text != "started"){
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
    const currentDay = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`


    const tableData = oldCourse.class_table
    const dayTable = tableData.find(e=>e.day == date.getDay())
    const currentDayAttendance = oldCourse.class_attendance.length > 0 ? oldCourse.class_attendance.find(e=>e.date == currentDay) : null

    if(!dayTable) return res.status(400).json({ status : "warning" , message : "baholarni dars vaqtida qoying !" })
    
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

    if(oldCourse.class_attendance.length == 0 || !currentDayAttendance){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"oldin yoqlama qiling !"
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
                                    .valid(...oldCourse.class_studentsId.map(e=>e._id.toString()))
                                    .required() , 
                                baho : Joi.number().min(1).max(10).required()
                            }
                        )
                    ).required()
            }
        )
    .validate(_.pick(req.body , ["students"]))

    const dontAttendanceStudentList = currentDayAttendance.data.filter(at => !at.attendance)
    const verifyStudents = value.students.filter(student => !dontAttendanceStudentList.map(e=>e.studentId.toString()).includes(student.id))
    

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
    

    if(oldCourse.class_rating.length == 0 || oldCourse.class_rating.reverse()[0]?.date != currentDay){
        oldCourse = await ClassesSchema.findByIdAndUpdate(courseID , 
            { 
                $push : {
                    class_rating : { 
                        data : oldCourse.class_studentsId.map( e => ( 
                                    { 
                                        studentId : e , 
                                        baho : 0 , 
                                        change : false  , 
                                        outOfControl:true
                                    } 
                                ) 
                            ) , 
                        date:currentDay 
                    } 
                } 
            } , 
            { new : true })
    }

    const currentDayRating = oldCourse.class_rating.find(e=>e.date == currentDay).data.map(student => {
        if(verifyStudents.map(v => v.id).includes(student.studentId.toString())){
            return {...student , baho : verifyStudents.find(v=>v.id == student.studentId.toString()).baho}
        }
        else return student
    })
    const newRating = oldCourse.class_rating.map(rating => {
        if(rating.date == currentDay) return {...rating , data : currentDayRating}
        else rating
    })

    oldCourse = await ClassesSchema.findOneAndUpdate(oldCourse._id ,  { $set : { class_rating : newRating } } ,  { new : true } )

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
                date:Joi.date().valid(oldCourse.class_attendance.reverse()[0].date).required()
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