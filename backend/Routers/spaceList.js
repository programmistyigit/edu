const CoursesSchema = require("../MongoDB/Schema/CoursesSchema")
const _ = require("lodash")
const router = require("express").Router()
router.get("/" , async (req, res) => {
    const data = await CoursesSchema.find().lean()
    console.log(data);
    res.status(200).json({data: data.length > 0 ? data.map(e=> (_.pick(e , ["_id" , "cours_name"]))) : ["empty"]})
})
module.exports = router