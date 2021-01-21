import React, { Component } from "react";
import "./header.scss";
import Navigation from "./navigation";

import TopNav from "./topnav";

class Header extends Component {
  render() {
    return (
      <header>
        <TopNav />
        <Navigation />
      </header>
    );
  }
}

export default Header;
