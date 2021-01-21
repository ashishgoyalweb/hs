import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import Engine from "../engine/engine";
import "../index.scss";
import "./about.scss";
import axios from "axios";
import * as constantAPI from "../utilities/api";
import Loader from "../component/loader";

class HolidayPackageInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      loader: true,
      HolidayPackage: [],
      Htype: [],
    };
  }
  componentDidMount() {
    axios
      .get(constantAPI.holidayPackage)
      .then((res) => {
        this.setState({
          HolidayPackage: res.data.response[0].HolidayPackage,
        });
        this.fetchURL();
      })
      .catch((err) => console.log("error in Holiday Type detials pages ", err));
  }

  fetchURL = () => {
    let URL = window.location.search;
    let urlValue = URL.split("?");
    let val = urlValue[1]?.replace("%20", " ");
    console.log("country ", val);
    console.log("all country ", this.state.HolidayPackage);
    let Htype = [];
    if (val) {
      Htype = this.state.HolidayPackage.filter((item) => {
        return item.package_name.toLowerCase() === val.toLowerCase();
      });
      this.setState({ Htype, loader: false });
    } else {
      this.setState({ loader: false });
    }
  };

  noShow = () => {
    return <div className="nowShow">No Result Found</div>;
  };

  show = () => {
    console.log("aya");
    let hPack = this.state.Htype[0];
    return (
      <div>
        <div className="">{hPack.package_name}</div>
        <div className="">{hPack.dscr}</div>
      </div>
    );
  };

  render() {
    console.log(" Htype ", this.state.Htype);
    //console.log("Holoday Type Info ", this.state.HPackage);
    return (
      <>
        <Header />
        <div className="bg">
          <div className="wrapper middle-container pages">
            <div className="lft">
              <Engine />
            </div>
            <div className="rgt cInfo">
              {this.state.loader === true ? (
                <Loader />
              ) : this.state.Htype.length > 0 ? (
                this.show()
              ) : (
                this.noShow()
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default HolidayPackageInfo;
