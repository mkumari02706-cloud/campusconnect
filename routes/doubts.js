const express = require("express");
const router = express.Router();
const Doubt = require("../models/doubt"); // Doubt model import kiya
const User = require("../models/User");
// GET /doubts -> saare doubts ki list dikhao
router.get("/", async (req, res) => {
  const doubts = await Doubt.find().populate("author"); // sab doubts + author ka naam bhi nikalo
  res.render("doubts/index", { doubts }); // view ko data pass karo
});

// GET /doubts/new -> naya doubt post karne ka form dikhao
router.get("/new", (req, res) => {
  res.render("doubts/new");
});
router.post("/:id/replies", async (req, res) => {
  const doubt =await Doubt.findById(req.params.id);
  doubt.replies=doubt.replies || [];
  doubt.replies.push({
    text: req.body.text,
    author: req.session.userId
  })
  await doubt.save();
  res.redirect(`/doubts/${doubt._id}`); huun

});


// POST /doubts -> form submit hone pe naya doubt save karo
router.post("/", async (req, res) => {
  const { title, description, subject } = req.body; // form se data nikala
  await Doubt.create({
    title,
    description,
    subject,
    author: req.session.userId // logged-in user ki ID save ki
  });
  res.redirect("/doubts"); // list page pe wapas bhej diya
});
router.post("/", async (req, res) => {
  const { title, description, subject } = req.body;
  await Doubt.create({
    title,
    description,
    subject,
    author: req.session.userId
  });
  await User.findByIdAndUpdate(req.session.userId, { $inc: { contributionScore: 2 } }); // <- yeh naya
  res.redirect("/doubts");
});

// GET /doubts/:id -> ek doubt kholke uska detail dikhao
router.get("/:id", async (req, res) => {
  const doubt = await Doubt.findById(req.params.id).populate("author");
  res.render("doubts/show", { doubt });
});

// POST /doubts/:id/upvote -> upvote count badhao
router.post("/:id/upvote", async (req, res) => {
  await Doubt.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }); // upvotes mein +1
  res.redirect(`/doubts/${req.params.id}`);
});

module.exports = router;