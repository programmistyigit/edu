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
                        error:"no auth"
                    }
                )
        )
    }

    try {
        const MotherDataIsJson = ReGenerateToken(cookie)
        const MotherIsDB = await MotherSchema.findById(MotherDataIsJson._id)
        if (!MotherIsDB || MotherDataIsJson.name != MotherIsDB?.name) {
            return (
                res
                    .status(400)
                    .JSON(
                        {
                            status: "error",
                            message: "yaroqsiz authentication malumotlari",
                            error:"no auth"
                        }
                    )
            )
        }

        next()


    } catch (error) {
        throw error
    }

}
module.exports = middlewareMother