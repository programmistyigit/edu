const { Schema, model } = require("mongoose");

const LibrarySchema = new Schema({
    library_name: { type: String, required: true },
    library_businesmen: { type: Schema.Types.ObjectId, ref: "Business", required: true },
    library_teacher: [{ type: Schema.Types.ObjectId, ref: "Business", required: true }],
    library_courses: { type: Schema.Types.ObjectId, ref: "Courses", required: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = model("Library", LibrarySchema);
