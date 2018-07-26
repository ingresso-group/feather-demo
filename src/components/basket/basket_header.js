import React, { Component } from "react";

export default class BasketHeader extends Component {
  render() {
    let icon;
    if (this.props.icon) {
      icon = <i className={`fa fa-${this.props.icon}`} />;
    }
    return (
      <div className="header">
        <span className="title">
          {icon}
          {this.props.message}
          {this.props.button}
        </span>
        <span className="subtitle">{this.props.subMessage}</span>
      </div>
    );
  }
}
