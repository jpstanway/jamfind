import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Loading from "../tools/Loading";
import isEmpty from "../../validation/is-empty";

class ConversationFeed extends Component {
  render() {
    const { conversations, isLoading } = this.props.inbox;
    let conversationFeed;

    if (conversations === null || isLoading) {
      conversationFeed = <Loading />;
    } else {
      conversationFeed = conversations.conversations.map(conversation => (
        <div key={conversation._id} className="row">
          <div className="col-md-10 m-auto">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <small className="text-muted float-right">
                      Sent <Moment fromNow>{conversation.date}</Moment>
                    </small>
                    <p>
                      <strong>{conversation.messages[0].username}</strong>{" "}
                      {conversation.messages[0].message}
                    </p>
                    <Link
                      to={`/inbox/${conversation._id}`}
                      className="btn btn-link text-custom-actions btn-sm float-right"
                    >
                      View Conversation <i className="fas fa-angle-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    }

    conversationFeed = isEmpty(conversationFeed) ? (
      <h3 className="text-center">You have no messages</h3>
    ) : (
      conversationFeed
    );

    return <div className="container">{conversationFeed}</div>;
  }
}

export default ConversationFeed;
