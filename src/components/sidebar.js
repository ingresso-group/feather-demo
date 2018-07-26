import React, { Component } from "react";

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
        },
        {
          label: "Choose a perf",
          id: "choose-perf",
          icon: "fa-trophy",
          selected: false,
        },
        {
          label: "Chart controls",
          id: "chart-controls",
          icon: "fa-wrench",
          selected: false,
        },
        {
          label: "Events fired",
          id: "events-fired",
          icon: "fa-list-alt",
          selected: false,
        },
      ],
    };
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

      if (item.selected) {
        className = "selected";
        arrowIcon = "fa-chevron-down";
      } else {
        arrowIcon = "fa-chevron-right";
      }

      return (
        <li
          onClick={e => this.toggleItem(item.id)}
          className={className}
          key={item.id}
        >
          <i className={"icon fa " + item.icon} />
          {item.label}
          <i className={"arrow fa " + arrowIcon} />
        </li>
      );
    });
  }

  render() {
    return (
      <div className="sidebar">
        <p>
          {/* <i className="fa fa-feather-alt" /> */}
          <img className="logo" src="assets/feather-icon.png" />
        </p>
        <ul className="menu">{this.displayItems()}</ul>
      </div>
    );
  }
}
