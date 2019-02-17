const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function privateMessageValidation(data) {
  let errors = {};

  data.username = isEmpty(data.username) ? "" : data.username;
  data.message = isEmpty(data.message) ? "" : data.message;

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (!Validator.isLength(data.message, { min: 2, max: 500 })) {
    errors.message = "Messages must be at least 2 characters";
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = "Message field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
