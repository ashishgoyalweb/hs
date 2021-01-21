import React, { Component } from "react";
import "./services.scss";

import Heading from "../../utilities/heading";

class OurServices extends Component {
  render() {
    return (
      <div className="services">
        <div className="wrapper">
          <Heading
            heading="Our Best Services"
            subheading="Why we are the best for our client"
          />
          <div className="wrapper-container">
            <div className="wrapperBox">
              <div>
                <div className="iconbox">
                  <i className="fa fa-plane"></i>
                </div>
                <div className="serviceHeading">
                  The Most Reliable Airlines Only
                </div>
                <p>
                  We cooperate only with the most reliable airlines who can
                  boast the perfect reputation.
                </p>
              </div>
            </div>

            <div className="wrapperBox">
              <div>
                <div className="iconbox">
                  <i className="fa fa-users"></i>
                </div>
                <div className="serviceHeading">
                  More Than 7M Visitors Each Month
                </div>
                <p>
                  More than 7 million people use our services to find and book
                  airline tickets.
                </p>
              </div>
            </div>

            <div className="wrapperBox">
              <div>
                <div className="iconbox">
                  <i className="fa fa-search"></i>
                </div>
                <div className="serviceHeading">
                  User-Friendly Search System
                </div>
                <p>
                  Convenient and fast search for airline tickets, hotels, and
                  cars.
                </p>
              </div>
            </div>

            <div className="wrapperBox">
              <div>
                <div className="iconbox">
                  <i className="fa fa-calendar"></i>
                </div>
                <div className="serviceHeading">
                  Fast and Reliable Ticket Booking
                </div>
                <p>
                  We provide convenient ticket booking system, which is also
                  perfect for first-time travellers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OurServices;
