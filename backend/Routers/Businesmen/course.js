const { default: mongoose } = require("mongoose")
const CoursesSchema = require("../../MongoDB/Schema/CoursesSchema")
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema")

const router = require("express").Router()


/*
    * -----     route         =>   businesmen/cours/follow          -------
    * -----     method        =>   POST                             -------
    * -----     description   =>   follow cours                     -------
    * -----     whoami        =>   businesmen                       -------
*/

router.post("/follow" , async ( req , res ) => {
    const {id} = req.body
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"error",
                        message:"fan togri tanlanmagan !"
                    }
                )
        )
    }

    const cours = await CoursesSchema.findById(id)
    if(!cours){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"fan topilmadi ! nimadur hato boshqattan urunib koring !"
                    }
                )
        )
    }

    const businesmen = await BusinesMenSChema.findById(req.id)
    if(businesmen.businesmen_course.map(e=>e._id.toString()).includes(id)){
        return (
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:`${cours.cours_name} fani sizda allaqachon mavjud !`
                    }
                )
        )
    }

    await CoursesSchema.findByIdAndUpdate(id , { $push : { cours_follow_businesmen : req.id } } )
    await BusinesMenSChema.findByIdAndUpdate(req.id  , { $push : { businesmen_course : cours._id } } )

    res
        .status(200)
        .json(
            {
                status:"success",
                message:`${cours.cours_name} sizning malumotlaringizga biriktirildi !`
            }
        )
})


/*
    * -----     route         =>   businesmen/cours/unfollow          -------
    * -----     method        =>   POST                               -------
    * -----     description   =>   unfollow cours                     -------
    * -----     whoami        =>   businesmen                         -------
*/
router.post("/unfollow" , async ( req, res ) => {
    const { id } = req.body
    if( !id || !mongoose.Types.ObjectId.isValid(id) ) {
        return(
            res
                .status(400)
                .json(
                    {
                        status:"error",
                        message:"malumot yoq yoki hato malumot jonatilgan !"
                    }
                )
        )
    }

    const course = await CoursesSchema.findById(id)
    if( !course ) {
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"fan topilmadi nimadur hato , qayta urunib koring !"
                    }
                )
        )
    }

    const businesmen = await BusinesMenSChema.findById(req.id)
    if( !businesmen.businesmen_course.map(crs=> crs._id.toString()).includes(course._id.toString())){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:`${course.cours_name} fani sizda shundoqham yoq !`
                    }
                )
        )
    }

    await businesmen.populate({path : "businesmen_classesID" , strictPopulate:false})
    if(businesmen.businesmen_classesID.map(e=>e.class_groupSpase).includes(course.cours_name)){
        return(
            res
                .status(200)
                .json(
                    {
                        status:"warning",
                        message:`${course.cours_name} fanini ochirish uchun ushbu yonalishda gurux mavjud bolmasligi kerak!`
                    }
                )
        )
    }
    await BusinesMenSChema.findByIdAndUpdate(req.id , { $pull : { businesmen_course : course._id } } )
    await CoursesSchema.findByIdAndUpdate(course._id , { $pull : { cours_follow_businesmen : req.id } } )
    res
        .status(200)
        .json(
            {
                status:"success",
                message:`${course.cours_name} fani sizning malutmotlaringizdan olindi !`
            }
        )
})

module.exports = router