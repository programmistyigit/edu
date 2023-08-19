const { Router } = require("express");
const messageValidate = require("../../validation/Routers/Businesmen/message/student");
const _ = require("lodash");
const studentEvents = require("../../utils/message/businesmen/student")
const { default: mongoose } = require("mongoose");
const StudentSchema = require("../../MongoDB/Schema/StudentSchema");
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema");
const MessageSchema = require("../../MongoDB/Schema/MessageSchema");
const ClassesSchema = require("../../MongoDB/Schema/ClassesSchema");
const router = Router()
/*
    * -----     route         =>   businesmen/students/message           -------
    * -----     method        =>   POST                                  -------
    * -----     description   =>   send message to student               -------
    * -----     whoami        =>   businesmen                            -------
*/

router.post("/message", async (req, res) => {
    const { value, error } = messageValidate.validate(_.pick(req.body, ["text", "targetUser"]))
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateErro",
                        message: "validatsiyadan otmadi",
                        target: error.details[0].path
                    }
                )
        )
    }

    if (!mongoose.Types.ObjectId.isValid(value.targetUser.id)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: ["tanlangan oquvchini malutlaridan hatolik kelib chiqdi", "sahifani yangilab qayta urunib koring!"]
                    }
                )
        )
    }

    const student = await StudentSchema.findById(value.targetUser.id).lean()
    if (!student) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: ["ushbu belgilangan oquvchi tizimdan topilmadi hatolik sababi aniq emas", "sahifani yangilab qayta urinib koring!"]
                    }
                )
        )
    }


 
})

/*
    * -----     route         =>   businesmen/students/delete              -------
    * -----     method        =>   delete                                  -------
    * -----     description   =>   delete student                          -------
    * -----     whoami        =>   businesmen                              -------
*/

router.delete("/delete", async (req, res) => {
    const id = req.body.id
    if (!id || mongoose.Types.ObjectId.isValid(id)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "oquvchi malumotlarida hatolik aniqlandi iltimos qayta urunib koring"
                    }
                )
        )
    }

    const businesmen = await BusinesMenSChema.findById(req.id).populate({ path: "businesmen_classesID", strictPopulate: false })
    const studentsIDlist = Array(0).concat(...businesmen.businesmen_classesID.map(clas => clas.class_studentsId.map(s => s._id)))

    if (!studentsIDlist.includes(id)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "ushbu oquvchi sizning oquv markazingizga tegishli emas yoki yaqindagina oqishni tark etgan!"
                    }
                )
        )
    }

    const classes = businesmen.businesmen_classesID
    const submitClassID = []
    classes.forEach(async (clas) => {
        if (clas.studentsId.includes(id)) {
            submitClassID.push(clas._id)
            await ClassesSchema.findByIdAndUpdate(clas._id, { $pull: { class_studentsId: id } })
        }
    })

    res
        .status(200)
        .json(
            {
                status: "status",
                message: "oquvchi oquv markaz malumotlaridan ochirildi",
                submitClassID
            }
        )

    studentEvents.emit("delete", { _id: id, classesID: submitClassID })
})



module.exports = router
