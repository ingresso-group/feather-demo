import React, { Component } from "react";

import EventLog from "components/event_log";
import AddSeat from "components/add_seat";
import ChoosePerf from "components/choose_perf";
import ChooseEvent from "components/choose_event";
import ChooseDomain from "components/choose_domain";
import ChartControls from "components/chart_controls";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.displayItems = this.displayItems.bind(this);
    this.toggleItem = this.toggleItem.bind(this);

    this.state = {
      items: [
        {
          label: "Add a seat",
          id: "add-seat",
          icon: "fa-plus-circle",
          selected: false,
          showContentMethod: "displayAddSeat",
        },
        {
          label: "Change domain",
          id: "choose-domain",
          icon: "fa-code",
          selected: false,
          showContentMethod: "displayChooseDomain",
        },
        {
          label: "Change event",
          id: "choose-event",
          icon: "fa-star",
          selected: false,
          showContentMethod: "displayChooseEvent",
        },
        {
          label: "Change performance",
          id: "choose-perf",
          icon: "fa-trophy",
          selected: false,
          showContentMethod: "displayChoosePerf",
        },
        {
          label: "Chart controls",
          id: "chart-controls",
          icon: "fa-wrench",
          selected: false,
          showContentMethod: "displayChartControls",
        },
        {
          label: "Event log",
          id: "event-log",
          icon: "fa-list-alt",
          selected: false,
          showContentMethod: "displayEventLog",
        },
      ],
    };
  }

  displayAddSeat() {
    return (
      <AddSeat
        availability={this.props.availability}
        addSeat={this.props.addSeat}
      />
    );
  }

  displayChooseDomain() {
    return (
      <ChooseDomain
        value={this.props.domain}
        onChange={this.props.onChangeDomain}
        chooseDomain={this.props.chooseDomain}
      />
    );
  }

  displayChooseEvent() {
    return (
      <ChooseEvent
        value={this.props.eventID}
        onChange={this.props.onChangeEvent}
        chooseEvent={this.props.chooseEvent}
      />
    );
  }

  displayChoosePerf() {
    return (
      <ChoosePerf
        value={this.props.perfID}
        onChange={this.props.onChangePerf}
        choosePerf={this.props.choosePerf}
      />
    );
  }

  displayChartControls() {
    return <ChartControls {...this.props} />;
  }

  displayEventLog() {
    return (
      <EventLog
        events={this.props.events}
        selectEvent={this.props.selectEvent}
      />
    );
  }

  toggleItem(itemID) {
    let newItems = JSON.parse(JSON.stringify(this.state.items));
    newItems.forEach(item => {
      if (item.id === itemID) {
        item.selected = !item.selected;
      }
    });
    this.setState({ items: newItems });
  }

  displayItems() {
    return this.state.items.map(item => {
      let className = "";
      let arrowIcon;
      let content = null;

      if (item.selected) {
        className = "selected";
        arrowIcon = "fa-chevron-down";
        content = this[item.showContentMethod].call(this);
      } else {
        arrowIcon = "fa-chevron-right";
      }

      return (
        <li key={item.id}>
          <label className={className} onClick={e => this.toggleItem(item.id)}>
            <i className={"icon fa " + item.icon} />
            {item.label}
            <i className={"arrow fa " + arrowIcon} />
          </label>
          <div className="content">{content}</div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="sidebar">
        <p>
          <img className="logo" src="assets/feather-icon.png" />
        </p>
        <ul className="menu">{this.displayItems()}</ul>
      </div>
    );
  }
}
