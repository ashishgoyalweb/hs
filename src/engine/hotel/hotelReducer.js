let returndateHotel = new Date();

const initialState = {
  hotelDestination: undefined,
  hotel: [{ adult: 2, child: 0, childAge: [] }],
  departDateHotel: returndateHotel.addDays(5),
  returnDateHotel: returndateHotel.addDays(10),
  cityCode: undefined,
  HotelParameter: "",
};

export const HotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HOTELDEPARTDATE": {
      return {
        ...state,
        departDateHotel: action.payload,
        returnDateHotel: action.payload.addDayss(5),
      };
    }

    case "HOTELRETURNDATE": {
      return {
        ...state,
        returnDateHotel: action.payload,
      };
    }

    case "HOTELDETINATION": {
      return {
        ...state,
        hotelDestination: action.payload.value,
        cityCode: action.payload.cityCode,
      };
    }

    case "ADDROOM": {
      return {
        ...state,
        hotel: state.hotel.concat([{ adult: 2, child: 0, childAge: [] }]),
      };
    }

    case "DELETEROOM": {
      return {
        ...state,
        hotel: state.hotel.filter((s, idx) => action.payload !== idx),
      };
    }

    case "ADDCHILDHOTEL": {
      const newValues = state.hotel.map((item, indx) => {
        if (action.payload.index !== indx) return item;
        return {
          ...item,
          [action.payload.event.target.name]: action.payload.event.target.value,
        };
      });
      return { ...state, hotel: newValues };
    }

    case "ADDCHILDAGE": {
      const newValues = state.hotel.map((item, indx) => {
        let ageIndex = item.childAge;
        let noOfChild = parseInt(action.payload.event.target.value);
        if (action.payload.index !== indx) return item;
        if (ageIndex.length > noOfChild) {
          let diff = ageIndex.length - noOfChild;
          item.childAge.splice(0, diff);
        }
        if (ageIndex.length < noOfChild) {
          let diff = noOfChild - ageIndex.length;
          for (let i = 0; i < diff; i++) {
            item.childAge.splice(ageIndex.length, 0, "1");
          }
        }
        return {
          ...item,
          [action.payload.event.target.name]: action.payload.event.target.value,
        };
      });
      return { ...state, hotel: newValues };
    }

    case "ADDADULTHOTEL": {
      const newValues = state.hotel.map((item, indx) => {
        if (action.payload.index !== indx) return item;
        return {
          ...item,
          [action.payload.event.target.name]: action.payload.event.target.value,
        };
      });
      return { ...state, hotel: newValues };
    }

    case "CHILDAGEHOTEL": {
      const newValues = state.hotel.map((item, indx) => {
        if (action.payload.hInd !== indx) return item;
        let temp = [];
        temp = item.childAge;
        temp[action.payload.Ageindex] = action.payload.event.target.value;
        return {
          ...item,
          [action.payload.event.target.name]: temp,
        };
      });
      return { ...state, hotel: newValues };
    }

    case "UPDATEFROMURL": {
      const { citiID, checkIn, checkout, hotel, destination } = action.payload;
      return {
        ...state,
        hotel: hotel,
        departDateHotel: checkIn,
        returnDateHotel: checkout,
        cityCode: citiID,
        hotelDestination: destination,
      };
    }

    case "UPDATEHOTELURL": {
      return {
        ...state,
        HotelParameter: action.payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

Date.prototype.addDayss = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
