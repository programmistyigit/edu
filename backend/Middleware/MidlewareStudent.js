const { ReGenerateToken } = require("../jwt/jsonwebtoken")
const StudentSchema = require("../MongoDB/Schema/StudentSchema")

const middlewareStudent = async (req, res, next) => {
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
        const StudentDataIsJson = ReGenerateToken(cookie)
        const StudentIsDB = await StudentSchema.findById(StudentDataIsJson._id)
        if (!StudentIsDB || StudentDataIsJson.name != StudentIsDB?.name) {
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
module.exports = middlewareStudent