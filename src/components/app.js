import React, { Component } from "react";

import Basket from "components/basket";
import Sidebar from "components/sidebar";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: {},
    };

    this.chart = null;

    this.removeSeat = this.removeSeat.bind(this);

    this.onAddSeat = this.onAddSeat.bind(this);
    this.onRemoveSeat = this.onRemoveSeat.bind(this);
    this.initFeather = this.initFeather.bind(this);
  }

  componentDidMount() {
    this.initFeather();
  }

  initFeather() {
    let chartConfig = {
      eventID: "7AB",
      perfID: "7AB-5",
      selector: ".feather-container",
      silenceWarnings: false,
      preloaderColor: "#EC008C",
      useHTTPS: true,
      hasCustomLegend: true,
    };

    // initialising the widget
    this.chart = new IngressoSeatingPlan();

    // subscribing to events
    this.chart.onAddSeat = this.onAddSeat;
    this.chart.onRemoveSeat = this.onRemoveSeat;
    // chart.onEmptyBasket = emptyBasket;
    // chart.onSeatsReserved = seatsReserved;
    // chart.onGoToCheckout = goToCheckout;
    // chart.onNewAvailabilityData = onNewAvailabilityData;
    // chart.onNewLegendColors = onNewLegendColors;
    // chart.onReserveStopped = onReserveStopped;
    // chart.onNewSendMethodsData = onNewSendMethodsData;
    // chart.onEvent = onEvent;
    this.chart.init(chartConfig);
  }

  onAddSeat(event) {
    console.log("onAddSeat() 2 event = ", event);
    this.setState({ basket: event.basket });
  }
  onRemoveSeat(event) {
    this.setState({ basket: event.basket });
  }

  removeSeat(seatUUID) {
    this.chart.removeSeat(seatUUID);
  }

  render() {
    return (
      <div className="main-container">
        <Sidebar />
        <div className="main-content">
          <div className="feather-container" />
          <Basket basket={this.state.basket} removeSeat={this.removeSeat} />
        </div>
      </div>
    );
  }
}
