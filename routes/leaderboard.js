const express = require("express");
const router = express.Router();
const User = require("../models/User"); // User model import kiya

// GET /leaderboard -> sab users ko score ke hisaab se sorted dikhao
router.get("/", async (req, res) => {
  const topUsers = await User.find().sort({ contributionScore: -1 }); // sabse zyada score pehle
  res.render("leaderboard/index", { topUsers }); // view ko data pass karo
});

module.exports = router;