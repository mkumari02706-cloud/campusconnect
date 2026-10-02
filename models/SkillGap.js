const mongoose = require("mongoose");

const industrySkillSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
    unique: true
  },
  requiredSkills: [String]
});

const studentSkillSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  knownSkills: [String]
});

module.exports = {
  IndustrySkill: mongoose.model("IndustrySkill", industrySkillSchema),
  StudentSkill: mongoose.model("StudentSkill", studentSkillSchema)
};