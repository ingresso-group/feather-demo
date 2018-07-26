import React, { Component } from "react";

export default class Basket extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="basket">
        <p className="header">Your order summary</p>
      </div>
    );
  }
}
