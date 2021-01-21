import { act } from "react-dom/test-utils";

const initialState = {
  hotelCities: {},
  hotelAdult: 2,
  hotelChild: 0,
  hotelCheckIn: new Date(),
  hotelCheckout: new Date(),
  hotelDestination: "",
  hotelListing: [],
  hotelListingFilter: [],
  searchByHotelName: undefined,
  rangeFareMinInitial: 0,
  rangefareMaxInitial: 100,
  rangeFareMin: 0,
  rangeFareMax: 100,
  oneStar: false,
  twoStar: false,
  threeStar: false,
  fourStar: false,
  fiveStar: false,
  contact: {
    title: "",
    fName: "",
    lName: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  },
  homepage: [],
  holidayCountry: [],
};

export const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HOTELCITIES": {
      return {
        ...state,
        hotelCities: action.payload,
      };
    }

    case "URLSEARCHPARAMETER": {
      return {
        ...state,
        hotelAdult: action.payload.adult,
        hotelChild: action.payload.child,
        hotelCheckIn: action.payload.checkin,
        hotelCheckout: action.payload.checkout,
        hotelDestination: action.payload.destination,
        room: action.payload.room,
      };
    }

    case "HOTELSEARCHDATA": {
      let getRangeValue = [...action.payload];
      let new_Data = [];
      new_Data = getRangeValue.sort((a, b) => a.fare - b.fare);

      console.log("range  min", new_Data[0].fare);
      console.log("range  max", new_Data[new_Data.length - 1].fare);
      return {
        ...state,
        hotelListing: action.payload,
        hotelListingFilter: action.payload,
        rangeFareMinInitial: new_Data[0].fare,
        rangefareMaxInitial: new_Data[new_Data.length - 1].fare,
        rangeFareMin: new_Data[0].fare,
        rangeFareMax: new_Data[new_Data.length - 1].fare,
      };
    }

    case "HOTELSORTING": {
      let type = action.payload;
      let newData = [];
      if (type === "Price") {
        newData = state.hotelListingFilter.sort((a, b) => a.fare - b.fare);
      } else if (type === "Star") {
        newData = state.hotelListingFilter.sort(
          (a, b) =>
            Math.ceil(a.StarRating._text) - Math.ceil(b.StarRating._text)
        );
      } else if (type === "Hotel") {
        newData = state.hotelListingFilter.sort(function (a, b) {
          if (a.HotelName._text < b.HotelName._text) {
            return -1;
          }
          if (a.HotelName._text > b.HotelName._text) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        hotelListingFilter: newData,
      };
    }

    case "BYHOTELNAME": {
      let type = action.payload.sort;
      let hotelCitiesListing = state.hotelListing;
      let hListing = hotelCitiesListing?.filter((el) => {
        console.log("el.HotelName._text ", el.HotelName._text);
        return el.HotelName._text
          .toLowerCase()
          .includes(action.payload.val.toLowerCase());
      });
      let newData = [];
      if (type === "Price") {
        newData = hListing.sort((a, b) => a.fare - b.fare);
      } else if (type === "Star") {
        newData = hListing.sort(
          (a, b) =>
            Math.ceil(a.StarRating._text) - Math.ceil(b.StarRating._text)
        );
      } else if (type === "Hotel") {
        newData = hListing.sort(function (a, b) {
          if (a.HotelName._text < b.HotelName._text) {
            return -1;
          }
          if (a.HotelName._text > b.HotelName._text) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        hotelListingFilter: hListing,
        searchByHotelName: action.payload.val,
      };
    }

    case "PRICERANGEMIN": {
      let minVal = action.payload;
      let hotels = state.hotelListingFilter;
      let stateMaxVal = state.rangeFareMax;
      let temp = 0;

      if (minVal > stateMaxVal) {
        temp = stateMaxVal;
        stateMaxVal = minVal;
      } else {
        stateMaxVal = state.rangeFareMax;
        minVal = action.payload;
      }

      return {
        ...state,
        rangeFareMin: temp,
        rangeFareMax: stateMaxVal,
      };
    }

    case "PRICERANGEMAX": {
      return {
        ...state,
        rangeFareMax: action.payload,
      };
    }

    case "STARRATING": {
      let rating = action.payload;
      switch (rating) {
        case "one": {
          chk();
          return {
            ...state,
            oneStar: !state.oneStar,
          };
        }
        case "two": {
          return {
            ...state,
            twoStar: !state.twoStar,
          };
        }
        case "three": {
          return {
            ...state,
            threeStar: !state.threeStar,
          };
        }
        case "four": {
          return {
            ...state,
            fourStar: !state.fourStar,
          };
        }
        case "five": {
          return {
            ...state,
            fiveStar: !state.fiveStar,
          };
        }
        default:
          return;
      }
      function chk() {
        console.log("hi", state.oneStar);
      }
    }

    case "CONTACTUS": {
      let contact = {};
      contact = {
        ...state.contact,
        [action.payload.name]:
          action.payload.val === "" ? undefined : action.payload.val,
      };
      return {
        ...state,
        contact: contact,
      };
    }

    case "HOMEPAGE": {
      return {
        ...state,
        homepage: action.payload,
      };
    }

    case "HOLIDAYCOUNTRY": {
      return {
        ...state,
        holidayCountry: action.payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
