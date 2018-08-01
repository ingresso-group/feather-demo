import React, { Component } from "react";

export default class ChooseEvent extends Component {
  render() {
    return (
      <div className="choose-event-container">
        <small>
          It will initially select the <br /> first available performance
        </small>
        <input
          value={this.props.value}
          placeholder="Event ID"
          onChange={e => this.props.onChange(e.target.value )}
        />
        <br />
        <button onClick={e => this.props.chooseEvent()}>
          Select
        </button>
      </div>
    );
  }
}
