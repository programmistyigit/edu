const { Schema, model } = require("mongoose");

const PremiumSchema = new Schema({
    premium_business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
}, { timestamps: true });

module.exports = model("Premium", PremiumSchema);
