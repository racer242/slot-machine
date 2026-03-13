import React, { Component } from "react";
import Popup from "../components/Popup";

class AboutPopup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Popup style={{ maxWidth: 500 }} {...this.props}>
        <h1></h1>
        <p></p>
      </Popup>
    );
  }
}

export default AboutPopup;
