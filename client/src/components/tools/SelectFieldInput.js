import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectFieldInput = ({
  label,
  name,
  options,
  value,
  onChange,
  disabled,
  error,
  info
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectFieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string
};

export default SelectFieldInput;
