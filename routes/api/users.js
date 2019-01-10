const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const mongoose = require("mongoose");

// load User model
const User = require("../../models/User");

// @route   GET /api/users/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => res.json({ success: "users works" }));

// @route   POST /api/users/create-account
// @desc    Create new user account
// @access  Public
router.post("/create-account", (req, res) => {
  const errors = {};

  // search db for duplicate user
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already in use";
      return res.status(400).json(errors);
    } else {
      // get gravatar
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default avatar
      });

      // create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      // encrypt password + save user
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST /api/users/login
// @desc    User login
// @access  Public
router.post("/login", (req, res) => {
  const errors = {};

  // check user exists
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = "User doesn't exist";
      return res.status(400).json(errors);
    } else {
      // check password
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          res.json(user);
        } else {
          errors.password = "Password doesn't match";
          return res.status(400).json(errors);
        }
      });
    }
  });
});

module.exports = router;
