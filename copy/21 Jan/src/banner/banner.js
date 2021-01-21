import React, { Component } from "react";
import "./banner.scss";
import banner1 from "../assets/banner1.jpg";

import Engine from "../engine/engine";

class Banner extends Component {
  render() {
    return (
      <div className="banner-wrapper">
        <div className="banner">
          <img src={banner1} alt="Holoiday Stand" />
        </div>
        <Engine {...this.props} />
      </div>
    );
  }
}

export default Banner;
