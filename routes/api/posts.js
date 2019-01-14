const express = require("express");
const router = express.Router();
const passport = require("passport");

// load posts/profile models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// load post validation
const postValidation = require("../../validation/post-validation");

// @route   GET /api/posts/test
// @desc    Testing post route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "post route works" });
});

// @route   GET /api/posts
// @desc    Get all current posts
// @access  Public

// @route   GET /api/posts/:postid
// @desc    Get post by id
// @access  Public

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = postValidation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // create post object
    const newPost = new Post({
      userid: req.user.id,
      username: req.user.username,
      avatar: req.user.avatar,
      text: req.body.text
    });

    // save post to database
    newPost.save().then(post => res.json(post));
  }
);

// @route   POST /api/posts/likes/:postid
// @desc    Like a post
// @access  Private

// @route   POST /api/posts/unlikes/:postid
// @desc    Unlike a post
// @access  Private

// @route   POST /api/posts/comments/:postid
// @desc    Comment on a post
// @access  Private

// @route   DELETE /api/posts/:postid
// @desc    Delete post by id
// @access  Private

// @route   DELETE /api/posts/comments/:postid/:commentid
// @desc    Delete comment by id
// @access  Private

module.exports = router;
