import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import "../index.scss";
import "./style/flight.scss";
import * as constantAPI from "../utilities/api";
import * as constant from "../utilities/defination";
import { connect } from "react-redux";
import Slider from "react-slick";

import {} from "../store/commonAction";
import {} from "../engine/hotel/hotelAction";
import axios from "axios";
import convert from "xml-js";

class HotelInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelInfo: {},
      pax: {},
    };
  }

  componentDidMount() {
    this.fetchURL();
  }
  fetchURL = async () => {
    let Hotel = {};
    let info = {};
    // fetch data from URL
    let URL = window.location.search;
    let urlValue = URL.split("&");
    let hid = urlValue[0].replace("?huid=", "");
    let checkIn = urlValue[2].replace("checkindate=", "");
    let checkout = urlValue[3].replace("checkoutdate=", "");
    let room = urlValue[5].replace("numberofroom=", "");
    let Occupany = urlValue[6].replace("Occup=", "");
    let destination = urlValue[4]
      .replace("destination=", "")
      .replaceAll("%20", " ");
    let hotel = [];
    let child = 0;
    let adult = 0;
    let hotelPaxInfo = {};
    let traveller = Occupany.split("|");
    for (let i = 0; i < traveller.length - 1; i++) {
      hotel.push({ adult: 2, child: 0, childAge: [] });
      let temp = traveller[i].split(",");
      hotel[i].adult = temp[0];
      adult = adult + parseInt(temp[0]);
      hotel[i].child = temp[1];
      child = child + parseInt(temp[1]);
      let brk = temp[2].replaceAll("-", ",");
      brk = JSON.parse(brk);
      brk.splice(brk.length - 1);
      hotel[i].childAge = brk;
    }
    let COpart = checkout.split("/");
    let CIpart = checkIn.split("/");

    // console.log("hid ", hotel);
    // console.log("checkIn ", checkIn);
    // console.log("checkout ", checkout);
    // console.log("room ", room);
    // console.log("destination ", destination);
    // console.log("child ", child);
    // console.log("adult ", adult);
    // console.log("hotel ", hotel);
    let InDate = new Date(CIpart[2] + "-" + CIpart[1] + "-" + CIpart[0]);
    let OutDate = new Date(COpart[2] + "-" + COpart[1] + "-" + COpart[0]);
    let timeDiff = Math.abs(InDate.getTime() - OutDate.getTime());
    let numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    hotelPaxInfo = {
      hotel,
      checkIn,
      checkout,
      room,
      destination,
      child,
      adult,
      hotel,
      numberOfNights,
    };
    this.setState({ pax: hotelPaxInfo });
    console.log("hotelPaxInfo ", hotelPaxInfo);

    let schema = "";
    for (let i = 0; i < hotel.length; i++) {
      schema += `<Room><NumAdults>${hotel[i].adult}</NumAdults>`;
      if (parseInt(hotel[i].child) > 0) {
        schema += `<Children>`;
        for (let a = 0; a < hotel[i].childAge.length; a++) {
          schema += `<ChildAge>${hotel[i].childAge[a]}</ChildAge>`;
        }
        schema += `</Children>`;
      }
      schema += `</Room>`;
    }
    // console.log(" schema ", schema);

    let HotelSearch = new FormData();

    HotelSearch.append(
      "xml",
      `<Request><Head><Username>${constantAPI.travelName}</Username><Password>${
        constantAPI.travelP
      }</Password><RequestType>HotelSearch</RequestType></Head><Body><HotelIds><HotelId>${hid}</HotelId></HotelIds><CheckInDate>${
        +CIpart[2] + "-" + CIpart[1] + "-" + CIpart[0]
      }</CheckInDate><CheckOutDate>${
        +COpart[2] + "-" + COpart[1] + "-" + COpart[0]
      }</CheckOutDate><Rooms>${schema}</Rooms><Nationality>FR</Nationality><Currency>GBP</Currency><AvailableOnly>1</AvailableOnly></Body></Request>`
    );
    let HotelDetails = new FormData();
    HotelDetails.append(
      "xml",
      `<Request><Head><Username>${constantAPI.travelName}</Username><Password>${constantAPI.travelP}</Password><RequestType>GetHotelDetails</RequestType></Head><Body><HotelIds><HotelId>${hid}</HotelId></HotelIds></Body></Request>`
    );
    await axios
      .all([
        axios.post(
          `${constantAPI.travellanda}/HotelSearchRequest.xsd}`,
          HotelSearch
        ),
        axios.post(
          `${constantAPI.travellanda}/GetHotelDetailsRequest.xsd`,
          HotelDetails
        ),
      ])
      .then(
        axios.spread((...responses) => {
          Hotel = convert.xml2js(responses[0].data, {
            compact: true,
            spaces: 4,
          });
          info = convert.xml2js(responses[1].data, {
            compact: true,
            spaces: 4,
          });
          Hotel = Hotel.Response.Body.Hotels.Hotel;
          info = info.Response.Body.Hotels.Hotel;
        })
      )
      .catch((errors) => {
        console.error("There was an error in hotel info page", errors);
      });

    this.hotelCombine(Hotel, info);
  };
  hotelCombine = (Hotel, info) => {
    console.log("Hotel ", Hotel);
    console.log("info ", info);
    let hotelInfo = {};
    hotelInfo.HotelId = Hotel.HotelId._text;
    hotelInfo.HotelName = Hotel.HotelName._text;
    hotelInfo.Options = Hotel.Options.Option;
    hotelInfo.StarRating = Hotel.StarRating._text;
    hotelInfo.Address = info.Address._text;
    hotelInfo.CityId = info.CityId._text;
    hotelInfo.Description = info.Description._text;
    hotelInfo.Facilities = info.Facilities.Facility;
    hotelInfo.Images = info.Images.Image;
    hotelInfo.Latitude = info.Latitude._text;
    hotelInfo.Longitude = info.Longitude._text;
    hotelInfo.Location = info.Location._text;
    hotelInfo.PhoneNumber = info.PhoneNumber._text;

    console.log("hotelInfo ", hotelInfo);
    this.setState({ hotelInfo });
  };
  star = (rating) => {
    let starRating = Math.ceil(rating);
    let item = [];
    for (let i = 0; i < starRating; i++) {
      item.push(<i className="fa fa-star orange"></i>);
    }
    for (let c = 0; c < 5 - starRating; c++) {
      item.push(<i className="fa fa-star"></i>);
    }
    return item;
  };
  render() {
    let hotel = this.state.hotelInfo;
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <>
        <Header />
        <div className="wrapper middle-container hotelSrcInfo">
          <div className="midContainer">
            {this.state.hotelInfo.hasOwnProperty("Address") && (
              <>
                <div className="hotelSection">
                  <div className="hName">
                    <div className="name">
                      {hotel.HotelName}
                      <span>{this.star(hotel.StarRating)}</span>
                    </div>
                    <div className="add">{hotel.Address}</div>
                  </div>
                  <div className="hPrice">
                    <div className="fare">
                      <span>&#163;</span>
                      {Math.ceil(hotel.Options[0].TotalPrice._text)}
                    </div>
                    <div className="pp">
                      Price for {this.state.pax.numberOfNights} nights
                    </div>
                  </div>
                </div>
                <div className="hotelContainer">
                  <div className="imageSection">
                    <Slider {...settings}>
                      {hotel.Images.map((item, ind) => {
                        return (
                          <div key={ind}>
                            <img src={item._text} alt="HolidayStand" />
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                  <div className="infoSection"></div>
                </div>
              </>
            )}
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(HotelInfo);
