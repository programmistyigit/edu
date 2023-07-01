const { Schema, model } = require("mongoose");

const NotificationSchema = new Schema({
    name:{type:String , required:true},
    message:{type:String , required:true},
    fromWho:{type:Schema.Types.ObjectId , ref:"Businesmens Teachers" , required:true},
    date:{type:Date , required:true}
})

module.exports = model("Notifications" , NotificationSchema)

