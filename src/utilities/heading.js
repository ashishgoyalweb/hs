import React from "react";

const Heading = (props) => {
  return (
    <div className="heading">
      <h2>{props.heading}</h2>
      <h3>{props.subheading}</h3>
    </div>
  );
};

export default Heading;
