import React, { Component } from "react";

import { getFormattedPrice } from "utils/utils";

import SendMethods from "components/basket/send_methods.js";
import BasketHeader from "components/basket/basket_header";
import SeatList from "components/basket/seat_list";

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
    return <SeatList {...this.props} seatsAreRemovable={true} />;
  }

  displayPart2() {
    if (!this.props.expanded) {
      return null;
    }

    let reserveClassNames = "reserve";
    let reserveLabel = "Reserve";
    if (this.props.selectedMethod) {
      reserveClassNames += " enabled";
    }
    if (this.props.isWaitingForReserve) {
      reserveClassNames += " loading";
      reserveLabel = "Loading...";
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
          {reserveLabel}
        </button>
      </div>
    );
  }

  displayProceedButton(basketIsActive) {
    let onClick;
    const proceedClassNames = ["proceed"];
    if ((this.props.canProceed && basketIsActive) || this.props.expanded) {
      proceedClassNames.push("enabled");
    }

    let proceedLabel;
    if (this.props.expanded) {
      proceedLabel = "Close basket";
      onClick = this.props.closeBasket;
    } else if (this.props.canProceed) {
      proceedLabel = "Proceed";
      onClick = this.props.openBasket;
    } else {
      proceedLabel = "Your selection cannot leave single seats";
    }

    return (
      <button className={proceedClassNames.join(" ")} onClick={onClick}>
        {proceedLabel}
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

    let headerMessage = `Your order summary`;
    if (formattedTotal) {
      headerMessage += ` (${formattedTotal})`;
    }
    let headerSubMessage = null;
    if (
      this.props.concessions &&
      this.props.concessions.length > 1 &&
      this.props.basket.seats &&
      this.props.basket.seats.length > 0
    ) {
      headerSubMessage = "(discounts available, click on a seat for more info)";
    }

    return (
      <div className={classNameStr}>
        <div>
          <BasketHeader
            message={headerMessage}
            subMessage={headerSubMessage}
            icon="shopping-basket"
            button={this.displayProceedButton(basketIsActive)}
          />
        </div>
        <ul className="seats">{this.displaySeats()}</ul>

        {this.displayPart2()}
      </div>
    );
  }
}
