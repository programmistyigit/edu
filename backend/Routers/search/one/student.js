const { default: mongoose } = require("mongoose")
const StudentSchema = require("../../../MongoDB/Schema/StudentSchema")
const _ = require("lodash")

const router = require("express").Router()
router.get("/:id" , async (req , res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json( { status : "error" , message : "invalid search data " } )
    const userData = await StudentSchema.findById(id)
    if(!userData) return res.status(400).json( { status : "warning" , message : "user not found !" } )
        
        await userData.populate({ path :"student_classesID" , strictPopulate : false })

    const successData = _.pick(userData , ["_id" ,"student_login" , "student_name" , "student_avatar" , "student_appropriation" , "student_birthDay" , "student_firstName" , "student_classesID" , "student_rank" , "student_status"])
    res.status(200).json(successData)
})

module.exports = router