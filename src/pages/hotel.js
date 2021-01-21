import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import Engine from "../engine/engine";
import "../index.scss";
import "./style/flight.scss";
import axios from "axios";
import * as constantAPI from "../utilities/api";
import Slider from "react-slick";
import Loader from "../component/loader";

class HotelPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      loader: true,
    };
  }

  componentDidMount() {
    axios
      .get(constantAPI.hotelPage, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        //console.log("res ", res);
        let hotels = res.data.response[0];
        this.setState({ hotels, loader: false });
      });
  }

  starRatingAction = (rating) => {
    let star = [];
    for (let i = 0; i < rating; i++) {
      star.push(<i className="fa fa-star" key={i}></i>);
    }
    return star;
  };
  addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  handleHotelDesti = (item) => {
    let date = new Date();
    console.log("hotel", item);

    let checkIn =
      ("0" + date.addDays(5).getDate()).slice(-2) +
      "/" +
      ("0" + (date.addDays(5).getMonth() + 1)).slice(-2) +
      "/" +
      date.addDays(5).getFullYear();
    let checkOut =
      ("0" + date.addDays(9).getDate()).slice(-2) +
      "/" +
      ("0" + (date.addDays(9).getMonth() + 1)).slice(-2) +
      "/" +
      date.addDays(9).getFullYear();
    let APIcall = `cuid=${item.destination_id}&checkindate=${checkIn}&checkoutdate=${checkOut}&destination=${item.destination_name}&numberofroom=1&Occup=2,0,[]|`;
    this.props.history.push("/hotelsearch" + "?" + APIcall);
    console.log("date ", APIcall);
  };

  page = () => {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 4000,
      autoplaySpeed: 4000,
      //cssEase: "linear",
      pauseOnHover: true,
    };
    const settings2 = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 3000,
      //cssEase: "linear",
      pauseOnHover: true,
    };
    let HotelPage = this.state.hotels?.HomePage;
    let hotelDestination = this.state.hotels?.HotelPageDestinationCSV;
    let HotelPageOfferCSV = this.state.hotels?.HotelPageOfferCSV;
    return (
      <div className="midContainer">
        {this.state.hotels.hasOwnProperty("HomePage") && (
          <div>
            <div className="banner">
              <img
                src={`http://holidaystand.co.uk/upload/img/${HotelPage[0].banner_image[0]}`}
                alt={HotelPage[0].page_heading}
              />
              <div className="search ">
                <Engine {...this.props} />
              </div>
            </div>
            <div className="wrapper">
              <div className="flight_heading">{HotelPage[0].page_heading}</div>
              <div className="flightDesc">{HotelPage[0].description}</div>
              <div className="hotelDestiOffer">
                <Slider {...settings}>
                  {hotelDestination.length > 0 &&
                    hotelDestination.map((item, ind) => {
                      return (
                        <div
                          className="hotelWrapper"
                          key={ind}
                          onClick={() => this.handleHotelDesti(item)}
                        >
                          <img
                            src={`http://holidaystand.co.uk/upload/img/${item.image}`}
                          />
                          <div className="hotelInfo">
                            <div className="destination">
                              {item.destination_name}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>

            <div className="hotelOffer">
              <div className="wrapper">
                <div className="heading">
                  <h2>Hotels Offers</h2>
                </div>
                <div className="carousel-listing">
                  <Slider {...settings2}>
                    {HotelPageOfferCSV.length > 0 &&
                      HotelPageOfferCSV.map((item, ind) => {
                        return (
                          <div className="carousel-items" key={ind}>
                            <div className="main-img">
                              <img
                                src={`http://holidaystand.co.uk/upload/img/${item.image}`}
                              />
                              <div className="list-mask">
                                <div className="fare">
                                  &#163;{item.fare}
                                  <span className="divider">|</span>
                                  <span className="pkg">
                                    {item.night} Nights
                                  </span>
                                </div>
                                <div className="rating">
                                  {item.star_rating &&
                                    this.starRatingAction(
                                      parseInt(item.star_rating)
                                    )}
                                </div>
                              </div>
                            </div>
                            <div className="main-info">
                              <div className="hotel-title">
                                <div className="hName">{item.hotel_name}</div>
                                <div className="country">{item.country}</div>
                              </div>
                              <div className="arrow">></div>
                            </div>
                          </div>
                        );
                      })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <>
        <Header />
        <div className="wrapper middle-container hotels">
          {this.state.loader === true ? <Loader /> : this.page()}
        </div>
        <Footer />
      </>
    );
  }
}

export default HotelPage;
