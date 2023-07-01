const ClassesSchema = require("../../../MongoDB/Schema/ClassesSchema");
const NotificationSchema = require("../../../MongoDB/Schema/NotificationSchema");
const StudentSchema = require("../../../MongoDB/Schema/StudentSchema");
const TeacherSchema = require("../../../MongoDB/Schema/TeacherSchema");
const {EventEmitter} = require("../../Emmiters/eventEmitter");
const events = new EventEmitter()
events.on("startClass" , async ({_id})=>{
    console.log("started class" , _id);
    const classes = await ClassesSchema.findById(_id).populate({path:"studentsId BigTeacherId BusinesmenID" ,strictPopulate: false})
    const newNotification = await NotificationSchema
        .create(
            {
                message:`siz royhatdan otgan kurs boshlanishiga start berildi gurux nomi ${classes.name}  gurux mutahasisligi ${classes.groupSpase}`,
                name:"start classes",
                fromWho:classes.BusinesmenID._id,
                date:new Date()
            }
        )
    const wsIdList = Array(0).concat(...classes.studentsId.map(student=>student.wsConnectionIDS) , classes.BigTeacherId.wsConnectionIDS, classes.BusinesmenID.wsConnectionIDS )
    classes.studentsId.forEach(async ({_id})=>{
        await StudentSchema.findByIdAndUpdate(_id , {$push:{notification:newNotification._id}})
    })                        
})



events.on("add" , async ({_id})=>{
    const classes = await ClassesSchema.findById(_id).lean()
    const newNotification = await NotificationSchema
    .create(
        {
            message:`oquv markazingizda siz otishingiz lozim bolgan ${classes.name}  guruxi oquvchilarni qabul qilish uchun ochildi! Mutahasislik ${classes.groupSpase}`,
            name:"new class",
            fromWho:classes.BusinesmenID._id,
            date:new Date()
        }
    )
    const BigTeacher = await TeacherSchema.findByIdAndUpdate(classes.BigTeacherId._id , {$push:{notification:newNotification._id}})
})


events.on("rate" , ({_id})=>{
    
})

module.exports = events