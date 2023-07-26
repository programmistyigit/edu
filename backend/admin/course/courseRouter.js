const Joi = require("joi")
const _ = require('lodash')
const CoursesSchema = require("../../MongoDB/Schema/CoursesSchema")
const { default: mongoose } = require("mongoose")
const reverse_obj = require("../../utils/reverse/in_bazaSchema_object")
const router = require("express").Router()


/*
    * -----     route         =>   admin/cours/               -------
    * -----     method        =>   GET                        -------
    * -----     description   =>   Get all cours              -------
    * -----     whoami        =>   admin                      -------
*/
router.get("/" , async ( req , res ) => {
    const allCourse = await CoursesSchema.find().lean()
    res.status(200).json( { status : "success" , data : allCourse} )
})

/*
    * -----     route         =>   admin/cours/                -------
    * -----     method        =>   POST                        -------
    * -----     description   =>   add cours                   -------
    * -----     whoami        =>   admin                       -------
*/
router.post("/", async (req, res) => {
    const allCourse = await CoursesSchema.find()
    const { value, error } = Joi.object({ cours_name: Joi.string().not(...allCourse.map(acrs=>acrs.cours_name.toString())).required() }).validate(_.pick(req.body, ["cours_name"]))
    if (error) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "validateError",
                        message: "validatsiya xatoligi",
                        target: error.details[0].path,
                        error
                    }
                )
        )
    }

    const newCourse = await CoursesSchema.create(value)
    res
        .status(200)
        .json({ status: "success", message: "yangi fan qoshildi !", data: newCourse })

})



/*
    * -----     route         =>   admin/cours/                -------
    * -----     method        =>   DELETE                      -------
    * -----     description   =>   delete cours                -------
    * -----     whoami        =>   admin                       -------
*/
router.delete("/", async (req, res) => {
    const { id } = req.body
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "malumotlar hato kiritilgan qayta urunib koring !"
                    }
                )
        )
    }
    const course = await CoursesSchema.findById(id)


    if (!course) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: "fan topilmadi !"
                    }
                )
        )
    }

    if(course.cours_follow_businesmen.length > 0 || course.cours_follow_teacher.length > 0){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:`${course.cours_name} fanidan foydalanishmoqda oni ozgartirish mumkun lekin ochirib bolmaydi !`
                    }
                )
        )
    }

    await CoursesSchema.findByIdAndRemove(id)
    res
        .status(200)
        .json(
            {
                status: "success",
                message: `${course.cours_name} fani ochirib yuborildi`
            }
        )
})



/*
    * -----     route         =>   admin/cours/                -------
    * -----     method        =>   PUT                         -------
    * -----     description   =>   edit cours                  -------
    * -----     whoami        =>   admin                       -------
*/
router.put("/" , async ( req , res ) => {
    const allCourse = await CoursesSchema.find()
    const { error , value } = Joi.object({name : Joi.string().not(...allCourse.map(crs => crs.cours_name.toString())).required() , id:Joi.string().required()}).validate(_.pick(req.body , ["name" , "id"]))
    if(error){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"validateError",
                        message:"malumotlarda hatolik bor !",
                        target:error.details[0].path,
                        error
                    }
                )
        )
    }

    if(!mongoose.Types.ObjectId.isValid(value.id)){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"yaroqsiz ID !"
                    }
                )
        )
    }

    const newCourseData = reverse_obj("cours" , _.pick(value , "name"))
    const course = await CoursesSchema.findById(value.id)

    if(!course){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"fan topilmadi !"
                    }
                )
        )
    }

    await CoursesSchema.findByIdAndUpdate(value.id , { $set : newCourseData})
    res
        .status(200)
        .json(
            {
                status:"success",
                message:`${course.cours_name} fani nomi ${value.name} ga o'zgartirildi !`
            }
        )


})

module.exports = router