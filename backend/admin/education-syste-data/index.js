
const router = require("express").Router()
const getRouter = require("./get")

/*
    * -----     route         =>   admin/education-system-data/get          -------
    * -----     method        =>   *                                      -------
    * -----     description   =>   education-system-data get      -------
    * -----     whoami        =>   admin                                    -------
*/

router.use("/get" , getRouter)







module.exports = router