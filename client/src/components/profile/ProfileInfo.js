import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import Marked from "marked";
import DOMPurify from "dompurify";

Marked.setOptions({
  breaks: true
});

class ProfileInfo extends Component {
  render() {
    const cleanText = DOMPurify.sanitize(this.props.bio);

    return (
      <div className="row mt-3">
        <div className="col-md-12">
          <h4>Bio</h4>
          <div className="card">
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>
                  {isEmpty(this.props.bio) ? (
                    "User has not entered a bio yet."
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{ __html: Marked(cleanText) }}
                    />
                  )}
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileInfo;
