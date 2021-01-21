import React from "react";
import "../pages/style/flight.scss";
import loader from "../assets/loader.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} />
    </div>
  );
};

export default Loader;
