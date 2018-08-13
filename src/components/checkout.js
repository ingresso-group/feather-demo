import React, { Component } from "react";

import SeatList from "components/basket/seat_list";

export default class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sendMethodDescription = this.props.sendMethods.filter(
      method => method.code === this.props.selectedMethod
    )[0].description;

    return (
      <aside className="checkout-container">
        <div className="content">
          <i
            className="fa fa-close button-close"
            onClick={this.props.onClose}
          />
          <p className="title">Your order is now reserved</p>
          {/* <p className="subtitle">Selected seats</p>
          <ul>
            <SeatList {...this.props} seatsAreRemovable={false} />
          </ul> */}
          <p className="subtitle">The chosen send method</p>
          <p className="send-method">{sendMethodDescription}</p>
          <p className="subtitle">Transaction UUID</p>
          <p className="transaction-uuid">{this.props.transactionUUID}</p>
        </div>
      </aside>
    );
  }
}
