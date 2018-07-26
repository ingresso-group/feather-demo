import React, { Component } from "react";

import FeatherContainer from "components/feather_container";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <FeatherContainer />
        <div className="row">
          <div className="col-3-sm">blue</div>
          <div className="col-3-sm">red</div>
          <div className="col-3-sm">pink</div>
          <div className="col-3-sm">green</div>
        </div>
      </div>
    );
  }
}
