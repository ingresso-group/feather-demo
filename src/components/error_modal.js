import React, { Component } from "react";

export default class ErrorModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside className="error-modal-container">
        <div className="content">
          <i
            className="fa fa-close button-close"
            onClick={this.props.onClose}
          />
          <p className="title">{this.props.title}</p>
          <p className="message">{this.props.message}</p>
        </div>
      </aside>
    );
  }
}
