const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");

const mongoose = require("mongoose");
const db = require("./config/keys").MONGO_URI;

const passport = require("passport");

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");
const inboxes = require("./routes/api/inboxes");

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
app.use("/api/inboxes", inboxes);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("/client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// server setup
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
