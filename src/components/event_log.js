import React, { Component } from "react";

export default class EventLog extends Component {
  constructor(props) {
    super(props);

    this.displayEventList = this.displayEventList.bind(this);
  }

  displayEventList() {
    if (!this.props.events && this.props.events.length === 0) {
      return null;
    }

    return this.props.events.map((event, index) => {
      return (
        <li
          key={`${event.eventName}-${index}`}
          onClick={e => this.props.selectEvent(event)}
        >
          {event.eventName}
        </li>
      );
    });
  }

  render() {
    return <ul className="event-log">{this.displayEventList()}</ul>;
  }
}
