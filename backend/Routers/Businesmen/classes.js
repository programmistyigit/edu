const { Router } = require("express");
const classValidation = require("../../validation/Routers/Businesmen/classesValidation");
const _ = require("lodash");
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema");
const ClassesSchema = require("../../MongoDB/Schema/ClassesSchema");
const { default: mongoose } = require("mongoose");
const TeacherSchema = require("../../MongoDB/Schema/TeacherSchema");
const events = require("../../utils/sendNotification/businesmen/startClass");
const classRateValidate = require("../../validation/Routers/Businesmen/classRateValidate");

const router = Router()

/*
    * -----     route         =>   businesmen/classes/add     -------
    * -----     method        =>   POST                       -------
    * -----     description   =>   add class to DB            -------
    * -----     whoami        =>   businesmen                 -------
*/


router.post("/add", async (req, res) => {
    const { value, error } = classValidation.validate(_.pick(req.body, ["name", "groupSpase", "durationDays", "MoneyValue", "BigTeacherId", "maxNumberStudent", "table"]))
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "Gruh ochish uchun berilgan malumotlarida kamchilik aniqlandi",
                        target: error.details[0].path
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

    const businesmen = await BusinesMenSChema.findById(req.id).lean()
    if (!businesmen.teachersID.includes(value.BigTeacherId)) {
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

    const BigTeacher = await TeacherSchema.findById(value.BigTeacherId).lean()

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

    const create = await ClassesSchema.create({ ...value, BusinesmenID: req.id })
    await BusinesMenSChema.findByIdAndUpdate(req.id, { $push: { classesID: create._id } })
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
    * -----     route         =>   businesmen/classes/defaultstart     -------
    * -----     method        =>   put                                 -------
    * -----     description   =>   start class to DB                   -------
    * -----     whoami        =>   businesmen                          -------
*/

router.put("/defaultstart", async (req, res) => {
    const id = req.body.id
    if (!id) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validationError",
                        message: "biron bir guruh yoki class ni tanlash shart"
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
                        message: "tizim sizning amalingizda hatolik aniqladi qayta urinib koring"
                    }
                )
        )
    }


    const classes = await ClassesSchema.findByIdAndUpdate(id, { status: { status: "success", text: "started" } }, { new: true }).lean()
    if (!classes) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "siz tanlagan class tizimda topilmadi"
                    }
                )
        )
    }
    if (classes.BusinesmenID._id != req.id) {
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

    res
        .status(200)
        .json(
            {
                status: "success",
                message: ["gurux darsni boshlaydi", "Bu haqida guruxga royhatdan otgan oquvchilar va biriktirilgan Mutahasisga habar yuboriladi!"]
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

    if (classes.BusinesmenID._id != req.id) {
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

    await ClassesSchema.findByIdAndUpdate(value._id, { $set: { rate: value.rate } })
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

module.exports = router