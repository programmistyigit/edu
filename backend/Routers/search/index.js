const { Router } = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

// Import your MongoDB schemas here
const businessSchema = require("../../MongoDB/Schema/BusinesMenSChema");
const ClassesSchema = require("../../MongoDB/Schema/ClassesSchema");
const CoursesSchema = require("../../MongoDB/Schema/CoursesSchema");
const MessagesSchema = require("../../MongoDB/Schema/MessageSchema");
const MothersSchema = require("../../MongoDB/Schema/MotherSchema");
const NotificationsSchema = require("../../MongoDB/Schema/NotificationSchema");
const StudentsSchema = require("../../MongoDB/Schema/StudentSchema");
const TeachersSchema = require("../../MongoDB/Schema/TeacherSchema");

const routes = Router();

// Define a mapping of schema names to human-readable names
const schemaNames = {
  businessSchema: "Businesses",
  ClassesSchema: "Classes",
  CoursesSchema: "Courses",
  MessagesSchema: "Messages",
  MothersSchema: "Mothers",
  NotificationsSchema: "Notifications",
  StudentsSchema: "Students",
  TeachersSchema: "Teachers",
};

routes.post("/over/search", async (req, res) => {
  try {
    const { error, value } = Joi.object({
      value: Joi.string().max(20).required(),
    }).validate(req.body);

    if (error) {
      return res.status(400).json({ status: "warning", message: error.details[0].message });
    }

    const searchResults = [];

    // Create an array of collections to search
    const collections = [
      { model: businessSchema, name: "businesses" },
      { model: ClassesSchema, name: "classes" },
      { model: CoursesSchema, name: "courses" },
      { model: MessagesSchema, name: "messages" },
      { model: MothersSchema, name: "mothers" },
      { model: NotificationsSchema, name: "notifications" },
      { model: StudentsSchema, name: "students" },
      { model: TeachersSchema, name: "teachers" },
    ];

    // Use aggregation to search across all collections
    for (const collection of collections) {
      const model = collection.model;
      const name = collection.name;

      const result = await model.aggregate([
        {
          $match: {
            $or: [
              // Specify the fields you want to search in here
              { fieldName1: { $regex: new RegExp(value.value, "i") } },
              { fieldName2: { $regex: new RegExp(value.value, "i") } },
              // Add more fields as needed
            ],
          },
        },
      ]);

      if (result.length > 0) {
        searchResults.push({
          collection: schemaNames[name],
          data: result,
        });
      }
    }

    res.json({ status: "success", data: searchResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server Error" });
  }
});

module.exports = routes;
