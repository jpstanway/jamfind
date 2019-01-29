const express = require("express");
const router = express.Router();
const passport = require("passport");

// load post model
const Post = require("../../models/Post");

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
  Post.findById(req.params.postid)
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
    Post.findById(req.params.postid)
      .then(post => {
        // make sure user hasn't already liked the post
        if (
          post.likes.filter(like => like.userid.toString() === req.user.id)
            .length > 0
        ) {
          // remove user's like from array
          const userLikeIndex = post.likes
            .map(like => like.userid.toString())
            .indexOf(req.user.id);

          post.likes.splice(userLikeIndex, 1);
        } else {
          // add userid to likes array
          post.likes.unshift({ userid: req.user.id });
        }

        // save post
        post.save().then(post => res.json(post));
      })
      .catch(err => console.log(err));
  }
);

// @route   POST /api/posts/dislikes/:postid
// @desc    Dislike a post
// @access  Private
router.post(
  "/dislikes/:postid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.postid)
      .then(post => {
        // make sure user hasn't already disliked the post
        if (
          post.dislikes.filter(
            dislike => dislike.userid.toString() === req.user.id
          ).length > 0
        ) {
          // remove user's dislike from array
          const userDislikeIndex = post.dislikes
            .map(dislike => dislike.userid.toString())
            .indexOf(req.user.id);

          post.dislikes.splice(userDislikeIndex, 1);
        } else {
          // add userid to dislikes array
          post.dislikes.unshift({ userid: req.user.id });
        }

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
router.delete(
  "/:postid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find the post
    Post.findById(req.params.postid)
      .then(post => {
        // confirm user's post
        if (post.userid.toString() !== req.user.id) {
          return res.status(401).json({
            authorization: "You are not authorized to remove this post"
          });
        }

        post
          .remove()
          .then(() => res.json({ success: "Successfully deleted post" }));
      })
      .catch(err => console.log(err));
  }
);

// @route   DELETE /api/posts/comments/:postid/:commentid
// @desc    Delete comment by id
// @access  Private
router.delete(
  "/comments/:postid/:commentid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find the post
    Post.findById(req.params.postid)
      .then(post => {
        // find comment
        const removeCommentIndex = post.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.commentid);

        // check if not correct user
        if (
          post.comments[removeCommentIndex].userid.toString() !== req.user.id
        ) {
          return res.status(401).json({
            authorization: "You are not authorized to delete this comment"
          });
        }

        // splice out and remove comment
        post.comments.splice(removeCommentIndex, 1);

        // save post
        post.save().then(post => res.json(post));
      })
      .catch(err => res.json({ notfound: "Post or comment not found" }));
  }
);

module.exports = router;
