const Joi = require("joi")
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema")
const _ = require("lodash")
const router = require("express").Router()

/*
    * -----     route         =>   businesmen/paln/student                                      -------
    * -----     method        =>   POST                                                         -------
    * -----     description   =>   oquv markaz oquvchilari uchun plan                           -------
    * -----     whoami        =>   businesmen                                                   -------
*/

router.post("/student", async (req, res) => {
    const businesmen = await BusinesMenSChema.findById(req.id)
    const { error, value } = Joi.object({ plan: Joi.number().not(parseInt(businesmen.businesmen_class_student_plan)).required() }).validate(_.pick(req.body, ["plan"]))
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "boshqa qiymatni tanlang !"
                    }
                )
        )
    }
    await BusinesMenSChema.findByIdAndUpdate(req.id, { $set: { businesmen_class_student_plan: value.plan } })
    res.status(200).json({ status: "success", message: "success!" })
})


/*
    * -----     route         =>   businesmen/paln/teacher                                      -------
    * -----     method        =>   POST                                                         -------
    * -----     description   =>   oquv markaz oqituvchilari uchun plan                         -------
    * -----     whoami        =>   businesmen                                                   -------
*/

router.post("/teacher", async (req, res) => {
    const businesmen = await BusinesMenSChema.findById(req.id)
    const { error, value } = Joi.object({ plan: Joi.number().not(parseInt(businesmen.businesmen_class_teacher_plan)).required() }).validate(_.pick(req.body, ["plan"]))
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "boshqa qiymatni tanlang !"
                    }
                )
        )
    }
    await BusinesMenSChema.findByIdAndUpdate(req.id, { $set: { businesmen_class_teacher_plan: value.plan } })
    res.status(200).json({ status: "success", message: "success!" })
})
module.exports = router