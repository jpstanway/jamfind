const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// load validation scripts
const createAccountValidation = require("../../validation/account-validation");
const loginValidation = require("../../validation/login-validation");
const changePasswordValidation = require("../../validation/change-password-validation");

// load User and Inbox model
const User = require("../../models/User");
const Inbox = require("../../models/Inbox");

// @route   GET /api/users/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => res.json({ success: "users works" }));

// @route   GET /api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        res.json(user);
      })
      .catch(err => console.log(err));
  }
);

// @route   POST /api/users/create-account
// @desc    Create new user account
// @access  Public
router.post("/create-account", (req, res) => {
  const { errors, isValid } = createAccountValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // search db to see if username taken
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = "Username is already taken";
      return res.status(400).json(errors);
    } else {
      // search db for duplicate email
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
                .then(user => {
                  // also create user's inbox
                  const newInbox = new Inbox({
                    userid: user._id,
                    username: user.username
                  });

                  newInbox.save().then(inbox => res.json(user));
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
});

// @route   POST /api/users/login
// @desc    User login
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = loginValidation(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // check user exists
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = "User doesn't exist";
      return res.status(400).json(errors);
    } else {
      // check password
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          // assign token
          const payload = {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            admin: user.admin,
            messages: user.messages
          };

          jwt.sign(payload, keys.SECRET, { expiresIn: 10800 }, (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "Password doesn't match";
          return res.status(400).json(errors);
        }
      });
    }
  });
});

// @route   POST /api/users/change-password
// @desc    Change user's password
// @access  Private
router.put(
  "/change-password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = changePasswordValidation(req.body);
    const alerts = {};

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get user and compare current password
    User.findById(req.user.id).then(user => {
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          // check if new password is the same as the old
          if (req.body.password === req.body.newPassword) {
            errors.newPassword =
              "New password must be different than current password";
            return res.status(400).json(errors);
          }

          // encrypt and save new password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
              if (err) throw err;

              // overwrite current password with new password
              user.password = hash;

              // save user
              user.save().then(user => {
                alerts.dashboard = "Password successfully changed!";
                res.json(alerts);
              });
            });
          });
        } else {
          errors.password = "Current password is incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  }
);

module.exports = router;
