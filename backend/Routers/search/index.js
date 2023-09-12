const { Router } = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

// Import your MongoDB schemas here
const businessSchema = require("../../MongoDB/Schema/BusinesMenSChema");
const ClassesSchema = require("../../MongoDB/Schema/ClassesSchema");
// const CoursesSchema = require("../../MongoDB/Schema/CoursesSchema");
// const MessagesSchema = require("../../MongoDB/Schema/MessageSchema");
const MothersSchema = require("../../MongoDB/Schema/MotherSchema");
// const NotificationsSchema = require("../../MongoDB/Schema/NotificationSchema");
const StudentsSchema = require("../../MongoDB/Schema/StudentSchema");
const TeachersSchema = require("../../MongoDB/Schema/TeacherSchema");
const oneSearchRouter = require("./one/index")
const routes = Router();
routes.use("/single" , oneSearchRouter)

// Define a mapping of schema names to human-readable names
// const schemaNames = {
//   businessSchema: "Businesmens",
//   ClassesSchema: "Classes",
//   CoursesSchema: "Courses",
//   MessagesSchema: "Messages",
//   MothersSchema: "Mothers",
//   NotificationsSchema: "Notifications",
//   StudentsSchema: "Students",
//   TeachersSchema: "Teachers",
// };
routes.post('/search', async (req, res) => {
  const searchText = req.body.value;

  try {
    const businessmenResults = await businessSchema.find({
      $or: [
        { businesmen_companyName: { $regex: searchText, $options: 'i' } },
        { businesmen_login: { $regex: searchText, $options: 'i' } },
      ],
    });

    const classesResults = await ClassesSchema.find({
      class_name: { $regex: searchText, $options: 'i' },
    });

    const studentsResults = await StudentsSchema.find({
      $or: [
        { student_name: { $regex: searchText, $options: 'i' } },
        { student_login: { $regex: searchText, $options: 'i' } },
      ],
    });

    const teachersResults = await TeachersSchema.find({
      $or: [
        { teacher_name: { $regex: searchText, $options: 'i' } },
        { teacher_login: { $regex: searchText, $options: 'i' } },
      ],
    });

    const results = {
      BusinessMen: businessmenResults,
      Classes: classesResults,
      Students: studentsResults,
      Teachers: teachersResults,
    };

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching.' });
  }
});

// routes.post("/over/search", async (req, res) => {
//   try {
//     const { error, value } = Joi.object({
//       value: Joi.string().max(20).required(),
//     }).validate(req.body);

//     if (error) {
//       return res.status(400).json({ status: "warning", message: error.details[0].message });
//     }

//     const searchResults = [];

//     // Create an array of collections to search
//     const collections = [
//       { model: businessSchema, name: "Businesmens" },
//       { model: ClassesSchema, name: "classes" },
//       { model: MessagesSchema, name: "messages" },
//       { model: StudentsSchema, name: "students" },
//       { model: TeachersSchema, name: "teachers" },
//     ];

//     // Use aggregation to search across all collections
//     for (let i = 0 ; i < collections.length ; i++) {
//       const model = collections[i].model;
//       const name = collections[i].name;

//       const result = await model.aggregate([
//         {
//           $match: {
//             $or: [
//               // Specify the fields you want to search in here
//               { fieldName1: { $regex: new RegExp(value.value, "i") } },
//               { fieldName2: { $regex: new RegExp(value.value, "i") } },
//               // Add more fields as needed
//             ],
//           },
//         },
//       ]);

//       if (result.length > 0) {
//         searchResults.push({
//           collection: schemaNames[name],
//           data: result,
//         });
//       }
//     }

//     res.json({ status: "success", data: searchResults });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: "error", message: "Server Error" });
//   }
// });

module.exports = routes;
