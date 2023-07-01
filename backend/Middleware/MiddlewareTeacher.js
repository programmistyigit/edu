const TeacherSchema = require("../MongoDB/Schema/TeacherSchema")
const { ReGenerateToken } = require("../jwt/jsonwebtoken")

const middlewareTeacher = async (req, res, next) => {
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
        const TeacherDataIsJson = ReGenerateToken(cookie)
        const TeacherIsDB = await TeacherSchema.findById(TeacherDataIsJson._id)
        if (!TeacherIsDB || TeacherDataIsJson.name != TeacherIsDB?.name) {
            return (
                res
                    .status(400)
                    .JSON(
                        {
                            status: "error",
                            message: "yaroqsiz authentication malumotlari",
                            error:"noi auth"
                        }
                    )
            )
        }

        next()


    } catch (error) {
        throw error
    }

}
module.exports = middlewareTeacher