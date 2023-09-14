const { Schema, model, default: mongoose } = require("mongoose");

const classesSchema = new Schema({
    class_name: { type: String, required: true },
    class_avatar: { type :String , default :"https://images.unsplash.com/photo-1594312915251-48db9280c8f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"},
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