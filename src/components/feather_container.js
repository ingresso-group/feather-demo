import React, { Component } from "react";

export default class FeatherContainer extends Component {
  constructor(props) {
    super(props);
    this.initFeather = this.initFeather.bind(this);
    this.chart = null;
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
    let chart = new IngressoSeatingPlan();

    // subscribing to events
    // chart.onAddSeat = addSeat;
    // chart.onRemoveSeat = removeSeat;
    // chart.onEmptyBasket = emptyBasket;
    // chart.onSeatsReserved = seatsReserved;
    // chart.onGoToCheckout = goToCheckout;
    // chart.onNewAvailabilityData = onNewAvailabilityData;
    // chart.onNewLegendColors = onNewLegendColors;
    // chart.onReserveStopped = onReserveStopped;
    // chart.onNewSendMethodsData = onNewSendMethodsData;
    // chart.onEvent = onEvent;
    chart.init(chartConfig);
  }

  render() {
    return <div className="feather-container" />;
  }
}
