import React, { lazy, Suspense } from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import Engine from "../engine/engine";
import "../index.scss";
import "./style/flight.scss";
import * as constantAPI from "../utilities/api";
import * as constant from "../utilities/defination";
import { connect } from "react-redux";

import {
  HotelSearchParameter,
  HotelSaerchData,
  HotelSorting,
  searchByHotelNameAction,
  priceRangeMinAction,
  priceRangeMaxAction,
  starRatingAction,
} from "../store/commonAction";
import { updateURLValueAction } from "../engine/hotel/hotelAction";
import axios from "axios";
import convert from "xml-js";
const HotelSeacrhResultCard = React.lazy(() =>
  import("../component/hotelsrchcard")
);
//import HotelSeacrhResultCard from "../component/hotelsrchcard";

class HotelListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandSearch: false,
      loader: false,
      HotelSearchData: {},
      loader: false,
      searchParams: this.props.HotelParameter,
      sorting: "Recommended",
    };
  }
  componentDidUpdate() {
    // console.log("React Router Props ", this.props);
    // if (this.props.HotelParameter !== this.state.searchParams) {
    //   console.log("Please update me from here");
    // }
  }

  componentDidMount() {
    //console.log("render");
    this.fetchURL();
  }
  fetchURL = () => {
    // fetch data from URL
    let URL = window.location.search;
    let urlValue = URL.split("&");
    let citiID = urlValue[0].replace("?cuid=", "");
    let checkIn = urlValue[1].replace("checkindate=", "");
    let checkout = urlValue[2].replace("checkoutdate=", "");
    let room = urlValue[4].replace("numberofroom=", "");
    let Occupany = urlValue[5].replace("Occup=", "");
    let destination = urlValue[3].replace("destination=", "");
    let hotel = [];
    let child = 0;
    let adult = 0;
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

    this.props.updateURLValueAction(
      citiID,
      new Date(+CIpart[2], CIpart[1] - 1, +CIpart[0]),
      new Date(+COpart[2], COpart[1] - 1, +COpart[0]),
      hotel,
      destination.replaceAll("%20", " ")
    );
    this.HotelListing(citiID, hotel, checkIn, checkout);
    this.props.HotelSearchParameter(
      adult,
      child,
      new Date(+CIpart[2], CIpart[1] - 1, +CIpart[0]),
      new Date(+COpart[2], COpart[1] - 1, +COpart[0]),
      destination,
      room
    );
  };

  HotelListing = (citiID, hotel, checkIn, checkout) => {
    this.setState({ loader: true });
    //hotel call api HotelSearch without images;
    let COpart = checkout.split("/");
    let CIpart = checkIn.split("/");

    let PAX = hotel;
    console.log("PAX ", PAX);
    let schema = "";
    for (let i = 0; i < PAX.length; i++) {
      schema += `<Room><NumAdults>${PAX[i].adult}</NumAdults>`;
      if (parseInt(PAX[i].child) > 0) {
        schema += `<Children>`;
        for (let a = 0; a < PAX[i].childAge.length; a++) {
          schema += `<ChildAge>${PAX[i].childAge[a]}</ChildAge>`;
        }
        schema += `</Children>`;
      }
      schema += `</Room>`;
    }

    //Axio Call
    let HotelSearch = new FormData();

    HotelSearch.append(
      "xml",
      `<Request><Head><Username>${constantAPI.travelName}</Username><Password>${
        constantAPI.travelP
      }</Password><RequestType>HotelSearch</RequestType></Head><Body><CityIds><CityId>${citiID}</CityId></CityIds><CheckInDate>${
        +CIpart[2] + "-" + CIpart[1] + "-" + CIpart[0]
      }</CheckInDate><CheckOutDate>${
        +COpart[2] + "-" + COpart[1] + "-" + COpart[0]
      }</CheckOutDate><Rooms>${schema}</Rooms><Nationality>FR</Nationality><Currency>GBP</Currency><AvailableOnly>1</AvailableOnly></Body></Request>`
    );
    // console.log(
    //   "sc ",
    //   `<Request><Head><Username>${constantAPI.travelName}</Username><Password>${
    //     constantAPI.travelP
    //   }</Password><RequestType>HotelSearch</RequestType></Head><Body><CityIds><CityId>${citiID}</CityId></CityIds><CheckInDate>${
    //     +CIpart[2] + "-" + CIpart[1] + "-" + CIpart[0]
    //   }</CheckInDate><CheckOutDate>${
    //     +COpart[2] + "-" + COpart[1] + "-" + COpart[0]
    //   }</CheckOutDate><Rooms>${schema}</Rooms><Nationality>FR</Nationality><Currency>GBP</Currency><AvailableOnly>1</AvailableOnly></Body></Request>`
    // );
    axios
      .post(`${constantAPI.travellanda}/HotelSearchRequest.xsd}`, HotelSearch)
      .then((response) => {
        // console.log(
        //   "filter all ",
        //   convert.xml2js(response.data, {
        //     compact: true,
        //     spaces: 4,
        //   })
        // );
        //let tempFilter = ;
        let tempFilter = convert
          .xml2js(response.data, {
            compact: true,
            spaces: 4,
          })
          .Response.Body?.Hotels?.Hotel?.filter((it) => {
            return parseInt(it.StarRating._text) > 2;
          });
        //console.log("all hotels by HotelSearchRequest - One ", tempFilter);
        this.setState({
          HotelSearchData: tempFilter,
        });
        //console.log("no of hotels ", tempFilter.length);
        this.GetHotelDetails();
      })
      .catch((error) => {
        console.error("There was an error in hotel request", error);
      });
  };

  GetHotelDetails = async () => {
    //call GetHotelDetailsRequest complete information about hotels
    let hotelID = [];
    let hotelList = this.state.HotelSearchData;

    let HotelDetailsRequestAll = [];
    let tempHotelData = {};

    let ids = hotelList?.map((item, id) => {
      return item.HotelId._text;
    });
    // if (ids.length < 500 && this.state.counter === 1) {
    //   hotelID = ids;
    //   this.setState({ counter: 2 });
    // }
    let counter =
      ids.length < 500 ? 1 : ids.length > 501 && ids.length < 1000 ? 2 : 3;
    //console.log("counter ", counter, " - ", ids.length);

    for (let a = 0; a < counter; a++) {
      //console.log("a ", a);
      let GetHotelSchema = "<HotelIds>";
      let temp =
        a === 0
          ? ids.slice(0, 498)
          : a === 1
          ? ids.slice(498, 998)
          : ids.slice(998, 1497);
      // console.log("temp ", temp.length);
      for (let i = 0; i < temp.length; i++) {
        GetHotelSchema += `<HotelId>${parseInt(temp[i])}</HotelId>`;
      }
      GetHotelSchema += `</HotelIds>`;
      //console.log("GetHotelSchema ", GetHotelSchema);
      let HotelDetails = new FormData();
      HotelDetails.append(
        "xml",
        `<Request><Head><Username>${constantAPI.travelName}</Username><Password>${constantAPI.travelP}</Password><RequestType>GetHotelDetails</RequestType></Head><Body>${GetHotelSchema}</Body></Request>`
      );
      await axios
        .post(
          `${constantAPI.travellanda}/GetHotelDetailsRequest.xsd`,
          HotelDetails
        )
        .then((response) => {
          tempHotelData = convert.xml2js(response.data, {
            compact: true,
            spaces: 4,
          });
          // console.log("tempHotelData ", tempHotelData);
          // console.log(
          //   "HotelDetailsRequestAll up ",
          //   convert.xml2js(response.data, {
          //     compact: true,
          //     spaces: 4,
          //   })
          // );
          HotelDetailsRequestAll = HotelDetailsRequestAll.concat(
            tempHotelData.Response.Body.Hotels.Hotel
          );
        })
        .catch((error) => {
          console.error("There was an error! hotel details", error);
        });
    } //main for end here
    //console.log("HotelDetailsRequestAll ", HotelDetailsRequestAll);
    // console.log(
    //   "all hotels by GetHotelDetailsRequest - Two ",
    //   HotelDetailsRequestAll
    // );

    this.completeHotelInfo(HotelDetailsRequestAll);
    // this.completeHotelInfo(
    //   convert.xml2js(response.data, {
    //     compact: true,
    //     spaces: 4,
    //   })
    // );
  };

  completeHotelInfo = (data) => {
    let hotelList = this.state.HotelSearchData;

    let hotelDetails = data;
    hotelList.map((item) => {
      hotelDetails.map((hotelID) => {
        if (item.HotelId._text === hotelID.HotelId._text) {
          item.images = hotelID.Images;
          item.Description = hotelID.Description._text;
          item.Location = hotelID.Location._text;
          item.Address = hotelID.Address._text;
          item.CityId = hotelID.CityId._text;
          item.Facilities = hotelID.Facilities.Facility;
          item.Latitude = hotelID.Latitude._text;
          item.Longitude = hotelID.Longitude._text;
          item.fare = parseInt(
            item.Options.Option[0]?.TotalPrice._text !== undefined
              ? item.Options.Option[0]?.TotalPrice._text
              : item.Options.Option.TotalPrice?._text
          );
        }
      });
    });
    this.setState({ loader: false });
    this.props.HotelSaerchData(hotelList);
  };

  toggleTraveller = () => {
    const { expandSearch } = this.state;
    this.setState({ expandSearch: !expandSearch });
  };

  handleChangeMin = (event) => {
    this.props.priceRangeMinAction(event.target.value);
  };
  handleChangeMax = (event) => {
    this.props.priceRangeMaxAction(event.target.value);
  };

  sorting = (sorting) => {
    this.setState({ sorting });
    this.props.HotelSorting(sorting);
  };

  searchByName = (event) => {
    this.props.searchByHotelNameAction(event.target.value, this.state.sorting);
  };

  starRating = (val) => (event) => {
    this.props.starRatingAction(val);
  };

  render() {
    // console.log("checkin ", this.props.departDateHotel);
    // console.log(
    //   "HotelSaerchData after merge",
    //   JSON.stringify(this.props.hotelListingFilter)
    // );

    let checkIn = new Date(this.props.departDateHotel);
    let checkOut = new Date(this.props.returnDateHotel);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let timeDiff = Math.abs(checkIn.getTime() - checkOut.getTime());
    let numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return (
      <>
        <Header />
        <div className="wrapper middle-container hotel">
          <div className="midContainer">
            <div className="filter">
              <div className="filterOpt">
                <div className="headingFilter">Filter by:</div>
                <div className="hotelName">
                  <div>Hotel Name</div>
                  <input
                    type="text"
                    name="hotelName"
                    onChange={this.searchByName}
                    value={this.props.searchByHotelName}
                  />
                </div>
                <div className="budget">
                  <div>Price Range</div>
                  <div className="range-slider">
                    <span className="rangeValues">
                      &#163;{this.props.rangeFareMin} - &#163;
                      {this.props.rangeFareMax}
                    </span>
                    <input
                      value={this.props.rangeFareMin}
                      min={this.props.rangeFareMinInitial}
                      max={this.props.rangefareMaxInitial}
                      type="range"
                      onChange={this.handleChangeMin}
                    />
                    <input
                      value={this.props.rangeFareMax}
                      min={this.props.rangeFareMinInitial}
                      max={this.props.rangefareMaxInitial}
                      type="range"
                      onChange={this.handleChangeMax}
                    />
                  </div>
                </div>
                <div className="starRating">
                  <div>STAR RATING</div>
                  <div className="rating">
                    <div
                      onClick={this.starRating("one")}
                      className={this.props.oneStar === true ? "active" : ""}
                    >
                      <i className="fa fa-star"></i>
                    </div>
                    <div
                      onClick={this.starRating("two")}
                      className={this.props.twoStar === true ? "active" : ""}
                    >
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <div
                      onClick={this.starRating("three")}
                      className={this.props.threeStar === true ? "active" : ""}
                    >
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <div
                      onClick={this.starRating("four")}
                      className={this.props.fourStar === true ? "active" : ""}
                    >
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <div
                      onClick={this.starRating("five")}
                      className={this.props.fiveStar === true ? "active" : ""}
                    >
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                  </div>
                </div>
                <div className="boardType">
                  <div>Board Type</div>
                  <ul>
                    <li>
                      <label>
                        <input type="checkbox" /> Room Only
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" /> Room Only
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" /> Room Only
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" /> Room Only
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="result">
              <div className="hotelSrchInfo">
                <b>Your Search</b>:{" "}
                <span>
                  {this.props?.hotelDestination.replaceAll("%20", " ")}
                </span>{" "}
                {checkIn.getDate()} {monthNames[checkIn.getMonth()]}
                {"  "}
                {checkIn.getFullYear()} - {checkOut.getDate()}{" "}
                {monthNames[checkOut.getMonth()]} {checkOut.getFullYear()}
                {" |  "}
                {numberOfNights} Nights {this.props.room} Room{" "}
                {this.props.hotelAdult} Adult
                {parseInt(this.props.hotelChild) > 0
                  ? ` ${this.props.hotelChild} Child`
                  : ""}
                <div className="modify" onClick={this.toggleTraveller}>
                  Modify Search
                </div>
              </div>
              <div
                className="search"
                style={{ display: this.state.expandSearch ? "block" : "none" }}
              >
                <div className="searchBox " onClick={this.expandSaerch}>
                  <Engine history={this.props.history} show="hotels" />
                </div>
              </div>
              <div className="sorting">
                <div>Sort by:</div>
                <div
                  onClick={() => this.sorting("Price")}
                  className={this.state.sorting === "Price" ? "active" : ""}
                >
                  Price
                </div>
                <div
                  onClick={() => this.sorting("Star")}
                  className={this.state.sorting === "Star" ? "active" : ""}
                >
                  Star
                </div>
                <div
                  onClick={() => this.sorting("Hotel")}
                  className={this.state.sorting === "Hotel" ? "active" : ""}
                >
                  Hotel Name
                </div>
              </div>

              <Suspense fallback={<div>Loading...</div>}>
                {this.props.hotelListingFilter &&
                  this.props.hotelListingFilter.map((item, index) => {
                    return (
                      <HotelSeacrhResultCard
                        key={index}
                        hotelName={item.HotelName._text}
                        img={item.images}
                        hotelID={item.HotelId._text}
                        Options={item.Options}
                        StarRating={item.StarRating._text}
                        Location={item.Location}
                        Description={item.Description}
                        checkin={this.props.hotelCheckIn}
                        checkout={this.props.hotelCheckout}
                        destination={this.props.hotelDestination}
                        adult={this.props.hotelAdult}
                        child={this.props.hotelChild}
                        fare={item.fare}
                      />
                    );
                  })}
              </Suspense>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  departDateHotel: state.HotelReducer.departDateHotel,
  returnDateHotel: state.HotelReducer.returnDateHotel,
  hotelDestination: state.HotelReducer.hotelDestination,
  hotelCities: state.CommonReducer.hotelCities,
  hotel: state.HotelReducer.hotel,
  cityCode: state.HotelReducer.cityCode,
  hotelAdult: state.CommonReducer.hotelAdult,
  hotelChild: state.CommonReducer.hotelChild,
  hotelCheckIn: state.CommonReducer.hotelCheckIn,
  hotelCheckout: state.CommonReducer.hotelCheckout,
  hotelDestination: state.CommonReducer.hotelDestination,
  hotelListing: state.CommonReducer.hotelListing,
  HotelParameter: state.HotelReducer.HotelParameter,
  hotelListingFilter: state.CommonReducer.hotelListingFilter,
  searchByHotelName: state.CommonReducer.searchByHotelName,
  rangeFareMinInitial: state.CommonReducer.rangeFareMinInitial,
  rangefareMaxInitial: state.CommonReducer.rangefareMaxInitial,
  rangeFareMin: state.CommonReducer.rangeFareMin,
  rangeFareMax: state.CommonReducer.rangeFareMax,
  oneStar: state.CommonReducer.oneStar,
  twoStar: state.CommonReducer.twoStar,
  threeStar: state.CommonReducer.threeStar,
  fourStar: state.CommonReducer.fourStar,
  fiveStar: state.CommonReducer.fiveStar,
  room: state.CommonReducer.room,
});

export default connect(mapStateToProps, {
  updateURLValueAction,
  HotelSearchParameter,
  HotelSaerchData,
  HotelSorting,
  searchByHotelNameAction,
  priceRangeMinAction,
  priceRangeMaxAction,
  starRatingAction,
})(HotelListing);
