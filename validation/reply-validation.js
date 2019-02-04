const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function replyValidation(data) {
  let errors = {};

  data.text = isEmpty(data.text) ? "" : data.text;

  if (!Validator.isLength(data.text, { min: 2, max: 500 })) {
    errors.text = "Replies must be at least 2 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
