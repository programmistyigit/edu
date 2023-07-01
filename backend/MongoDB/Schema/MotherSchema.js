const { Schema, model } = require("mongoose");

const motherSchema = new Schema({
    name: { type: String, default: "GuestMother" },
    firstName: { type: String, default: "GuestFirstName" },
    password: { type: String, required: true },
    childern: [{ type: Schema.Types.ObjectId, ref: "Students" }],
    birthDay:{type:String , required:true},
    notification:[{type:Schema.Types.ObjectId , ref:"Notifications"}],
    wsConnectionIDS : {type:Array , default:[]}

})

module.exports = model("Mothers", motherSchema)