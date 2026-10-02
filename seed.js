require("dotenv").config();
const mongoose = require("mongoose");
const { IndustrySkill } = require("./models/SkillGap");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await IndustrySkill.create({
    branch: "CSE",
    requiredSkills: ["Git", "Data Structures", "SQL", "REST APIs", "Problem Solving"]
  });

  console.log("Seeded!");
  process.exit(0);
}

seed();