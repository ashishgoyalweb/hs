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

class CountryInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      loader: true,
      country: [],
      HPackage: [],
    };
    this.regex = /(<([^>]+)>)/gi;
  }
  componentDidMount() {
    axios
      .get(constantAPI.holidayCountry)
      .then((res) => {
        this.setState({
          countries: res.data.response[0].HolidayCountry,
        });
        this.fetchURL();
      })
      .catch((err) => console.log("error in country detials pages ", err));
  }

  fetchURL = () => {
    let URL = window.location.search;
    let urlValue = URL.split("?");
    let val = urlValue[1]?.replace("%20", " ");
    //console.log("country ", val);
    //console.log("ccsdc ", this.state.countries);
    let country = [];
    if (val) {
      country = this.state.countries.filter((item) => {
        return item.country_name.toLowerCase() === val.toLowerCase();
      });
      this.setState({ country });
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

  HTPackage = (countri, pack) => {
    let HPackage = [];
    //console.log("pack ", pack);
    HPackage = pack.filter((item) => {
      return item.countryName.toLowerCase() === countri.toLowerCase();
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
            {this.state.country[0].image.length > 0 &&
              this.state.country[0].image.map((item, ind) => {
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
        <h2>{this.state.country[0]?.country_name}</h2>
        <div
          className=""
          dangerouslySetInnerHTML={{
            __html: this.state.country[0].dscr,
          }}
        ></div>
        <div className="holidayType">
          {this.state.HPackage.length > 0 && (
            <div>
              <h4>Holiday pacakges in {this.state.country[0].country_name}</h4>
              <div className="HTWrapper">
                {this.state.HPackage.map((item, ind) => {
                  return (
                    <Fragment key={ind}>
                      <div className="HTBox">
                        <figure>
                          <img
                            src={`http://holidaystand.co.uk/upload/img/${item.image[0]}`}
                            alt={item.package_name}
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
    console.log(" this.state.HPackage ", this.state.HPackage);
    //console.log("loader ", this.state.loader);
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
              ) : this.state.country.length > 0 ? (
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

export default CountryInfo;
