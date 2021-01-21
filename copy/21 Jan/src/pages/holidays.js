import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import "../index.scss";
import "./style/flight.scss";
import axios from "axios";
import * as constantAPI from "../utilities/api";
import { getRandom } from "../utilities/func";
import Loader from "../component/loader";
import { Link } from "react-router-dom";

class Holidays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holidays: [],
      hType: [],
      country: [],
      loader: true,
    };
  }

  componentDidMount() {
    axios
      .all([
        axios.get(constantAPI.holidays),
        axios.get(constantAPI.holidayTypes),
        axios.get(constantAPI.holidayCountry),
      ])
      .then(([holidays, hType, country]) => {
        this.setState({
          holidays: holidays.data.response[0],
          hType: hType.data.response[0].HolidayType,
          country: country.data,
          loader: false,
        });
      })
      .catch((err) => {
        console.log("some error in holidays ", err);
        this.setState({ loader: false });
      });
  }
  handleCountry = (val) => {
    //console.log("val ", val);
    this.props.history.push("country-detail" + "?" + val);
  };
  handleHolidayType = (val) => {
    console.log("val ", val);
    this.props.history.push("holiday-detail" + "?" + val);
  };

  getCountry = () => {
    let arr = getRandom(this.state.country.response[0]?.HolidayCountry, 10);
    let result = arr.map((item, ind) => {
      return (
        <div
          className="cList"
          key={ind}
          onClick={() => this.handleCountry(`${item.country_name}`)}
        >
          <img src={`http://holidaystand.co.uk/upload/img/${item.image[0]}`} />
          <div className="layer">
            <div className="cName">{item.country_name}</div>
            <div className="cDesc">{item.dscr.replace(/<\/?[^>]+>/gi, "")}</div>
            <div className="arrow">
              <i className="fa fa-arrow-right"></i>
            </div>
          </div>
        </div>
      );
    });
    return result;
  };

  page = () => {
    let holidays = this.state.holidays?.HolidaysPage;
    let HolidayType = this.state.hType;
    return (
      <>
        <div className="midContainer">
          {this.state.holidays.hasOwnProperty("HolidaysPage") && (
            <>
              <div className="wrapper">
                <div className="flight_heading">
                  {holidays[0].holidays_heading}
                </div>
                <div className="flightDesc">
                  {holidays[0].description.replace(/<\/?[^>]+>/gi, "")}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="midContainer" style={{ backgroundColor: "#014073" }}>
          <div
            className="wrapper"
            style={{ backgroundColor: "transparent", padding: "10px 0" }}
          >
            <div className="heading">
              <h2 style={{ color: "#fff", fontWeight: "normal" }}>
                Types of Holidays
              </h2>
            </div>
            <div className="holidayType">
              {this.state.hType.length > 0 &&
                HolidayType.slice(0, 8).map((item, ind) => {
                  return (
                    <div
                      className="hTypeBox"
                      key={ind}
                      onClick={() => this.handleHolidayType(`${item.name}`)}
                    >
                      <figure>
                        <img
                          src={`http://holidaystand.co.uk/upload/img/${item.image[0]}`}
                        />
                      </figure>
                      <div className="hType">{item.name}</div>
                      <div className="layer">
                        <span>Know More</span>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="moreOne">
              <Link to="/holiday-deals">More...</Link>
            </div>
          </div>
        </div>
        <div className="midContainer">
          <div className="bannerBig">
            <div className="overlay">
              <div className="off">25% OFF</div>
              <div className="head">Croatia Cruise Adventure</div>
              <div className="desc">
                Wild & wonderful Hanoi, world-heritage Halong Bay, alluring Hue
                & historic Ho Chi Minh; plus Phnom Penh & the breathtaking
                temples of Angkor Wat
              </div>
              <div className="cost">08 days From &#163;2500 per person</div>
              <div className="call">
                Call to know more <span>020 3137 8757</span>
              </div>
            </div>
          </div>
        </div>

        <div className="countries">
          <div className="heading">
            <h2>THE WORLD IS WAITING FOR YOU</h2>
            <h3>Discover the world by travelling to different places.</h3>
          </div>

          <div className="country">
            {this.state.country.hasOwnProperty("response") && this.getCountry()}
            <div className="moreTwo">
              <Link to="/holiday-country">More...</Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <>
        <Header />
        <div className="middle-container holidays">
          {this.state.loader === true ? <Loader /> : this.page()}
        </div>

        <Footer />
      </>
    );
  }
}

export default Holidays;
