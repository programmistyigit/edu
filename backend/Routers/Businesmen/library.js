const { default: mongoose } = require("mongoose")
const CoursesSchema = require("../../MongoDB/Schema/CoursesSchema")
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema")
const middlewareBusinesmen = require("../../Middleware/MidlewareBusinesmen")
const libraryesSchema = require("../../MongoDB/Schema/libraryesSchema")
const Joi = require("joi")

const router = require("express").Router()


router.post("/create", middlewareBusinesmen,  async (req, res) => {
    const useOwn = req.id
    const {course_id, library_name} = req.body

    const { error , value } = Joi.object({
        library_name:Joi.string().required(),
        library_course_id:Joi.string(),

    }).validate(_.pick(req.body , ['library_name','library_course_id', ]));

    if(error) return res.status(400).json({ status: "warning", message: error.details[0].message});



    if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return res.status(400).json({ message: "course is not found", statusCode: 400 });
    }
    const courses = await CoursesSchema.findOne({_id: course_id})
   
   
    if(!courses) return res.status(400).json({message: "Course not found"})
   
    const newLibrary = await new libraryesSchema({
        library_name:""
    })

    
})


module.exports = router




// end