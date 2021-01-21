import React from "react";

import "./floater.scss";

const Floater = (props) => {
  return (
    <div className="floater">
      <div className="callus">Callus</div>
      <div className="number">{props.number}</div>
      <div className="txt">{props.txt}</div>
    </div>
  );
};
export default Floater;
