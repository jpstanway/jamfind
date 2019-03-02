import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CreateMessage from "./CreateMessage";
import ConversationFeed from "./ConversationFeed";
import Loading from "../tools/Loading";
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
    let inboxContent;

    if (inbox === null || inbox.isLoading) {
      inboxContent = <Loading />;
    } else {
      inboxContent = (
        <div className="inbox">
          <CreateMessage
            errors={errors}
            inbox={inbox}
            username={inbox.prepopulate}
            prepopulateUser={prepopulateUser}
            sendPrivateMessage={sendPrivateMessage}
          />
          <ConversationFeed inbox={inbox} />
        </div>
      );
    }

    return <div className="container">{inboxContent}</div>;
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
