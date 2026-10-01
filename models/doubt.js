const mongoose = require("mongoose"); // mongoose import kiya schema banane ke liye

// ---- Reply ke liye chhota schema ----
const replySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

const doubtSchema = new mongoose.Schema({
  title: {
    type: String,      // text data
    required: true      // bina title ke doubt save nahi hoga
  },
  description: {
    type: String,
    required: true      // doubt ka detail likhna zaroori hai
  },
  subject: {
    type: String,
    required: true      // kis subject ka doubt hai (jaisa DSA, DBMS)
  },
  upvotes: {
    type: Number,
    default: 0           // naya doubt post hote hi upvotes 0 se start
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // sirf User ki ID store hogi
    ref: "User"                            // yeh ID "User" model se connected hai (populate ke liye)
  },
  replies: {
    type: [replySchema],   // array of replies
    default: []              // naya doubt khaali replies ke saath bane
  }
}, { timestamps: true }); // createdAt aur updatedAt fields automatically add ho jayengi

module.exports = mongoose.model("Doubt", doubtSchema); // is schema se "Doubt" model banaya, export kiya