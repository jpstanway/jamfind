import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addNewReply } from "../../actions/postActions";
import TextAreaInput from "../tools/TextAreaInput";

class PostReply extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newReply = {
      text: this.state.text
    };

    this.props.addNewReply(newReply, this.props.postid);
  }

  render() {
    return (
      <div className="row mt-3 mb-3">
        <div className="col-md-10 m-auto">
          <div className="card">
            <div className="card-header">Have something to say?</div>
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
                  Reply
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostReply.propTypes = {
  addNewReply: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addNewReply }
)(PostReply);
