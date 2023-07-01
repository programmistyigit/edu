const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
    name: { type: String, default: "Guest" },
    firstName: { type: String, default: "GuestFirstName" },
    phoneNumber: { type: String, default: "+9989-xxx-nn-yy" },
    email: { type: String, default: "exomple@mail.com" },
    status: { type: String, default: "online" },
    avatar: { type: String, default: "https://w7.pngwing.com/pngs/799/987/png-transparent-computer-icons-avatar-social-media-blog-font-awesome-avatar-heroes-computer-wallpaper-social-media.png" },
    birthDay: { type: String, required: true },
    rank: { type: Array, default: [] },
    password: { type: String, required: true },
    classesID: [{ type: Schema.Types.ObjectId, ref: "Classes" }],
    location:{type:Object , required:true},
    notification:[{type:Schema.Types.ObjectId , ref:"Notifications"}],
    wsConnectionIDS : {type:Array , default:[]},
    message:[{type:Schema.Types.ObjectId , ref:"message"}]
})

module.exports = model("Students", studentSchema)