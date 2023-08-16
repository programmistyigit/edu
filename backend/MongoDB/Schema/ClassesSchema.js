const { Schema, model, default: mongoose } = require("mongoose");

const classesSchema = new Schema({
    class_name: { type: String, required: true },
    class_groupSpase: { type: Schema.Types.ObjectId , ref : "Courses"},
    class_durationDays: { type: String, required: true },
    class_theDayAfterTheStart: { type: String, default: "0" },
    class_BigTeacherId: { type: Schema.Types.ObjectId, ref:"Teachers", required: true },
    class_studentsId: [{ type: Schema.Types.ObjectId, ref: "Students" }],
    class_follow_studentsId: [{ type: Schema.Types.ObjectId, ref: "Students" }],
    class_rating: { type: Array, default: [] },
    class_attendance: { type: Array, default: [] },
    class_maxNumberStudent:{type:Number , required:true},
    class_status:{type:Object , default : {status:"danger" , text:"initializing"}},
    class_table:{type:Array , required:true},
    class_BusinesmenID:{type:Schema.Types.ObjectId ,ref:"Businesmens" , required:true },
    class_rate:{type:Number , default:0},
    class_thema:{type:Array , default:[]}
})

module.exports = model("Classes", classesSchema)