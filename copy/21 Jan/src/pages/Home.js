import React from "react";

import Header from "../header/header";
import Banner from "../banner/banner";
import OurServices from "../home/services/services";
import ImageSlider from "../component/carousel/carousel";
import Holidays from "../component/holidays/holidays";
import Destination from "../component/destination/destination";
import Footer from "../component/footer/footer";
import { connect } from "react-redux";
import { HomePageAction } from "../store/commonAction";
import axios from "axios";
import * as constantAPI from "../utilities/api";
import Floater from "../component/floater/floater";

class Home extends React.Component {
  componentDidMount() {
    axios.get(constantAPI.Home).then((res) => {
      let data = res.data.response[0];
      this.props.HomePageAction(data);
    });
  }
  render() {
    let homepage = this.props.homepage;
    return (
      <>
        <Header />
        <Banner {...this.props} />
        <OurServices />
        <ImageSlider />
        <Holidays />
        <Destination {...this.props} />
        {this.props.homepage.hasOwnProperty("HomePage") && (
          <Floater
            txt={homepage.HomePage[0].floating_text}
            number={homepage.HomePage[0].floating_number}
          />
        )}

        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  homepage: state.CommonReducer.homepage,
});

export default connect(mapStateToProps, { HomePageAction })(Home);
