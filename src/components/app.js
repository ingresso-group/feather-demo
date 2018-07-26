import React, { Component } from "react";

import Basket from "components/basket/basket";
import Sidebar from "components/sidebar";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: {},
      availability: {},
      basketExpanded: false,
    };

    this.chart = null;

    // Own class methods
    this.initFeather = this.initFeather.bind(this);

    // Feather imperative methods
    this.removeSeat = this.removeSeat.bind(this);

    // Feather callbacks
    this.onAddSeat = this.onAddSeat.bind(this);
    this.onRemoveSeat = this.onRemoveSeat.bind(this);
    this.onNewAvailabilityData = this.onNewAvailabilityData.bind(this);
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
    this.chart.onNewAvailabilityData = this.onNewAvailabilityData;
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

  onNewAvailabilityData(event) {
    console.log(event);
    this.setState({ availability: event.availability });
  }

  removeSeat(seatUUID) {
    this.chart.removeSeat(seatUUID);
  }

  render() {
    let featherClassNames = "";
    if (this.state.basketExpanded) {
      featherClassNames = "minimised";
    }

    return (
      <div className="main-container">
        <Sidebar />
        <div className="main-content">
          <div className={`feather-container ${featherClassNames}`} />
          <Basket
            basket={this.state.basket}
            removeSeat={this.removeSeat}
            availability={this.state.availability}
            expanded={this.state.basketExpanded}
            openBasket={() => this.setState({ basketExpanded: true })}
            closeBasket={() => this.setState({ basketExpanded: false })}
          />
        </div>
      </div>
    );
  }
}
