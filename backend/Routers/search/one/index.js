const router = require("express").Router()
const studentSearchRouter = require("./student")
const spaceSearchRouter = require("./space")

router.use("/student" , studentSearchRouter)
router.use("/space" , spaceSearchRouter)


module.exports = router