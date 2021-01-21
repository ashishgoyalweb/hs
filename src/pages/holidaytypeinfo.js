import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import Engine from "../engine/engine";
import "../index.scss";
import "./about.scss";
import axios from "axios";
import * as constantAPI from "../utilities/api";
import Slider from "react-slick";
import Loader from "../component/loader";
import { Fragment } from "react";

class HolidayTypeInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      loader: true,
      HolidayType: [],
      Htype: [],
      HPackage: [],
    };
    this.regex = /(<([^>]+)>)/gi;
  }
  componentDidMount() {
    axios
      .get(constantAPI.holidayTypes)
      .then((res) => {
        this.setState({
          HolidayType: res.data.response[0].HolidayType,
          loader: false,
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
    console.log("all country ", this.state.HolidayType);
    let Htype = [];
    if (val) {
      Htype = this.state.HolidayType.filter((item) => {
        return item.name.toLowerCase() === val.toLowerCase();
      });
      this.setState({ Htype });
    } else {
      this.setState({ loader: false });
    }

    axios
      .get(constantAPI.holidayPackage)
      .then((res) => {
        this.HTPackage(val, res.data.response[0].HolidayPackage);
      })
      .catch((err) => console.log("error in country Holiday Package ", err));
  };

  HTPackage = (htype, pack) => {
    let HPackage = [];
    //console.log("pack ", pack);
    HPackage = pack.filter((item) => {
      return item.board_basis.toLowerCase() === htype.toLowerCase();
    });
    this.setState({ HPackage, loader: false });
    //console.log(" bbj ", HPackage);
  };

  noShow = () => {
    return <div className="nowShow">No Result Found</div>;
  };

  show = () => {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <div className="banner">
          <Slider {...settings}>
            {this.state.Htype[0].image.length > 0 &&
              this.state.Htype[0].image.map((item, ind) => {
                return (
                  <div key={ind}>
                    <img
                      src={`http://holidaystand.co.uk/upload/img/${item}`}
                      alt="HolidayStand"
                    />
                  </div>
                );
              })}
          </Slider>
        </div>
        <h2>{this.state.Htype[0]?.name}</h2>
        <div
          className=""
          dangerouslySetInnerHTML={{
            __html: this.state.Htype[0].dscr,
          }}
        ></div>
        <div className="holidayType">
          {this.state.HPackage.length > 0 && (
            <div>
              {/* <h4>Holiday pacakges in {this.state.country[0].country_name}</h4> */}
              <div className="HTWrapper">
                {this.state.HPackage.map((item, ind) => {
                  return (
                    <Fragment key={ind}>
                      <div className="HTBox">
                        <figure>
                          <img
                            src={`http://holidaystand.co.uk/upload/img/${item.image[0]}`}
                            alt={item.board_basis}
                          />
                        </figure>
                        <div className="layer">{item.package_name}</div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  render() {
    //console.log(" Htype ", this.state.Htype);
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

export default HolidayTypeInfo;
