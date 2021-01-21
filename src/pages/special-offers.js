import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import Engine from "../engine/engine";
import "../index.scss";
import "./style/flight.scss";
import axios from "axios";
import { getRandom } from "../utilities/func";
import * as constantAPI from "../utilities/api";
import Loader from "../component/loader";

class SpecialOffers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      country: [],
      loader: true,
    };
  }

  componentDidMount() {
    axios
      .all([
        axios.get(constantAPI.specOffer),
        axios.get(constantAPI.holidayCountry),
      ])
      .then(([offers, country]) => {
        this.setState({
          offers: offers.data.response[0],
          country: country.data.response[0],
          loader: false,
        });
      })
      .catch((err) => {
        this.setState({ loader: true });
        console.log("some problem in special offers ", err);
      });
  }

  starRatingAction = (rating) => {
    let star = [];
    for (let i = 0; i < rating; i++) {
      star.push(<i className="fa fa-star" key={i}></i>);
    }
    return star;
  };

  handleCountry = (val) => {
    //console.log("val ", val);
    this.props.history.push("country-detail" + "?" + val);
  };

  getHolidayCountry = () => {
    let arr = getRandom(this.state.country?.HolidayCountry, 6);
    let result = arr.map((item, ind) => {
      return (
        <div
          className="spHolidayContainer"
          key={ind}
          onClick={() => this.handleCountry(`${item.country_name}`)}
        >
          <figure>
            <img
              src={`http://holidaystand.co.uk/upload/img/${item.image[0]}`}
            />
          </figure>
          <div className="spInfo">
            <div className="spCountry">
              <div className="count">{item.country_name}</div>
              <div className="spFare">&#163;{item.fare}</div>
            </div>
            <div className="spDesc">
              {item.dscr?.slice(0, 140).replace(/<\/?[^>]+>/gi, "")}
              ...read more
            </div>
          </div>
        </div>
      );
    });
    return result;
  };

  page = () => {
    let offersPage = this.state.offers?.SpecialOfferPage;
    let flightOffer = this.state.offers?.SpecialOfferFlightCSV;
    let packageOffer = this.state.offers?.SpecialOfferPackageCSV;
    let country = this.state.country?.HolidayCountry;
    return (
      <>
        <div className="midContainer">
          {this.state.offers.hasOwnProperty("SpecialOfferPage") && (
            <>
              <div className="banner">
                <img
                  src={`http://holidaystand.co.uk/upload/img/${offersPage[0].banner_image[0]}`}
                  alt={offersPage[0].page_heading}
                />
                <div className="search ">
                  <Engine {...this.props} />
                </div>
              </div>
              <div className="wrapper">
                <div className="flight_heading">
                  {offersPage[0].page_heading}
                </div>
                <div className="flightDesc">{offersPage[0].description}</div>
                <div className="spHoliday">
                  <div className="heading">
                    <h2>
                      {this.state.offers?.SpecialOfferPage[0].holiday_heading}
                    </h2>
                    <h3>
                      {
                        this.state.offers?.SpecialOfferPage[0]
                          .holiday_sub_heading
                      }
                    </h3>
                  </div>
                  <div className="spContainer">
                    {this.state.country.hasOwnProperty("HolidayCountry") &&
                      this.getHolidayCountry()}
                  </div>
                </div>

                <div className="spFlight">
                  <div className="heading">
                    <h2>
                      {this.state.offers?.SpecialOfferPage[0].flight_heading}
                    </h2>
                    <h3>
                      {
                        this.state.offers?.SpecialOfferPage[0]
                          .flight_sub_heading
                      }
                    </h3>
                  </div>
                  <div className="spFlightContainer">
                    {flightOffer.length > 0 &&
                      flightOffer.map((item, ind) => {
                        return (
                          <div className="spFlightBox" key={ind}>
                            <figure>
                              <img
                                src={`http://holidaystand.co.uk/upload/img/${item.image}`}
                              />
                            </figure>
                            <div className="spFlightInfo">
                              <div className="spFlightDesti">
                                {item.destination_name}
                                <div className="spFlightFrom">
                                  {item.destination_from}
                                </div>
                              </div>
                              <div className="spFlightFare">
                                &#163;{item.fare}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="spPackage">
                  <div className="heading">
                    <h2>
                      {this.state.offers?.SpecialOfferPage[0].package_heading}
                    </h2>
                    <h3>
                      {
                        this.state.offers?.SpecialOfferPage[0]
                          .package_sub_heading
                      }
                    </h3>
                  </div>
                  <div className="spPackageContainer">
                    {packageOffer.length > 2 && (
                      <>
                        <div className="spPackOne">
                          <figure>
                            <img
                              src={`http://holidaystand.co.uk/upload/img/${packageOffer[0].image}`}
                            />
                          </figure>
                          <div className="spPackOneInfo">
                            <div className="spPackOneDuration">
                              {packageOffer[0].duration}
                            </div>
                            <div className="spPackOneHead">
                              {packageOffer[0].package_name}
                            </div>
                            <div className="spPackOneDesc">
                              {packageOffer[0].description.slice(0, 250)}
                            </div>
                            <div className="spPackButton">
                              Call to know more
                            </div>
                          </div>
                        </div>
                        <div className="spPackTwo">
                          <div className="spPackSection">
                            <figure>
                              <img
                                src={`http://holidaystand.co.uk/upload/img/${packageOffer[1].image}`}
                              />
                            </figure>
                            <div className="spPackInfo">
                              <div className="spPackDuration">
                                {packageOffer[1].duration}
                              </div>
                              <div className="spPackHead">
                                {packageOffer[1].package_name}
                              </div>
                              <div className="spPackDesc">
                                {packageOffer[1].description.slice(0, 250)}
                              </div>
                              <div className="spPackButton">
                                Call to know more
                              </div>
                            </div>
                          </div>

                          <div className="spPackSection">
                            <figure>
                              <img
                                src={`http://holidaystand.co.uk/upload/img/${packageOffer[2].image}`}
                              />
                            </figure>
                            <div className="spPackInfo">
                              <div className="spPackDuration">
                                {packageOffer[2].duration}
                              </div>
                              <div className="spPackHead">
                                {packageOffer[2].package_name}
                              </div>
                              <div className="spPackDesc">
                                {packageOffer[2].description.slice(0, 250)}
                              </div>
                              <div className="spPackButton">
                                Call to know more
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  render() {
    // console.log("state ", this.state.flight);

    return (
      <>
        <Header />
        <div className="wrapper middle-container specialOffers">
          {this.state.loader === true ? <Loader /> : this.page()}
        </div>

        <Footer />
      </>
    );
  }
}

export default SpecialOffers;
