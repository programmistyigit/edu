const NotificationSchema = require("../../MongoDB/Schema/NotificationSchema")

const generateMessage = async (from, message) => {
    const notification = await NotificationSchema.create({
        notification_fromWho:from._id,
        notification_date:new Date(),
        notification_role:from.role,
        notification_message:message,
        notification_name:"new message",
    })

    return notification
}

module.exports = generateMessage