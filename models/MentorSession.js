const mongoose = require("mongoose");

const mentorSessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  slotTime: { type: Date, required: true },
  meetingLink: { type: String },
  maxStudents: { type: Number, default: 10 },
  bookedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

module.exports = mongoose.model("MentorSession", mentorSessionSchema);