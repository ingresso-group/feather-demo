import React, { Component } from "react";

import { getFormattedPrice } from "../../utils/utils";

export default class SendMethods extends Component {
    constructor(props) {
        super(props);

        this.displaySendMethods = this.displaySendMethods.bind(this);
    }

    displaySendMethods() {
        if (!this.props.methods) {
            return null;
        }

        return this.props.methods.map((method) => {
            let formattedCost = getFormattedPrice(
                method.cost,
                this.props.currency
            );
            let classNames = "";
            if (method.code === this.props.selectedMethod) {
                classNames += "selected";
            }
            return (
                <li
                    key={method.code}
                    className={classNames}
                    onClick={(e) => this.props.selectSendMethod(method.code)}
                >
                    <span className="description">{method.description} </span> -{" "}
                    <span className="cost">{formattedCost}</span>
                </li>
            );
        });
    }

    render() {
        return <ul className="send-methods">{this.displaySendMethods()}</ul>;
    }
}
