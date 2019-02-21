const express = require("express");
const router = express.Router();
const passport = require("passport");

// load Inbox model
const Inbox = require("../../models/Inbox");

// @route   GET /api/inboxes/test
// @desc    Test inbox route
// @access  Public
router.get("/test", (req, res) => res.json({ success: "inbox works" }));

// @route   GET /api/inboxes
// @desc    Current user's inbox
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // search for current user's inbox
    Inbox.findOne({ userid: req.user.id })
      .then(inbox => res.json(inbox))
      .catch(err => console.log(err));
  }
);

// @route   POST /api/inboxes/conversations
// @desc    Send message / create new conversation
// @access  Private
router.post(
  "/conversations",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // create new message
    const newMessage = {
      username: req.user.username,
      message: req.body.message
    };

    // get user's inbox
    Inbox.findOne({ username: req.user.username })
      .then(senderInbox => {
        // get recipient's inbox
        Inbox.findOne({ username: req.body.username }).then(receiverInbox => {
          // get index of existing conversations
          function getConversationIndex(inbox) {
            const existing = inbox.conversations.filter(conversation => {
              return (
                conversation.users.indexOf(req.user.username) > -1 &&
                conversation.users.indexOf(req.body.username) > -1
              );
            });
            const index = inbox.conversations
              .map(conversation => conversation._id)
              .indexOf(existing[0]._id);
            return index;
          }

          const senderIndex = getConversationIndex(senderInbox);
          const receiverIndex = getConversationIndex(receiverInbox);

          if (senderIndex === -1 && receiverIndex === -1) {
            // if no conversation exists, create a new one
            const newConversation = {
              users: [req.user.username, req.body.username],
              messages: [newMessage]
            };

            // add conversation to both inboxes
            senderInbox.conversations.unshift(newConversation);
            receiverInbox.conversations.unshift(newConversation);
          } else {
            // add message to both conversations
            senderInbox.conversations[senderIndex].messages.unshift(newMessage);
            receiverInbox.conversations[receiverIndex].messages.unshift(
              newMessage
            );
          }

          // save both inboxes
          receiverInbox.save().then(receiverInbox => {
            senderInbox.save().then(senderInbox => res.json(senderInbox));
          });
        });
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
