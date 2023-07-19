const Joi = require("joi")
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema")
const _ = require("lodash")
const { default: mongoose } = require("mongoose")
const router = require("express").Router()


/*
    * -----     route         =>   businesmen/space/add          -------
    * -----     method        =>   POST                          -------
    * -----     description   =>   add space                     -------
    * -----     whoami        =>   businesmen                    -------
*/

router.post("/add", async (req, res) => {
    const allFollowCours = await BusinesMenSChema.findById(req.id)
    await allFollowCours.populate({ path: "businesmen_course", strictPopulate: false })
    const { value, error } = Joi.object({ space_name: Joi.string().valid(...allFollowCours.businesmen_course.map(crs => crs.cours_name.toString())).not(...allFollowCours.businesmen_course_space.map(e => e.space_name)).required(), money_value: Joi.string().required() }).validate(_.pick(req.body, ["space_name", "money_value"]))
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "malumotlarda hatolik !",
                        target: error.details[0].path,
                        error
                    }
                )
        )
    }

    await BusinesMenSChema.findByIdAndUpdate(req.id, { $push: { businesmen_course_space: value } })

    res
        .status(200)
        .json(
            {
                status: "success",
                message: `${value.space_name} fani ${value.money_value} narhda yo'riqnoma malumotlariga qoshib qoyildi !`
            }
        )
})


/*
    * -----     route         =>   businesmen/space/delete      -------
    * -----     method        =>   DELETE                              -------
    * -----     description   =>   delete space                     -------
    * -----     whoami        =>   businesmen                       -------
*/

router.delete("/delete", async (req, res) => {

    const businesmen = await BusinesMenSChema.findById(req.id)
    const { value, error } = Joi.object({ space_name: Joi.string().valid(...businesmen.businesmen_course_space.map(e => e.space_name)).required() }).validate(_.pick(req.body, ["space_name"]))
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "malumotlar hato berilgan !",
                        target: error.details[0].path,
                        error
                    }
                )
        )
    }


    const newDataSpace = businesmen.businesmen_course_space.filter(e => e.space_name == value.space_name)
    await BusinesMenSChema.findByIdAndUpdate(req.id, { $set: { businesmen_course_space: newDataSpace } })

    res
        .status(200)
        .json(
            {
                status: "success",
                message: `${value.space_name} fani yoriqnomadan ochirildi !`
            }
        )
})


/*
    * -----     route         =>   businesmen/space/edit      -------
    * -----     method        =>   PUT                              -------
    * -----     description   =>   edit space                     -------
    * -----     whoami        =>   businesmen                       -------
*/

router.put("/edit", async (req, res) => {
    const businesmen = await BusinesMenSChema.findById(req.id)
    await businesmen.populate({ path: "businesmen_course", strictPopulate: false })
    const { value, error } = Joi.object(
        {
            target: Joi.string().valid(...businesmen.businesmen_course_space.map(e => e.space_name)).required(),
            space_name: Joi
                .string()
                .valid(...businesmen.businesmen_course.map(e => e.class_name))
                .not(...businesmen.businesmen_course_space.map(e => e.space_name))
                .required(),
            money_value: Joi.string().required()
        }
    ).validate(_.pick(req.body, ["target", "space_name", "money_value"]))

    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "validatsiya hatoligi malumotlarni tekshirib qayta urunib koring !"
                    }
                )
        )
    }

    if (!businesmen.businesmen_course_space.map(e => e.space_name).includes(value.target)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: `sizda ${value.target} fani yoriqnomada topilmadi !`
                    }
                )
        )
    }


    const newCourseSpaceData = businesmen.businesmen_course_space.map((e) => {
        if (e.space_name == value.target) {
            return _.pick(value, ["space_name", "money_value"])
        }
        return e
    })

    await BusinesMenSChema.findByIdAndUpdate(req.id, { $set: { businesmen_course_space: newCourseSpaceData } })
    res
        .status(200)
        .json(
            {
                status: "success",
                message: `${value.target} fani malumotlari, nomi ${value.space_name} ga narhi ${value.money_value}ga ozgartirildi !`
            }
        )
})
module.exports = router