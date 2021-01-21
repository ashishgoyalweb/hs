import React, { Component } from "react";
import axios from "axios";

import "./destination.scss";
import Heading from "../../utilities/heading";
import * as constantAPI from "../../utilities/api";

class Destination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: [],
    };
  }

  componentDidMount() {
    axios.get(constantAPI.holidayCountry).then((res) => {
      let data = res.data.response[0].HolidayCountry;
      let destination = [];
      destination = data.filter((item) => {
        return item.show_home_page === "yes";
      });
      this.setState({ destination });
    });
  }

  handleCountry = (val) => {
    //console.log("val ", val);
    this.props.history.push("country-detail" + "?" + val);
  };
  render() {
    let destinations = this.state.destination;
    //console.log("desti ", this.state.destination);
    return (
      <div className="destiContainer">
        <Heading
          heading="Popular Destinations"
          subheading="Find out what the best destinations in the World"
        />
        <div className="wrapper">
          {destinations.length > 0 &&
            destinations.map((item, index) => {
              return (
                <div
                  className="destiList"
                  key={index}
                  onClick={() => this.handleCountry(`${item.country_name}`)}
                >
                  <div className="destiBox">
                    <div className="destiInfo">
                      <div className="destiHead">{item.country_name}</div>
                      {/* <div className="destiSubhead">{item.subhead}</div> */}
                      <div className="destiCost">&#163;{item.fare}</div>
                    </div>
                    <figure>
                      <img
                        src={`http://holidaystand.co.uk/upload/img/${item.image[0]}`}
                        alt={item.country_name}
                      />
                    </figure>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Destination;
