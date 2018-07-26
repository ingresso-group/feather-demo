import React, { Component } from "react";

import { getFormattedPrice } from "utils/utils";

export default class Concessions extends Component {
  constructor(props) {
    super(props);

    this.displayItems = this.displayItems.bind(this);
  }

  displayItems() {
    if (!this.props.items || this.props.items.length === 0) {
      return null;
    }

    return this.props.items.map(item => {
      let formattedTotalPrice = getFormattedPrice(
        item.seatprice + item.surcharge,
        this.props.currency
      );
      let classNames = "";
      if (item.selected) {
        classNames += " selected";
      }
      return (
        <li
          key={item.code}
          className="classNames"
          onClick={e => this.props.onItemSelected(item)}
        >
          {item.description} - {formattedTotalPrice}
        </li>
      );
    });
  }

  render() {
    return (
      <aside className="concessions-container">
        <div className="content">
          <p className="title">Select a discount type</p>
          <ul>{this.displayItems()}</ul>
        </div>
      </aside>
    );
  }
}
