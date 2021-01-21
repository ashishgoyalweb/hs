import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import "../index.scss";
import "./style/flight.scss";
import axios from "axios";
import * as constantAPI from "../utilities/api";
import Engine from "../engine/engine";
import Loader from "../component/loader";

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: [],
      loader: true,
    };
  }

  componentDidMount() {
    axios
      .get(constantAPI.car, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        //console.log("res ", res);
        let car = res.data.response[0];
        this.setState({ car, loader: false });
      })
      .catch((err) => {
        this.setState({ loader: false });
        console.log("some prob in Car ", err);
      });
  }

  page = () => {
    let car = this.state.car?.CarPage;
    let carCSV = this.state.car?.CarPageCSV;
    return (
      <>
        <div className="midContainer">
          {this.state.car.hasOwnProperty("CarPage") && (
            <>
              <div className="banner">
                <img
                  src={`http://holidaystand.co.uk/upload/img/${car[0].banner_image[0]}`}
                  alt={car[0].car_heading}
                />
                <div className="search ">
                  <Engine {...this.props} />
                </div>
              </div>
              <div className="wrapper">
                <div className="flight_heading">{car[0].car_heading}</div>
                <div className="flightDesc">
                  {car[0].description.replace(/<\/?[^>]+>/gi, "")}
                </div>

                <div className="carSection">
                  {this.state.car.hasOwnProperty("CarPageCSV") &&
                    carCSV.map((item, idx) => {
                      return (
                        <div className="section" key={idx}>
                          <div className="carImg">
                            <img
                              src={`http://holidaystand.co.uk/upload/img/${item.image}`}
                              alt={item.car_type}
                            />
                          </div>
                          <div className="carInfo">
                            <div className="carName">{item.car_type}</div>
                            <ul>
                              <li title="Seat">
                                <i className="seat"></i> {item.seat}
                              </li>
                              <li title="Door">
                                <i className="door"></i> {item.door}
                              </li>
                              <li title="Baggage">
                                <i className="bag"></i> {item.baggage}
                              </li>
                              <li title="Air Condition">
                                <i className="ac"></i> {item.air_condition}
                              </li>
                              <li title="Gear">
                                <i className="gear"></i> {item.gear_box}
                              </li>
                            </ul>
                          </div>
                          <div className="carPrice">
                            <span>fr</span> &#163;{item.price}
                            <input type="button" value="Call to book" />
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
    return (
      <>
        <Header />
        <div className="middle-container car">
          {this.state.loader === true ? <Loader /> : this.page()}
        </div>

        <Footer />
      </>
    );
  }
}

export default Car;
