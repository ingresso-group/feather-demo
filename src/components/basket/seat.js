import React, { Component } from "react";

import { getFormattedPrice } from "utils/utils";

export default class Seat extends Component {
  constructor(props) {
    super(props);

    this.displayRemoveButton = this.displayRemoveButton.bind(this);
  }

  displayRemoveButton() {
    if (!this.props.removable) {
      return null;
    }

    return (
      <i
        className="fa fa-close remove"
        onClick={e => this.props.removeSeat(seat.uuid)}
      />
    );
  }

  render() {
    const block = this.props.block;
    const seat = this.props.seat;
    const currency = this.props.currency;
    const legendItem = this.props.legendItem;

    let label = `${block.desc} ${seat.seat_id} - `;
    let formattedPrice;
    let selectedConcessionIndex = null;

    if (seat.concessions && seat.concessions.length) {
      seat.concessions.forEach((concession, index) => {
        if (concession.code === seat.selectedConcession.code) {
          selectedConcessionIndex = index;
        }
      });
    }

    if (selectedConcessionIndex) {
      formattedPrice = getFormattedPrice(
        seat.selectedConcession.seatprice + seat.selectedConcession.surcharge,
        currency
      );
      label += `${formattedPrice} (${seat.selectedConcession.description})`;
    } else {
      formattedPrice = getFormattedPrice(legendItem.price, currency);
      label += formattedPrice;
    }

    return (
      <li onClick={e => this.props.onClick(e, seat)}>
        <span className="description">{label}</span>{" "}
        {this.displayRemoveButton()}
      </li>
    );
  }
}
