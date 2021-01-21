import React, { Component } from "react";
import "./carousel.scss";
import Card from "./carouselCard";
import Heading from "../../utilities/heading";
import { connect } from "react-redux";

class ImageSlider extends Component {
  render() {
    return (
      <div className="carouselSlider">
        {this.props.homepage?.HomePage?.length > 0 && (
          <>
            <Heading
              heading={this.props.homepage?.HomePage[0].flight_heading}
              subheading={this.props.homepage?.HomePage[0].flight_sub_heading}
            />
            <Card flight={this.props.homepage?.HomePageFlightCSV} />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  homepage: state.CommonReducer.homepage,
});

export default connect(mapStateToProps, {})(ImageSlider);
