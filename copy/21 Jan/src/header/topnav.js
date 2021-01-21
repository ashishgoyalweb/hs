import React from "react";

//import "@fortawesome/fontawesome-free/css/fontawesome.min.css";

const TopNav = () => {
  return (
    <>
      <div className="topNav">
        <div className="lft">
          <ul>
            <li>
              <a href="mailto:info@holidaystand.co.uk">
                info@holidaystand.co.uk
              </a>
            </li>
            <li>46 Stirling Close London Sw 16 5hh</li>
            <li>
              <a href="tel:020 3137 8757">Call to book 020 3137 8757</a>
            </li>
            <li>
              <i className="fa fa-facebook-f"></i>
              <i className="fa fa-google"></i>
              <i className="fa fa-twitter"></i>
            </li>
          </ul>
        </div>
        <div className="rgt">Manage My Booking</div>
      </div>
    </>
  );
};

export default TopNav;
