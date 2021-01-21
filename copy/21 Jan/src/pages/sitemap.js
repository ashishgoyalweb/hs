import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import Engine from "../engine/engine";
import "../index.scss";
import "./about.scss";

class Sitemap extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="bg">
          <div className="wrapper middle-container pages">
            <div className="lft">
              <Engine />
            </div>
            <div className="rgt">Site Map</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Sitemap;
