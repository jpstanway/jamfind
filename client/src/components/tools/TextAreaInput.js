import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaInput = ({
  label,
  name,
  placeholder,
  rows,
  value,
  onChange,
  disabled,
  error,
  info
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        id={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string
};

export default TextAreaInput;
