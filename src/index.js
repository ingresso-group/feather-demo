import React from "react";
import ReactDOM from "react-dom/client";
import Cookies from "js-cookie";
import "./scss/main.scss";

import App from "./components/app";

showApp();

function showApp() {
    const root = ReactDOM.createRoot(document.getElementsByTagName("main")[0]);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
