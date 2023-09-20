const { default: mongoose } = require("mongoose")
const BusinesMenSChema = require("../../../MongoDB/Schema/BusinesMenSChema")
const Joi = require("joi")
const TeacherSchema = require("../../../MongoDB/Schema/TeacherSchema")
const _ = require("lodash")
const router = require("express").Router()

/*
    * -----     route         =>   /teacher/businesmen/follow?:id                                       -------
    * -----     method        =>   get                                                          -------
    * -----     description   =>   oquv markazga ustoz sifatida boglanish      -------
    * -----     whoami        =>   teacher                                                 -------
*/

router.get("/:id" , async ( req, res ) => {
    const teacher = await TeacherSchema.findById(req.id)
    const { value , error } = Joi.object({id : Joi.string().not(...teacher.teacher_follow_businesmen.map(e=>e._id.toString())).required()}).validate(_.pick(req.params , ["id"]))
    if(error){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"error",
                        message:"yaroqsiz malumotlar jonatilgan yoki bu oquv markaz sizni arizangizni qabul qilib bolishgan"
                    }
                )
        )
    }

    const businesmen = await BusinesMenSChema.findById(value.id)
    if(!businesmen.businesmen_followTeacherId.map(e=>e._id.toString()).includes(req.id)){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:`siz ${businesmen.businesmen_companyName} oquvmarkaziga ariza jonatmagansiz`
                    }
                )
        )
    }

    await BusinesMenSChema.findByIdAndUpdate(value.id , { $pull : { businesmen_followTeacherId : req.id } } )
    res
        .status(200)
        .json(
            {
                status:"success",
                message:`${businesmen.businesmen_companyName} oquv markaziga yuborilgan arizangiz bekor qilindi !`
            }
        )

})

module.exports = router