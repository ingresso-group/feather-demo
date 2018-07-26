import React, { Component } from "react";

import Basket from "components/basket/basket";
import Sidebar from "components/sidebar";
import Concessions from "components/concessions";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: {},
      availability: {},
      basketExpanded: false,
      sendMethods: null,
      selectedMethod: null,
      concessions: null,
      concessionsIsOpen: false,
    };

    this.chart = null;

    // Own class methods
    this.initFeather = this.initFeather.bind(this);
    this.onSeatClick = this.onSeatClick.bind(this);
    this.displayConcessions = this.displayConcessions.bind(this);

    // Feather imperative methods
    this.removeSeat = this.removeSeat.bind(this);
    this.selectSendMethod = this.selectSendMethod.bind(this);
    this.reserveSeats = this.reserveSeats.bind(this);
    this.selectConcession = this.selectConcession.bind(this);

    // Feather callbacks
    this.onAddSeat = this.onAddSeat.bind(this);
    this.onRemoveSeat = this.onRemoveSeat.bind(this);
    this.onNewAvailabilityData = this.onNewAvailabilityData.bind(this);
    this.onNewSendMethodsData = this.onNewSendMethodsData.bind(this);
    this.onNewConcessionsData = this.onNewConcessionsData.bind(this);
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
    // this.chart.onEmptyBasket = this.emptyBasket;
    this.chart.onSeatsReserved = this.onSeatsReserved;
    this.chart.onGoToCheckout = this.onGoToCheckout;
    this.chart.onNewAvailabilityData = this.onNewAvailabilityData;
    // this.chart.onNewLegendColors = this.onNewLegendColors;
    // this.chart.onReserveStopped = this.onReserveStopped;
    this.chart.onNewConcessionsData = this.onNewConcessionsData;
    this.chart.onNewSendMethodsData = this.onNewSendMethodsData;
    // this.chart.onEvent = this.onEvent;
    this.chart.init(chartConfig);
  }

  onSeatClick(e) {
    console.log("onSeatClick()");
    this.setState({ concessionsIsOpen: true });
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

  onNewSendMethodsData(event) {
    console.log(event);
    this.setState({ sendMethods: event.sendMethods });
  }

  onNewConcessionsData(event) {
    console.log("onNewConcessionsData() event = ", event);
    this.setState({ concessions: event.concessions });
  }

  removeSeat(seatUUID) {
    this.chart.removeSeat(seatUUID);
  }

  selectSendMethod(methodCode) {
    this.chart.selectSendMethod(methodCode);
    console.log("selectSendMethod() methodCode = ", methodCode);
    this.setState({ selectedMethod: methodCode });
  }

  reserveSeats() {
    this.chart.reserve();
  }

  goToCheckout(event) {
    console.log("goToCheckout() event = ", event);
  }

  onGoToCheckout(event) {
    console.log("onGoToCheckout() event = ", event);
  }
  onSeatsReserved(event) {
    console.log("onSeatsReserved() event = ", event);
  }

  displayConcessions() {
    if (!this.state.concessionsIsOpen) {
      return null;
    }

    return (
      <Concessions
        items={this.state.concessions}
        currency={this.state.availability.currency}
        onItemSelected={this.props.selectConcession}
      />
    );
  }

  selectConcession(item) {
    console.log("selectConcession() item = ", item);
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
            // data
            basket={this.state.basket}
            availability={this.state.availability}
            sendMethods={this.state.sendMethods}
            expanded={this.state.basketExpanded}
            concessions={this.state.concessions}
            selectSendMethod={this.selectSendMethod}
            selectedMethod={this.state.selectedMethod}
            // callbacks
            openBasket={() => this.setState({ basketExpanded: true })}
            closeBasket={() => this.setState({ basketExpanded: false })}
            reserveSeats={this.reserveSeats}
            removeSeat={this.removeSeat}
            onSeatClick={this.onSeatClick}
          />
        </div>
        {this.displayConcessions()}
      </div>
    );
  }
}
