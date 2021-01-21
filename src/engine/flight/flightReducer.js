let returndate = new Date();

const initialState = {
  adult: 1,
  child: 0,
  Infant: 0,
  ChildAge: [[{ age: "" }]],
  cabinClass: "Economy",
  trip: "Round",
  departDate: new Date(),
  returnDate: new Date(),
  returnDateDisable: false,
  nonstop: false,
  multi: [
    { depart: "one", going: "two", dDate: new Date() },
    { depart: "one", going: "two", dDate: new Date() },
  ],
};

export const FlightReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TRAVELLER": {
      return {
        ...state,
        [action.payload.target.name]: action.payload.target.value,
      };
    }

    case "CHILDAGE": {
      const newValues = state.ChildAge.map((childage, ageID) => {
        if (action.payload.index !== ageID) return childage;
        return { ...childage, age: action.payload.event.target.value };
      });
      return { ...state, ChildAge: newValues };
    }

    case "ADDINGCHILD": {
      //console.log(" child age ", state.ChildAge);
      return {
        ...state,
        ChildAge: state.ChildAge.concat([{ age: "" }]),
      };
    }

    case "TRIP": {
      return {
        ...state,
        trip: action.payload,
        returnDateDisable: action.payload === "One",
        returnDate:
          action.payload === "One" ? null : state.departDate.addDays(7),
      };
    }

    case "FLIGHTDEPARTDATE": {
      return {
        ...state,
        departDate: action.payload,
        returnDate: action.payload.addDays(7),
      };
    }

    case "FLIGHTRETURNDATE": {
      return {
        ...state,
        returnDate: action.payload,
      };
    }

    case "NONSTOP": {
      return { ...state, nonstop: action.payload };
    }

    case "MULTIFLIGHT": {
      return {
        ...state,
        multi: state.multi.concat([
          { depart: "", going: "", dDate: new Date() },
        ]),
      };
    }

    case "MULTIREMOVE": {
      return {
        ...state,
        multi: state.multi.filter((s, idx) => action.payload !== idx),
      };
    }

    case "DEPARTMULTI": {
      const newValues = state.multi.map((item, indx) => {
        if (action.payload.index !== indx) return item;
        return {
          ...item,
          [action.payload.event.target.name]: action.payload.event.target.value,
        };
      });
      return { ...state, multi: newValues };
    }

    default:
      return {
        ...state,
        returnDate: returndate.addDays(7),
      };
  }
};

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
