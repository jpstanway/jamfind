const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function changePasswordValidation(data) {
  let errors = {};

  // test for empty inputs
  data.password = isEmpty(data.password) ? "" : data.password;
  data.newPassword = isEmpty(data.newPassword) ? "" : data.newPassword;
  data.newPassword2 = isEmpty(data.newPassword2) ? "" : data.newPassword2;

  // perform validation on each input
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = "Password field is required";
  }

  if (Validator.isEmpty(data.newPassword2)) {
    errors.newPassword2 = "Please confirm your password";
  }

  if (!Validator.equals(data.newPassword, data.newPassword2)) {
    errors.newPassword2 = "Passwords do not match";
  }

  // return errors object and boolean
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
