import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import "../index.scss";
import "./style/flight.scss";
import axios from "axios";
import * as constantAPI from "../utilities/api";
import Engine from "../engine/engine";
import Loader from "../component/loader";
import { HolidayCountryAction } from "../store/commonAction";
import { connect } from "react-redux";

class HolidayCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: [],
      loader: true,
    };
  }

  componentDidMount() {
    //this.fetchURL();
    this.loadCountry();
  }

  loadCountry = () => {
    axios.get(constantAPI.holidayCountry).then((res) => {
      this.props.HolidayCountryAction(res.data.response[0].HolidayCountry);
      this.setState({ loader: false });
    });
  };

  handleCountry = (val) => {
    //console.log("val ", val);
    this.props.history.push("country-detail" + "?" + val);
  };

  countryList = () => {
    return (
      <>
        <div className="midContainer">
          {this.props.holidayCountry.length > 0 && (
            <>
              <div className="banner">
                <img
                  src="http://holidaystand.holidaystand.com/upload/img/country1.png"
                  alt="HolidayStand"
                />
                <div className="search ">
                  <Engine {...this.props} />
                </div>
              </div>
              <div className="wrapper">
                <div className="heading">
                  <h2>Discover Amazing Places of the world</h2>
                </div>
                <div className="countryWrapper">
                  {this.props.holidayCountry.map((item, ind) => {
                    return (
                      <div
                        className="countryList"
                        key={ind}
                        onClick={() =>
                          this.handleCountry(`${item.country_name}`)
                        }
                      >
                        <figure>
                          <img
                            src={`http://holidaystand.co.uk/upload/img/${item.image[0]}`}
                          />
                        </figure>
                        <div className="tour-detail">
                          <h3>{item.country_name}</h3>
                          <div
                            className="info"
                            dangerouslySetInnerHTML={{
                              __html: item.dscr.substring(0, 120),
                            }}
                          ></div>
                        </div>
                        <div className="tour-cost">
                          <span>fr</span> &#163;{item.fare}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  render() {
    //  console.log("holidayCountry ", this.props.holidayCountry);
    return (
      <>
        <Header />
        <div className="middle-container country">
          {this.state.loader === true ? <Loader /> : this.countryList()}
        </div>

        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  holidayCountry: state.CommonReducer.holidayCountry,
});

export default connect(mapStateToProps, {
  HolidayCountryAction,
})(HolidayCountry);
