import React, { Component } from "react";

class PostFeed extends Component {
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
                <div className="row">
                  <div className="col-md-12">
                    <p>Post content here...</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-secondary btn-sm mr-1">
                      <i className="fas fa-thumbs-up mr-1" />
                    </button>
                    <button className="btn btn-secondary btn-sm mr-1">
                      <i className="fas fa-thumbs-down" />
                    </button>
                    <button className="btn btn-primary btn-sm">Comment</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostFeed;
