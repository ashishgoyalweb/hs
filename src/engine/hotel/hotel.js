import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import { BrowserRouter, Route } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import * as constant from "../../utilities/defination";
import * as constantAPI from "../../utilities/api";
import {
  HotelDate,
  hoteldestinationAction,
  addRoomAction,
  travellerAction,
  removeRoomAction,
  childPassengerAction,
  handlerChildAgeAction,
  updateHotelURLAction,
} from "./hotelAction";
import axios from "axios";

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTraveller: false,
      hotelCitiListing: [],
      totalPassenger: 2,
    };
  }

  toggleTraveller = () => {
    const { openTraveller } = this.state;
    this.totalPassenger();
    this.setState({ openTraveller: !openTraveller });
  };

  handleOutsideClick = (e) => {
    let empty = [];
    if (this.node?.contains(e.target)) {
      return;
    } else {
      this.setState({ hotelCitiListing: empty });
    }
    this.setState({ hotelCitiListing: empty });
  };

  hotelDate = (date, name) => {
    this.props.HotelDate(date, name);
  };

  destination = (event) => {
    if (this.state.hotelCitiListing) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    let val = event.target.value.toLowerCase();
    if (val.length !== this.props.hotelDestination) {
      this.props.hoteldestinationAction(event.target.value);
    }
    if (event.target.value.length >= 3) {
      let hotelCitiesListing = this.props.hotelCities;
      let hListing = Object.values(hotelCitiesListing)?.filter((el) => {
        return el.name.toLowerCase().includes(val);
      });
      this.setState({ hotelCitiListing: hListing });
    }
  };
  getCiti = (item) => {
    let empty = [];
    let temp = item.name + ", " + item.CountryName;
    this.setState({ hotelCitiListing: empty });
    this.props.hoteldestinationAction(temp, item.cityCode);
  };

  emptyCities = () => {
    let empty = [];
    this.setState({
      hotelCitiListing: empty,
    });
  };

  addRoomfunc = () => {
    this.props.addRoomAction();
  };

  removeRoomFunc = (index) => {
    this.props.removeRoomAction(index);
  };

  passengerHandler = (index) => (event) => {
    this.props.travellerAction(index, event);
  };

  childPassengerHandler = (index) => (event) => {
    this.props.childPassengerAction(index, event);
  };

  handlerChildAge = (Ageindex, hInd) => (event) => {
    this.props.handlerChildAgeAction(Ageindex, hInd, event);
  };

  roomRenderHandler = () => {
    let room = this.props.hotel;
    let item = [];
    for (let r = 0; r < room.length; r++) {
      item.push(
        <React.Fragment key={`room-${r}`}>
          <div className="roomCount">
            <div>Room: {r + 1}</div>
            <div className="removeHotel" onClick={() => this.removeRoomFunc(r)}>
              Remove
            </div>
          </div>

          <ul>
            <li>
              <span>
                <section>
                  Adults <span>(12+)</span>
                  <select
                    value={this.props.hotel[r].adult}
                    name="adult"
                    onChange={this.passengerHandler(r)}
                  >
                    {constant.hotelAdult.map((itm, ind) => {
                      return (
                        <option key={ind} value={itm}>
                          {itm}
                        </option>
                      );
                    })}
                  </select>
                </section>
              </span>
            </li>
            <li>
              <span>
                <section>
                  Children <span>(0-12)</span>
                  <select
                    value={this.props.hotel[r].child}
                    name="child"
                    onChange={this.childPassengerHandler(r)}
                  >
                    {constant.childHotel.map((itm, ind) => {
                      return (
                        <option key={ind} value={itm}>
                          {itm}
                        </option>
                      );
                    })}
                  </select>
                </section>
              </span>
            </li>
          </ul>
          {
            <div className="child">
              <ul>
                {parseInt(this.props.hotel[r].child) > 0 &&
                  this.childAgeHandler(r)}
              </ul>
            </div>
          }
        </React.Fragment>
      );
    }
    return item;
  };

  childAgeHandler = (hInd) => {
    //child age - generate child age selectbox
    let Cilditem = [];
    for (let age = 0; parseInt(this.props.hotel[hInd].child) > age; age++) {
      Cilditem.push(
        <li key={`child-${age}`}>
          <span>Child</span>
          <select
            name="childAge"
            onChange={this.handlerChildAge(age, hInd)}
            value={this.props.hotel[hInd].childAge[age]}
          >
            {constant.childAgeHotel.map((ite, index) => {
              return (
                <option key={index} value={ite}>
                  {ite}
                </option>
              );
            })}
          </select>
        </li>
      );
    }
    return Cilditem;
  };

  totalPassenger = () => {
    let totalPassenger = 0;
    for (let i = 0; i < this.props.hotel.length; i++) {
      totalPassenger += parseInt(this.props.hotel[i].adult);
      totalPassenger += parseInt(this.props.hotel[i].child);
    }
    this.setState({ totalPassenger });
  };

  getHotelList = () => {
    let checkIn =
      ("0" + this.props.departDateHotel.getDate()).slice(-2) +
      "/" +
      ("0" + (this.props.departDateHotel.getMonth() + 1)).slice(-2) +
      "/" +
      this.props.departDateHotel.getFullYear();
    let checkOut =
      ("0" + this.props.returnDateHotel.getDate()).slice(-2) +
      "/" +
      ("0" + (this.props.returnDateHotel.getMonth() + 1)).slice(-2) +
      "/" +
      this.props.returnDateHotel.getFullYear();
    let schema = "";
    for (let i = 0; i < this.props.hotel.length; i++) {
      schema += `${this.props.hotel[i].adult},`;
      if (parseInt(this.props.hotel[i].child) > 0) {
        schema += `${this.props.hotel[i].child},[`;
        for (let a = 0; a < this.props.hotel[i].childAge.length; a++) {
          schema += `${this.props.hotel[i].childAge[a]}-`;
        }
        schema += `0]`;
      } else {
        schema += `0,[]`;
      }
      schema += `|`;
    }

    let APIcall = `cuid=${this.props.cityCode}&checkindate=${checkIn}&checkoutdate=${checkOut}&destination=${this.props.hotelDestination}&numberofroom=${this.props.hotel.length}&Occup=${schema}`;
    // console.log("APIcall ", APIcall);
    if (this.props.cityCode !== undefined && this.props.history) {
      // console.log("cityCode ", this.props.history);
      this.props.updateHotelURLAction(APIcall);
      this.props.history.push("/hotelsearch" + "?" + APIcall);
    }
  };
  render() {
    return (
      <div className="engine-wrapper hotel">
        <div className="trip">
          <div className="tInfo">
            <div className="dFrom">
              <span
                data-toggle="tooltip"
                data-placement="top"
                title="Tooltip on top"
              >
                Dsetination
              </span>
              <input
                type="text"
                placeholder="Enter a destination airport"
                name="hotelDesti"
                value={this.props.hotelDestination}
                onChange={this.destination}
                autoComplete="off"
              />

              <div
                className="srcRstLits"
                ref={(node) => {
                  this.node = node;
                }}
                style={{
                  display:
                    this.state.hotelCitiListing.length > 0 ? "block" : "none",
                }}
              >
                <ul>
                  {this.state.hotelCitiListing.map((item, key) => {
                    if (key < 10) {
                      return (
                        <li key={key} onClick={() => this.getCiti(item)}>
                          {item.name}, {item.CountryName}
                        </li>
                      );
                    } else {
                      return;
                    }
                  })}
                </ul>
              </div>
            </div>
            <div className="date">
              <span>Check-in</span>
              <DatePicker
                selected={this.props.departDateHotel}
                onChange={(date) => this.hotelDate(date, "depart")}
                placeholderText="Where you are going"
                minDate={new Date()}
                selectsStart
                startDate={this.props.departDateHotel}
                endDate={this.props.returnDateHotel}
                name="departt"
                value={this.props.departDateHotel}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="date">
              <span>Check-out</span>
              {
                <DatePicker
                  selected={this.props.returnDateHotel}
                  onChange={(date) => this.hotelDate(date, "return")}
                  placeholderText="Return date"
                  minDate={this.props.departDateHotel}
                  selectsEnd
                  startDate={this.props.departDateHotel}
                  endDate={this.props.returnDateHotel}
                  name="returnn"
                  dateFormat="dd/MM/yyyy"
                />
              }
            </div>
            <div className="traveller">
              <span>Guests & Rooms</span>
              <div
                className={"info " + (this.state.openTraveller ? "up" : "down")}
                onClick={this.toggleTraveller}
              >
                <span>
                  {this.props.hotel.length} Room, {this.state.totalPassenger}{" "}
                  Guests
                </span>
              </div>
              {this.state.openTraveller && this.travellerInfo()}
            </div>

            <div className="btn">
              <div className="btnInfo">
                <div>
                  <input
                    type="button"
                    value="search hotel"
                    onClick={this.getHotelList}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  travellerInfo() {
    return (
      <div className="travellerInfo">
        {this.props.hotel.length > 0 && this.roomRenderHandler()}
        <div className="hotelBtn">
          <div
            className="hotelTravlerButton"
            style={{ display: this.props.hotel.length >= 4 ? "none" : "block" }}
          >
            <input type="button" value="Add Room" onClick={this.addRoomfunc} />
          </div>
          <div className="done" onClick={this.toggleTraveller}>
            Done
          </div>
        </div>
      </div>
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
});

export default connect(mapStateToProps, {
  HotelDate,
  hoteldestinationAction,
  addRoomAction,
  travellerAction,
  removeRoomAction,
  childPassengerAction,
  handlerChildAgeAction,
  updateHotelURLAction,
})(Hotel);
