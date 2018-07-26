import React, { Component } from "react";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.displayItems = this.displayItems.bind(this);
    this.selectItem = this.selectItem.bind(this);

    this.state = {
      items: [
        {
          label: "Add a seat",
          id: "add-seat",
          icon: "fa-plus-circle",
        },
        {
          label: "Choose a perf",
          id: "choose-perf",
          icon: "fa-trophy",
        },
        {
          label: "Chart controls",
          id: "chart-controls",
          icon: "fa-wrench",
        },
        {
          label: "Events fired",
          id: "events-fired",
          icon: "fa-list-alt",
        },
      ],
      selectedItem: null,
    };
  }

  selectItem(itemID) {
    this.setState({ selectedItem: itemID });
  }

  displayItems() {
    return this.state.items.map(item => {
      let className = "";
      if (item.id === this.state.selectedItem) {
        className = "selected";
      }
      return (
        <li
          onClick={e => this.selectItem(item.id)}
          className={className}
          key={item.id}
        >
          <i className={"fa " + item.icon} />
          {item.label}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="sidebar">
        <p>
          <i className="fa fa-plus-square" />
        </p>
        <ul className="menu">{this.displayItems()}</ul>
      </div>
    );
  }
}
