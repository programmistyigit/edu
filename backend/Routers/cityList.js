const router = require("express").Router()
const DataCityList = require("../utils/cityList")
router.get("/" , (req, res) => {
    res.status(200).json({data : DataCityList})
})

module.exports = router