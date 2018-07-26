import React, { Component } from "react";

import { getFormattedPrice } from "utils/utils";

export default class Seat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const block = this.props.block;
    const seat = this.props.seat;
    const currency = this.props.currency;
    const legendItem = this.props.legendItem;

    let formattedPrice = getFormattedPrice(legendItem.price, currency);

    return (
      <li>
        <span className="description">
          {block.desc} {seat.seat_id} -{" "}
        </span>{" "}
        <span className="price">{formattedPrice}</span>
        <i
          className="fa fa-close remove"
          onClick={e => this.props.removeSeat(seat.uuid)}
        />
      </li>
    );
  }
}
