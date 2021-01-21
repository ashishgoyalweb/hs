export function HotelCitiesAction(cities) {
  return (dispatch) => {
    dispatch({ type: "HOTELCITIES", payload: cities });
  };
}

export function HotelSearchParameter(
  adult,
  child,
  checkin,
  checkout,
  destination,
  room
) {
  console.log("adult ", adult, " child ", child);
  return (dispatch) => {
    dispatch({
      type: "URLSEARCHPARAMETER",
      payload: { adult, child, checkin, checkout, destination, room },
    });
  };
}

export function HotelSaerchData(data) {
  return (dispatch) => {
    dispatch({ type: "HOTELSEARCHDATA", payload: data });
  };
}

export function HotelSorting(val) {
  return (dispatch) => {
    dispatch({ type: "HOTELSORTING", payload: val });
  };
}

export function searchByHotelNameAction(val, sort) {
  return (dispatch) => {
    dispatch({ type: "BYHOTELNAME", payload: val });
  };
}

export function priceRangeMinAction(val) {
  return (dispatch) => {
    dispatch({ type: "PRICERANGEMIN", payload: val });
  };
}

export function priceRangeMaxAction(val) {
  return (dispatch) => {
    dispatch({ type: "PRICERANGEMAX", payload: val });
  };
}

export function starRatingAction(val) {
  return (dispatch) => {
    dispatch({ type: "STARRATING", payload: val });
  };
}

export function ContactUsAction(name, val) {
  return (dispatch) => {
    dispatch({ type: "CONTACTUS", payload: { name, val } });
  };
}

export function HomePageAction(data) {
  return (dispatch) => {
    dispatch({ type: "HOMEPAGE", payload: data });
  };
}

export function HolidayCountryAction(data) {
  return (dispatch) => {
    dispatch({ type: "HOLIDAYCOUNTRY", payload: data });
  };
}
