const { Schema, model } = require("mongoose");

const motherSchema = new Schema({
    mother_name: { type: String, default: "GuestMother" },
    mother_firstName: { type: String, default: "GuestFirstName" },
    mother_password: { type: String, required: true },
    mother_childern: [{ type: Schema.Types.ObjectId, ref: "Students" }],
    mother_birthDay:{type:String , required:true},
    mother_notification:[{type:Schema.Types.ObjectId , ref:"Notifications"}],
    mother_wsConnectionIDS : {type:Array , default:[]}

})

module.exports = model("Mothers", motherSchema)