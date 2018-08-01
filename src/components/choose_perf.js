import React, { Component } from "react";

export default class ChoosePerf extends Component {
  render() {
    return (
      <div className="choose-perf-container">
        <input
          value={this.props.value}
          placeholder="Performance ID"
          onChange={e => this.props.onChange(e.target.value)}
        />
        <br />
        <button onClick={e => this.props.choosePerf()}>Select</button>
      </div>
    );
  }
}
