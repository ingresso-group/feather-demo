import React, { Component } from "react";
import ReactJson from "react-json-view";

export default class EventContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside className="event-content">
        <i className="fa fa-close close-button" onClick={this.props.onClose} />
        <ReactJson
          src={this.props.content}
          collapsed={2}
          displayDataTypes={false}
          enableClipboard={false}
          iconStyle="circle"
        />
      </aside>
    );
  }
}
