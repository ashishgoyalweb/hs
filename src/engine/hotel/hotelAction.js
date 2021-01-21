export function HotelDate(date, name) {
  return (dispatch) => {
    dispatch({
      type: name === "depart" ? "HOTELDEPARTDATE" : "HOTELRETURNDATE",
      payload: date,
    });
  };
}

export function hoteldestinationAction(value, cityCode) {
  return (dispatch) => {
    dispatch({ type: "HOTELDETINATION", payload: { value, cityCode } });
  };
}

export function addRoomAction() {
  return (dispatch) => {
    dispatch({ type: "ADDROOM" });
  };
}

export function travellerAction(index, event) {
  return (dispatch) => {
    dispatch({ type: "ADDADULTHOTEL", payload: { index, event } });
  };
}

export function childPassengerAction(index, event) {
  return (dispatch) => {
    dispatch({ type: "ADDCHILDHOTEL", payload: { index, event } });
    dispatch({ type: "ADDCHILDAGE", payload: { index, event } });
  };
}

export function handlerChildAgeAction(Ageindex, hInd, event) {
  return (dispatch) => {
    dispatch({ type: "CHILDAGEHOTEL", payload: { Ageindex, hInd, event } });
  };
}

export function removeRoomAction(idx) {
  return (dispatch) => {
    dispatch({ type: "DELETEROOM", payload: idx });
  };
}
export function updateHotelURLAction(URL) {
  return (dispatch) => {
    dispatch({ type: "UPDATEHOTELURL", payload: URL });
  };
}

export function updateURLValueAction(
  citiID,
  checkIn,
  checkout,
  hotel,
  destination
) {
  return (dispatch) => {
    dispatch({
      type: "UPDATEFROMURL",
      payload: { citiID, checkIn, checkout, hotel, destination },
    });
  };
}
