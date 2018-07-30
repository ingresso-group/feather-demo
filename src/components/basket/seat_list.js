import React, { Component } from "react";

import Seat from "components/basket/seat";

export default class SeatList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (
      !this.props.basket ||
      !this.props.basket.seatBundles ||
      this.props.basket.seatBundles.length === 0
    ) {
      return null;
    }

    let seats = [];

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
            onClick={this.props.onSeatClick}
            removable={this.props.seatsAreRemovable}
          />
        );
      });
    });

    return seats;
  }
}
