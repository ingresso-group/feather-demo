import React, { Component } from "react";

export default class ChooseDomain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // domain: "https://test.ticketswitch.com",
      domain: "https://www.dragos-laptop.ingresso.co.uk",
    };
  }

  render() {
    return (
      <div className="choose-domain-container">
        <small>
          This is the domain for the underlying website that Feather makes
          requests to
        </small>
        <input
          value={this.state.domain}
          placeholder="Domain"
          onChange={e => this.setState({ domain: e.target.value })}
        />
        <br />
        <button onClick={e => this.props.chooseDomain(this.state.domain)}>
          Select
        </button>
      </div>
    );
  }
}
