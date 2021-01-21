import React, { Component } from "react";
import HolidayStand from "../assets/holidaystand.png";
import { Link } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <nav>
        <div className="wrapper">
          <div className="logo">
            <a href="">
              <img
                src={HolidayStand}
                alt="Holoday Stand"
                title="Holiday Stand"
              />
            </a>
          </div>

          <div className="nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/flight">Flights</Link>
              </li>
              <li>
                <Link to="/hotels">Hotels</Link>
              </li>
              <li>
                <Link to="/holidays">Holidays</Link>
              </li>
              <li>
                <Link to="/special-offers">Special Offers</Link>
              </li>
              <li>
                <Link to="/car-hire">Car Hire</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
