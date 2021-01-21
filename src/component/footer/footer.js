import React from "react";
import "./footer.scss";
import holidaystand from "../../assets/holidaystand-transparent.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="wrapper">
        <ul>
          <li>
            <h4>Book Now</h4>
            <Link to="/flight">Flight</Link>
            <Link to="/holidays">Holidays</Link>
            <Link to="/hotels">Hotels</Link>
            <Link to="/special-offers">Packages</Link>
            <Link to="/car-hire">Car Rent</Link>
          </li>

          <li>
            <h4>About Holiday Stand</h4>
            <Link to="/contact-us">Contact Us</Link>
            <Link to="/about">About Us</Link>
            <Link to="/sitemap">Site Map</Link>
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </li>

          <li>
            <h4>Customer Products</h4>
            <Link to="/faq">FAQ</Link>
            <Link to="/baggage-policies">Baggage Policies</Link>
            <Link to="/special-assistance">Special Assistance</Link>
            <Link to="/traveling-with-infants">Traveling with Infants</Link>
            <Link to="/purchasing-refunds">Purchasing &amp; Refunds</Link>
          </li>

          <li>
            <div className="logo">
              <img src={holidaystand} />
            </div>
            <div className="info">
              <i className="fa fa-map-marker"></i> 46 Stirling Close London Sw
              16 5hh
            </div>
            <div className="info">
              <i className="fa fa-envelope"></i>{" "}
              <a href="mailto:info@holidaystand.co.uk">
                info@holidaystand.co.uk
              </a>
            </div>
            <div className="info">
              <i className="fa fa-phone"></i> 020 3137 8757
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
