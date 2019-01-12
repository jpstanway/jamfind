const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function createProfileValidation(data) {
  let errors = {};

  data.instruments = isEmpty(data.instruments) ? "" : data.instruments;
  data.skill = isEmpty(data.skill) ? "" : data.skill;
  data.location = isEmpty(data.location) ? "" : data.location;

  if (Validator.isEmpty(data.instruments)) {
    errors.instruments = "Instruments/Skills field is required";
  }

  if (Validator.isEmpty(data.skill)) {
    errors.skill = "Skill level field is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
