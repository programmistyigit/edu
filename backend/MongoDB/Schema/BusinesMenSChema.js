const { Schema, model } = require("mongoose");

const businesmenSchema = new Schema({
    companyName: { type: String, default: "Gues company" },
    starTJobHours: { type: String, default: "6:00" },
    endJobHours: { type: String, default: "18:00" },
    teachersID: [{ type: Schema.Types.ObjectId, ref: "Teachers" }],
    course: { type: Array, default: [] },
    classesID: [{ type: Schema.Types.ObjectId, ref: "Classes" }],
    password: { type: String, required: true },
    login:{type:String , required:true},
    location:{type:Object , default:{}},
    wsConnectionIDS : {type:Array , default:[]},
    followTeacherId:[{type:Schema.Types.ObjectId , ref:"Teachers"}]
})

module.exports = model("Businesmens", businesmenSchema)