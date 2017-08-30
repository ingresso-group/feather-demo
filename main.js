var colors = {};
var domain = getQueryStringParam(window.location.href, 'domain');
var username = getQueryStringParam(window.location.href, 'username');
var password = getQueryStringParam(window.location.href, 'password');

// widget configuration
var chartConfig = {
  eventID: getQueryStringParam(window.location.href, 'event'),
  token: getQueryStringParam(window.location.href, 'token'),
  selector: '#chart-container',
  silenceWarnings: false,
  preloaderColor: '#EC008C',
  domain: domain,
}

var performance = getQueryStringParam(window.location.href, 'perf');

if(performance) {
  chartConfig.perfID = getQueryStringParam(window.location.href, 'perf');
}

$('button#select-perf').click(selectNewPerf);
function selectNewPerf(event) {
  var perfID = $('input#perf-id').val();
  chart.selectPerformance(perfID);
}

var perfs = ['2GXJ-441','2GXJ-442','2GXJ-47J','2GXJ-441','2GXJ-442','2GXJ-47J','2GXJ-441','2GXJ-442','2GXJ-47J'];
var crtPerf = 0;

// initialising the widget
var chart = new IngressoSeatingPlan();

// subscribing to events
chart.onAddSeat = addSeat;
chart.onRemoveSeat = removeSeat;
chart.onEmptyBasket = emptyBasket;
chart.onSeatsReserved = seatsReserved;
chart.onGoToCheckout = goToCheckout;
chart.onNewAvailabilityData = onNewAvailabilityData;
chart.onNewLegendColors = onNewLegendColors;
chart.onReserveStopped = onReserveStopped;

// setting a custom color scheme
chart.changeColorScheme(['#462446', '#B05F6D', '#EB6B56', '#FFC153', '#47B39D', '#CDCBA6', '#008891', '#00587A', '#ff0000', '#0F3057']);

chart.showControls();
document.querySelector('#checkbox-controls').checked = true;

chart.showLegend();
document.querySelector('#checkbox-legend').checked = true;

chart.init(chartConfig);

// using custom UI elements to control the widget
$('#zoom-controls #zoom-in').click(chart.zoomIn);
$('#zoom-controls #zoom-out').click(chart.zoomOut);
$('#zoom-controls #reset-chart').click(chart.resetChart);
$('#zoom-controls #show-chart').click(chart.show);
$('#zoom-controls #hide-chart').click(chart.hide);
$("#basket>button#checkout").click(onCheckoutButton);
$("#basket .empty-basket").click(onEmptyBasketButton);
$("#checkout-modal #release").click(releaseReservation);

function addSeat(data) {
  $('#response-json #content').html(syntaxHighlight(data));
  $('#response-json #event-name').text("addSeat");
  updateBasket(data.basket);
}


function updateBasket(newBasket) {
  $('#basket #seats').empty();
  newBasket.seats.forEach(function(seat) {
    var seatElement = $("<p class='item' id='" + seat.uuid + "'> </p>");
    seatElement.append("<span class='color-code' style='border-color: " + colors[seat.legend].selected + "; background-color:" + colors[seat.legend].normal + "'></span>")
    seatElement.append("<span class='description'>" + availability.seat_blocks[seat.seat_block].desc + "</span>")
    seatElement.append("<span class='price'>" + getFormattedPrice(availability.legend[seat.legend].price, availability.currency) + "</span>")
    seatElement.append("<span class='remove-seat' data-seat-id='"+seat.uuid+"'><i class='fa fa-trash'></i></span>")
    seatElement.append("<br>");
    seatElement.append("<span style='margin-left: 18px;' class='id'> Seat: " + seat.seat_id + "</span>")
    $('#basket #seats').append(seatElement);
  });
  if(newBasket.seats.length == 0) {
    $("#basket #total #label").text("Your basket is currently empty");
    $('#basket #total').removeClass("with-seats");
    $("#basket>button#checkout").css('display','none');
    $("#basket .empty-basket").css('display','none');
    $("#basket #total #value").css('opacity', '0');
  } else {
    $("#basket #total #value").css('opacity', '1');
    $("#basket #total #value").text(getFormattedPrice(newBasket.total, availability.currency));
    $("#basket #total #label").text('Total:');
    $('#basket #total').removeClass("with-seats");
    $('#basket #total').addClass("with-seats");
    $("#basket>button#checkout").css('display','block');
    $("#basket .empty-basket").css('display','block');
  }
  $('.item .remove-seat').unbind('click').bind('click', onRemoveSeatClick);
}

function onRemoveSeatClick(event) {
  var seatUUID = $(event.target).parent().attr('data-seat-id');
  chart.removeSeat(seatUUID);
}

function removeSeat(data) {
  $('#response-json #event-name').text("removeSeat");
  $('#response-json #content').html(syntaxHighlight(data));
  updateBasket(data.basket);
}
function emptyBasket(data) {
  $('#response-json #event-name').text("emptyBasket");
  $('#response-json #content').html(syntaxHighlight(data));
  updateBasket(data.basket);
}


function onNewAvailabilityData(data) {
  availability = data.availability;
}

function onNewLegendColors(data) {
  colors = data.colors;
}

function onReserveStopped() {
  $('button#checkout .preloader').hide();
  $('button#checkout .text').show();
  $('button#checkout').removeClass('disabled');
}

function goToCheckout(data) {
  $('#response-json #content').html(syntaxHighlight(data));
  $('#response-json #event-name').text("goToCheckout");
  $('button#checkout .preloader').hide();
  $('button#checkout .text').show();
  $('button#checkout').removeClass('disabled');
  $("#checkout-modal").modal('show');
  $('#checkout-modal #total').html($('#basket #total').html());
  $('#checkout-modal .transaction-uuid').html('Transaction uuid: </br>' + data.transaction_uuid);
  $('#checkout-modal #seats').html($('#basket #seats').html());
}
function seatsReserved(data) {
  $('#response-json #content').html(syntaxHighlight(data.data));
  $('#response-json #event-name').text("reserve");
  goToCheckout(data);
}

$("#basket #total #value").css('opacity', '0');
$("#basket #total #label").text("Your basket is currently empty");

$("#checkbox-legend").change(onCheckboxLegendChanged);
function onCheckboxLegendChanged(e) {
  if(e.target.checked) {
    chart.showLegend();
  } else {
    chart.hideLegend();
  }
}

$("#checkbox-controls").change(onCheckboxControlsChanged);
function onCheckboxControlsChanged(e) {
  if(e.target.checked) {
    chart.showControls();
  } else {
    chart.hideControls();
  }
}

$("#select-color-scheme").change(onSelectColorSchemeChanged);
function onSelectColorSchemeChanged(e) {
  var option = e.target.selectedIndex;

  if(option == 0) { // default
    chart.changeColorScheme(['#f95e5e', '#FFA726', '#42A5F5', '#fcabc7', '#8febf7', '#55cc5b', '#ae87f2', '#efdc32', '#018930','#a37d70', '#455A64', '#7B1FA2', '#fc9292','#aaaaaa','#fcc18a', '#66FF99']);
  } if(option == 1) { // pastel
    chart.changeColorScheme(['#462446', '#B05F6D', '#EB6B56', '#FFC153', '#47B39D', '#CDCBA6', '#008891', '#00587A', '#ff0000', '#0F3057']);
  } else if (option == 2){ // bold
    chart.changeColorScheme(['#8ea1b3', '#101415', '#ff2600', '#ed5165', '#839496', '#6ec14c', '#d7a302', '#0084cc', '#b433e1']);
  } else if (option == 3){ // grayscale
    chart.changeColorScheme(['#444', '#555', '#666', '#777', '#888', '#999', '#aaa', '#bbb', '#ccc', '#aaa', '#444', '#aaa', '#444', '#aaa', '#444', '#aaa']);
  } else if(option == 4) { // sea shells
    chart.changeColorScheme(['#f95e5e', '#071a24', '#265b76', '#60b2c2', '#dd9a8a', '#005cbb', '#c7e8f2', '#e5c7f2', '#f95e5e', '#071a24', '#265b76', '#60b2c2', '#dd9a8a', '#005cbb', '#c7e8f2', '#e5c7f2']);
  }
}


function releaseReservation() {
  chart.release();
  $("#checkout-modal").modal('hide');
}

function onCheckoutButton() {
  chart.reserve();
  $('button#checkout').addClass('disabled');
  $('button#checkout .preloader').show();
  $('button#checkout .text').hide();
}

function onEmptyBasketButton() {
  chart.emptyBasket();
}

/**
 These utility functions are not necessary in order to make full use
 of the widget, but proved useful for the demo and are production-ready
**/

function getPreSymbol(currencyObj) {
  if(!currencyObj || !currencyObj[Object.keys(currencyObj)[0]]) return "";
  var currency = currencyObj[Object.keys(currencyObj)[0]];
  return currency.pre_symbol;
}

function getPostSymbol(currencyObj) {
  if(!currencyObj || !currencyObj[Object.keys(currencyObj)[0]]) return "";
  var currency = currencyObj[Object.keys(currencyObj)[0]];
  return currency.post_symbol;
}

function getFormattedPrice(price, currencyObj, roundIfOverHundred = false) {
  if(!currencyObj) return;
  var preSymbol = currencyObj.pre_symbol;
  var postSymbol = currencyObj.post_symbol;
  if(roundIfOverHundred && parseFloat(price) > 100) price = parseInt(price);
  return preSymbol + parseFloat(price).toFixed(2) + postSymbol;
}

function getQueryStringParam(url, paramName) {
	var valToReturn = null;
	try {
		valToReturn = url.split(paramName+'=')[1].split('&')[0];
		if(valToReturn.indexOf('#') != -1) {
			valToReturn = valToReturn.split('#')[0];
		}
	}
	catch(err) {
		// it will fail when the parameter doesn't exist; this is normal
	}
	return valToReturn;
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}