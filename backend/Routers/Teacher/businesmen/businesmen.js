const { Router } = require("express");

const router = Router()
const followRouter = require("./follow")
const unFollowRouter = require("./unfollow")
/*
    * -----     route         =>   techer/businesmen/follow*                                       -------
    * -----     method        =>   *                                                          -------
    * -----     description   =>   oquv markazga qabul qilishi uchun sorov      -------
    * -----     whoami        =>   teacher                                                 -------
*/

router.use("/follow" , followRouter)
/*
    * -----     route         =>   techer/businesmen/unfollow*                                       -------
    * -----     method        =>   *                                                          -------
    * -----     description   =>   oquv markazga qabul qilishi uchun sorovni bekor qilish     -------
    * -----     whoami        =>   teacher                                                 -------
*/
router.use("/unfollow" , unFollowRouter)

module.exports = router