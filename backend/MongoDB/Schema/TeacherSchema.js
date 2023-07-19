const { Schema, model } = require("mongoose");

const teacherSchema = new Schema({
    teacher_name: { type: String, default: "Guest" },
    teacher_firstName: { type: String, default: "GuestFirstName" },
    teacher_phoneNumber: { type: String, default: "+9989-xxx-nn-yy" },
    teacher_status: { type: String, default: "online" },
    teacher_avatar: { type: String, default: "https://w7.pngwing.com/pngs/799/987/png-transparent-computer-icons-avatar-social-media-blog-font-awesome-avatar-heroes-computer-wallpaper-social-media.png" },
    teacher_birthDay: { type: String, required: true },
    teacher_rank: { type: String, default: "0" },
    teacher_password: { type: String, required: true },
    teacher_coursesID: [{ type: Schema.Types.ObjectId, ref: "Classes" }],
    teacher_complaints: [{ type: Schema.Types.ObjectId, ref: "Complaints" }],
    teacher_spase: [{ type: Schema.Types.ObjectId , ref : "Courses"}],
    teacher_location: { type: Object, required: true },
    teacher_notification:[{type:Schema.Types.ObjectId , ref:"Notifications"}],
    teacher_wsConnectionIDS : {type:Array , default:[]},
    teacher_follow_businesmen : [{ type : Schema.Types.ObjectId , ref : "Businesmens"}]
})

module.exports = model("Teachers", teacherSchema)