const router = require("express").Router()
const coursRouter = require("./course/courseRouter")
const businesmenRouter = require("./businesmen/businesmenRouter")
const educationSystemDataRouter = require("./education-syste-data")
/*
    * -----     route         =>   admin/education-system-data          -------
    * -----     method        =>   *                                    -------
    * -----     description   =>   education-system-data controls       -------
    * -----     whoami        =>   admin                                -------
*/

router.use("/education-system-data" , educationSystemDataRouter)

/*
    * -----     route         =>   admin/cours/*                 -------
    * -----     method        =>   *                             -------
    * -----     description   =>   control cours                 -------
    * -----     whoami        =>   admin                         -------
*/

router.use("/course" , coursRouter)


/*
    * -----     route         =>   admin/businesmen/*          -------
    * -----     method        =>   *                           -------
    * -----     description   =>   control businesmen          -------
    * -----     whoami        =>   admin                       -------
*/
router.use("/businesmen" , businesmenRouter)
                                                                  
module.exports = router