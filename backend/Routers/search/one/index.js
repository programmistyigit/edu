const router = require("express").Router()
const studentSearchRouter = require("./student")


router.get("/student" , studentSearchRouter)



module.exports = router