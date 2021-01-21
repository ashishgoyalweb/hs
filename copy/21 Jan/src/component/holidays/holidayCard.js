import React from "react";

const HolidayCard = (props) => {
  let item = props.holidayItem;
  return (
    <>
      <div className="itemBox">
        <img
          src={`http://holidaystand.co.uk/upload/img/${item.image[0]}`}
          alt={item.heading}
        />
        <div className="infoHoliday">
          <div className="holidayHeading">{item.package_name}</div>
          <div className="holidaytxt">
            {item.dscr.replace(/<\/?[^>]+>/gi, "")}
          </div>
          <div className="holidayInfo">
            <div className="head">
              <div className="route">{item.countryName}</div>
              <div className="finfo">{item.night}</div>
            </div>
            <div className="fare">
              <div className="from">from</div>
              <div className="cost">
                &#163;{item.fare}
                <span className="from">pp</span>
              </div>
            </div>
          </div>
          <div className="btnInfo">
            <input type="button" value="Know More..." />
          </div>
        </div>
      </div>
    </>
  );
};

export default HolidayCard;
