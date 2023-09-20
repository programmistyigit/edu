const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
    message_text: { type: String, required: true },
    message_from: { type: String, required: true },
    message_to: { type: String, required: true },
}, { timestamps: true })

module.exports = model("Messages", MessageSchema)