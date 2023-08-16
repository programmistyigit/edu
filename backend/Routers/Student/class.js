const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const ClassesSchema = require("../../MongoDB/Schema/ClassesSchema");
const StudentSchema = require("../../MongoDB/Schema/StudentSchema");
const events = require("../../utils/sendNotification/businesmen/startClass");

const router = Router()


/*
    * -----     route         =>   student/class/follow                -------
    * -----     method        =>   GET                                 -------
    * -----     description   =>   follow class                        -------
    * -----     whoami        =>   student                             -------
*/

router.get("/follow/:id", async (req, res) => {
    const id = req.params.id
    if (!id) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "hato urunush !"
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
                        status: "warning",
                        message: "yaroqsiz malumot yubordingiz !"
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
                        message: ["gurux topilmadi!", "balki oquv markazi bu guruxdan voz kechgandur!", "sahifadani yangilab qayta urunib koring"]
                    }
                )
        )
    }

    if (classes.class_studentsId.map(e => e._id.toString()).includes(req.id.toString())) {
        const student = await StudentSchema.findById(req.id)
        if (!student.student_classesID.map(e => e._id.toString()).includes(classes._id.toString())) {
            await StudentSchema.findByIdAndUpdate(req.id, { $push: { student_classesID: classes._id } })
        }
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: `siz allaqachon ${classes.class_name} guruxida borsiz!`
                    }
                )
        )
    }

    if (classes.class_follow_studentsId.map(e => e._id.toString()).includes(req.id.toString())) {
        const student = await StudentSchema.findById(req.id)
        if (!student.student_classesID.map(e => e._id.toString()).includes(classes._id.toString())) {
            await StudentSchema.findByIdAndUpdate(req.id, { $push: { student_classesID: classes._id } })
        }
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: `siz allaqachon ${classes.class_name} guruxiga ariza jo'natgansiz!`
                    }
                )
        )
    }
    await ClassesSchema.findByIdAndUpdate(id, { $push: { class_follow_studentsId: req.id } })


    res
        .status(200)
        .json(
            {
                status: "success",
                message: "success!",
                data: classes
            }
        )
})

/*
    * -----     route         =>   student/class/unfollow                -------
    * -----     method        =>   GET                                 -------
    * -----     description   =>   unfollow class                        -------
    * -----     whoami        =>   student                             -------
*/

router.get("/unfollow/:id", async (req, res) => {
    const id = req.params.id
    if (!id) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "hato urunush !"
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
                        status: "warning",
                        message: "yaroqsiz malumot yubordingiz !"
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
                        message: ["gurux topilmadi!", "balki oquv markazi bu guruxdan voz kechgandur!", "sahifadani yangilab qayta urunib koring"]
                    }
                )
        )
    }

    if (!classes.class_studentsId.map(e => e._id.toString()).includes(req.id.toString())) {
        if (classes.class_follow_studentsId.map(e => e._id.toString()).includes(req.id.toString())) {
            await ClassesSchema.findByIdAndUpdate(classes._id, { $pull: { class_follow_studentsId: req.id } })
            await StudentSchema.findByIdAndUpdate(req.id, { $pull: { student_classesID: classes._id } })
            return res.status(200).json({ status: "success", message: `Siz ${classes.class_name} guruxidan vos kechdingiz !`, data: classes._id })
        }
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: `Siz ${classes.class_name} guruxiga royhatga olinmagansiz!`
                    }
                )
        )
    }

    await ClassesSchema.findByIdAndUpdate(classes._id, { $pull: { class_studentsId: req.id } })
    await StudentSchema.findByIdAndUpdate(req.id, { $pull: { student_classesID: classes._id } })
    res
        .status(200)
        .json(
            {
                status: "success",
                message: `Siz ${classes.class_name} guruxidan vos kechdingiz !`,
                data: classes._id
            }
        )

})



module.exports = router