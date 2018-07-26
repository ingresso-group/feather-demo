import { isCiderDebitor } from "new_checkout/utils/stripe";

export function isBrowserMobile() {
  return window.navigator.userAgent
    .toLowerCase()
    .match(/(ipad)|(iphone)|(ipod)|(android)|(webos)/i);
}

export function isBrowserIOS() {
  return window.navigator.userAgent
    .toLowerCase()
    .match(/(ipad)|(iphone)|(ipod)/i);
}

export function shallowObjectToQueryStringParams(obj) {
  var queryStringParams = "";
  if (Object.keys(obj).length > 0) {
    queryStringParams += "?";
    queryStringParams += Object.keys(obj)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join("&");
  }
  return queryStringParams;
}
