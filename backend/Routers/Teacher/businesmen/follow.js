const { default: mongoose } = require("mongoose")
const BusinesMenSChema = require("../../../MongoDB/Schema/BusinesMenSChema")

const router = require("express").Router()

/*
    * -----     route         =>   /teacher/businesmen/follow?:id                                       -------
    * -----     method        =>   get                                                          -------
    * -----     description   =>   oquv markazga ustoz sifatida boglanish      -------
    * -----     whoami        =>   teacher                                                 -------
*/

router.get("/:id" , async ( req, res ) => {
    const id = req.params.id
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return (
            res
                .status(400)
                .json(
                    {
                        status:"error",
                        message:"yaroqsiz malumotlar"
                    }
                )
        )
    }

    const businesmen = await BusinesMenSChema.findById(id)
    if(!businesmen) {
        return (
            res
                .status(400)
                .json(
                    {
                        status:"error",
                        message:["oquv markazi toplimadi!" , "sahifani yangilang!"]
                    }
                )
        )
    }

    const listFollowTeacherId = businesmen.businesmen_followTeacherId.map(e=>e._id.toString())
    if(listFollowTeacherId.includes(req.id.toString())){
        return (
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:["siz ushbu amalni oldinham bajargansiz" ," iltimos oquv markazini javobini kuting"]
                    }
                )
        )
    }
    const h = await BusinesMenSChema.findByIdAndUpdate(id , { $push : { businesmen_followTeacherId : req.id} } , {new : true})
    res
        .status(200)
        .json(
            {
                status:"success",
                message:"arizangiz jonatildi!"
            }
        )

    
})

module.exports = router