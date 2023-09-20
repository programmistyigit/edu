const { default: mongoose } = require("mongoose")
const CoursesSchema = require("../../MongoDB/Schema/CoursesSchema")
const _ = require("lodash");
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema")
const middlewareBusinesmen = require("../../Middleware/MidlewareBusinesmen")
const libraryesSchema = require("../../MongoDB/Schema/libraryesSchema")
const Joi = require("joi")
const TeacherSchema = require("../../MongoDB/Schema/TeacherSchema")

const router = require("express").Router()



//Create library routes ***** ----- ///
router.post("/create", middlewareBusinesmen, async (req, res) => {
    const useOwn = req.id;

    const { error, value } = Joi.object({
        library_name: Joi.string().max(25).required(),
        library_course_id: Joi.string().required(),
        library_teacher_id: Joi.array().items(Joi.string()).required(), // Ensure an array of strings
    }).validate(_.pick(req.body, ['library_name', 'library_course_id', 'library_teacher_id']));

    if (error) return res.status(400).json({ status: "warning", message: error.details[0].message });

    const { library_name, library_course_id, library_teacher_id } = value;

    if (!mongoose.Types.ObjectId.isValid(library_course_id)) {
        return res.status(400).json({ message: "Course is not found", statusCode: 400 });
    }

    const findBusiness = await BusinesMenSChema.findById(useOwn)
    if (!findBusiness) return res.status(400).json({ message: "Business not found" });

    // Check if the course exists
    const findCourse = await CoursesSchema.findOne({ _id: library_course_id });

    if (!findCourse) return res.status(400).json({ message: "Course not found" });

    // Check if all teachers exist and get their IDs
    const findTeachers = await TeacherSchema.find({ _id: { $in: library_teacher_id } });

    // Check if all teacher IDs are in businessTeacherIds
    const businessTeacherIds = findBusiness.businesmen_teachersID.map(String);

    const invalidTeacherIds = library_teacher_id.filter(teacherId => !businessTeacherIds.includes(teacherId));

    if (invalidTeacherIds.length > 0) {
        return res.status(400).json({ message: "One or more teacher IDs are not in businessTeacherIds" });
    }

    if (findTeachers.length !== library_teacher_id.length) {
        // Some teachers were not found
        return res.status(400).json({ message: "One or more teachers not found" });
    }

    // Check if each teacher ID is associated with the course
    const teacherIdsAssociatedWithCourse = findCourse.cours_follow_teacher.map(String);
    const invalidTeacherIdsWithCourse = library_teacher_id.filter(teacherId => !teacherIdsAssociatedWithCourse.includes(teacherId));

    if (invalidTeacherIdsWithCourse.length > 0) {
        return res.status(400).json({ message: "One or more teachers are not associated with the course" });
    }

    const newLibrary = new libraryesSchema({
        library_name: library_name.trim(),
        library_courses: library_course_id, // Use 'library_courses' field here
        library_teacher: library_teacher_id,
        library_businesmen: useOwn,
        library_avatar: "library.png"
    });

    await newLibrary.save();

    res.status(201).json({ message: "Success" });
});

router.delete("/delete/teacher-library", middlewareBusinesmen, async (req, res) => {
    const useOwn = req.id;
    const businesmen = await BusinesMenSChema.findById(useOwn)

    const { error, value } = Joi.object({
        library_id: Joi.string().required(),
        library_teacher_id: Joi.array().items(Joi.string().valid(...businesmen.businesmen_teachersID.map(e => e.toString()))).required(),
    }).validate(_.pick(req.body, ['library_id', 'library_teacher_id']));

    if (error) return res.status(400).json({ status: "warning", message: error.details[0].message });

    const { library_teacher_id, library_id } = value;

    const findLibrary = await libraryesSchema.findById(library_id);

    if (!findLibrary) return res.status(400).json({ message: "Library not found" });

    if (findLibrary.library_businesmen.toString() != useOwn) {
        return res.status(400).json({ status: "warning", message: "Forbidden attempt" });
    }

    // Check if each teacher ID is in the library's teacher array
    const updatedLibraryTeacher = findLibrary.library_teacher.filter(
        teacherId => library_teacher_id.includes(teacherId.toString())
    );

    if (updatedLibraryTeacher.length === 0) {
        return res.status(400).json({ message: "Teacher not found in the library" });
    }


    //sss

    // Update the library with the modified teacher array
    try {
        findLibrary.library_teacher = updatedLibraryTeacher;
        await findLibrary.save();
        res.status(200).json({ message: "Teacher removed from the library successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});








//Update library routes ***** ----- ///******////////    */

module.exports = router




// end