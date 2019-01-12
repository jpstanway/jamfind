const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function experienceValidation(data) {
  let errors = {};

  data.typeofexperience = isEmpty(data.typeofexperience)
    ? ""
    : data.typeofexperience;
  data.role = isEmpty(data.role) ? "" : data.role;
  data.from = isEmpty(data.from) ? "" : data.from;

  if (Validator.isEmpty(data.typeofexperience)) {
    errors.typeofexperience = "Type of experience is a required field";
  }

  if (Validator.isEmpty(data.role)) {
    errors.role = "Role is a required field";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date is a required field";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
