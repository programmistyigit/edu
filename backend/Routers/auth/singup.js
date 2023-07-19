const { Router } = require("express");

const teacher = require("./singup/teacher")
const student = require("./singup/student")
const mother = require("./singup/mother")
const routes = Router();

routes.use("/teacher", teacher)
routes.use("/student", student)
routes.use("/mother", mother)

module.exports = routes;