import React, { Component } from "react";

import Basket from "components/basket/basket";
import Sidebar from "components/sidebar";
import Concessions from "components/concessions";
import Checkout from "components/checkout";
import EventContent from "components/event_content";
import ErrorModal from "components/error_modal";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data
      basket: {},
      availability: {},
      sendMethods: null,
      selectedMethod: null,
      highlightedSeat: null,
      transactionUUID: null,
      events: [],
      selectedEventFromLog: null,
      concessions: [],
      // domain: "https://test.qa.ingresso.co.uk",
      domain: "https://www.dragos-laptop.ingresso.co.uk",
      // eventID: "7AB",
      // perfID: "7AB-5",
      eventID: "2GXJ",
      perfID: "2GXJ-56J",
      chartBackgroundColor: "#F9F9F9",

      // flags
      basketIsExpanded: false,
      concessionsIsOpen: false,
      checkoutIsOpen: false,
      error: null,
      isWaitingForReserve: false,
      canProceed: true,
    };

    this.chart = null;

    // Own class methods
    this.resetState = this.resetState.bind(this);
    this.initFeather = this.initFeather.bind(this);
    this.onSeatClick = this.onSeatClick.bind(this);
    this.displayConcessions = this.displayConcessions.bind(this);
    this.displayCheckout = this.displayCheckout.bind(this);
    this.hideConcessions = this.hideConcessions.bind(this);
    this.displayEventContent = this.displayEventContent.bind(this);
    this.displayErrorModal = this.displayErrorModal.bind(this);

    // Feather imperative methods
    this.removeSeat = this.removeSeat.bind(this);
    this.selectSendMethod = this.selectSendMethod.bind(this);
    this.reserveSeats = this.reserveSeats.bind(this);
    this.selectConcession = this.selectConcession.bind(this);
    this.addSeat = this.addSeat.bind(this);
    this.selectColorScheme = this.selectColorScheme.bind(this);
    this.halvePrices = this.halvePrices.bind(this);
    this.chooseDomain = this.chooseDomain.bind(this);
    this.chooseEvent = this.chooseEvent.bind(this);
    this.choosePerf = this.choosePerf.bind(this);
    this.changeChartBackgroundColor = this.changeChartBackgroundColor.bind(
      this
    );

    // Feather callbacks
    this.onAddSeat = this.onAddSeat.bind(this);
    this.onRemoveSeat = this.onRemoveSeat.bind(this);
    this.onNewAvailabilityData = this.onNewAvailabilityData.bind(this);
    this.onNewSendMethodsData = this.onNewSendMethodsData.bind(this);
    this.onUpdateConcessions = this.onUpdateConcessions.bind(this);
    this.onUpdateBasket = this.onUpdateBasket.bind(this);
    this.onGoToCheckout = this.onGoToCheckout.bind(this);
    this.onEvent = this.onEvent.bind(this);
    this.onError = this.onError.bind(this);
    this.onReserveStopped = this.onReserveStopped.bind(this);
    this.onEmptyBasket = this.onEmptyBasket.bind(this);
  }

  componentDidMount() {
    this.initFeather();
  }

  resetState() {
    this.setState({
      basketIsExpanded: false,
      basket: {},
      availability: {},
      sendMethods: null,
      selectedMethod: null,
      highlightedSeat: null,
      transactionUUID: null,
      canProceed: true,
    });
  }

  initFeather() {
    this.setState({ basketIsExpanded: false });

    let perfID = this.state.perfID;
    if (this.state.perfID === "") {
      perfID = null;
    }

    let chartConfig = {
      eventID: this.state.eventID,
      perfID,
      domain: this.state.domain,
      // eventID: "2GXJ",
      // perfID: "2GXJ-576",
      selector: ".feather-container",
      silenceWarnings: false,
      preloaderColor: "#EC008C",
      chartBackgroundColor: this.state.chartBackgroundColor,
      useHTTPS: true,
      hasCustomLegend: true,
    };

    // initialising the widget
    this.chart = new IngressoSeatingPlan();
    this.chart.showLegend();
    this.chart.showControls();
    this.chart.changeColorScheme([
      "#FEB390",
      "#E56B92",
      "#3D45C6",
      "#5FCEB4",
      "#4090C0",
      "#C2C094",
      "#390040",
      "#444054",
      "#BEBBBB",
      "#7C9885",
      "#FFE6E8",
      "#8E3B46",
      "#A18276",
      "#FDE74C",
      "#3891A6",
      "#4C5B5C",
    ]);

    // subscribing to events
    this.chart.onAddSeat = this.onAddSeat;
    this.chart.onRemoveSeat = this.onRemoveSeat;
    this.chart.onSeatsReserved = this.onSeatsReserved;
    this.chart.onGoToCheckout = this.onGoToCheckout;
    this.chart.onNewAvailabilityData = this.onNewAvailabilityData;
    this.chart.onUpdateConcessions = this.onUpdateConcessions;
    this.chart.onNewSendMethodsData = this.onNewSendMethodsData;
    this.chart.onUpdateBasket = this.onUpdateBasket;
    this.chart.onEvent = this.onEvent;
    this.chart.onError = this.onError;
    this.chart.onEmptyBasket = this.onEmptyBasket;
    // this.chart.onNewLegendColors = this.onNewLegendColors;
    this.chart.onReserveStopped = this.onReserveStopped;
    this.chart.init(chartConfig);
  }

  onEmptyBasket() {
    this.setState({basket: {}, canProceed: true});
  }

  onReserveStopped() {
    this.setState({basketIsExpanded: false});
  }

  onError(eventData) {
    this.setState({
      error: eventData.error,
      isWaitingForReserve: false,
      basketIsExpanded: false,
    });
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
    this.setState({ basket: event.basket, canProceed: event.canProceed });
  }
  onRemoveSeat(event) {
    let basketIsExpanded = this.state.basketIsExpanded;
    if (!event.basket.seats || event.basket.seats.length === 0) {
      basketIsExpanded = false;
    }

    this.setState({ basket: event.basket, basketIsExpanded, canProceed: event.canProceed  });
  }

  onNewAvailabilityData(event) {
    this.setState({ availability: event.availability });
  }

  onNewSendMethodsData(event) {
    console.warn('NEW SEND METHODS');
    this.setState({ sendMethods: event.sendMethods });
  }

  onUpdateConcessions(event) {
    this.setState({ basket: event.basket, concessions: event.concessions });
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
    this.setState({ isWaitingForReserve: true });
  }

  onGoToCheckout(event) {
    console.log('onGoToCheckout() event = ', event);
    this.setState({
      basket: event.basket,
      checkoutIsOpen: true,
      transactionUUID: event.transaction_uuid,
      isWaitingForReserve: false,
      basketIsExpanded: true
    });
  }
  onSeatsReserved(event) {
    this.setState({ isWaitingForReserve: false });
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

  displayErrorModal() {
    if (!this.state.error) {
      return null;
    }

    return (
      <ErrorModal
        title="There was an error"
        message={this.state.error}
        onClose={e => this.setState({ error: null })}
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
        expanded={this.state.basketIsExpanded}
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
    this.chart.selectSeats(seatID);
  }

  choosePerf() {
    this.resetState();
    this.chart.selectPerformance(this.state.perfID);
  }

  chooseEvent(eventID) {
    this.initFeather();
  }

  chooseDomain() {
    this.initFeather();
  }

  selectColorScheme(colorScheme) {
    this.chart.changeColorScheme(colorScheme);
  }

  changeChartBackgroundColor() {
    this.chart.changeChartBackgroundColor(this.state.chartBackgroundColor);
  }

  halvePrices() {
    var newLegend = JSON.parse(JSON.stringify(this.state.availability.legend));
    newLegend = newLegend.map((legendItem, index) => {
      legendItem.original_seatprice /= 2;
      legendItem.original_surcharge /= 2;
      legendItem.seatprice /= 2;
      legendItem.surcharge /= 2;
      legendItem.price /= 2;
      legendItem.savingsMessage = "legend " + index;
      return legendItem;
    });

    this.chart.setLegend(newLegend);
  }

  render() {
    let featherClassNames = "";
    if (this.state.basketIsExpanded) {
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
          domain={this.state.domain}
          eventID={this.state.eventID}
          perfID={this.state.perfID}
          onChangeDomain={domain => this.setState({ domain })}
          onChangeEvent={eventID => this.setState({ eventID })}
          onChangePerf={perfID => this.setState({ perfID })}
          chooseDomain={this.chooseDomain}
          chooseEvent={this.chooseEvent}
          choosePerf={this.choosePerf}
          chartBackgroundColor={this.state.chartBackgroundColor}
          onChangeChartBackgroundColor={chartBackgroundColor =>
            this.setState({ chartBackgroundColor })
          }
          changeChartBackgroundColor={this.changeChartBackgroundColor}
          selectColorScheme={this.selectColorScheme}
          zoomIn={this.chart ? this.chart.zoomIn : null}
          zoomOut={this.chart ? this.chart.zoomOut : null}
          resetChart={this.chart ? this.chart.resetChart : null}
          showWidget={this.chart ? this.chart.show : null}
          hideWidget={this.chart ? this.chart.hide : null}
          showLegend={this.chart ? this.chart.showLegend : null}
          hideLegend={this.chart ? this.chart.hideLegend : null}
          showControls={this.chart ? this.chart.showControls : null}
          hideControls={this.chart ? this.chart.hideControls : null}
          halvePrices={this.halvePrices}
        />
        <div className="main-content">
          <div className={`feather-container ${featherClassNames}`} />
          <Basket
            // data
            basket={this.state.basket}
            availability={this.state.availability}
            sendMethods={this.state.sendMethods}
            expanded={this.state.basketIsExpanded}
            concessions={this.state.concessions}
            selectSendMethod={this.selectSendMethod}
            selectedMethod={this.state.selectedMethod}
            // callbacks
            openBasket={() => this.setState({ basketIsExpanded: true })}
            closeBasket={() => this.setState({ basketIsExpanded: false })}
            reserveSeats={this.reserveSeats}
            removeSeat={this.removeSeat}
            onSeatClick={this.onSeatClick}
            isWaitingForReserve={this.state.isWaitingForReserve}
            canProceed={this.state.canProceed}
          />
        </div>
        {this.displayConcessions()}
        {this.displayCheckout()}
        {this.displayEventContent()}
        {this.displayErrorModal()}
      </div>
    );
  }
}
