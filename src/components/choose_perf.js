import React, { Component } from "react";

export default class ChoosePerf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      perfID: "",
    };
  }

  render() {
    return (
      <div className="choose-perf-container">
        <input
          value={this.state.perfID}
          placeholder="Performance ID"
          onChange={e => this.setState({ perfID: e.target.value })}
        />
        <br />
        <button onClick={e => this.props.choosePerf(this.state.perfID)}>
          Select
        </button>
      </div>
    );
  }
}
