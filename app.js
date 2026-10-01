require("dotenv").config(); // .env file load karo
const express = require("express");
const session = require("express-session"); // login session ke liye
const path = require("path");

const connectDB = require("./config/db"); // DB connection function
connectDB(); // DB se connect karo

const app = express(); // express app banaya

app.set("view engine", "ejs"); // EJS ko view engine set kiya
app.use(express.urlencoded({ extended: true })); // form data padhne ke liye
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use("/auth", require("./routes/auth")); // auth routes mount kiye
app.use("/doubts", require("./routes/doubts"));
app.use("/leaderboard", require("./routes/leaderboard"));
app.get("/", (req, res) => {
  res.render("home"); // home page dikhao
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));