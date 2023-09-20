const { default: mongoose } = require("mongoose")
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
    //Teacher
    
        const TeacherDataIsJson = ReGenerateToken(cookie)
        if(!mongoose.Types.ObjectId.isValid(TeacherDataIsJson._id)){
            return (
                res
                    .clearCookie("auth")
                    .status(400)
                    .json(
                        {
                            status:"error",
                            message:"cookie hatoligi! Error"
                        }
                    )
            )
        }
        const TeacherIsDB = await TeacherSchema.findById(TeacherDataIsJson._id)
        if (!TeacherIsDB || TeacherDataIsJson.teacher_login != TeacherIsDB?.teacher_login) {
            return (
                res
                    .status(400)
                    .json(
                        {
                            status: "error",
                            message: "yaroqsiz authentication malumotlari",
                            error:"no auth"
                        }
                    )
            )
        }

        req.id = TeacherIsDB._id
        next()



}
module.exports = middlewareTeacher