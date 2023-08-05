const { Router }    = require("express");
const login         = require("./auth/login")
const singup        = require("./auth/singup")

const router = Router()
router.use("/login", login)
router.use("/singup", singup)


module.exports = router