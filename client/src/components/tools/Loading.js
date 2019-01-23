import React from "react";
import loading from "../../imgs/loading.gif";

const Loading = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <img src={loading} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
