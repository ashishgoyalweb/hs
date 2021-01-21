import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {
  travellerAction,
  childAgeHandler,
  addingChildValue,
  TripAction,
  FlightDate,
  nonStop,
  MultiFlightAction,
  RemoveFlightAction,
  DepartMultiAction,
  MultiDateAction,
} from "./flightAction";
import { connect } from "react-redux";

import * as constant from "../../utilities/defination";

class Flight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTraveller: false,
      fClass: "Economy",
    };
    this.ageIndex = [];
  }
  flyingDate = (date, name) => {
    this.props.FlightDate(date, name);
  };

  toggleTraveller = () => {
    const { openTraveller } = this.state;
    this.setState({ openTraveller: !openTraveller });
  };

  passengerHandler = (event) => {
    this.props.travellerAction(event);
  };

  InfantHandler = () => {
    let adultPass = this.props.adult;
    let item = [];
    for (let i = 0; i < adultPass; i++) {
      item.push(<option value={i + 1}>{i + 1}</option>);
    }
    return item;
  };

  ChildAgeHandler = (index) => (event) => {
    this.props.childAgeHandler(index, event);
    let temp = undefined;
    if (this.ageIndex.length <= 0) {
      this.ageIndex.push(index);
      this.props.addingChildValue();
    } else {
      temp = this.ageIndex.some((d) => d === index);
      if (!temp) {
        this.props.addingChildValue();
        this.ageIndex.push(index);
      }
    }
  };

  childHandler = () => {
    //child age - generate child age selectbox
    let item = [];
    for (let c = 0; c < this.props.child; c++) {
      item.push(
        <li key={c}>
          <span>Child {c + 1} </span>
          <select
            value={this.props.ChildAge.age}
            onChange={this.ChildAgeHandler(c)}
          >
            {constant.childAge.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </li>
      );
    }
    return item;
  };

  handleTrip = (value) => {
    this.props.TripAction(value);
  };

  handleNonStop = (e) => {
    this.props.nonStop(e.target.checked);
  };

  handleMultiFlight = () => {
    this.props.MultiFlightAction();
    if (this.props.multi.length > 4) {
      document.querySelector(".addMultiFlight").style.display = "none";
    }
  };

  handleRemoveFlight = (index) => {
    this.props.RemoveFlightAction(index);
    if (this.props.multi.length <= 6) {
      document.querySelector(".addMultiFlight").style.display = "block";
    }
  };

  handleDepartMulti = (index) => (event) => {
    this.props.DepartMultiAction(index, event);
  };

  handleMultiDate = (index) => {
    console.log(index, " -", index);
    // this.props.MultiDateAction(index, event);
  };

  render() {
    // console.log("trip ", this.props.multi.length);
    return (
      <>
        <div className="engine-wrapper">
          <div className="trip">
            <div className="radio">
              <label>
                One Way
                <input
                  type="radio"
                  name="trip"
                  onChange={() => this.handleTrip("One")}
                  checked={this.props.trip === "One"}
                />
                <span className="checkmark"></span>
              </label>
              <label>
                Round Trip
                <input
                  type="radio"
                  name="trip"
                  onChange={() => this.handleTrip("Round")}
                  checked={this.props.trip === "Round"}
                />
                <span className="checkmark"></span>
              </label>
              <label>
                Multi-City
                <input
                  type="radio"
                  name="trip"
                  onChange={() => this.handleTrip("Multi")}
                  checked={this.props.trip === "Multi"}
                />
                <span className="checkmark"></span>
              </label>
            </div>

            <div className="tInfo">
              {this.props.trip !== "Multi" && (
                <div className="roundTrip">
                  <div className="dFrom">
                    <span>Depart From</span>
                    <input
                      type="text"
                      placeholder="Enter a destination airport"
                    />
                  </div>
                  <div className="circle">
                    <i></i>
                  </div>
                  <div className="dFrom">
                    <span>Going To</span>
                    <input
                      type="text"
                      placeholder="Enter a destination airport"
                    />
                  </div>
                  <div className="date">
                    <span>Departure Date</span>
                    <DatePicker
                      selected={this.props.departDate}
                      onChange={(date) => this.flyingDate(date, "depart")}
                      placeholderText="Dapart date"
                      minDate={new Date()}
                      selectsStart
                      startDate={this.props.departDate}
                      endDate={this.props.returnDate}
                      name="depart"
                      value={this.props.departDate}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <div className="date">
                    <span>Return Date</span>
                    {
                      <DatePicker
                        selected={this.props.returnDate}
                        onChange={(date) => this.flyingDate(date, "return")}
                        placeholderText="Return date"
                        minDate={this.props.departDate}
                        selectsEnd
                        startDate={this.props.departDate}
                        endDate={this.props.returnDate}
                        name="return"
                        disabled={this.props.returnDateDisable}
                        dateFormat="dd/MM/yyyy"
                      />
                    }
                  </div>
                </div>
              )}

              {this.props.trip === "Multi" && (
                <div className="multi">
                  {this.props.multi.map((item, index) => {
                    return (
                      <div className="repeat" key={index}>
                        <div className="dFrom">
                          <span>Depart From</span>
                          <input
                            type="text"
                            placeholder="Enter a destination airport"
                            value={this.props.multi[index].depart}
                            onChange={this.handleDepartMulti(index)}
                            name="depart"
                            autocomplete="off"
                          />
                        </div>
                        <div className="circle">
                          <i></i>
                        </div>
                        <div className="dFrom">
                          <span>Going To</span>
                          <input
                            type="text"
                            placeholder="Enter a destination airport"
                            value={this.props.multi[index].going}
                            name="going"
                            onChange={this.handleDepartMulti(index)}
                            autocomplete="off"
                          />
                        </div>
                        <div className="date">
                          <span>Departure Date</span>
                          <DatePicker
                            selected={this.props.multi[index].dDate}
                            onSelect={(date) =>
                              this.handleMultiDate(index, date)
                            }
                            placeholderText="Dapart date"
                            name="dDate"
                            value={this.props.multi[index].dDate}
                            dateFormat="dd/MM/yyyy"
                          />
                        </div>
                        <div
                          className="remove"
                          onClick={() => this.handleRemoveFlight(index)}
                        >
                          X
                        </div>
                      </div>
                    );
                  })}

                  <span
                    className="addMultiFlight"
                    onClick={this.handleMultiFlight}
                  >
                    Add Flight (+)
                  </span>
                </div>
              )}

              <div className="traveller">
                <span>Traveller & Class</span>
                <div
                  className={
                    "info " + (this.state.openTraveller ? "up" : "down")
                  }
                  onClick={this.toggleTraveller}
                >
                  <span>
                    {parseInt(this.props.adult) +
                      parseInt(this.props.child) +
                      parseInt(this.props.Infant)}{" "}
                    Traveller, {this.props.cabinClass}
                  </span>
                </div>
                {this.state.openTraveller && this.travellerInfo()}
              </div>
            </div>
          </div>
          <div className="btnInfo">
            <div>
              <label>
                Non Stop Flights{" "}
                <input
                  type="checkbox"
                  checked={this.props.nonstop}
                  onChange={this.handleNonStop}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div>
              <input type="button" value="search flight" />
            </div>
          </div>
        </div>
      </>
    );
  }

  /*Traveller Info*/
  travellerInfo() {
    return (
      <div className="travellerInfo">
        <ul>
          <li>
            <span>
              <section>
                Adults <span>(12+)</span>
                <select
                  value={this.props.adult}
                  name="adult"
                  onChange={this.passengerHandler}
                >
                  {constant.adultSel.map((itm, ind) => {
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
                Children <span>(2-11)</span>
                <select
                  value={this.props.child}
                  name="child"
                  onChange={this.passengerHandler}
                >
                  {constant.childSel.map((itm, ind) => {
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
                Infant <span>(0-23m)</span>
                <select
                  value={this.props.Infant}
                  name="Infant"
                  onChange={this.passengerHandler}
                >
                  <option value="0">0</option>
                  {this.props.adult > 0 && this.InfantHandler()}
                </select>
              </section>
            </span>
          </li>
        </ul>

        <div className="child">
          <ul>{this.props.child > 0 && this.childHandler()}</ul>
        </div>
        <div className="fClass">
          <span>Cabin Class</span>
          <select
            name="cabinClass"
            value={this.props.cabinClass}
            onChange={this.passengerHandler}
          >
            {constant.cabin.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  adult: state.FlightReducer.adult,
  child: state.FlightReducer.child,
  Infant: state.FlightReducer.Infant,
  ChildAge: state.FlightReducer.ChildAge,
  cabinClass: state.FlightReducer.cabinClass,
  trip: state.FlightReducer.trip,
  departDate: state.FlightReducer.departDate,
  returnDate: state.FlightReducer.returnDate,
  returnDateDisable: state.FlightReducer.returnDateDisable,
  nonstop: state.FlightReducer.nonstop,
  multi: state.FlightReducer.multi,
});

export default connect(mapStateToProps, {
  travellerAction,
  childAgeHandler,
  addingChildValue,
  TripAction,
  FlightDate,
  nonStop,
  MultiFlightAction,
  RemoveFlightAction,
  DepartMultiAction,
  MultiDateAction,
})(Flight);
