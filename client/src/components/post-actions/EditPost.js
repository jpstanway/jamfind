import React, { Component } from "react";

class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange() {}

  onSubmit() {}

  render() {
    return (
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-10 m-auto">
            <div className="card">
              <div className="card-header">Edit Your Post</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <TextAreaInput
                    name="text"
                    placeholder="Your message..."
                    rows="3"
                    value={this.state.text}
                    onChange={this.onChange}
                    error={this.state.errors.text}
                  />
                  <button
                    type="submit"
                    className="btn btn-custom-primary float-right"
                  >
                    Submit Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPost;
