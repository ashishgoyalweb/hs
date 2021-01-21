import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "./engine.scss";

import Flight from "./flight/flight";
import Hotel from "./hotel/hotel";
import Holidays from "./holiday/holiday";

import { HotelCitiesAction } from "../store/commonAction";
import { connect } from "react-redux";
import axios from "axios";
import * as constant from "../utilities/api";
import convert from "xml-js";

class Engine extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "flight",
      hotelCities: {},
      hotelCountry: {},
    };
  }
  componentDidMount() {
    let hotelCiti = new FormData();
    hotelCiti.append(
      "xml",
      `<Request><Head><Username>${constant.travelName}</Username><Password>${constant.travelP}</Password><RequestType>GetCities</RequestType></Head><Body></Body></Request>`
    );
    let hotelCountry = new FormData();
    hotelCountry.append(
      "xml",
      `<Request><Head><Username>${constant.travelName}</Username><Password>${constant.travelP}</Password><RequestType>GetCountries</RequestType></Head><Body/></Request>`
    );
    console.log(
      "request ",
      `<Request><Head><Username>${constant.travelName}</Username><Password>${constant.travelP}</Password><RequestType>GetCountries</RequestType></Head><Body/></Request>`
    );
    const hotelCitiRequest = axios.post(
      `${constant.travellanda}/GetCitiesRequest.xsd`,
      hotelCiti
    );
    const hotelCountryRequest = axios.post(
      `${constant.travellanda}/GetCountriesRequest.xsd`,
      hotelCountry
    );
    axios
      .all([hotelCitiRequest, hotelCountryRequest])
      .then(
        axios.spread((...responses) => {
          this.setState({
            hotelCities: convert.xml2js(responses[0].data, {
              compact: true,
              spaces: 4,
            }),
          });
          this.setState({
            hotelCountry: convert.xml2js(responses[1].data, {
              compact: true,
              spaces: 4,
            }),
          });
          this.updateHotelCitiesList();
        })
      )
      .catch((errors) => {
        console.log("some error ", errors);
      });
  }

  updateHotelCitiesList = () => {
    let Obj = this.state.hotelCities?.Response.Body?.Countries.Country;

    let cities = [];
    Obj.forEach((item) => {
      let countryCode = item.CountryCode?._text;
      const citiesObj = item.Cities;

      if (Array.isArray(citiesObj.City)) {
        citiesObj.City.forEach((city) => {
          let cityCode = city.CityId._text;
          let cityName = city.CityName._text;

          cities.push({ name: cityName, countryCode, cityCode });
        });
      } else {
        let cityCode = citiesObj.City.CityId._text;
        let cityName = citiesObj.City.CityName._text;

        cities.push({ name: cityName, countryCode, cityCode });
      }
    });

    let hCountry = this.state.hotelCountry.Response.Body.Countries.Country;
    hCountry.forEach((ctr) => {
      cities.forEach((city) => {
        if (ctr.CountryCode._text == city.countryCode) {
          city.CountryName = ctr.CountryName._text;
        }
      });
    });

    this.props.HotelCitiesAction(cities);
    //console.log("data ", cities);
  };
  render() {
    // console.log("countries ", this.state.hotelCountry);
    // console.log("city ", this.state.hotelCities);
    const { hotelCities, ...otherProps } = this.props;
    console.log("engin hai ", this.props.show);
    return (
      <>
        <div className="engine">
          <Tabs
            id="controlled-tab-example"
            activeKey={this.props.show ? this.props.show : this.state.key}
            onSelect={(key) => this.setState({ key: key })}
          >
            <Tab
              eventKey="flight"
              title="Flights"
              tabClassName="flight"
              className="flightEngine"
            >
              <Flight />
            </Tab>
            <Tab
              eventKey="hotels"
              title="Hotels"
              tabClassName="hotel"
              className="hotelEngine"
            >
              <Hotel {...otherProps} />
            </Tab>
            <Tab
              eventKey="flightHotel"
              title="Flight + Hotel"
              tabClassName="flightHotel"
              className="flightHotelEngine"
            >
              <Flight />
            </Tab>
            <Tab
              eventKey="holidays"
              title="Holidays"
              tabClassName="holiday"
              className="holidayEngine"
            >
              <Holidays />
            </Tab>
          </Tabs>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  hotelCities: state.CommonReducer.hotelCities,
});

export default connect(mapStateToProps, { HotelCitiesAction })(Engine);
