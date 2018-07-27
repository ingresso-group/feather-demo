import React, { Component } from "react";

import { getFormattedPrice } from "utils/utils";

import Seat from "components/basket/seat";
import SendMethods from "components/basket/send_methods.js";
import BasketHeader from "components/basket/basket_header";

export default class Basket extends Component {
  constructor(props) {
    super(props);

    this.displaySeats = this.displaySeats.bind(this);
    this.displayPart2 = this.displayPart2.bind(this);
    this.displayProceedButton = this.displayProceedButton.bind(this);
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
            onClick={this.props.onSeatClick}
          />
        );
      });
    });
    return seats;
  }

  displayPart2() {
    if (!this.props.expanded) {
      return null;
    }

    let reserveClassNames = "reserve";
    if (this.props.selectedMethod) {
      reserveClassNames += " enabled";
    }

    return (
      <div className="part-2">
        <BasketHeader
          message="How do you want to receive your tickets?"
          icon="paper-airplane"
        />
        <SendMethods
          methods={this.props.sendMethods}
          currency={this.props.availability.currency}
          selectSendMethod={this.props.selectSendMethod}
          selectedMethod={this.props.selectedMethod}
        />
        <button className={reserveClassNames} onClick={this.props.reserveSeats}>
          Reserve
        </button>
      </div>
    );
  }

  displayProceedButton() {
    if (this.props.expanded) {
      return (
        <button className="proceed" onClick={this.props.closeBasket}>
          Close basket
        </button>
      );
    }

    return (
      <button className="proceed" onClick={this.props.openBasket}>
        Proceed
      </button>
    );
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

    let classNames = ["basket"];
    if (basketIsActive) {
      classNames.push("active");
    }
    if (this.props.expanded) {
      classNames.push("expanded");
    }
    let classNameStr = classNames.join(" ");

    let formattedTotal;

    if (this.props.basket && this.props.basket.hasOwnProperty("total")) {
      formattedTotal = getFormattedPrice(
        this.props.basket.total,
        this.props.availability.currency
      );
    }

    console.log("this.props = ", this.props);

    let headerMessage = `Your order summary`;
    if (formattedTotal) {
      headerMessage += ` (${formattedTotal})`;
    }
    let headerSubMessage = null;
    if (this.props.concessions && this.props.concessions.length > 0) {
      headerSubMessage = "(discounts available, click on a seat for more info)";
    }

    return (
      <div className={classNameStr}>
        <div>
          <BasketHeader
            message={headerMessage}
            subMessage={headerSubMessage}
            icon="shopping-basket"
            button={this.displayProceedButton()}
          />
        </div>
        <ul className="seats">{this.displaySeats()}</ul>

        {this.displayPart2()}
      </div>
    );
  }
}
