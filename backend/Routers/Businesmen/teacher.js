const { default: mongoose } = require("mongoose")
const TeacherSchema = require("../../MongoDB/Schema/TeacherSchema")
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema")
const Teacherevents = require("../../utils/sendNotification/businesmen/teacherEvents")

const router = require("express").Router()

/*
    * -----     route         =>   businesmen/teacher/add            -------
    * -----     method        =>   POST                              -------
    * -----     description   =>   uztozni qoshish                   -------
    * -----     whoami        =>   businesmen                        -------
*/

router.post("/add", async (req, res) => {
    const id = req.body.id
    if (!id) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "tizim validatsiya hatoligiga uchradi sahifani yangilab qayta urunib koring!"
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
                        message: "yaroqsiz malumotlar jonatilgan iltimos boshqattan urunib koring!"
                    }
                )
        )
    }

    const teacher = await TeacherSchema.findById(id).lean()
    if (!teacher) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "siz belgilagan mutahasisni bazadan topa olmadik"
                    }
                )
        )
    }

    const businesmen = await BusinesMenSChema.findById(req.id)
    const teacherIDlist = businesmen.businesmen_followTeacherId.map(e => e._id.toString())
    if (!teacherIDlist.includes(id)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "bu mutahasis sizning oquv markazingizga murojat qoldirmagan"
                    }
                )
        )
    }

    await BusinesMenSChema.findByIdAndUpdate(req.id, { $push: { businesmen_teachersID: teacher._id }, $pull: { businesmen_followTeacherId: teacher._id } })
    if(!teacher.teacher_follow_businesmen.map(e=>e._id.toString()).includes(id.toString())){
        await TeacherSchema.findByIdAndUpdate(id , {$push : { teacher_follow_businesmen : businesmen._id}})
    }
    res
        .status(200)
        .json(
            {
                status: "success",
                message: "tizim mutahasisning malumotlarini markazingiz malumotlariga qoshib qoydi!"
            }
        )

    Teacherevents.emit("add", _.pick(teacher, "_id"))
})


/*
    * -----     route         =>   businesmen/teacher/delete         -------
    * -----     method        =>   Delete                            -------
    * -----     description   =>   uztozni o'chirish                 -------
    * -----     whoami        =>   businesmen                        -------
*/


router.delete("/delete", async (req, res) => {
    const id = req.body.id
    if (!id) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "tizim validatsiya hatoligiga uchradi sahifani yangilab qayta urunib koring!"
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
                        message: "yaroqsiz malumotlar jonatilgan iltimos boshqattan urunib koring!"
                    }
                )
        )
    }

    const businesmen = await BusinesMenSChema.findById(req.id).lean()
    const teacherIDlist = businesmen.businesmen_teachersID.map(e => e._id)

    if (!teacherIDlist.includes(id)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "ushbu siz korsatgan mutahasisni ochirib yuborish uchun avval u sizdan royhatdan otishi kerak!"
                    }
                )
        )
    }

    const teacher = await TeacherSchema.findById(id).lean()
    if (!teacher) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "siz belgilagan mutahasisni bazadan topa olmadik"
                    }
                )
        )
    }

    await BusinesMenSChema.findByIdAndUpdate(req.id, { $pull: { businesmen_teachersID: teacher._id } })
    Teacherevents.emit("delete", _.pick(teacher, ["_id"]))

})


module.exports = router