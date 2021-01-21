import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import "../index.scss";
import "./style/flight.scss";
import axios from "axios";
import * as constantAPI from "../utilities/api";
import Engine from "../engine/engine";
import Loader from "../component/loader";
import { connect } from "react-redux";

class HolidayType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HolidayType: [],
      loader: true,
    };
  }

  componentDidMount() {
    //this.fetchURL();
    this.loadCountry();
  }

  loadCountry = () => {
    axios.get(constantAPI.holidayTypes).then((res) => {
      this.setState({
        HolidayType: res.data.response[0].HolidayType,
        loader: false,
      });
    });
  };

  handleCountry = (val) => {
    //console.log("val ", val);
    this.props.history.push("holiday-detail" + "?" + val);
  };

  countryList = () => {
    return (
      <>
        <div className="midContainer">
          {this.state.HolidayType.length > 0 && (
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
                  <h2>Types of Holiday</h2>
                </div>
                <div className="holidayType">
                  {this.state.HolidayType.map((item, ind) => {
                    return (
                      <div className="hTypeBox" key={ind}>
                        <figure>
                          <img
                            src={`http://holidaystand.co.uk/upload/img/${item.image[0]}`}
                          />
                        </figure>
                        <div className="hType">{item.name}</div>
                        <div className="layer">
                          <span
                            onClick={() => this.handleCountry(`${item.name}`)}
                          >
                            Know More
                          </span>
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
    //console.log("holidayCountry ", this.state.HolidayType);
    return (
      <>
        <Header />
        <div className="middle-container country  holidays">
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

export default connect(mapStateToProps, {})(HolidayType);
