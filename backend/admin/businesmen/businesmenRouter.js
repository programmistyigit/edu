const Joi = require("joi")
const _ = require("lodash")
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema")
const reverse_obj = require("../../utils/reverse/in_bazaSchema_object")
const { default: mongoose } = require("mongoose")

const router = require("express").Router()

/*
    * -----     route         =>   admin/businesmen/add          -------
    * -----     method        =>   POST                          -------
    * -----     description   =>   add businesmen                -------
    * -----     whoami        =>   admin                         -------
*/

router.post("/add" , async ( req , res ) => {
    const { value , error } = Joi.object( { login : Joi.string().required() , password : Joi.string().required() } ).validate(_.pick(req.body , ["login" , "password"]))
    if ( error ) {
        return (
            res
                .status(400)
                .json(
                    {
                        status:"validateError",
                        message:"malumotda kamchilik bor !",
                        target:error.details[0].path,
                        error
                    }
                )
        )
    }

    const loginIsDb = await BusinesMenSChema.findOne({ businesmen_login : value.login})
    if( loginIsDb ) {
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"bunday login mavjud !"
                    }
                )
        )
    }

    const businesmenCreatedData = reverse_obj("businesmen" , value)
    const newBusinesmen = await BusinesMenSChema.create(businesmenCreatedData)
    res
        .status(200)
        .json(
            {
                status : "success",
                message : " success !",
                data : newBusinesmen
            }
        )

})


/*
    * -----     route         =>   admin/businesmen/delete          -------
    * -----     method        =>   DELETE                           -------
    * -----     description   =>   delete businesmen                -------
    * -----     whoami        =>   admin                            -------
*/
router.delete("/delete" , async ( req , res ) => {
    const id = req.body?.id
    if(!id){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"error",
                        message:"malumot berilmagan !"
                    }
                )
        )
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"malumot xato berilgan !"
                    }
                )
        )
    }

    const businesmen = await BusinesMenSChema.findByIdAndRemove(id)
    if(!businesmen){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"oquv markazi malumotlari topilmadi !"
                    }
                )
        )
    }


    res
        .status(200)
        .json(
            {
                status:"success",
                message:`${businesmen.businesmen_companyName} malumotlari ochirildi`
            }
        )
})



/*
    * -----     route         =>   admin/businesmen/status/:id     -------
    * -----     method        =>   PUT                          -------
    * -----     description   =>   edit status businesmen               -------
    * -----     whoami        =>   admin                           -------
*/

router.put("/status/:id" ,  async ( req , res ) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id)) {
        return(
            res
                .status(400)
                .json(
                    {
                        status:"error",
                        message:"id bazaga tegishli emas!"
                    }
                )
        )
    }
    const { value , error } = Joi.object({status : Joi.string().valid("run" , "paused" , "block").required() , text : Joi.string().required()}).validate(_.pick( req.body , ["status" , "text"]))
    if( error ) {
        return (
            res
                .status(400)
                .json(
                    {
                        status :"validateError",
                        message:"malumotlar xato ekani aniqlandi !" , 
                        target:error.details[0].path,
                        error
                    }
                )
        )
    }

    const businesmen = await BusinesMenSChema.findByIdAndUpdate(req.params.id , { $set : { businesmen_status : { value } } } )

    if( !businesmen ){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:"O'quv markazi malumotlari topilmadi !"
                    }
                )
        )
    }

    res
        .status(200)
        .json(
            {
                status : "success",
                message : `${businesmen.businesmen_companyName} status holati ${value.status} ga ozgartirildi biriktirilgan habar ${value.text}`
            }
        )
})



module.exports = router