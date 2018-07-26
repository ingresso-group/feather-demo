import React, { Component } from "react";

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
          <li key={seat.uuid}>
            {bundle.ticket_type_code} - {seat.seat_id}
            <i
              className="fa fa-close remove"
              onClick={e => this.props.removeSeat(seat.uuid)}
            />
          </li>
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

    console.log("basket() seats: ", this.props.basket);
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
