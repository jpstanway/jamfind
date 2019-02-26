import React, { Component } from "react";
import TextFieldInput from "../tools/TextFieldInput";
import TextAreaInput from "../tools/TextAreaInput";

class CreateMessage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      message: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.username) {
      this.setState({ username: this.props.username });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount() {
    this.props.prepopulateUser(null);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newMessage = {
      username: this.state.username,
      message: this.state.message
    };
    this.props.sendPrivateMessage(newMessage);
  }

  render() {
    const { errors, username, message } = this.state;

    return (
      <div className="row mb-3">
        <div className="col-md-10 m-auto">
          <div className="card">
            <div className="card-header">Create A Private Message</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <TextFieldInput
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={this.onChange}
                  error={errors.username}
                />
                <TextAreaInput
                  name="message"
                  placeholder="Your message..."
                  rows="3"
                  value={message}
                  onChange={this.onChange}
                  error={errors.message}
                />
                <button
                  type="submit"
                  className="btn btn-custom-primary float-right"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateMessage;
