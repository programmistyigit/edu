const { ReGenerateToken } = require("../jwt/jsonwebtoken")
const BusinesMenSChema = require("../MongoDB/Schema/BusinesMenSChema")

const middlewareBusinesmen = async (req, res, next) => {
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
        const businesmenDataIsJson = ReGenerateToken(cookie)
        const businesmenIsDB = await BusinesMenSChema.findById(businesmenDataIsJson._id)
        if (!businesmenIsDB || businesmenDataIsJson.companyName != businesmenIsDB?.companyName) {
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
        req.id = businesmenIsDB._id
        next()


    } catch (error) {
        throw error
    }

}
module.exports = middlewareBusinesmen