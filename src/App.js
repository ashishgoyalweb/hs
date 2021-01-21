import React from "react";
import "./App.css";
/*Route */
import Home from "./pages/Home";
import About from "./pages/about";
import FlightPage from "./pages/flight";
import HotelPage from "./pages/hotel";
import HotelListing from "./pages/hotelsearch";
import Terms from "./pages/terms-and-conditions";
import Privacy from "./pages/privacy";
import Contact from "./pages/contact";
import Cookie from "./pages/cookie-policy";
import Sitemap from "./pages/sitemap";
import FAQ from "./pages/faq";
import Baggage from "./pages/baggagepolicies";
import SpecialAssistance from "./pages/special-assistance";
import TravelingwithInfants from "./pages/travelingwithinfants";
import PurchasingRefunds from "./pages/purchasing-refunds";
import SpecialOffers from "./pages/special-offers";
import Holidays from "./pages/holidays";
import Car from "./pages/car-hire";
import HolidayCountry from "./pages/country";
import CountryInfo from "./pages/countryInfo";
import HolidayType from "./pages/holidaytype";
import HolidayTypeInfo from "./pages/holidaytypeinfo";
import HolidayPackageInfo from "./pages/holidaypackageinfo";
import HotelInfo from "./pages/hotelinfo";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/flight" exact component={FlightPage} />
          <Route path="/hotels" exact component={HotelPage} />
          <Route path="/special-offers" exact component={SpecialOffers} />
          <Route path="/hotelsearch" exact component={HotelListing} />
          <Route path="/privacy" exact component={Privacy} />
          <Route path="/terms-and-conditions" exact component={Terms} />
          <Route path="/contact-us" exact component={Contact} />
          <Route path="/cookie-policy" exact component={Cookie} />
          <Route path="/sitemap" exact component={Sitemap} />
          <Route path="/faq" exact component={FAQ} />
          <Route path="/baggage-policies" exact component={Baggage} />
          <Route path="/holiday-country" exact component={HolidayCountry} />
          <Route path="/country-detail" exact component={CountryInfo} />
          <Route path="/holiday-deals" exact component={HolidayType} />
          <Route path="/holiday-detail" exact component={HolidayTypeInfo} />
          <Route path="/holiday-package" exact component={HolidayPackageInfo} />
          <Route path="/hotel-info" exact component={HotelInfo} />
          <Route
            path="/special-assistance"
            exact
            component={SpecialAssistance}
          />
          <Route
            path="/traveling-with-infants"
            exact
            component={TravelingwithInfants}
          />
          <Route
            path="/purchasing-refunds"
            exact
            component={PurchasingRefunds}
          />
          <Route path="/holidays" exact component={Holidays} />
          <Route path="/car-hire" exact component={Car} />

          {/*<PrivateRoute path={RouteConstants.admin} component={AdminDashboard} />
          <Route path={RouteConstants.login} component={Login} />*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
