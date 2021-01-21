import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import Engine from "../engine/engine";
import "../index.scss";
import "./style/flight.scss";
import axios from "axios";
import * as constantAPI from "../utilities/api";
import Loader from "../component/loader";

class FlightPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: [],
      loader: true,
    };
  }

  componentDidMount() {
    axios
      .get(constantAPI.FlightPage, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        //console.log("res ", res);
        let flight = res.data.response[0];
        this.setState({ flight, loader: false });
      });
  }

  page = () => {
    let FlightPage = this.state.flight?.FlightPage;
    let Destination = this.state.flight?.FlightPageDestinationCSV;
    let lowestFare = this.state.flight?.FlightPagelowestFareCSV;
    return (
      <div className="midContainer">
        {this.state.flight.hasOwnProperty("FlightPage") && (
          <>
            <div className="banner">
              <img
                src={`http://holidaystand.co.uk/upload/img/${FlightPage[0].banner_image[0]}`}
                alt={FlightPage[0].page_heading}
              />
              <div className="search ">
                <Engine {...this.props} />
              </div>
            </div>
            <div className="wrapper">
              <div className="flight_heading">{FlightPage[0].page_heading}</div>
              <div className="flightDesc">{FlightPage[0].description}</div>
              <div className="collage">
                <h2>{FlightPage[0].destination_heading}</h2>
                <div className="column">
                  <div className="col34">
                    <div className="firstContainer">
                      <img
                        src={`http://holidaystand.co.uk/upload/img/${Destination[0].image}`}
                      />
                      <div className="overlay">
                        <div className="desti">{Destination[0].title}</div>
                        <div className="fare">&#163;{Destination[0].fare}</div>
                      </div>
                    </div>
                    <div className="twoContainer">
                      <img
                        src={`http://holidaystand.co.uk/upload/img/${Destination[1].image}`}
                      />
                      <div className="overlay">
                        <div className="desti">{Destination[1].title}</div>
                        <div className="fare">&#163;{Destination[1].fare}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col66">
                    <div className="column">
                      <div className="bigOne">
                        <img
                          src={`http://holidaystand.co.uk/upload/img/${Destination[2].image}`}
                        />
                        <div className="overlay">
                          <div className="desti">{Destination[2].title}</div>
                          <div className="fare">
                            &#163;{Destination[2].fare}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="col50">
                        <div className="midOne">
                          <img
                            src={`http://holidaystand.co.uk/upload/img/${Destination[3].image}`}
                          />
                          <div className="overlay">
                            <div className="desti">{Destination[3].title}</div>
                            <div className="fare">
                              &#163;{Destination[3].fare}
                            </div>
                          </div>
                        </div>
                        <div className="midOne">
                          <img
                            src={`http://holidaystand.co.uk/upload/img/${Destination[4].image}`}
                          />
                          <div className="overlay">
                            <div className="desti">{Destination[4].title}</div>
                            <div className="fare">
                              &#163;{Destination[4].fare}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col50">
                        <div className="lastOne">
                          <img
                            src={`http://holidaystand.co.uk/upload/img/malaysia.jpg`}
                          />
                          <div className="overlay">
                            <div className="desti">{Destination[5].title}</div>
                            <div className="fare">
                              &#163;{Destination[5].fare}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flightDesti">
                <h2>{FlightPage[0].flight_heading}</h2>
                <div className="flightWrapper">
                  {lowestFare.map((item, ind) => {
                    return (
                      <div className="boxes" key={ind}>
                        <div className="img">
                          <img
                            src={`http://holidaystand.co.uk/upload/img/${item.images}`}
                            alt={item.destinationName}
                          />
                        </div>
                        <div className="info">
                          <div>{item.destinationName}</div>
                          <div>from {item.destinationFrom}</div>
                        </div>
                        <div className="costing">
                          <div>from</div>
                          <div>&#163;{item.fare}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  render() {
    return (
      <>
        <Header />
        <div className="wrapper middle-container flight">
          {this.state.loader === true ? <Loader /> : this.page()}
        </div>
        <Footer />
      </>
    );
  }
}

export default FlightPage;
