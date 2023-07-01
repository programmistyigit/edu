const { Schema, model, default: mongoose } = require("mongoose");

const classesSchema = new Schema({
    name: { type: String, required: true },
    groupSpase: { type: String, required: true },
    durationDays: { type: String, required: true },
    theDayAfterTheStart: { type: String, default: "0" },
    MoneyValue: { type: String, required: true },
    BigTeacherId: { type: Schema.Types.ObjectId, ref:"Teachers", required: true },
    studentsId: [{ type: Schema.Types.ObjectId, ref: "Students" }],
    rating: { type: Array, default: [] },
    attendance: { type: Array, default: [] },
    maxNumberStudent:{type:Number , required:true},
    status:{type:Object , default : {status:"danger" , text:"initializing"}},
    table:{type:Array , required:true},
    BusinesmenID:{type:Schema.Types.ObjectId ,ref:"Businesmens" , required:true },
    rate:{type:Number , default:0}
})

module.exports = model("Classes", classesSchema)