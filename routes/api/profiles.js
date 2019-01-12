const express = require("express");
const router = express.Router();
const passport = require("passport");

// load profile model
const Profile = require("../../models/Profile");

// load profile validation
const createProfileValidation = require("../../validation/profile-validation");

// @route   GET /api/profiles/test
// @desc    Testing profile route
// @access  Public
router.get("/test", (req, res) => res.json({ message: "profiles works" }));

// @route   GET /api/profiles
// @desc    Get the current user's profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    // search database for user profile
    Profile.findOne({ id: req.user.id })
      .populate("user", ["username", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.profile = "No profile for this user exists";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST /api/profiles
// @desc    Create new or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = createProfileValidation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // create new profile object
    const newProfile = {};

    // add required fields
    newProfile.skill = req.body.skill;
    newProfile.location = req.body.location;

    // add skill(s) field
    if (typeof req.body.instruments !== "undefined") {
      newProfile.instruments = req.body.instruments.split(",");
    }

    // add optional fields
    if (req.body.name) newProfile.name = req.body.name;
    if (req.body.training) newProfile.training = req.body.training;
    if (req.body.website) newProfile.website = req.body.website;
    if (req.body.soundcloudusername)
      newProfile.soundcloudusername = req.body.soundcloudusername;
    if (req.body.bio) newProfile.bio = req.body.bio;

    // add social media fields
    newProfile.social = {};
    if (req.body.youtube) newProfile.social.youtube = req.body.youtube;
    if (req.body.facebook) newProfile.social.facebook = req.body.facebook;
    if (req.body.instagram) newProfile.social.instagram = req.body.instagram;
    if (req.body.twitter) newProfile.social.twitter = req.body.twitter;

    // search database for existing profile
    Profile.findOne({ id: req.user.id }).then(profile => {
      // if profile exists, update
      if (profile) {
        Profile.findOneAndUpdate(
          { id: req.user.id },
          { $set: newProfile },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // if no profile exists, create a new one
        new Profile(newProfile).save().then(profile => res.json(profile));
      }
    });
  }
);

module.exports = router;
