const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
    text: { type: String, required: true },
    from: { type: Schema.Types.ObjectId, ref: ["Students", "Teachers", "Mothers", "Businesmens"], required: true },
    to: { type: Schema.Types.ObjectId, ref: ["Students", "Teachers", "Mothers", "Businesmens"], required: true },
}, { timestamps: true })

module.exports = model("Messages", MessageSchema)