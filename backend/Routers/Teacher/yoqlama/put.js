const Joi = require("joi")
const ClassesSchema = require("../../../MongoDB/Schema/ClassesSchema")
const { default: mongoose } = require("mongoose")

const put = async (req, res) => {
    const id = req.params.id
    const { error, value } = Joi.object({ data: Joi.array().items(Joi.object({ studentId: Joi.string().required(), attendance: Joi.boolean().required() })) }).validate(_.pick(req.body, ["data"]))
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "malumotlarda xatolik bor",
                        target: error.details[0].path,
                        error
                    }
                )
        )
    }
    const classes = await ClassesSchema.findById(id)
    if (!classes) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "gurux toplimadi yaroqsiz malumotlar"
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
                        message: `Siz ${classes.class_name} guruxi raxbari emassiz!`
                    }
                )
        )
    }



    const studentIdValidateError = []
    const studentIdValidateSuccess = []
    const studentIdValidate = []
    value.data.forEach(std => {
        if (mongoose.Types.ObjectId.isValid(std.studentId)) {
            if (classes.class_studentsId.map(std1 => std1._id.toString()).includes(std.studentId.toString())) {
                studentIdValidateSuccess.push(std.studentId)
                return studentIdValidate.push(true)
            }
            studentIdValidateError.push(std.studentId)
        }
        studentIdValidate.push(false)
    })

    if(studentIdValidateError.length > 0){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:'siz guruxda mavjud bolmagan oquvchilarni qoshib yubordingiz',
                        data:studentIdValidateError
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




    const attendanceCourse = classes.class_attendance.reverse()
    const newAttendanceCourse = attendanceCourse.map((item, index) => (index == 0 ? { ...value, date: item.date } : item)).reverse()
    const newClasses = await ClassesSchema.findByIdAndUpdate(classes._id, { $set: { class_attendance: newAttendanceCourse } } , { new : true})

    res
        .status(200)
        .json(
            {
                status:"success",
                message:`${classes.class_name} guruxi yoqlamasi ozgartirildi !`,
                data:newClasses.class_attendance
            }
        )

}

module.exports = put