
const express = require("express");
const sharp = require('sharp');
const uuid = require("uuid").v4; // Import and use uuid
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
const ClassesSchema = require("../../MongoDB/Schema/ClassesSchema");
const { default: mongoose } = require("mongoose");
const host = process.env.HOST
const router = express.Router();

router.put("/mother/image", middlewareMother, async (req, res) => {
    const id = req.id;
    const findMother = await MotherSchema.findOne(id);

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    const uploadedFile = req.files.mother_avatar; // "uploadedFile" is the name of the file input field in your HTML form

    // Generate a unique filename using uuid
    const uniqueFilename = uuid() + "." + uploadedFile.name.split(".").pop(); // Adds UUID to the original file extension

    // Specify where the uploaded file should be saved with the unique filename
    const uploadPath = "uploads/" + uniqueFilename;

    uploadedFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        // Resize and limit the image size to 5 MB
        sharp(uploadPath)
            .resize(300, 400)
            .toFile(uploadPath, (sharpErr, info) => {
                if (sharpErr) {
                    return res.status(500).send(sharpErr);
                }

                // Check the file size
                if (info.size > 5 * 1024 * 1024) {
                    // If the resized image is larger than 5 MB, you can handle this case as needed
                    return res.status(400).send("Image size is too large.");
                }

                const imageUrl = `${host}/images/${uniqueFilename}`;
        findMother.mother_avatar = imageUrl;
                findMother.save()
                    .then(() => {
                        res.json({ message: "File uploaded with unique filename: " + uniqueFilename });
                    })
                    .catch((dbErr) => {
                        res.status(500).send(dbErr);
                    });
            });
    });
});

router.put("/businesmen/classes", middlewareBusinesmen , async (req, res) => {
    const id = req.id
    const classessId = req.body._id
    if(!mongoose.Types.ObjectId.isValid(classessId)) return res.status(400).json( { status : "error" , message : "invalid class id !"})
    const classes = await ClassesSchema.findById(classessId)
    if(!classes) return res.status(400).json({ status : "warning" , message : "class not found"})
    if(classes.class_BusinesmenID.toString() != id) return res.status(400).json( { status :"warning" , message : "forbidden attempt"})

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }
    const uploadedFile = req.files.classes_avatar;
    if(!uploadedFile) return res.status(400).json( { status : "error" , message : "file not found"})
    const uniqueFilename = uuid() + "." + uploadedFile.name.split(".").pop(); // Adds UUID to the original file extension
    uploadedFile.mv("uploads/" + uniqueFilename)
    sharp(uploadedFile.data)
        .resize(400, 300)
        .toFile("uploads/" + uniqueFilename, (err, info) => {
            if (err) {
                return res.status(500).send(err);
            }

            // Check the file size
            if (info.size > 5 * 1024 * 1024) {
                // If the resized image is larger than 5 MB, you can handle this case as needed
                return res.status(400).send("Image size is too large.");
            }
        });
        const imageUrl = `${host}/images/${uniqueFilename}`;
        classes.class_avatar = imageUrl
        await classes.save()
        res.status(200).json( { status: "success" , message : "avatar uploaded" , url : imageUrl , class: _.pick(classes , ["_id" , "class_name"])})
})

router.put("/student/image", middlewareStudent, async (req, res) => {
    const id = req.id
    const findStudent = await StudentSchema.findOne(id);

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    const uploadedFile = req.files.student_avatar; // "uploadedFile" is the name of the file input field in your HTML form

    // Generate a unique filename using uuid
    const uniqueFilename = uuid() + "." + uploadedFile.name.split(".").pop(); // Adds UUID to the original file extension

    uploadedFile.mv("uploads/" + uniqueFilename)
    sharp(uploadedFile.data)
        .resize(400, 300)
        .toFile("uploads/" + uniqueFilename, (err, info) => {
            if (err) {
                return res.status(500).send(err);
            }

            // Check the file size
            if (info.size > 5 * 1024 * 1024) {
                // If the resized image is larger than 5 MB, you can handle this case as needed
                return res.status(400).send("Image size is too large.");
            }
        });
        const imageUrl = `${host}/images/${uniqueFilename}`;
        findStudent.student_avatar = imageUrl;
    await findStudent.save();
    return res.json({message:"Welcome success!"});
});



router.put("/teacher/image", middlewareTeacher, async (req, res) => {
    const id = req.id;
    const findTeacher = await TeacherSchema.findOne(id);

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    if (!req.files.teacher_avatar) {
        return res.status(400).send("File name must be teacher_avatar.");
        
    }
    const uploadedFile = req.files.teacher_avatar; // "uploadedFile" is the name of the file input field in your HTML form

    // Generate a unique filename using uuid
    const uniqueFilename = uuid() + "." + uploadedFile.name.split(".").pop(); // Adds UUID to the original file extension

    // Specify where the uploaded file should be saved with the unique filename
    const uploadPath = "uploads/" + uniqueFilename;

    // Resize and limit the image size to 5 MB
    sharp(uploadedFile.data)
        .resize(300, 400)
        .toFile(uploadPath, (err, info) => {
            if (err) {
                return res.status(500).send(err);
            }

            // Check the file size
            if (info.size > 5 * 1024 * 1024) {
                // If the resized image is larger than 5 MB, you can handle this case as needed
                return res.status(400).send("Image size is too large.");
            }

            // Update the teacher's avatar field in the database
            findTeacher.teacher_avatar = uniqueFilename;
            findTeacher.save()
                .then(() => {
                    res.json({ message: "Welcome success!" });
                })
                .catch((dbErr) => {
                    res.status(500).send(dbErr);
                });
        });
});


module.exports = router;
