function IngressoSeatingPlan() {
  var Chart = {
    initialised: false,
    eventQueue: [],
    config: null,
    events: [
      "CHART_INITIALISED",
      "ADD_SEAT",
      "REMOVE_SEAT",
      "EMPTY_BASKET",
      "GO_TO_CHECKOUT",
      "NEW_AVAILABILITY_DATA",
      "UPDATE_CONCESSIONS",
      "NEW_SEND_METHODS_DATA",
      "NEW_LEGEND_COLORS",
      "RESERVE_STOPPED",
      "UPDATE_BASKET",
      "404",
    ],
    preloaderContainer: null,
    iframe: null,
    customPreloader: null,
    // domain: "b2b.ingresso.co.uk"
    domain: "www.dragos-laptop.ingresso.co.uk",
  };

  Chart.init = function(config) {
    Chart.config = config;
    if (!Chart.config.hasOwnProperty("useHTTPS")) {
      Chart.config.useHTTPS = true;
    }

    var allOK = Chart.healthCheck();
    if (allOK) {
      Chart.addListener();
      Chart.createPreloader();
      Chart.createIFrame();
      if (Chart.config.allowControlsOnSmallScreens) {
        Chart.addEventToQueue("ALLOW_CONTROLS_ON_SMALL_SCREENS");
      }
      if (Chart.config.perfID) {
        Chart.selectPerformance(Chart.config.perfID);
      }
      if (Chart.config.hasCustomLegend) {
        Chart.hasCustomLegend();
      }
    }
  };

  Chart.createPreloader = function() {
    Chart.preloaderContainer = document.createElement("div");

    if (Chart.customPreloader) {
      document
        .querySelector(Chart.config.selector)
        .appendChild(Chart.preloaderContainer);
      var styleTag = "<style>" + Chart.customPreloader.css + "</style>";
      Chart.preloaderContainer.innerHTML =
        styleTag + Chart.customPreloader.html;
    } else {
      Chart.preloaderContainer.className =
        "seating-plan-widget-preloader-container";
      document
        .querySelector(Chart.config.selector)
        .appendChild(Chart.preloaderContainer);

      var style = document.createElement("style");
      style.type = "text/css";
      style.innerText =
        ".seating-plan-widget-preloader-container{display: none; position:absolute;width:100%;height:100%;background-color:rgba(255,255,255,.5);user-select:none;top:0;left:0}.seating-plan-widget-preloader{width:300px;height:40px;text-align:center;font-size:10px;position:absolute;left:calc(50% - 150px);top:calc(50% - 30px)}.seating-plan-widget-preloader .rect{background-color:#333;height:100%;width:6px;display:inline-block;margin-right:3px;animation:ing-stretchdelay 1.2s infinite ease-in-out}.seating-plan-widget-preloader .rect2{animation-delay:-1.1s}.seating-plan-widget-preloader .rect3{animation-delay:-1s}.seating-plan-widget-preloader .rect4{animation-delay:-.9s}.seating-plan-widget-preloader .rect5{animation-delay:-.8s}@keyframes ing-stretchdelay{0%,100%,40%{transform:scaleY(.4)}20%{transform:scaleY(1)}}";
      Chart.preloaderContainer.appendChild(style);

      var preloaderElement = document.createElement("div");
      preloaderElement.className = "seating-plan-widget-preloader";
      Chart.preloaderContainer.appendChild(preloaderElement);

      var rect1 = document.createElement("span");
      rect1.className = "rect rect1 bg-color-1";
      preloaderElement.appendChild(rect1);

      var rect2 = document.createElement("span");
      rect2.className = "rect rect2 bg-color-1";
      preloaderElement.appendChild(rect2);

      var rect3 = document.createElement("span");
      rect3.className = "rect rect3 bg-color-1";
      preloaderElement.appendChild(rect3);

      var rect4 = document.createElement("span");
      rect4.className = "rect rect4 bg-color-1";
      preloaderElement.appendChild(rect4);

      var rect5 = document.createElement("span");
      rect5.className = "rect rect5 bg-color-1";
      preloaderElement.appendChild(rect5);

      var rects = document.querySelectorAll(
        ".seating-plan-widget-preloader .rect"
      );
      if (rects && Array.isArray(rects)) {
        rects.forEach(function(rect) {
          rect.style.backgroundColor = Chart.config.preloaderColor;
        });
      }
    }
  };

  Chart.hidePreloader = function() {
    Chart.preloaderContainer.style.display = "none";
  };

  Chart.showPreloader = function() {
    try {
      Chart.show();
      Chart.preloaderContainer.style.display = "block";
    } catch (e) {}
  };

  Chart.hide = function() {
    Chart.iframe.style.visibility = "hidden";
  };

  Chart.show = function() {
    Chart.iframe.style.visibility = "visible";
  };

  Chart.selectPerformance = function(perfID) {
    Chart.showPreloader();
    Chart.addEventToQueue("SELECT_PERFORMANCE", perfID);
  };

  Chart.hasCustomLegend = function() {
    Chart.addEventToQueue("HAS_CUSTOM_LEGEND");
  };
  Chart.setPreloader = function(data) {
    Chart.customPreloader = data;
  };

  Chart.zoomIn = function() {
    Chart.addEventToQueue("ZOOM_IN");
  };
  Chart.zoomOut = function() {
    Chart.addEventToQueue("ZOOM_OUT");
  };
  Chart.resetChart = function() {
    Chart.addEventToQueue("RESET_CHART");
  };
  Chart.hideControls = function() {
    Chart.addEventToQueue("HIDE_CONTROLS");
  };
  Chart.showControls = function() {
    Chart.addEventToQueue("SHOW_CONTROLS");
  };
  Chart.hideLegend = function() {
    Chart.addEventToQueue("HIDE_LEGEND");
  };
  Chart.showLegend = function() {
    Chart.addEventToQueue("SHOW_LEGEND");
  };
  Chart.reserve = function() {
    Chart.addEventToQueue("RESERVE");
  };
  Chart.release = function() {
    Chart.addEventToQueue("RELEASE");
  };
  Chart.changeColorScheme = function(colors) {
    Chart.addEventToQueue("CHANGE_COLOR_SCHEME", colors);
  };
  Chart.removeSeat = function(seatUUID) {
    Chart.addEventToQueue("REMOVE_SEAT", seatUUID);
  };
  Chart.emptyBasket = function() {
    Chart.addEventToQueue("EMPTY_BASKET");
  };
  Chart.disableScrollToZoom = function() {
    Chart.addEventToQueue("DISABLE_SCROLL_TO_ZOOM");
  };
  Chart.disableInitialToZoom = function() {
    Chart.addEventToQueue("DISABLE_INITIAL_ZOOM");
  };

  Chart.onChartInitialised = function() {
    Chart.initialised = true;
    Chart.sendEventsFromQueue();
  };

  Chart.selectSeats = function(seats) {
    Chart.addEventToQueue("SELECT_SEATS", seats);
  };

  Chart.setLegend = function(newLegend) {
    Chart.addEventToQueue("SET_LEGEND", newLegend);
  };

  Chart.selectSendMethod = function(methodCode) {
    Chart.addEventToQueue("SELECT_SEND_METHOD", methodCode);
  };

  Chart.selectConcession = function(seatUUID, concessionCode) {
    Chart.addEventToQueue("SELECT_CONCESSION", {
      seatUUID: seatUUID,
      concessionCode: concessionCode,
    });
  };

  Chart.addEventToQueue = function(eventName, eventData) {
    var newEvent = {
      event: eventName,
      data: eventData,
    };
    if (!Chart.initialised) {
      Chart.eventQueue.push(newEvent);
    } else {
      Chart.sendEvent(newEvent);
    }
  };

  Chart.sendEventsFromQueue = function() {
    var self = this;
    Chart.eventQueue.forEach(function(event) {
      self.sendEvent(event);
    });
  };

  Chart.sendEvent = function(data) {
    Chart.iframe.contentWindow.postMessage(JSON.stringify(data), "*");
  };

  Chart.healthCheck = function() {
    var unimplementedMethods = false;
    var hasWarnings = false;
    var hasErrors = false;

    // warnings
    var self = this;

    Chart.events.forEach(function(eventName) {
      var functionName = eventNameToFunctionName(eventName);
      if (!self[functionName] || typeof self[functionName] !== "function") {
        hasWarnings = true;
        if (!self.config.silenceWarnings) {
          console.warn(
            "IngressoSeatingPlan: Method " +
              functionName +
              " has not been implemented."
          );
        }
      }
    });

    if (unimplementedMethods) {
      hasWarnings = true;
      if (!self.config.silenceWarnings) {
        console.warn(
          "IngressoSeatingPlan: We recommend implementing all of the methods provided, otherwise functionality will be incomplete."
        );
      }
    }

    if (!self.config.token) {
      hasWarnings = true;
      if (!self.config.silenceWarnings) {
        console.warn(
          "IngressoSeatingPlan: configuration object is missing token. You won't be able to purchase."
        );
      }
    }

    if (hasWarnings) {
      if (!self.config.silenceWarnings) {
        console.warn(
          'IngressoSeatingPlan: You can initialise the widget with the flag "silenceWarnings" set to true to suppress these warnings.'
        );
      }
    }

    // if (!Chart.config.perfID) {
    //   hasWarnings = true;
    //   console.warn('IngressoSeatingPlan: configuration object is missing eventID.');
    // }

    // errors

    if (!self.config.eventID) {
      hasErrors = true;
      console.error(
        "IngressoSeatingPlan: configuration object is missing eventID."
      );
    }

    if (!self.config.selector) {
      hasErrors = true;
      console.error(
        "IngressoSeatingPlan: configuration object is missing a selector for the iframe container."
      );
    } else {
      try {
        var iFrameContainer = document.querySelector(self.config.selector);
        if (!iFrameContainer) {
          hasErrors = true;
          console.error(
            "IngressoSeatingPlan: the selector for the iframe container provided in the configuration object doesn't point to a real DOM element."
          );
        }
      } catch (e) {
        hasErrors = true;
        console.error(
          "IngressoSeatingPlan: the selector for the iframe container provided in the configuration object doesn't point to a real DOM element."
        );
      }
    }

    if (hasErrors) {
      console.error(
        "IngressoSeatingPlan: You must fix the errors above in order to use the widget."
      );
    }

    if (hasWarnings || hasErrors) {
      if (!self.config.silenceWarnings) {
        console.info(
          "You can read about this and more in the documentation at https://github.com/ingresso-group/feather-demo."
        );
      }
    }

    return !hasErrors;
  };

  Chart.addListener = function() {
    var self = this;
    window.addEventListener(
      "message",
      function(e) {
        var key = e.message ? "message" : "data";
        var eventData = {};
        var validMessage = true;
        try {
          eventData = JSON.parse(e.data);
        } catch (e) {
          validMessage = false;
        }
        if (!validMessage) {
          return;
        }

        var receivedEventName = eventData.event;
        var eventContent = eventData.data;
        eventContent.eventName = receivedEventName;

        if (self.events.indexOf(receivedEventName) !== -1) {
          var functionName = eventNameToFunctionName(receivedEventName);
          if (self[functionName] && typeof self[functionName] == "function") {
            self[functionName](eventContent);
          } else if (receivedEventName === "404") {
            Chart.hide();
            self.hidePreloader();
          }
          if (self["onEvent"] && typeof self["onEvent"] == "function") {
            self.onEvent(eventContent);
          }
        }

        if (
          receivedEventName === "NEW_AVAILABILITY_DATA" ||
          receivedEventName === "GO_TO_CHECKOUT"
        ) {
          self.hidePreloader();
        }
      },
      false
    );
  };

  Chart.createIFrame = function(crtTry) {
    if (!crtTry) crtTry = 1;
    var prefix = Chart.config.useHTTPS ? "https://" : "http://";
    var page = prefix + Chart.domain + "/book";
    var eventName = "/" + Chart.config.eventID + "-event-name";
    var queryString = "/?is_embedded=1";
    if (Chart.config.mode == "eventReviews") {
      queryString += "&mode=reviews";
    }
    if (Chart.config.availabilityURL) {
      queryString += "&availability_url=" + Chart.config.availabilityURL;
    }
    if (Chart.config.token) {
      queryString += "&token=" + Chart.config.token;
    }

    // force AB tests to our desired values
    queryString += "&ab_test__choose-num-tickets=not_shown";

    if (!Chart.config.perfID) {
      Chart.hide();
    }

    Chart.iframeSource = page + eventName + queryString;

    var chartContainer = document.querySelector(Chart.config.selector);
    chartContainer.style.position = "relative";
    var existingIframe = document.querySelector(
      Chart.config.selector + " iframe"
    );
    if (!existingIframe) {
      Chart.iframe = document.createElement("iframe");
    }

    Chart.iframeLoaded = false;
    Chart.iframe.onload = function() {
      Chart.iframeLoaded = true;
      setTimeout(function() {
        if (!Chart.initialised && crtTry < 3) {
          Chart.createIFrame(crtTry + 1);
        }
      }, 5000);
    };

    Chart.iframe.style.border = "1px solid #ddd";
    Chart.iframe.style.outline = "0";
    Chart.iframe.style.height = "100%";
    Chart.iframe.style.width = "100%";
    Chart.iframe.style.margin = "0 !important";
    Chart.iframe.style.boxSizing = "border-box";
    Chart.iframe.style.margin = "auto";

    Chart.iframe.setAttribute("src", Chart.iframeSource);
    Chart.iframe.setAttribute("class", "seating-plan");
    chartContainer.appendChild(Chart.iframe);

    setTimeout(function() {
      if (!Chart.iframeLoaded) {
        if (crtTry < 3) {
          Chart.createIFrame(crtTry + 1);
        }
      }
    }, 5000);

    if (Chart.config.perfID) {
      Chart.showPreloader();
    }
  };

  function eventNameToFunctionName(s) {
    return ("ON_" + s).toLowerCase().replace(/(\_\w)/g, function(m) {
      return m[1].toUpperCase();
    });
  }

  return Chart;
}
