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
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ notfound: "No posts found" }));
});

// @route   GET /api/posts/:postid
// @desc    Get post by id
// @access  Public
router.get("/:postid", (req, res) => {
  Post.findById({ _id: req.params.postid })
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ notfound: "Post not found" }));
});

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
router.post(
  "/likes/:postid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById({ _id: req.params.postid })
      .then(post => {
        // make sure user hasn't already liked the post
        if (
          post.likes.filter(like => like.userid.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ duplicatelike: "User already liked this post" });
        }

        // add userid to likes array
        post.likes.unshift({ userid: req.user.id });

        // save post
        post.save().then(post => res.json(post));
      })
      .catch(err => console.log(err));
  }
);

// @route   POST /api/posts/unlikes/:postid
// @desc    Unlike a post
// @access  Private
router.post(
  "/unlikes/:postid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById({ _id: req.params.postid })
      .then(post => {
        // search likes array for user
        if (
          post.likes.filter(like => like.userid.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ likenotfound: "You have not liked this post" });
        }

        // remove user's like from array
        const userLikeIndex = post.likes
          .map(like => like.userid.toString())
          .indexOf(req.user.id);

        post.likes.splice(userLikeIndex, 1);

        // save post
        post.save().then(post => res.json(post));
      })
      .catch(err => console.log(err));
  }
);

// @route   POST /api/posts/comments/:postid
// @desc    Comment on a post
// @access  Private
router.post(
  "/comments/:postid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = postValidation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // create comment object
    const newComment = {
      userid: req.user.id,
      username: req.user.username,
      avatar: req.user.avatar,
      text: req.body.text
    };

    Post.findById({ _id: req.params.postid })
      .then(post => {
        // add comment to comments array
        post.comments.unshift(newComment);

        // save post
        post.save().then(post => res.json(post));
      })
      .catch(err => console.log(err));
  }
);

// @route   DELETE /api/posts/:postid
// @desc    Delete post by id
// @access  Private

// @route   DELETE /api/posts/comments/:postid/:commentid
// @desc    Delete comment by id
// @access  Private

module.exports = router;
