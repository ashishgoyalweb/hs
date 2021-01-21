import React, { Component } from "react";
import { connect } from "react-redux";

import * as constant from "../../utilities/defination";

class Holidays extends Component {
  render() {
    return (
      <>
        <div className="engine-wrapper holiday">
          <div className="trip">
            <div className="tInfo">
              <div className="dFrom">
                <span>Destination</span>
                <input type="text" placeholder="Enter a destination airport" />
              </div>

              <div className="btn">
                <div className="btnInfo">
                  <div>
                    <input type="button" value="search hotel" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Holidays;
