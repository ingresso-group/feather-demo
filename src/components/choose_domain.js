import React, { Component } from "react";

export default class ChooseDomain extends Component {
  render() {
    return (
      <div className="choose-domain-container">
        <small>
          This is the domain for the underlying website that Feather makes
          requests to
        </small>
        <input
          value={this.props.value}
          placeholder="Domain"
          onChange={e => this.props.onChange(e.target.value)}
        />
        <br />
        <button onClick={e => this.props.chooseDomain()}>Select</button>
      </div>
    );
  }
}
