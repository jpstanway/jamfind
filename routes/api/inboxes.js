const express = require("express");
const router = express.Router();
const passport = require("passport");

// load Inbox model
const Inbox = require("../../models/Inbox");

// @route   GET /api/inboxes/test
// @desc    Test inbox route
// @access  Public
router.get("/test", (req, res) => res.json({ success: "inbox works" }));

// @route   GET /api/users/inbox
// @desc    User's message inbox
// @access  Private
router.get(
  "/inbox",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => res.json(user.messages))
      .catch(err => console.log(err));
  }
);

// @route   GET /api/users/inbox/:messageid
// @desc    Get full conversation
// @access  Private
router.get(
  "/inbox/:messageid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // get user's inbox
    User.findById(req.user.id).then(user => {
      // get message by id
      const message = user.messages.filter(
        message => message._id.toString() === req.params.messageid
      );
      res.json(message[0]);
    });
  }
);

// @route   POST /api/users/private-message
// @desc    Send message to user
// @access  Private
router.post(
  "/private-message",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = privateMessageValidation(req.body);
    const alerts = {};

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // create new message object
    const newMessage = {
      username: req.user.username,
      message: req.body.message
    };

    User.findOne({ username: req.body.username })
      .then(user => {
        user.messages.unshift(newMessage);

        user.save().then(user => {
          // save it to sending user's inbox as well
          User.findOne({ username: req.user.username }).then(sender => {
            sender.messages.unshift(newMessage);

            sender.save().then(sender => {
              alerts.inbox = `Message sent to ${user.username}`;
              res.json(alerts);
            });
          });
        });
      })
      .catch(err => {
        errors.username = "User not found";
        res.status(404).json(errors);
      });
  }
);

// @route   POST /api/users/private-reply
// @desc    Reply to a private message
// @access  Private
router.post(
  "/private-reply",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = replyValidation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // create new reply object
    const newReply = {
      username: req.user.username,
      text: req.body.text
    };
  }
);

module.exports = router;
