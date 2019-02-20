import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CreateMessage from "./CreateMessage";
import MessageFeed from "./MessageFeed";
import { sendPrivateMessage, refreshUser } from "../../actions/authActions";

class Inbox extends Component {
  render() {
    const { errors, auth, sendPrivateMessage } = this.props;

    return (
      <div className="container">
        <CreateMessage
          errors={errors}
          sendPrivateMessage={sendPrivateMessage}
          refreshUser={refreshUser}
        />
        <MessageFeed messages={auth.user.messages} />
      </div>
    );
  }
}

Inbox.propTypes = {
  sendPrivateMessage: PropTypes.func.isRequired,
  refreshUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { sendPrivateMessage, refreshUser }
)(Inbox);
