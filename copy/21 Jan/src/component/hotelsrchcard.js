import React from "react";

function HotelSeacrhResultCard(props) {
  const star = () => {
    let starRating = Math.ceil(props.StarRating);
    let item = [];
    for (let i = 0; i < starRating; i++) {
      item.push(<i className="fa fa-star orange"></i>);
    }
    for (let c = 0; c < 5 - starRating; c++) {
      item.push(<i className="fa fa-star"></i>);
    }
    return item;
  };

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  let dateDiff = () => {
    let dt1 = props.checkin;
    let dt2 = props.checkout;
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  };

  let handleHotelInfo = (hid) => {
    let URL = window.location.search;
    let API = "huid=" + hid + "&" + URL.replace("?", "");
    window.open("/hotel-info" + "?" + API, "_blank");
  };
  return (
    <>
      <div className="hotelsrcCard">
        <div className="imgContainer">
          <img
            src={props.img?.Image && props.img?.Image[0]?._text}
            alt={props.hotelName}
            title={props.hotelName}
          />
          {/* <div className="thumList">
            {props.img.Image.length > 0 &&
              props.img.Image.slice(0, 4).map((pic, ind) => {
                return <img src={pic._text} />;
              })}
          </div> */}
        </div>
        <div className="hotelInfo">
          <div className="hotelName">{props.hotelName}</div>
          <div>{props.StarRating && star()}</div>
          <div className="address">
            {props.Location && toTitleCase(props.Location)}
          </div>
          <div className="desc">
            {props.Description?.slice(0, 140) + "..."}read more
          </div>
        </div>
        <div className="priceInfo">
          <div>
            <div className="fare">
              <span className="from">from</span>{" "}
              <span>&#163; {Math.ceil(props.fare)}</span>{" "}
            </div>
            <div className="pax">
              {dateDiff()} nights, {props.adult} adults
              {parseInt(props.child) > 0 ? `, ${props.child}, child` : null}
            </div>
            <div>
              <input
                type="button"
                value="Choose Room"
                onClick={() => handleHotelInfo(`${props.hotelID}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelSeacrhResultCard;
