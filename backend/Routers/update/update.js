const express = require("express");
const bcrypt = require("bcrypt");
const MotherSchema = require("../../MongoDB/Schema/MotherSchema");
const middlewareMother = require("../../Middleware/MidlewareMother");
const {GenerateToken} = require("../../jwt/jsonwebtoken"); // Assuming you have a token generation function
const Joi = require("joi");
const _ = require("lodash");
const reverse_obj = require("../../utils/reverse/in_bazaSchema_object");
const middlewareStudent = require("../../Middleware/MidlewareStudent");
const StudentSchema = require("../../MongoDB/Schema/StudentSchema");
const middlewareTeacher = require("../../Middleware/MiddlewareTeacher");
const TeacherSchema = require("../../MongoDB/Schema/TeacherSchema");
const middlewareBusinesmen = require("../../Middleware/MidlewareBusinesmen");
const BusinesMenSChema = require("../../MongoDB/Schema/BusinesMenSChema");
const libraryesSchema = require("../../MongoDB/Schema/libraryesSchema");

const router = express.Router();


/// Mother update part
router.put("/mother", middlewareMother, async (req, res) => {
    const id = req.id;

    const { error , value } = Joi.object({
        name:Joi.string().required(),
        firstName:Joi.string().required(),
        login:Joi.string().trim().lowercase().required(),
        birthDay:Joi.date().required(),
        password:Joi.string(),
    }).validate(_.pick(req.body , ['firstName','login', 'birthDay' , 'password' ,'name']));

    if(error) return res.status(400).json({ status: "warning", message: error.details[0].message});

    try {
        const findUser = await MotherSchema.findById(id);


        if (!findUser) {
            return res.status(400).json({
                status: "warning",
                message: "User not found in the database"                                     
            });
        }

        
        
        const reverseData = reverse_obj("mother" , value)
        const findNewDataUser = await MotherSchema.findOne(_.pick(reverseData , ["mother_login"]))

        if(findNewDataUser){
            if (findUser.mother_login !== findNewDataUser.mother_login) {
                return res.status(400).json({ status : "error" , message :"user details alredy exist"})
            }
        }

        if(reverseData.mother_password){
            reverseData.mother_password = await bcrypt.hash(reverseData.mother_password , 10)
        }

      

        const updateUser = await MotherSchema.findByIdAndUpdate(id,
            {
                $set: reverseData
            },
            {
                new: true
            }
        );

        if (!updateUser) {
            return res.status(404).json({
                status: "warning",
                message: "Failed to update user"
            });
        }

        const token = GenerateToken({..._.pick(updateUser , ["_id" , "mother_login" ]) , role:"mother"});

        res.cookie("auth", token, { maxAge: 60 * 60 * 24 * 1000 }); // Corrected maxAge

        res.status(200).json({
            status: "success",
            message: "Profile updated successfully"
        });
    } catch (error) {       
        res.status(500).json({
            status: "error",
            message: "Internal server error ggg",
            error: error.toString()
        });
    }
});


/// Student update part
router.put("/student", middlewareStudent, async (req, res) => {
    const id = req.id;

    const { error , value } = Joi.object({
        name:Joi.string().required(),
        firstName:Joi.string().required(),
        login:Joi.string().trim().lowercase().required(),
        phoneNumber:Joi.number().required(),
        birthDay:Joi.date().required(),
        email: Joi.string().required(),
        password:Joi.string(),
    }).validate(_.pick(req.body , ['firstName', 'login', 'birthDay' , 'password' ,'name', 'phoneNumber', 'email']));

    if(error) return res.status(400).json({ status: "warning", message: error.details[0].message});

    


    const findUser = await StudentSchema.findById(id);


    

    if (!findUser) {
        return res.status(400).json({
            status: "Warning",
            message: "User not found in the database"
        });
    }

    
    const reverseData = reverse_obj("student" , value)
    const findNewDataUser = await StudentSchema.findOne(_.pick(reverseData , ["student_login" ]))
    

    

    if(findNewDataUser){
        if (findUser.student_login!== findNewDataUser.student_login) {
            return res.status(400).json({ status : "error", message :"user details alredy exist"})
        }

    }

    if(reverseData.student_password){
        reverseData.student_password = await bcrypt.hash(reverseData.student_password , 10)
    }


    const updateUser = await StudentSchema.findByIdAndUpdate(id,
        {
            $set: reverseData
        },
        {
            new: true
        }
    );

    if (!updateUser) {
        return res.status(404).json({
            status: "warning",
            message: "Failed to update user"
        });
    }

    const token = GenerateToken({..._.pick(updateUser , ["_id" , "student_login"]) , role:"student"});

    res.cookie("auth", token, { maxAge: 60 * 60 * 24 * 1000 }); // Corrected maxAge

    res.status(200).json({
        status: "success",
        message: "Profile updated successfully"
    });
})


/// Teacher update part
router.put("/teacher", middlewareTeacher, async (req, res) => {
    const id = req.id;

    const { error , value } = Joi.object({
        name:Joi.string().required(),
        login:Joi.string().trim().lowercase().required(),
        firstName:Joi.string().required(),
        phoneNumber:Joi.number().required(),
        birthDay:Joi.date().required(),
        password:Joi.string(),
    }).validate(_.pick(req.body , ['firstName', 'login', 'birthDay' , 'password' ,'name', 'phoneNumber']));

    if(error) return res.status(400).json({ status: "warning", message: error.details[0].message});

    


    const findUser = await TeacherSchema.findById(id);

    if (!findUser) {
        return res.status(400).json({
            status: "warning",
            message: "User not found in the database"
        });
    }

    const reverseData = reverse_obj("teacher" , value)
    const findNewDataUser = await TeacherSchema.findOne(_.pick(reverseData , ["teacher_name" , "teacher_login" , "teacher_firstName" , "teacher_birthDay", "teacher_phoneNumber", "teacher_email", ]))

    if(findNewDataUser){
        if (findUser.teacher_login!== findNewDataUser.teacher_login) {
            return res.status(400).json({ status : "error", message :"user details alredy exist"})
        }
    }
    
    if(reverseData.teacher_password){
        reverseData.teacher_password = await bcrypt.hash(reverseData.teacher_password , 10)
    }
    

    const updateUser = await TeacherSchema.findByIdAndUpdate(id,
        {
            $set: reverseData
        },
        {
            new: true
        }
    );

    if (!updateUser) {
        return res.status(404).json({
            status: "warning",
            message: "Failed to update user"
        });
    }

    const token = GenerateToken({..._.pick(updateUser , ["_id" , "teacher_login"]) , role:"teacher"});

    res.cookie("auth", token, { maxAge: 60 * 60 * 24 * 1000 }); // Corrected maxAge

    res.status(200).json({
        status: "success",
        message: "Profile updated successfully"
    });
})




/// Business update part
router.put("/business", middlewareBusinesmen, async (req, res) => {
    const id = req.id;

    const { error , value } = Joi.object({
        businesmen_companyName:Joi.string().required(),
        businesmen_starTJobHours:Joi.string().trim().lowercase().required(),
        businesmen_endJobHours:Joi.string().required(),
        businesmen_class_teacher_plan:Joi.string().required(),
        businesmen_class_student_plan: Joi.string().required()
    }).validate(_.pick(req.body , ['businesmen_companyName', 'businesmen_starTJobHours', 'businesmen_endJobHours' , 'businesmen_class_teacher_plan' ,'businesmen_class_student_plan']));

    if(error) return res.status(400).json({ status: "warning", message: error.details[0].message});


    const findUser = await BusinesMenSChema.findById(id);

    if (!findUser) {
        return res.status(400).json({
            status: "warning",
            message: "User not found in the database"
        });
    }


  

    const updateUser = await BusinesMenSChema.findByIdAndUpdate(id,
        {
            $set: value
        },
        {
            new: true
        }
    );

    if (!updateUser) {
        return res.status(404).json({
            status: "warning",
            message: "Failed to update user"
        });
    }


    res.status(200).json({
        status: "success",
        message: "Profile updated successfully"
    });
})

router.put("/library", middlewareBusinesmen,  async (req, res) => {
    const useOwn = req.id
    const { error , value } = Joi.object({
        library_id:Joi.string().required(),
        library_name:Joi.string().max(25).required(),
    }).validate(_.pick(req.body , ['library_name', 'library_id']));
    

    if(error) return res.status(400).json({ status: "warning", message: error.details[0].message});
    
        
    const {library_id, library_name    } = value

    if (!mongoose.Types.ObjectId.isValid(library_id) ) {
        return res.status(400).json({ message: "course is not found", statusCode: 400 });
    }

    const findLibrary = await libraryesSchema.findById(library_id)

    if (!findLibrary) {
        return res.status(400).json({
            status: "warning",
            message: "Library not found in the database"
        });
    }

    if(findLibrary.library_businesmen.toString() != useOwn) return res.status(400).json( { status :"warning" , message : "forbidden attempt"})


    library_name ? findLibrary.library_name = library_name.trim(): findLibrary.library_name = findLibrary.library_name


    await findLibrary.save();
    

    res.status(201).json({message: "Success"})    
})





module.exports = router;
