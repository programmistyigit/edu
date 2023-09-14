const routes = require("express").Router()
const studentsPostRouter = require("./student")

routes.use("/students" , studentsPostRouter)

module.exports = routes