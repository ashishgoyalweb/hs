import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import Engine from "../engine/engine";
import "../index.scss";
import "./about.scss";
import axios from "axios";
import * as constantAPI from "../utilities/api";

class FAQ extends React.Component {
  constructor() {
    super();
    this.state = {
      pages: [],
      desc: "",
    };
    this.regex = /(<([^>]+)>)/gi;
  }
  componentDidMount() {
    axios
      .post(constantAPI.FAQ)
      .then((res) =>
        this.setState({
          pages: res.data.response[0].Pages[0],
          desc: res.data.response[0].Pages[0].description,
        })
      )
      .catch((err) => console.log("error in pages ", err));
  }
  render() {
    console.log("this.state.page_banner ", this.state.pages);
    return (
      <>
        <Header />
        <div className="bg">
          <div className="wrapper middle-container pages">
            <div className="lft">
              <Engine />
            </div>
            <div className="rgt">
              {this.state.pages && (
                <div>
                  <div className="banner">
                    <img
                      src={`http://holidaystand.co.uk/upload/img/${this.state.pages.page_banner}`}
                    />
                  </div>
                  <h2>{this.state.pages.page_heading}</h2>
                  <div>{this.state.desc.replace(/<\/?[^>]+>/gi, "")}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default FAQ;
