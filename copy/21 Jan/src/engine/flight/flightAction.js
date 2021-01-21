export function travellerAction(event) {
  return (dispatch) => {
    dispatch({ type: "TRAVELLER", payload: event });
  };
}

export function childAgeHandler(index, event) {
  return (dispatch) => {
    //dispatch({ type: "ADDINGCHILD", payload: { index, event } });
    dispatch({ type: "CHILDAGE", payload: { index, event } });
  };
}

export function addingChildValue() {
  console.log("adding action");
  return (dispatch) => {
    dispatch({ type: "ADDINGCHILD" });
  };
}

export function TripAction(value) {
  //console.log("trip ", event.target.value);
  return (dispatch) => {
    dispatch({ type: "TRIP", payload: value });
  };
}

export function FlightDate(date, name) {
  return (dispatch) => {
    dispatch({
      type: name === "depart" ? "FLIGHTDEPARTDATE" : "FLIGHTRETURNDATE",
      payload: date,
    });
  };
}

export function nonStop(check) {
  return (dispatch) => {
    dispatch({ type: "NONSTOP", payload: check });
  };
}

export function MultiFlightAction() {
  return (dispatch) => {
    dispatch({ type: "MULTIFLIGHT" });
  };
}

export function RemoveFlightAction(idx) {
  return (dispatch) => {
    dispatch({ type: "MULTIREMOVE", payload: idx });
  };
}

export function DepartMultiAction(index, event) {
  return (dispatch) => {
    dispatch({ type: "DEPARTMULTI", payload: { index, event } });
  };
}

export function MultiDateAction() {}
