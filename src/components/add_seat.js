import React, { Component } from "react";

export default class AddSeat extends Component {
  constructor(props) {
    super(props);

    this.displaySeatList = this.displaySeatList.bind(this);
  }

  displaySeatList() {
    if (!this.props.availability || !this.props.availability.seats) {
      return null;
    }

    let seats = [];
    for (let seatID in this.props.availability.seats) {
      let seat = this.props.availability.seats[seatID];

      let ticketType = this.props.availability.seat_blocks[seat.seat_block]
        .desc;
      let seatLabel = `${ticketType} ${seat.seat_id}`;
      seats.push(
        <li key={seatLabel} onClick={e => this.props.addSeat(seatID)}>
          {seatLabel}
        </li>
      );
    }
    return seats;
  }

  render() {
    return <ul className="add-seat-list">{this.displaySeatList()}</ul>;
  }
}
