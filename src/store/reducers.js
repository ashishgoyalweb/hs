import { combineReducers } from "redux";
import { FlightReducer } from "../engine/flight/flightReducer";
import { HotelReducer } from "../engine/hotel/hotelReducer";
import { CommonReducer } from "./commonReducer";

export default combineReducers({
  FlightReducer,
  HotelReducer,
  CommonReducer,
});
