import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import "./scss/main.scss";

import App from "./components/app";

showApp();

function showApp() {
    let appContainer = <App />;
    ReactDOM.render(appContainer, document.getElementsByTagName("main")[0]);
}
