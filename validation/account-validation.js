const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function createAccountValidation(data) {
  let errors = {};

  // test for empty inputs
  data.username = isEmpty(data.username) ? "" : data.username;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.password2 = isEmpty(data.password2) ? "" : data.password2;

  // perform validation on each input
  if (!Validator.isLength(data.username, { min: 6, max: 30 })) {
    errors.username = "Username must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Please confirm your password";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match";
  }

  // return errors object and boolean
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
