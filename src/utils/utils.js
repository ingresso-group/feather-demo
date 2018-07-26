export const SM = 576;
export const MD = 768;
export const LG = 992;
export const XL = 1200;

export function getFormattedPrice(price, currencyObj, roundIfOverHundred) {
  if (!currencyObj) return;
  var preSymbol = currencyObj.pre_symbol || "";
  var postSymbol = currencyObj.post_symbol || "";
  if (roundIfOverHundred && parseFloat(price) > 100) price = parseInt(price);
  return preSymbol + parseFloat(price).toFixed(2) + postSymbol;
}

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
