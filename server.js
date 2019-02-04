const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");

const mongoose = require("mongoose");
const db = require("./config/keys").MONGO_URI;

const passport = require("passport");

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

// set security protocols
app.use(helmet());

// initialize body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to database
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

// passport setup
app.use(passport.initialize());
require("./config/passport")(passport);

// routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

// server setup
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
