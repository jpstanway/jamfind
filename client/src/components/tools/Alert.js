import React from "react";
import PropTypes from "prop-types";

const Alert = ({ alert }) => {
  return (
    <div className="row">
      <div className="col-md-8 m-auto">
        {alert && (
          <div className="alert alert-custom-success" role="alert">
            {alert}
          </div>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.string
};

export default Alert;
