const { Schema, model } = require("mongoose");

const teacherSchema = new Schema({
    name: { type: String, default: "Guest" },
    firstName: { type: String, default: "GuestFirstName" },
    phoneNumber: { type: String, default: "+9989-xxx-nn-yy" },
    status: { type: String, default: "online" },
    avatar: { type: String, default: "https://w7.pngwing.com/pngs/799/987/png-transparent-computer-icons-avatar-social-media-blog-font-awesome-avatar-heroes-computer-wallpaper-social-media.png" },
    birthDay: { type: String, required: true },
    rank: { type: String, default: "0" },
    password: { type: String, required: true },
    coursesID: [{ type: Schema.Types.ObjectId, ref: "Classes" }],
    complaints: [{ type: Schema.Types.ObjectId, ref: "Complaints" }],
    spase: { type: Array, required: true },
    location: { type: Object, required: true },
    notification:[{type:Schema.Types.ObjectId , ref:"Notifications"}],
    wsConnectionIDS : {type:Array , default:[]}


})

module.exports = model("Teachers", teacherSchema)