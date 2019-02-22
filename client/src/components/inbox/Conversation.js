import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import TextAreaInput from "../tools/TextAreaInput";
import Loading from "../tools/Loading";

class Conversation extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { message, isLoading } = this.props.auth;
    const { errors } = this.state;
    let conversation;

    if (message === null || isLoading) {
      conversation = <Loading />;
    } else {
      conversation = (
        <div className="conversation">
          <div className="row mb-3">
            <div className="col-md-12">
              <Link
                to="/inbox"
                className="btn btn-custom-outline-secondary btn-sm"
              >
                Go back
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 m-auto">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <small className="text-muted float-right">
                        Sent <Moment fromNow>{message.date}</Moment>
                      </small>
                      <p>
                        <strong>{message.username}</strong> {message.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {message.replies.map(reply => (
            <div className="row">
              <div className="col-md-10 m-auto">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <small className="text-muted float-right">
                          Sent <Moment fromNow>{reply.date}</Moment>
                        </small>
                        <p>
                          <strong>{reply.username}</strong> {reply.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="row mt-3 mb-3">
            <div className="col-md-10 m-auto">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <TextAreaInput
                      name="text"
                      placeholder="Your message..."
                      rows="3"
                      value={this.state.text}
                      onChange={this.onChange}
                      error={errors.text}
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
        </div>
      );
    }

    return <div className="container">{conversation}</div>;
  }
}

Conversation.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(Conversation);
