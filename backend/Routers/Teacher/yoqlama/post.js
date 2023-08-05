const Joi                   = require("joi")
const ClassesSchema         = require("../../../MongoDB/Schema/ClassesSchema")
const events                = require("../../../utils/sendNotification/businesmen/startClass")
const _                     = require("lodash")
const { default: mongoose } = require("mongoose")

const post = async (req, res) => {
    const id = req.params.id
    const classes = await ClassesSchema.findById(id)
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
    const { error, value } = Joi.object({ data: Joi.array().items(Joi.object({ studentId: Joi.string().required(), attendance: Joi.boolean().required() })).required() }).validate(_.pick(req.body, ["data"]))
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


    const studentIdValidateError = []
    const studentIdValidateSuccess = []
    const studentIdValidate = []
    value.data.reduce((initialValue , currentValue) => {
        if(initialValue.length == 0){
            return [currentValue]
        }
        return initialValue.map(e=>e.studentId).includes(currentValue.studentId) ? initialValue : [...initialValue , currentValue]
    } ,[]).forEach(std => {
        if (mongoose.Types.ObjectId.isValid(std.studentId)) {
            if (classes.class_studentsId.map(std1 => std1._id.toString()).includes(std.studentId.toString())) {
                studentIdValidateSuccess.push(std.studentId)
                return studentIdValidate.push(true)
            }
            studentIdValidateError.push(std.studentId)
        }
        studentIdValidate.push(false)
    })

    if (studentIdValidateError.length > 0) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: 'siz guruxda mavjud bolmagan oquvchilarni qoshib yubordingiz',
                        data: studentIdValidateError
                    }
                )
        )
    }

    if (studentIdValidate.includes(false)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "malumotlarda hatolik bor!",
                        target: studentIdValidate
                    }
                )
        )
    }



    if (classes.class_studentsId.length > studentIdValidateSuccess.length) {

        const errStudentData = classes.class_studentsId.map(e => e._id.toString()).filter(stdId => !studentIdValidateSuccess.includes(stdId))
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "bir nechta oquvchilar qolib ketdi sahifada hatolik mavjudga oxshaydi dasturni qayta ishga tushurish lozim!",
                        data: errStudentData
                    }
                )
        )
    }






    const time = new Date()
    const years = time.getFullYear()
    const month = time.getMonth()
    const day = time.getDate()
    const date = `${years}.${month + 1}.${day}`
    if (classes.class_attendance.length > 0) {
        if (classes.class_attendance.reverse()[0].date == date) {
            return (
                res
                    .status(400)
                    .json(
                        {
                            status: "warning",
                            message: `${classes.class_name} guruxini bugun yoqlama qildingiz uni ozgartirishingiz mumkun lekin qayta yoqlama qilolmaysiz`
                        }
                    )
            )
        }
    }

    const newData = await ClassesSchema.findByIdAndUpdate(classes._id, { $push: { class_attendance: { data:value.data.reduce((initialValue , currentValue) => {
        if(initialValue.length == 0){
            return [currentValue]
        }
        return initialValue.map(e=>e.studentId).includes(currentValue.studentId) ? initialValue : [...initialValue , currentValue]
    } ,[]), date } } } , {new : true})
    res
        .status(200)
        .json(
            {
                status: "success",
                message: `${classes.class_name} guruxi yoqlamasi bazaga kiritildi uni ozgartirishingiz mumkun laekin qayta yoqlama bugun uchun yopildi!`,
                data: newData.class_attendance
            }
        )

    if (classes.class_durationDays == classes.class_attendance.length) {
        await ClassesSchema.findByIdAndUpdate(classes._id, { $set: { class_status: { status: "dark", text: "end" } } })
        events.emit("end", _.pick(classes, ["_id"]))
    }
}

module.exports = post