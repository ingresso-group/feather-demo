import React, { Component } from "react";

export default class ChooseEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventID: "7AB",
    };
  }

  render() {
    return (
      <div className="choose-event-container">
        <small>
          It will initially select the <br /> first available performance
        </small>
        <input
          value={this.state.eventID}
          placeholder="Event ID"
          onChange={e => this.setState({ eventID: e.target.value })}
        />
        <br />
        <button onClick={e => this.props.chooseEvent(this.state.eventID)}>
          Select
        </button>
      </div>
    );
  }
}
