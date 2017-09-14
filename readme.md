# Feather

This tool allows you to easily build **interactive seat selection** into your website and is powered by the Ingresso API.

## Demo:

[Click to view the demo](https://ingresso-group.github.io/feather-demo/?event=2GXJ&perf=2GXJ-46F&domain=www.fromtheboxoffice.com)

## Getting Started:

1) Create an empty page

2) Add a container element, where the widget will appear

3) Import our library at the bottom of your page:
[Get it here](https://storage.googleapis.com/ticketswitch/feather/0.0.9/feather.min.js)

4) Configure the widget

### The least amount of code required to get started:

```html
<!doctype html>

<html>
  <head>
    <style>
      #ingresso-widget {
        width: 500px;
        height: 500px;
      }
    </style>
  </head>

  <body>
    <div id="ingresso-widget"></div>

    <script src="https://storage.googleapis.com/ticketswitch/feather/0.0.7/feather.min.js"></script>
    <script>
      var chartConfig = {
        eventID: '7AB', // demo event
        perfID: '7AB-4',
        selector: '#ingresso-widget',
        domain: 'test.ticketswitch.com', // this will get replaced by your whitelabel domain
      }
      var chart = new IngressoSeatingPlan();
      chart.init(chartConfig);
    </script>
  </body>
</html>
```

## Widget Configuration

In order to specify the event/performance to load availability for, as well as to specify where to load the widget from, we use a configuration object.

#### Required configuration parameters:

* eventID (String)
* perfID (String)
* selector (String) (the identifier of the container that will hold the widget)
* domain (String) (domain that Ingresso will provide you with, for your specific integration)

#### Optional configuration parameters:  
* token (String) (Authentication token, not required to view the demo, but required to purchase; read more about how to obtain this in [Authentication](#authentication)
* silenceWarnings (Boolean, default is **false**) (if set to **false**, the widget will provide warnings regarding missing configuration and suggestions on fixing issues)
* preloaderColor (String) (Hex color e.g #EC008C)

## Getting information out of the widget

In order to allow the host page to respond to user actions on the seating plan, there are a suite of callbacks available:

* onChartInitialised
* onAddSeat
* onRemoveSeat
* onEmptyBasket
* onGoToCheckout
* onNewAvailabilityData
* onNewLegendColors
* onReserveStopped

All of the callbacks will also receive an object containing all the data required to display the right information to the user.

## Controlling the widget

There are also some imperative methods used to control the widget, that we can call either before or after initialising it:

* zoomIn
* zoomOut
* resetChart
* hideControls
* showControls
* hideLegend
* showLegend
* reserve
* release
* disableScrollToZoom
* disableInitialToZoom
* changeColorScheme (Array of strings) (Hex colors, e.g ['#462446', '#B05F6D', '#EB6B56', '#FFC153', '#47B39D', '#CDCBA6', '#008891', '#00587A', '#ff0000', '#0F3057'])
* selectPerformance (String) (ID of desired performance, you get this from the Ingresso API; when this function is called, the widget will automatically make itself visible)

Availability data and colours are received via their own callbacks (**onNewAvailabilityData** and **onNewLegendColors**) and are needed in order to display pricing information and colors for the selected seats. (Each seat's data contains a reference to a specific legend item, for price/colour)


## Reserving Seats

It's enough to call the **reserve** method on the library, which will start the reservation process. It will handle edge cases as well (if the selected seats have become unavailable in the meantime, or any error caused by the back-end) and will fire the **goToCheckout** callback when the reservation process is complete or **onReserveStopped** if an error has appeared.

When called, **goToCheckout** will contain a **transaction_uuid** property, that represents a unique identifier assigned to that specific order. You can then go on to reserve that order, based on the token, via the Ingresso API.

## Authentication

In order to purchase tickets, you need to obtain a username and password and a domain. After receiving those, you should:

1) Replace the demo domain in the widget configuration object with the one you have received from us

2) Make a request to <https://yourdomain.ticketswitch.com/api/b2b>. The response will have a custom HTTP Header, **x-b2b-token**. You can then pass this token in the configuration object of the widget, which will allow it to load the domain we have created for you, and will also allow you to purchase orders based on the **transaction_uuid** value.

Each authentication token has a lifetime of 4 hours and is valid for all your users, so it is advisable that you make this call ahead of time and cache the result, in order to improve the UX of your page (as opposed to making it on each page load)

## Customisation

The widget supports easy customisation of the following attributes:

* colors
* fonts
* texts
* look & feel (as long as you provide us with the required CSS, we'll apply it for your integration only)

However, all of these are changed via our internal control panel, so you have to ask us to do them for you.

The only things that can be changed by your are the color scheme on the seating plan and the preloader color, which you should provide in the configuration object of the widget (see [Configuration](#widget-configuration))

## Optimisations

Even though the widget allows you to initialise it with a performance ID on page load, in most cases you should initialise it just with the event ID and no performance ID, then have it load in the background (If it doesn't have a performance ID when it is initialised, the widget will hide itself).

In most cases, it is best to have a calendar that allows users to choose a performance, which you then pass to the widget.When this happens, the widget will already be ready and will become visible and there should be practically no delay before they see the interactive seating plan with availability loaded (the initial availability that the user sees is cached for a short time and then it updates, which makes for very short loading times).

## Widget preloader

The library creates, shows and hides the preloader for you, transparently.

## Changelog

##  0.0.9 - 2017-09-14
### Changed
- Updated the documentation URL that is displayed in the console when Feather is not initialised/used correctly


##  0.0.8 - 2017-09-14
### Added
- added functions: disableScrollToZoom and disableInitialZoom
- offers displayed in the legend now use a branded colour, instead of being hardcoded to red


##  0.0.7 - 2017-09-06
### Added
- added a protection against invalid messages, caused by external libraries/browser extensions

### Fixed
- fixed some IE-specific errors

##  0.0.6 - 2017-09-06
### Fixed
- Fixed a syntax error
