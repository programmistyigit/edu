const { Router } = require("express");
const classValidation = require("../../validation/Routers/Businesmen/classesValidation");
const _ = require("lodash");
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema");
const ClassesSchema = require("../../MongoDB/Schema/ClassesSchema");
const { default: mongoose } = require("mongoose");
const TeacherSchema = require("../../MongoDB/Schema/TeacherSchema");
const events = require("../../utils/sendNotification/businesmen/startClass");
const classRateValidate = require("../../validation/Routers/Businesmen/classRateValidate");
const Joi = require("joi");
const StudentSchema = require("../../MongoDB/Schema/StudentSchema");
const reverse_obj = require("../../utils/reverse/in_bazaSchema_object");
const CoursesSchema = require("../../MongoDB/Schema/CoursesSchema");

const router = Router()

/*
* -----     route         =>   businesmen/classes/add     -------
* -----     method        =>   POST                       -------
* -----     description   =>   add class to DB            -------
* -----     whoami        =>   businesmen                 -------
*/


router.post("/add", async (req, res) => {
    const { value, error } = (await classValidation(req.id)).validate(_.pick(req.body, ["name", "groupSpase", "durationDays", "BigTeacherId", "maxNumberStudent", "table"]))
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "Gruh ochish uchun berilgan malumotlarida kamchilik aniqlandi",
                        target: error.details[0].path,
                        error
                    }
                )
        )
    }

    const businesmen = await BusinesMenSChema.findById(req.id)
    await businesmen.populate({ path: "businesmen_classesID", strictPopulate: false })

    if (businesmen.businesmen_classesID.map((e) => e.class_name).includes(value.name)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: `<<${value.name}>>dan allaqachon foydalangansiz boshqa nom qoying`
                    }
                )
        )
    }

    if (!mongoose.Types.ObjectId.isValid(value.BigTeacherId)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "biriktirilgan ustoz malumotlarida hatolik"
                    }
                )
        )
    }

    const BigTeacher = await TeacherSchema.findById(value.BigTeacherId).lean()
    const spaceId = await CoursesSchema.findOne({cours_name : value.groupSpase})

    if (!BigTeacher) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "Ustoz Bazadan topilmadi"
                    }
                )
        )
    }
    if(!BigTeacher.teacher_spase.map(e=>e._id.toString()).includes(spaceId._id.toString())) return res.status(400).json( { status : "warning" , message : `belgilangan ustoz ${spaceId.cours_name} dars otmaydi`})

    if (!businesmen.businesmen_teachersID.map(e => e._id.toString()).includes(value.BigTeacherId.toString())) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "siz belgilagan mutahasis sizning oquv markazingizdan emasligi aniqlandi"
                    }
                )
        )
    }

    const class_obj = reverse_obj("class", value)

    
    const create = await ClassesSchema.create({ ...class_obj, class_BusinesmenID: req.id , class_groupSpase :  spaceId._id})
    await BusinesMenSChema.findByIdAndUpdate(req.id, { $push: { businesmen_classesID: create._id } })
    await TeacherSchema.findByIdAndUpdate(BigTeacher._id, { $push: { teacher_coursesID: create._id } })
    res
        .status(200)
        .json(
            {
                status: "success",
                message: "gurux yaratildi",
                data: create
            }
        )
    return events.emit("add", _.pick(create, ["_id"]))
})

/*
    * -----     route         =>   businesmen/classes/remove            -------
    * -----     method        =>   DELETE                               -------
    * -----     description   =>   remove class to DB                   -------
    * -----     whoami        =>   businesmen                           -------
*/

router.delete("/remove", async (req, res) => {
    const businesmen = await BusinesMenSChema.findById(req.id)
    const { value, error } = Joi.object({ id: Joi.string().valid(...businesmen.businesmen_classesID.map(e => e._id.toString())).required() })
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "yaroqsiz id malumotlarini jonatdingiz , qayta urunib koring !"
                    }
                )
        )
    }

    const classes = await ClassesSchema.findById(value.id)
    if (classes.class_status.status == "dark") {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: `${classes.class_name} guruxi allaqachon tugagan uni endi ochirish mumkun emas !`
                    }
                )
        )
    }

    if (classes.class_status.status == "success" && classes.class_studentsId.length > 0) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: `${classes.class_name} guruxida haliham oquvchilar bor oquvchilar guruhni tark etmaguncha guruxni ochira olmesiz !`
                    }
                )
        )
    }

    await ClassesSchema.findByIdAndRemove(value.id)
    await BusinesMenSChema.findByIdAndUpdate(req.id, { $pull: { businesmen_classesID: classes._id } })
    await TeacherSchema.findByIdAndUpdate(classes.class_BigTeacherId, { $pull: { teacher_coursesID: classes._id } })

    if (classes.class_status.status == "danger") {
        classes.class_studentsId.forEach(async (std) => await StudentSchema.findByIdAndUpdate(std, { $pull: { student_classesID: classes._id } }))
    }

    res
        .status(200)
        .json(
            {
                status: "success",
                message: "gurux royhatdan ochirildi !"
            }
        )



})

/*
    * -----     route         =>   businesmen/classes/start            -------
    * -----     method        =>   put                                 -------
    * -----     description   =>   start class to DB                   -------
    * -----     whoami        =>   businesmen                          -------
*/

router.put("/start", async (req, res) => {
    const id = req.body.id
    if (!id) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validationError",
                        message: "biron bir guruhni tanlash shart!"
                    }
                )
        )
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "tizim sizning amalingizda hatolik aniqladi qayta urinib koring!"
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
                        status: "error",
                        message: "siz tanlagan gurux tizimda topilmadi!"
                    }
                )
        )
    }
    if (classes.class_BusinesmenID._id.toString() != req.id.toString()) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "sizga tegishli bolmagan guruxni ozgartirishga harakatni aniqladik iltimos ushbu harakatni takror qilmang!",
                    }
                )
        )
    }

    if (classes.class_status.status == "success") {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: `${classes.class_name} guruxi allaqachon boshlangan !`
                    }
                )
        )
    }

    if (classes.class_studentsId.length == 0) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "bu guruxda kamida 1 dona oquvchi bolishi shart!"
                    }
                )
        )
    }

    await ClassesSchema.findByIdAndUpdate(id, { class_status: { status: "success", text: "started" } }, { new: true }).lean()

    res
        .status(200)
        .json(
            {
                status: "success",
                message: ["gurux darsni boshlaydi", "Bu haqida guruxga royhatdan otgan oquvchilar va biriktirilgan Mutahasisga habar yuboriladi!"],
                classId: classes._id
            }
        )

    events.emit("startClass", _.pick(classes, ["_id"]))
})

/*
    * -----     route         =>   businesmen/classes/rate           -------
    * -----     method        =>   POST                              -------
    * -----     description   =>   rate class                        -------
    * -----     whoami        =>   businesmen                        -------
*/

router.post("/rate", async (req, res) => {
    const { error, value } = classRateValidate.validate(_.pick(req.body, ["_id", "rate"]))
    // esli error   
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "validatsiyadan otmadi",
                        target: error.details[0].path,
                        error
                    }
                )
        )
    }
    if (!mongoose.Types.ObjectId.isValid(value._id)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "validatsiyadan otmadi",
                        target: "_id",
                    }
                )
        )
    }

    const classes = await ClassesSchema.findById(value._id).lean()

    if (!classes) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "gurux topilmadi qandaydir hatolik sodir bolganga oxshaydi qayta urunib koring yoki sahifani yangilang!",
                    }
                )
        )
    }

    if (classes.class_BusinesmenID._id.toString() != req.id.toString()) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "sizga tegishli bolmagan guruxni ozgartirishga harakatni aniqladik iltimos ushbu harakatni takror qilmang!",
                    }
                )
        )
    }
    if (classes.class_rate == value.rate) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: `${classes.class_name} guruxida shundoqham ${classes.class_rate} bali turipti agar bahoyingiz shu bolsa qayta qoysih shart emas !`
                    }
                )
        )
    }

    await ClassesSchema.findByIdAndUpdate(value._id, { $set: { class_rate: value.rate } })
    res
        .status(200)
        .json(
            {
                status: "success",
                message: "gurux azolariga rag'batlantirish xati jonatildi!"
            }
        )

    events.emit("rate", _.pick(classes, ["_id"]))
})

/*
    * -----     route         =>   businesmen/classes/remove_student           -------
    * -----     method        =>   POST                                        -------
    * -----     description   =>   remove student only target course           -------
    * -----     whoami        =>   businesmen                                  -------
*/

router.post("/remove_student", async (req, res) => {
    const { value, error } = Joi.object({ studentId: Joi.string().required(), classId: Joi.string().required() }).validate(_.pick(req.body, ["studentId", "classId"]))
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "validatsiyadan otmadi oquvchi yoki gurux malumotlari togri emas",
                        target: error.details[0].path,
                        error
                    }
                )
        )
    }
    if (!mongoose.Types.ObjectId.isValid(value.studentId) && !mongoose.Types.ObjectId.isValid(value.studentId)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "yaroqsiz malumotlar"
                    }
                )
        )
    }


    const classes = await ClassesSchema.findById(value.classId)

    if (!classes) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: ["gurux topilmadi malumotlarda hatolik bor", "sahifani yangilib qaytadan urinib koring"]
                    }
                )
        )
    }

    if (classes.class_BusinesmenID.toString() != req.id.toString()) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "siz ozingizga tegishli bolmagan guruxni ozgartirishga harakat qildingiz"
                    }
                )
        )
    }


    const student = await StudentSchema.findById(value.studentId)
    if (!student) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "oquchi malumotlarida hatolik"
                    }
                )
        )
    }

    if (!(await classes.populate({ path: "class_studentsId", strictPopulate: false })).class_studentsId.map(std => std._id).includes(value.studentId)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: `${student.student_firstName} ${student.student_name} ${classes.class_name} da o'qimaydi`
                    }
                )
        )
    }

    await ClassesSchema.findByIdAndUpdate(classes._id, { $pull: { class_studentsId: student._id } })
    await StudentSchema.findByIdAndUpdate(student._id, { $pull: { student_classesID: classes._id } })

    res
        .status(200)
        .json(
            {
                status: "success",
                message: `${student.student_firstName} ${student.student_name} ${classes.class_name} dan ochirib yuborildi`
            }
        )
})




module.exports = router