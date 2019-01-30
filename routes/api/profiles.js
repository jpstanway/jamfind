const express = require("express");
const router = express.Router();
const passport = require("passport");

// load user/profile models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// load profile validation
const createProfileValidation = require("../../validation/profile-validation");
const experienceValidation = require("../../validation/experience-validation");
const educationValidation = require("../../validation/education-validation");

// @route   GET /api/profiles/test
// @desc    Testing profile route
// @access  Public
router.get("/test", (req, res) => res.json({ message: "profiles works" }));

// @route   GET /api/profiles/user/:username
// @desc    View a user's profile by username
// @access  Public
router.get("/user/:username", (req, res) => {
  const errors = {};

  // search for user in database
  User.findOne({ username: req.params.username })
    .then(user => {
      if (user) {
        // if found, find their profile
        Profile.findOne({ userid: user.id })
          .populate("userid", ["username", "avatar"])
          .then(profile => {
            if (profile) {
              res.json(profile);
            } else {
              errors.profile = "User does not have a profile";
              return res.status(404).json(errors);
            }
          });
      } else {
        errors.username = "User not found";
        return res.status(404).json(errors);
      }
    })
    .catch(err => console.log(err));
});

// @route   GET /api/profiles/all
// @desc    View all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("userid", ["username", "avatar"])
    .then(profiles => {
      if (profiles) {
        res.json(profiles);
      } else {
        errors.profiles = "No profiles exist";
        return res.status(404).json(errors);
      }
    })
    .catch(err => console.log(err));
});

// @route   GET /api/profiles
// @desc    Get the current user's profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    // search database for user profile
    Profile.findOne({ userid: req.user.id })
      .populate("userid", ["username", "avatar"])
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
    newProfile.userid = req.user.id;
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
    Profile.findOne({ userid: req.user.id }).then(profile => {
      // if profile exists, update
      if (profile) {
        Profile.findOneAndUpdate(
          { userid: req.user.id },
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

// @route   POST /api/profiles/experience
// @desc    Add to experience
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validation
    const { errors, isValid } = experienceValidation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // create experience object
    const newExperience = {
      typeofexperience: req.body.typeofexperience,
      role: req.body.role,
      projectname: req.body.projectname,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // update database
    Profile.findOneAndUpdate(
      { userid: req.user.id },
      { $addToSet: { experience: newExperience } },
      { new: true }
    )
      .then(profile => res.json(profile))
      .catch(err => console.log(err));
  }
);

// @route   POST /api/profiles/education
// @desc    Add to education
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validation
    const { errors, isValid } = educationValidation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // create new education object
    const newEducation = {
      school: req.body.school,
      degree: req.body.degree,
      program: req.body.program,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // locate and update profile
    Profile.findOneAndUpdate(
      { userid: req.user.id },
      { $addToSet: { education: newEducation } },
      { new: true }
    )
      .then(profile => res.json(profile))
      .catch(err => console.log(err));
  }
);

// @route   DELETE /api/profiles/experience/:expid
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:expid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ userid: req.user.id })
      .then(profile => {
        // get index of experience to delete
        const removeExpIndex = profile.experience
          .map(exp => exp._id)
          .indexOf(req.params.expid);

        // use splice to remove selected experience from array
        profile.experience.splice(removeExpIndex, 1);

        // save experience array
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => console.log(err));
  }
);

// @route   DELETE /api/profiles/education/:eduid
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:eduid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ userid: req.user.id })
      .then(profile => {
        // get index of education to delete
        const removeEduIndex = profile.education
          .map(edu => edu._id)
          .indexOf(req.params.eduid);

        // remove selected education using splice
        profile.education.splice(removeEduIndex, 1);

        // save profile
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => console.log(err));
  }
);

// @route   DELETE /api/profiles
// @desc    Delete user account and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ userid: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
