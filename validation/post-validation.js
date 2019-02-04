const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function postValidation(data) {
  let errors = {};

  data.title = isEmpty(data.title) ? "" : data.title;
  data.text = isEmpty(data.text) ? "" : data.text;

  if (!Validator.isLength(data.title, { min: 10, max: 60 })) {
    errors.title = "Post title must be between 10 and 60 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isLength(data.text, { min: 10, max: 500 })) {
    errors.text = "Posts must be at least 10 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
