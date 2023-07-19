const { default: mongoose } = require("mongoose")
const ClassesSchema = require("../../../MongoDB/Schema/ClassesSchema")

const get = async (req, res) => {
    const id = req.params.id
    const classes = await ClassesSchema.findById(id)
    if (!classes) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: ["gurux topilmadi!"]
                    }
                )
        )
    }

    if (classes.class_BigTeacherId._id.toJSON() != req.id.toString()) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "warning",
                        message: `Siz ${classes.class_name} guruxi raxbari emassiz !`
                    }
                )
        )
    }

    res
        .status(200)
        .json(
            {
                status: "success",
                message: "success!",
                data: classes.class_attendance
            }
        )
}

module.exports = get