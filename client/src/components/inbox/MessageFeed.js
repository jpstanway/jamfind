import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";

export default class MessageFeed extends Component {
  render() {
    const { messages } = this.props;
    let messageFeed = messages.map(message => (
      <div key={message._id} className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <small className="text-muted float-right">
                Sent <Moment fromNow>{message.date}</Moment>
              </small>
              <p>
                <strong>{message.username}</strong> {message.message}
              </p>
              <Link
                to={`/inbox/${message._id}`}
                className="btn btn-link text-custom-actions btn-sm float-right"
              >
                View Conversation <i className="fas fa-angle-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));

    messageFeed = isEmpty(messageFeed) ? (
      <h3 className="text-center text-muted">You have no messages</h3>
    ) : (
      messageFeed
    );

    return (
      <div className="row">
        <div className="col-md-10 m-auto">{messageFeed}</div>
      </div>
    );
  }
}
