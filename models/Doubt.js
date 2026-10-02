const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const doubtSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isAnonymous: { type: Boolean, default: false },
  replies: { type: [replySchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model("Doubt", doubtSchema);