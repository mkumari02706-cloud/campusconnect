const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { IndustrySkill, StudentSkill } = require("../models/SkillGap");

router.get("/", async (req, res) => {
  console.log("Session userId:", req.session.userId);
  const user = await User.findById(req.session.userId); // logged-in user nikalo
  const industryData = await IndustrySkill.findOne({ branch: user.branch }); // uski branch ka data
  const studentData = await StudentSkill.findOne({ student: user._id }); // uske known skills (agar hain)

  const required = industryData ? industryData.requiredSkills : []; // agar data mila to required skills, warna khaali
  const known = studentData ? studentData.knownSkills : []; // agar data mila to known skills, warna khaali
  const gap = required.filter((skill) => !known.includes(skill)); // jo required hai but known nahi

  res.render("skillgap/index", { required, known, gap });
});
router.post("/", async (req, res) => {
  const user = await User.findById(req.session.userId);
  let known = req.body.knownSkills || []; // agar kuch select nahi kiya, khaali array

  await StudentSkill.findOneAndUpdate(
    { student: user._id }, // yeh student dhoondo
    { student: user._id, branch: user.branch, knownSkills: known }, // yeh data set karo
    { upsert: true }, // agar nahi mila, naya bana do
  );

  res.redirect("/skill-gap");
});

module.exports = router;
