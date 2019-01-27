import React, { Component } from "react";

class PostAuth extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-10 m-auto">
          <div className="card p-2">
            <div className="row">
              <div className="col-md-3 text-center">
                <img
                  src="https://res.cloudinary.com/mtninja/image/upload/c_scale,w_200/v1546924700/testimonial-1_joiu2o.jpg"
                  className="m-auto img-thumbnail"
                  alt="..."
                />
                <h5>John Doe</h5>
                <p>Vocalist</p>
                <small>Seattle, WA</small>
              </div>
              <div className="col-md-7">
                <p>Post content here...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostAuth;
