const { default: mongoose } = require("mongoose")
const { ReGenerateToken } = require("../jwt/jsonwebtoken")
const MotherSchema = require("../MongoDB/Schema/MotherSchema")

const middlewareMother = async (req, res, next) => {
    const cookie = req.cookies?.auth

    if (!cookie) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "siz royhatdan otmagansiz",
                        error: "no auth"
                    }
                )
        )
    }

    const MotherDataIsJson = ReGenerateToken(cookie)
    if(!mongoose.Types.ObjectId.isValid(MotherDataIsJson._id)){
        return (
            res
                .clearCookie("auth")
                .status(400)
                .json(
                    {
                        status:"error",
                        message:"cookie hatoligi!"
                    }
                )
        )
    }
    const MotherIsDB = await MotherSchema.findById(MotherDataIsJson._id)

    if (!MotherIsDB || MotherDataIsJson.mother_login != MotherIsDB.mother_login) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "yaroqsiz authentication malumotlari",
                        error: "no auth"
                    }
                )
        )
    }

    req.id = MotherIsDB._id
    next()



}
module.exports = middlewareMother