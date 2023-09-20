const { Schema, model } = require("mongoose");

const businesmenSchema = new Schema({
    businesmen_companyName: { type: String, default: "Gues company" },
    businesmen_avatar:{ type: String, required: true},
    businesmen_starTJobHours: { type: String, default: "6:00" },
    businesmen_endJobHours: { type: String, default: "18:00" },
    businesmen_teachersID: [{ type: Schema.Types.ObjectId, ref: "Teachers" }],
    businesmen_course: [{ type: Schema.Types.ObjectId, ref: "Courses" }],
    businesmen_classesID: [{ type: Schema.Types.ObjectId, ref: "Classes" }],
    businesmen_password: { type: String, required: true },
    businesmen_login: { type: String, required: true },
    businesmen_location: { type: Object, default: {} },
    businesmen_wsConnectionIDS: { type: Array, default: [] },
    businesmen_followTeacherId: [{ type: Schema.Types.ObjectId, ref: "Teachers" }],
    businesmen_message: [{ type: Schema.Types.ObjectId, ref: "Messages" }],
    businesmen_course_space: { type: Array, default: [] },
    businesmen_status : { type : Object  , default : { status: "run" , text : "" } },
    businesmen_premium_status: { type: Boolean, default: false },
    businesmen_premium_status: { type: Boolean, default: false },
    businesmen_premium_status: { type: Boolean, default: false },
    businesmen_class_teacher_plan : { type : String , default : 10 },
    businesmen_class_student_plan : { type : String , default : 10 },
    businesmen_not_success_message_default_text:{ type : String , default : "Gurux To'lib qoldi ! Yangi gurux Ochilishini Kuting !"},
})

module.exports = model("Businesmens", businesmenSchema)