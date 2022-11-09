import React, { Component } from "react";

import { getFormattedPrice } from "../../utils/utils";

export default class Seat extends Component {
    constructor(props) {
        super(props);

        this.displayRemoveButton = this.displayRemoveButton.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        if (
            this.props.seat.concessions &&
            this.props.seat.concessions.length > 1
        ) {
            if (
                this.props.onClick &&
                typeof this.props.onClick === "function"
            ) {
                this.props.onClick(e, this.props.seat);
            }
        }
    }

    displayRemoveButton() {
        if (!this.props.removable) {
            return null;
        }

        return (
            <i
                className="fa fa-close remove"
                onClick={(e) => this.props.removeSeat(e, this.props.seat.uuid)}
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
                seat.selectedConcession.seatprice +
                    seat.selectedConcession.surcharge,
                currency
            );
            label += `${formattedPrice} (${seat.selectedConcession.description})`;
        } else {
            if (legendItem) {
                formattedPrice = getFormattedPrice(legendItem.price, currency);
            } else {
                formattedPrice = "Not available";
            }

            label += formattedPrice;
        }

        return (
            <li onClick={this.onClick}>
                <span className="description">{label}</span>{" "}
                {this.displayRemoveButton()}
            </li>
        );
    }
}
