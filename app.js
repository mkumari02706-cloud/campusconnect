require("dotenv").config();

const express = require("express");
const session = require("express-session");
const path = require("path");

const connectDB = require("./config/db");

connectDB();

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use("/auth", require("./routes/auth"));
app.use("/doubts", require("./routes/doubts"));
app.use("/leaderboard", require("./routes/leaderboard"));
app.use("/skill-gap", require("./routes/skillgap"));
app.use("/mentor-connect", require("./routes/mentor"));

app.get("/", (req, res) => {
    res.render("home");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});