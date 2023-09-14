const Joi = require("joi")
const _ = require("lodash")
const StudentSchema = require("../../../MongoDB/Schema/StudentSchema")
const { default: mongoose } = require("mongoose")
const idValidator = Joi.custom((value , helpers) => {
    if(!mongoose.Types.ObjectId.isValid(value)){
        return helpers.error("Invalid Id")
    }
    return value
} , "mongoose objectId")
const router = require("express").Router()
router.post("/", async (req, res) => {

    try {
        const { value, error } = Joi.object({ _ids: Joi.array().items(idValidator).required() }).validate(_.pick(req.body, ["_ids"]))
        if (error) return res.status(400).json({ status: "error", message: error.details[0].message })
        const result = await StudentSchema.find({ _id: { $in: value._ids } })

        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status : "error" , message : "internal server error"})
    }

})

module.exports = router