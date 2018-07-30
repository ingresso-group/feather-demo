import React, { Component } from "react";

import Basket from "components/basket/basket";
import Sidebar from "components/sidebar";
import Concessions from "components/concessions";
import Checkout from "components/checkout";
import EventContent from "components/event_content";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data
      basket: {},
      availability: {},
      basketExpanded: false,
      sendMethods: null,
      selectedMethod: null,
      concessions: null,
      highlightedSeat: null,
      transactionUUID: null,
      events: [],
      selectedEventFromLog: null,

      // flags
      concessionsIsOpen: false,
      checkoutIsOpen: false,
    };

    this.chart = null;

    // Own class methods
    this.initFeather = this.initFeather.bind(this);
    this.onSeatClick = this.onSeatClick.bind(this);
    this.displayConcessions = this.displayConcessions.bind(this);
    this.displayCheckout = this.displayCheckout.bind(this);
    this.hideConcessions = this.hideConcessions.bind(this);
    this.displayEventContent = this.displayEventContent.bind(this);

    // Feather imperative methods
    this.removeSeat = this.removeSeat.bind(this);
    this.selectSendMethod = this.selectSendMethod.bind(this);
    this.reserveSeats = this.reserveSeats.bind(this);
    this.selectConcession = this.selectConcession.bind(this);
    this.addSeat = this.addSeat.bind(this);

    // Feather callbacks
    this.onAddSeat = this.onAddSeat.bind(this);
    this.onRemoveSeat = this.onRemoveSeat.bind(this);
    this.onNewAvailabilityData = this.onNewAvailabilityData.bind(this);
    this.onNewSendMethodsData = this.onNewSendMethodsData.bind(this);
    this.onUpdateConcessions = this.onUpdateConcessions.bind(this);
    this.onUpdateBasket = this.onUpdateBasket.bind(this);
    this.onGoToCheckout = this.onGoToCheckout.bind(this);
    this.onEvent = this.onEvent.bind(this);
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
    this.chart.onUpdateConcessions = this.onUpdateConcessions;
    this.chart.onNewSendMethodsData = this.onNewSendMethodsData;
    this.chart.onUpdateBasket = this.onUpdateBasket;
    this.chart.onEvent = this.onEvent;
    this.chart.init(chartConfig);
  }

  onEvent(eventData) {
    let newEvents = JSON.parse(JSON.stringify(this.state.events));
    let newEventData = JSON.parse(JSON.stringify(eventData));
    newEvents.unshift(newEventData);
    this.setState({ events: newEvents });
  }

  onSeatClick(e, seatData) {
    this.setState({ concessionsIsOpen: true, highlightedSeat: seatData });
  }

  onAddSeat(event) {
    this.setState({ basket: event.basket });
  }
  onRemoveSeat(event) {
    this.setState({ basket: event.basket });
  }

  onNewAvailabilityData(event) {
    this.setState({ availability: event.availability });
  }

  onNewSendMethodsData(event) {
    this.setState({ sendMethods: event.sendMethods });
  }

  onUpdateConcessions(event) {
    this.setState({ concessions: event.concessions, basket: event.basket });
  }

  removeSeat(e, seatUUID) {
    e.stopPropagation();
    this.chart.removeSeat(seatUUID);
  }

  selectSendMethod(methodCode) {
    this.chart.selectSendMethod(methodCode);
    this.setState({ selectedMethod: methodCode });
  }

  reserveSeats() {
    this.chart.reserve();
  }

  onGoToCheckout(event) {
    this.setState({
      checkoutIsOpen: true,
      transactionUUID: event.transaction_uuid,
    });
  }
  onSeatsReserved(event) {
    // console.log("onSeatsReserved() event = ", event);
  }

  displayConcessions() {
    if (!this.state.concessionsIsOpen) {
      return null;
    }

    return (
      <Concessions
        items={this.state.highlightedSeat.concessions}
        selectedItem={this.state.highlightedSeat.selectedConcession}
        currency={this.state.availability.currency}
        onItemSelected={this.selectConcession}
        onClose={this.hideConcessions}
      />
    );
  }

  displayCheckout() {
    if (!this.state.checkoutIsOpen) {
      return null;
    }

    return (
      <Checkout
        basket={this.state.basket}
        availability={this.state.availability}
        sendMethods={this.state.sendMethods}
        expanded={this.state.basketExpanded}
        concessions={this.state.concessions}
        selectSendMethod={this.selectSendMethod}
        selectedMethod={this.state.selectedMethod}
        onClose={e => this.setState({ checkoutIsOpen: false })}
        transactionUUID={this.state.transactionUUID}
      />
    );
  }

  hideConcessions() {
    this.setState({ concessionsIsOpen: false });
  }

  selectConcession(concessionCode) {
    this.chart.selectConcession(
      this.state.highlightedSeat.uuid,
      concessionCode
    );
    this.setState({ concessionsIsOpen: false });
    // console.log("selectConcession() item = ", item);
  }

  onUpdateBasket(eventData) {
    this.setState({ basket: eventData.basket });
  }

  displayEventContent() {
    if (!this.state.selectedEventFromLog) {
      return null;
    }

    return (
      <EventContent
        content={this.state.selectedEventFromLog}
        onClose={e => this.setState({ selectedEventFromLog: null })}
      />
    );
  }

  addSeat(seatID) {
    console.log("addSeat() seatID = ", seatID);
    this.chart.selectSeats(seatID);
  }

  render() {
    let featherClassNames = "";
    if (this.state.basketExpanded) {
      featherClassNames = "minimised";
    }

    return (
      <div className="main-container">
        <Sidebar
          events={this.state.events}
          selectEvent={selectedEvent =>
            this.setState({ selectedEventFromLog: selectedEvent })
          }
          availability={this.state.availability}
          addSeat={this.addSeat}
        />
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
        {this.displayCheckout()}
        {this.displayEventContent()}
      </div>
    );
  }
}
