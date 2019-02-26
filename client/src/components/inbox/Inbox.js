import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CreateMessage from "./CreateMessage";
import ConversationFeed from "./ConversationFeed";
import {
  getUserInbox,
  sendPrivateMessage,
  prepopulateUser
} from "../../actions/inboxActions";

class Inbox extends Component {
  componentDidMount() {
    this.props.getUserInbox();
  }

  render() {
    const { errors, inbox, sendPrivateMessage, prepopulateUser } = this.props;

    return (
      <div className="container">
        <CreateMessage
          errors={errors}
          username={inbox.prepopulate}
          prepopulateUser={prepopulateUser}
          sendPrivateMessage={sendPrivateMessage}
        />
        <ConversationFeed inbox={inbox} />
      </div>
    );
  }
}

Inbox.propTypes = {
  getUserInbox: PropTypes.func.isRequired,
  sendPrivateMessage: PropTypes.func.isRequired,
  prepopulateUser: PropTypes.func.isRequired,
  inbox: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  inbox: state.inbox,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUserInbox, sendPrivateMessage, prepopulateUser }
)(Inbox);
