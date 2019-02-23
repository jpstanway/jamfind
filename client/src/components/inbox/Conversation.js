import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import TextAreaInput from "../tools/TextAreaInput";
import Loading from "../tools/Loading";
import { getConversation, addToConversation } from "../../actions/inboxActions";

class Conversation extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getConversation(this.props.match.params.conversationid);
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

    const recipient = this.props.inbox.conversation.users.filter(
      user => user !== this.props.auth.user.username
    );

    const newMessage = {
      username: recipient[0],
      message: this.state.message
    };
    this.props.addToConversation(
      newMessage,
      this.props.match.params.conversationid
    );
  }

  render() {
    const { conversation, isLoading } = this.props.inbox;
    const { errors } = this.state;
    let conversationContent;

    if (conversation === null || isLoading) {
      conversationContent = <Loading />;
    } else {
      conversationContent = (
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
          {conversation.messages.map(message => (
            <div key={message._id} className="row">
              <div className="col-md-10 m-auto">
                <div className="card mb-3">
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
          ))}
          <div className="row mt-3 mb-3">
            <div className="col-md-10 m-auto">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <TextAreaInput
                      name="message"
                      placeholder="Your message..."
                      rows="3"
                      value={this.state.message}
                      onChange={this.onChange}
                      error={errors.message}
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

    return <div className="container">{conversationContent}</div>;
  }
}

Conversation.propTypes = {
  getConversation: PropTypes.func.isRequired,
  addToConversation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  inbox: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  inbox: state.inbox,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getConversation, addToConversation }
)(Conversation);
