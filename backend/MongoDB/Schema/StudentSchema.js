const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
    student_name: { type: String, default: "Guest" }, // ismi
    student_firstName: { type: String, default: "GuestFirstName" }, // familyasi
    student_phoneNumber: { type: String, default: "+9989-xxx-nn-yy" }, // telefon raqam
    student_email: { type: String, default: "exomple@mail.com" }, // email
    student_status: { type: String, default: "online" }, // tizimda online ekani yoki tizimda emasligi
    student_avatar: { type: String, default: "https://w7.pngwing.com/pngs/799/987/png-transparent-computer-icons-avatar-social-media-blog-font-awesome-avatar-heroes-computer-wallpaper-social-media.png" }, // avatar faqat bitta malumot olinadi
    student_birthDay: { type: String, required: true },// tugilgan sanasi
    student_rank: { type: Array, default: [] }, // oqish jarayonida ozlashtirilayotgan umumiy ballari
    student_password: { type: String, required: true }, // password
    student_classesID: [{ type: Schema.Types.ObjectId, ref: "Classes" }], // royhatdan otgan yonalishlari ID si
    student_location:{type:Object , required:true}, // joylashuvi viloyat tuman mhalla korinishida
    student_notification:[{type:Schema.Types.ObjectId , ref:"Notifications"}], // bildirishnomalr uztoz tarafdan oquvmarkaz tarafdan va tizim tarafdan
    student_wsConnectionIDS : {type:Array , default:[]}, // websocket connection ID lari boshqa seansni ID siham yoziladi
    student_message:[{type:Schema.Types.ObjectId , ref:"Messages"}], // jonatilgan va qabul qilib olingan habarlar
    student_appropriation:[{type:Schema.Types.ObjectId , ref:"Appropriations"}] // ozlashtirish malumotlari bu yerda test keladi
})

module.exports = model("Students", studentSchema)