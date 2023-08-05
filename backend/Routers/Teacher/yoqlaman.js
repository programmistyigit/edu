const { Router } = require("express");
const get = require("./yoqlama/get");
const post = require("./yoqlama/post");
const yoqlamanMiddleware = require("./yoqlama/use");
const put = require("./yoqlama/put");
const router = Router()
/*
    * -----     route         =>   techer/yoqlama/submit/:id                   -------
    * -----     method        =>   POST GET PUT                                 -------
    * -----     description   =>   oquvchilarni yoqlama qilish                  -------
    * -----     whoami        =>   teacher                                      -------
*/

router.route("/submit/:id").all(yoqlamanMiddleware)
    .get(get)  
    .post(post)
    .put(put)

module.exports = router