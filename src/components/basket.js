import React, { Component } from "react";

import Seat from "components/seat";

export default class Basket extends Component {
  constructor(props) {
    super(props);

    this.displaySeats = this.displaySeats.bind(this);
  }

  displaySeats() {
    let seats = [];
    if (!this.props.basket || !this.props.basket.seatBundles) {
      return null;
    }
    this.props.basket.seatBundles.forEach(bundle => {
      bundle.seats.forEach(seat => {
        seats.push(
          <Seat
            key={seat.uuid}
            bundle={bundle}
            seat={seat}
            legendItem={this.props.availability.legend[seat.legend]}
            currency={this.props.availability.currency}
            block={this.props.availability.seat_blocks[seat.seat_block]}
          />
        );
      });
    });
    return seats;
  }

  render() {
    let basketIsActive = false;
    if (
      this.props.basket &&
      this.props.basket.seatBundles &&
      this.props.basket.seatBundles.length > 0
    ) {
      basketIsActive = true;
    }

    console.log("basket() availability: ", this.props.availability);
    return (
      <div className="basket">
        <p className={`header ${basketIsActive ? "active" : ""}`}>
          <i className="fa fa-shopping-basket" />
          Your order summary
        </p>
        <ul className="seats">{this.displaySeats()}</ul>
      </div>
    );
  }
}
