const { default: mongoose } = require("mongoose")
const CoursesSchema = require("../../../MongoDB/Schema/CoursesSchema")

const router = require("express").Router()
router.get("/:id" , async (req, res) =>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json( { status : "error" , message : "invalid space id" } )
    const space = await CoursesSchema.findById(id)
    if(!space) return res.status(400).json({ status : "warning" , message : " space not found !" } )
    res.status(200).json( { status : "success" , data : space})
})

module.exports = router