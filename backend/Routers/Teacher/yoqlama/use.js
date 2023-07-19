const { default: mongoose } = require("mongoose")
const ClassesSchema = require("../../../MongoDB/Schema/ClassesSchema")

const yoqlamanMiddleware = async ( req , res , next ) => {
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
    if(classes.class_status.status != "success"){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"warning",
                        message:`${classes.class_name} guruxi hali boshlanmagan unga yoqlama qilish ochilmagna ! `
                    }
                )
        )
    }

    next()
    
} 


module.exports = yoqlamanMiddleware