const express = require("express");
const router = express.Router(); // mini-app sirf auth routes ke liye
const bcrypt = require("bcryptjs"); // password hash karne ke liye
const User = require("../models/User");

// GET request -> register form dikhao
router.get("/register", (req, res) => {
  res.render("auth/register");
});

// POST request -> form submit hone pe naya user banao
router.post("/register", async (req, res) => {
  const { name, email, password, college, branch, role } = req.body; // form data
  const hashedPassword = await bcrypt.hash(password, 10); // password encrypt karo
  const user = await User.create({ name, email, password: hashedPassword, college, branch, role }); // DB mein save
  req.session.userId = user._id; // login session set karo
  res.redirect("/"); // home page pe bhejo
});

// GET request -> login form dikhao
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// POST request -> login form submit hone pe check karo
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); // email se user dhoondo
  if (!user || !(await bcrypt.compare(password, user.password))) {
    // agar user hi nahi mila, YA password match nahi hua
    return res.redirect("/auth/login"); // wapas login page pe bhejo
  }
  req.session.userId = user._id; // sahi hai -> login session set karo
  res.redirect("/");
});

// GET request -> logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/auth/login")); // session delete karo
});

module.exports = router; // is file ko app.js mein use karne ke liye export