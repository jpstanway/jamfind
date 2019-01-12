const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function educationValidation(data) {
  let errors = {};

  data.school = isEmpty(data.school) ? "" : data.school;
  data.degree = isEmpty(data.degree) ? "" : data.degree;
  data.program = isEmpty(data.program) ? "" : data.program;
  data.from = isEmpty(data.from) ? "" : data.from;

  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  if (Validator.isEmpty(data.program)) {
    errors.program = "Program field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
