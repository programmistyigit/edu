const { Schema, model } = require("mongoose");

const NotificationSchema = new Schema({
    notification_name:{type:String , required:true},
    notification_message:{type:String , required:true},
    notification_fromWho:{type:String , required:true},
    notification_role:{type:String , required:true},
    notification_date:{type:Date , required:true}
})

module.exports = model("Notifications" , NotificationSchema)

