# Feather

This tool allows you to easily build **interactive seat selection** into your website and is powered by the Ingresso API.

## Demo

[Click to view the demo](https://ingresso-group.github.io/feather-demo/)

### Deploying the Demo

- Just merging into `master` will automatically deploy the demo

#### To keep a nice clean release history you can additionally

* Click on [Releases](https://github.com/ingresso-group/feather-demo/releases)
* Click on *Draft a new release*
* Fill in the tag number with the current version of *Feather Demo* (not the version of *Feather*) as per the Changelog
* Fill in the *Release Title*
* Click on *Publish Release*

## Getting Started

1. Create an empty html file

2. Add a container element, where the widget will appear

3. Import our library at the bottom of your page:
   [Get it here](https://storage.googleapis.com/ticketswitch/feather/0.4.6/feather.min.js)

4. Configure the widget and initialise the chart

5. Open in the browser

### A Simple Example
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

    <script src="https://storage.googleapis.com/ticketswitch/feather/0.4.6/feather.min.js"></script>
    <script>
      var chartConfig = {
        eventID: '7AB', // demo event
        perfID: '7AB-9',
        selector: '#ingresso-widget',
        token: '<The-X-B2B-Token>' // see the Authentication section below
      }
      var chart = new IngressoSeatingPlan();
      chart.init(chartConfig);
    </script>
  </body>
</html>
```

![Alt text](example.png?raw=true)

> For some more examples of using feather in other JS frameworks see ./examples

## Authentication

### Getting Authenticated

We have a demo user set up, that allows you to create an auth token for our demo so that you can experiment with the seat chart.

#### 1. Get an auth token
```bash
curl https://b2b.ingresso.co.uk/api/b2b/ -u "demo:demopass" -ik
```
This will have a `x-b2b-token` in the response header

#### 2. Add your token to your chart config
```js
var chartConfig = {
  eventID: '7AB', // demo event
  perfID: '7AB-9',
  selector: '#ingresso-widget',
  token: '<The-X-B2B-Token>' // 👈👈👈
}
var chart = new IngressoSeatingPlan();
chart.init(chartConfig);
```

### Authentication Details

In order to reserve tickets, you need to obtain a username and password. After receiving those, you should make a request to <https://b2b.ingresso.co.uk/api/b2b> with your `username` and `password` in the `Authorization` header, as basic auth. The response will have a custom HTTP Header, **x-b2b-token**. You can then pass this token in the configuration object of the widget, and will allow you to purchase orders based on the **transaction_uuid** value.

Each authentication token has a **maximum** lifetime of 4 hours and is valid for all your customers, so it is advisable that you make this call ahead of time and cache the result, in order to improve the UX of your page (as opposed to making it on each page load). However, this token can get invalidated at any time, which means that you should generate a new one very often (once every few seconds is fine).

**Note:** We are most likely going to change this and move to a model of manually-generated tokens that will have an unlimited lifetime and this would remove the complexity of generating and managing them on your side, but in the meantime, you should use the approach presented above.


## Widget Configuration

In order to specify the event/performance to load availability for, as well as to specify where to load the widget from, we use a configuration object.

#### Required configuration parameters:

- eventID (String)
- perfID (String)
- selector (String) (the identifier of the container that will hold the widget)

#### Optional configuration parameters:

- token (String) (Authentication token, not required to view the demo, but required to purchase; read more about how to obtain this in [Authentication](#authentication)
- domain (String, default is "https://b2b.ingresso.co.uk" )
- silenceWarnings (Boolean, default is **false**) (If set to **false**, the widget will provide warnings regarding missing configuration and suggestions on fixing issues)
- preloaderColor (String) (Hex color e.g **#EC008C**)
- hasCustomLegend (Boolean, default is **false**) (If you plan on changing the prices/messages displayed, you have to set this to **true** - see the **setLegend** function below)
- allowControlsOnSmallScreens (Boolean, default is **false**) (Normally, **plus/minus/reset** controls get hidden on small/mobile devices, because in most cases, there isn't enough room or they simply aren't needed. This allows you to override that behaviour)

## Getting information out of the widget

In order to allow the host page to respond to user actions on the seating plan, there are a suite of callbacks available:

- onChartInitialised
- onAddSeat
- onRemoveSeat
- onEmptyBasket
- onGoToCheckout
- onNewAvailabilityData
- onNewLegendColors
- onReserveStopped

All of the callbacks will also receive an object containing all the data required to display the right information to the user.

**NOTE:** if you set a custom legend with different prices, **DO NOT** use the basket total that gets returned by these callbacks, as it will not reflect the prices that you've set in the legend. You have to compute your own total, based on the currently selected seats.

## Controlling the widget

There are also some imperative methods used to control the widget, that we can call either before or after initialising it:

- selectSeatsByIdAndBlock ({ seat_id: string, seat_block: string })
- zoomIn
- zoomOut
- resetChart
- hideControls
- showControls
- hideLegend
- showLegend
- reserve
- release
- disableScrollToZoom
- disableInitialToZoom
- changeColorScheme (Array of strings) (Hex colors, e.g ['#462446', '#B05F6D', '#EB6B56', '#FFC153', '#47B39D', '#CDCBA6', '#008891', '#00587A', '#ff0000', '#0F3057'])
- selectPerformance (String) (ID of desired performance, you get this from the Ingresso API; when this function is called, the widget will automatically make itself visible)
- setPreloader ({css, html}) - if you set this, it will override the default preloader
- setLegend (Object) - when new availability data is received, you can take the legend object, change any values within it (prices, messages) and then use this function to send it back to the app. It will immediately update the displayed prices.

Availability data and colours are received via their own callbacks (**onNewAvailabilityData** and **onNewLegendColors**) and are needed in order to display pricing information and colors for the selected seats. (Each seat's data contains a reference to a specific legend item, for price/colour)

## Reserving Seats

It's enough to call the **reserve** method on the library, which will start the reservation process. It will handle edge cases as well (if the selected seats have become unavailable in the meantime, or the back-end has responded with any other error) and will fire the **goToCheckout** callback when the reservation process is complete or **onReserveStopped** if an error has appeared.

When called, **goToCheckout** will contain a **transaction_uuid** property, that represents a unique identifier assigned to that specific order. You can then go on to reserve that order, based on the token, via the Ingresso API.

    Note: the seats requested by the user might become unavailable in the meantime

If the requested seats happen to have become unavailable before the user can reserve them, the widget will display a modal window giving the user a choice between going back and selecting other seats manually or going through with a pre-selected set of seats recommended by our system.

- If they choose to select different seats manually, the modal closes and the initially-selected seats drop off the seating map.
- If they choose to proceed with the recommended seats, the modal will also close and the app will make a reservation call for the new seats. When this process finishes, the newly-created reservation will be for the recommended seats, which you can then display on your checkout page (or anywhere you choose).


## Customisation

The widget supports easy customisation of the following attributes:

- seating plan colors
- fonts
- texts
- look & feel (as long as you provide us with the required CSS, we'll apply it for your integration only)
- prices (legend and hover tooltip)

However, all of these are changed via our internal control panel, so you have to ask us to do them for you.

The only things that can be changed by your are the color scheme on the seating plan and the preloader color, which you should provide in the configuration object of the widget (see [Configuration](#widget-configuration))

## Optimisations

Even though the widget allows you to initialise it with a performance ID on page load, in most cases you should initialise it just with the event ID and no performance ID, then have it load in the background (If it doesn't have a performance ID when it is initialised, the widget will hide itself).

In most cases, it is best to have a calendar that allows users to choose a performance, which you then pass to the widget.When this happens, the widget will already be ready and will become visible and there should be practically no delay before they see the interactive seating plan with availability loaded (the initial availability that the user sees is cached for a short time and then it updates, which makes for very short loading times).

## Widget preloader

The library creates, shows and hides the preloader for you, transparently.
