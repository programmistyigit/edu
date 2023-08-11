const { Router } = require("express");
const post = require("./yoqlama/post");
const yoqlamanMiddleware = require("./yoqlama/use");
const router = Router()
/*
    * -----     route         =>   techer/yoqlama/submit/:id                   -------
    * -----     method        =>   POST GET PUT                                 -------
    * -----     description   =>   oquvchilarni yoqlama qilish                  -------
    * -----     whoami        =>   teacher                                      -------
*/

router.route("/submit/:id").all(yoqlamanMiddleware)
    .post(post)

module.exports = router