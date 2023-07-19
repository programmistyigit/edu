const { default: mongoose } = require("mongoose");
const { ReGenerateToken } = require("../jwt/jsonwebtoken")
const BusinesMenSChema = require("../MongoDB/Schema/BusinesMenSChema")

const middlewareBusinesmen = async (req, res, next) => {
    const cookie = req.cookies?.auth
    console.log(cookie);
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

        const businesmenDataIsJson = ReGenerateToken(cookie)
        if(!mongoose.Types.ObjectId.isValid(businesmenDataIsJson._id)){
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
        const businesmenIsDB = await BusinesMenSChema.findById(businesmenDataIsJson._id)
        if (!businesmenIsDB || businesmenDataIsJson.businesmen_companyName != businesmenIsDB?.businesmen_companyName) {
            return (
                res
                    .status(400)
                    .json(
                        {
                            status: "error",
                            message: "yaroqsiz authentication malumotlari",
                            error:"ni auth"
                        }
                    )
            )
        }
        req.id = businesmenIsDB._id
        next()



}
module.exports = middlewareBusinesmen