const BusinesMenSChema = require("../../../MongoDB/Schema/BusinesMenSChema");
const ClassesSchema = require("../../../MongoDB/Schema/ClassesSchema");
const NotificationSchema = require("../../../MongoDB/Schema/NotificationSchema");
const StudentSchema = require("../../../MongoDB/Schema/StudentSchema");
const TeacherSchema = require("../../../MongoDB/Schema/TeacherSchema");
const { EventEmitter } = require("../../Emmiters/eventEmitter");
const events = new EventEmitter()
events.on("startClass", async ({ _id }) => {
    try {
        const classes = await ClassesSchema.findById(_id);
        await classes.populate({ path: "class_studentsID", strictPopulate: false })
        await classes.populate({ path: "class_BigTeacherId", strictPopulate: false })
        await classes.populate({ path: "class_BusinesmenID", strictPopulate: false })
        const newNotification = await NotificationSchema
            .create(
                {
                    notification_message: `siz royhatdan otgan kurs boshlanishiga start berildi gurux nomi ${classes.class_name}  gurux mutahasisligi ${classes.groupSpase}`,
                    notification_name: "start classes",
                    notification_fromWho: classes.class_BusinesmenID._id,
                    notification_date: new Date(),
                    notification_role: "businesmen"
                }
            )
        const wsIdList = Array(0).concat(...classes.class_studentsId.map(student => student.wsConnectionIDS), classes.class_BigTeacherId.wsConnectionIDS, classes.class_BusinesmenID.wsConnectionIDS)
        classes.class_studentsId.forEach(async ({ _id }) => {
            await StudentSchema.findByIdAndUpdate(_id, { $push: { student_notification: newNotification._id } })
        })
        await TeacherSchema.findByIdAndUpdate(classes.class_BigTeacherId._id, { $push: { teacher_notification: newNotification._id } })
    } catch (error) {
        console.log(error + "");
    }
})



events.on("add", async ({ _id }) => {
    try {

        const classes = await ClassesSchema.findById(_id).lean()
        const newNotification = await NotificationSchema
            .create(
                {
                    notification_message: `oquv markazingizda siz otishingiz lozim bolgan ${classes.name}  guruxi oquvchilarni qabul qilish uchun ochildi! Mutahasislik ${classes.class_groupSpase}`,
                    notification_name: "new class",
                    notification_fromWho: classes.class_BusinesmenID._id.toString(),
                    notification_date: new Date(),
                    notification_role: "businesmen"
                }
            )
        const BigTeacher = await TeacherSchema.findByIdAndUpdate(classes.class_BigTeacherId._id, { $push: { teacher_notification: newNotification._id } })
    } catch (error) {
        console.log(error + "");
    }
})


events.on("rate", async ({ _id }) => {
    const classes = await ClassesSchema.findById(_id);
        await classes.populate({path : "class_BusinesmenID" , strictPopulate : false})
    const newNotification = await NotificationSchema.create(
        {
            notification_date:new Date(),
            notification_fromWho:classes.class_BusinesmenID._id,
            notification_name:"gurux rag'batlantirilishi !",
            notification_message:`${classes.class_BusinesmenID.businesmen_companyName} oquv markazi tomonidan sizning ${classes.class_name} guruxingizga ${classes.class_rate} ${classes.class_rate < 3 ? "😒" : "😁"} boxosi qoyildi !`,
            notification_role:"businesmen"
        }
    )

    classes.class_studentsId.forEach( async (std) => {
        await StudentSchema.findByIdAndUpdate(std._id , { $push : { student_notification : newNotification._id } } )
    })
})

module.exports = events