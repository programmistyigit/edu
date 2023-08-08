const Joi                   = require("joi")
const ClassesSchema         = require("../../../MongoDB/Schema/ClassesSchema")
const events                = require("../../../utils/sendNotification/businesmen/startClass")
const _                     = require("lodash")
const { default: mongoose } = require("mongoose")

const post = async (req, res) => {
    const id = req.params.id
    let classes = await ClassesSchema.findById(id)
    if (!classes) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: ["gurux topilmadi!"]
                    }
                )
        )
    }
    if (classes.class_BigTeacherId._id.toString() != req.id.toString()) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: `Siz ${classes.class_name} guruxi raxbari emassiz`
                    }
                )
        )
    }

    if(classes.class_status.text != "start") return res.status(400).json({status:"warning" , message:"gurux hali boshlanmagan unga yoqlaman qilishni iloji yoq !"})

    const { error , value } = Joi.object(
            { 
                data: Joi.array()
                    .items(
                        Joi.object(
                            { 
                                studentId: Joi.string().valid(...classes.class_studentsId.map(e=>e.toString())).required(),
                                attendance: Joi.boolean().required()
                            }
                        )
                    ).required() 
            }
        ).validate(_.pick(req.body, ["data"]))

    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "malumotlarda hatolik aniqlandi qayta urunib koring!",
                        target: error.details[0].path,
                        error
                    }
                )
        )
    }

    
    
    
    const time = new Date()
    const years = time.getFullYear()
    const month = time.getMonth()
    const day = time.getDate()
    const date = `${years}.${month + 1}.${day}`
    
    if(classes.class_attendance.length == 0 || !classes.class_attendance.find(e=>e?.date == date)){
        classes = await ClassesSchema.findByIdAndUpdate(classes._id , 
            { 
                $push : { 
                    class_attendance : { 
                        data : classes.class_studentsId.map(e=> ({ studentId : e , attendance : false })) , 
                        date 
                    } 
                } 
            } , 
            { new : true }
        )
    };

    const currentDayAttendance = classes.class_attendance.find(e=>e.date == date).data.map(student => {
        const isStudentValid = value.data.find(e=>e.studentId == student.studentId.toString())
        if(isStudentValid) return {...student , attendance :isStudentValid.attendance}
        else return student
    })


    const allAttendanceData = classes.class_attendance.map(attendance => {
        if(attendance.date == date) return {...attendance , data : currentDayAttendance};
        else attendance
    })

    classes = await ClassesSchema.findByIdAndUpdate(classes._id , { $set : { class_attendance : allAttendanceData } } )

    res.status(200).json({ status : "success" , message : "success !"})

    if (classes.class_durationDays == classes.class_attendance.length) {
        await ClassesSchema.findByIdAndUpdate(classes._id, { $set: { class_status: { status: "dark", text: "end" } } })
        events.emit("end", _.pick(classes, ["_id"]))
    }
}

module.exports = post