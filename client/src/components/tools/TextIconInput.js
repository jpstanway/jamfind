import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextIconInput = ({
  label,
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  disabled,
  error,
  info
}) => {
  return (
    <div className="input-group mb-3">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="input-group-prepend">
        <span className="input-group-text" id={name}>
          <i className={icon} />
        </span>
      </div>
      <input
        type={type}
        className={classnames("form-control", {
          "is-invalid": error
        })}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextIconInput.defaultProps = {
  type: "text"
};

TextIconInput.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string
};

export default TextIconInput;
