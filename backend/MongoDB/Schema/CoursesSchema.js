const { Schema , model } = require("mongoose")

const coursesSchema = new Schema({
    cours_name:{ type : String , required : true},
    cours_follow_businesmen : [{ type : Schema.Types.ObjectId , ref : "Businesmens" }],
    cours_follow_teacher : [{ type : Schema.Types.ObjectId , ref : "Teachers" }],
    course_thema_list : { type : Array , default : [] }
})

module.exports = model("Courses" , coursesSchema)