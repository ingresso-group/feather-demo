import React, { Component } from "react";

import FeatherContainer from "components/feather_container";
import Basket from "components/basket";
import Sidebar from "components/sidebar";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-container">
        <Sidebar />
        <div className="main-content">
          <FeatherContainer />
          <Basket />
        </div>
      </div>
    );
  }
}
