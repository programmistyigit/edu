const { default: mongoose } = require("mongoose")
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
                        error: "no auth"
                    }
                )
        )
    }

    const StudentDataIsJson = ReGenerateToken(cookie)
    if (!mongoose.Types.ObjectId.isValid(StudentDataIsJson._id)) {
        return (
            res
                .clearCookie("auth")
                .status(400)
                .json(
                    {
                        status: "error",
                        message: "cookie hatoligi!"
                    }
                )
        )
    }
    const StudentIsDB = await StudentSchema.findById(StudentDataIsJson._id)
    if (!StudentIsDB || StudentDataIsJson.student_name != StudentIsDB?.student_name) {
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
    req.id = StudentIsDB._id
    next()
}
module.exports = middlewareStudent