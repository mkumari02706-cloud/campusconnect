const express = require("express");
const router = express.Router();
const MentorSession = require("../models/MentorSession");
const User = require("../models/User");

// List all upcoming sessions
router.get("/", async (req, res) => {
  const sessions = await MentorSession.find().populate("faculty");
  res.render("mentor/index", { sessions });
});

// Form to create a session
router.get("/new", (req, res) => {
  res.render("mentor/new");
});

// Create session
router.post("/", async (req, res) => {
  const { title, subject, slotTime, maxStudents, meetingLink } = req.body;
  await MentorSession.create({
    title, subject, slotTime, maxStudents, meetingLink,
    faculty: req.session.userId
  });
  res.redirect("/mentor-connect");
});
// Book a slot
router.post("/:id/book", async (req, res) => {
  const session = await MentorSession.findById(req.params.id);
  if (session.bookedStudents.length < session.maxStudents) {
    session.bookedStudents.push(req.session.userId);
    await session.save();
  }
  res.redirect("/mentor-connect");
});

module.exports = router;
