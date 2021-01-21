import React from "react";

import Header from "../header/header";
import Footer from "../component/footer/footer";
import Engine from "../engine/engine";
import "../index.scss";
import "./about.scss";
import axios from "axios";
import { ContactUsAction } from "../store/commonAction";
import { connect } from "react-redux";
import * as constantAPI from "../utilities/api";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: {},
      btn: true,
      phoneError: false,
      emailError: false,
    };
    this.regex = /(<([^>]+)>)/gi;
  }
  componentDidMount() {
    axios
      .post(constantAPI.contact)
      .then((res) =>
        this.setState({
          pages: res.data.response[0].Pages[0],
          desc: res.data.response[0].Pages[0].description,
        })
      )
      .catch((err) => console.log("error in pages ", err));
  }

  contactHandler = (event) => {
    let contact = this.props.contact;
    this.props.ContactUsAction(event.target.name, event.target.value);
    if (
      contact.title !== "-" &&
      contact.fName !== undefined &&
      contact.fName !== "" &&
      contact.lName !== undefined &&
      contact.lName !== "" &&
      contact.email !== undefined &&
      contact.email !== "" &&
      contact.number !== undefined &&
      contact.number !== "" &&
      contact.subject !== undefined &&
      contact.subject !== "" &&
      contact.message !== undefined &&
      contact.message !== ""
    ) {
      this.setState({ btn: false });
    } else {
      this.setState({ btn: true });
    }
  };

  emailValidate = (event) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(event.target.value.toLowerCase())) {
      this.setState({ emailError: false });
    } else {
      this.setState({ emailError: true });
    }
  };

  phoneValidation = (event) => {
    if (event.target.value.length < 10) {
      this.setState({ phoneError: true });
    } else {
      this.setState({ phoneError: false });
    }
  };

  sendToServer = (event) => {
    console.log("dds ", this.props.contact);
  };
  render() {
    //console.log("this.props.contact ", this.props.contact);
    return (
      <>
        <Header />
        <div className="bg">
          <div className="wrapper middle-container pages contact">
            <div className="lft">
              <Engine />
              <div className="boxWrapper">
                <div className="boxHeading">Phones</div>
                <div className="boxContent">
                  <i className="fa fa-phone"></i> 020 3137 8757
                  <div style={{ paddingLeft: "35px" }}>020 3137 8757</div>
                </div>
              </div>
              <div className="boxWrapper">
                <div className="boxHeading">E-mail</div>
                <div className="boxContent">
                  <i className="fa fa-envelope"></i>{" "}
                  <a href="mailto:info@holidayStand.co.uk">
                    info@holidayStand.co.uk
                  </a>
                </div>
              </div>
              <div className="boxWrapper">
                <div className="boxHeading">Address</div>
                <div className="boxContent">
                  <i className="fa fa-map-marker"></i>{" "}
                  <div
                    style={{
                      marginLeft: "25px",
                      position: "relative",
                      top: "-25px",
                    }}
                  >
                    46 Stirling Close London Sw 16 5hh
                  </div>
                </div>
              </div>
              <div className="boxWrapper">
                <div className="boxHeading">Open Hours</div>
                <div className="boxContent">
                  <i className="fa fa-clock"></i>
                  <div
                    style={{
                      marginLeft: "28px",
                      position: "relative",
                      top: "-30px",
                    }}
                  >
                    {" "}
                    08:30 – 17:30 (Monday to Saturday)
                    <br />
                    08:30 – 17:00 (Sunday){" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="rgt">
              {this.state.pages.hasOwnProperty("page_banner") && (
                <div>
                  <div className="banner">
                    <img
                      src={`http://holidaystand.co.uk/upload/pages/${this.state.pages.page_banner}`}
                    />
                  </div>
                  <h2>{this.state.pages.page_heading}</h2>
                  <div>{this.state.desc.replace(/<\/?[^>]+>/gi, "")}</div>
                </div>
              )}

              <div className="form">
                <div className="formRow">
                  <div className="three">
                    <select
                      name="title"
                      onBlur={this.contactHandler}
                      onChange={this.contactHandler}
                      className={
                        this.props.contact.title === "-" ? "error" : ""
                      }
                    >
                      <option value="-">
                        {this.props.contact.title === "-"
                          ? this.state.titleError
                          : "Title"}
                      </option>
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Miss">Miss.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Dr">Dr.</option>
                    </select>
                  </div>
                  <div className="three">
                    <input
                      type="text"
                      placeholder={
                        this.props.contact.fName === undefined
                          ? "Please enter your first name!"
                          : "First Name"
                      }
                      name="fName"
                      onBlur={this.contactHandler}
                      onChange={this.contactHandler}
                      className={
                        this.props.contact.fName === undefined ? "error" : ""
                      }
                      value={
                        this.props.contact.fName === undefined ||
                        this.props.contact.fName.trim() === ""
                          ? ""
                          : this.props.contact.fName
                      }
                    />
                  </div>
                  <div className="three">
                    <input
                      type="text"
                      placeholder={
                        this.props.contact.lName === undefined
                          ? "Please enter your Last name!"
                          : "Last Name"
                      }
                      name="lName"
                      onBlur={this.contactHandler}
                      onChange={this.contactHandler}
                      className={
                        this.props.contact.lName === undefined ? "error" : ""
                      }
                      value={
                        this.props.contact.lName === undefined ||
                        this.props.contact.lName.trim() === ""
                          ? ""
                          : this.props.contact.lName
                      }
                    />
                  </div>
                </div>
                <div className="formRow">
                  <div className="two">
                    <input
                      type="text"
                      placeholder={
                        this.props.contact.email === undefined
                          ? "Please enter valid email ID!"
                          : "Email ID"
                      }
                      name="email"
                      onBlur={(event) => {
                        this.contactHandler(event);
                        this.emailValidate(event);
                      }}
                      onChange={this.contactHandler}
                      className={
                        this.props.contact.email === undefined ||
                        this.state.emailError
                          ? "error"
                          : ""
                      }
                      value={
                        this.props.contact.email === undefined ||
                        this.props.contact.email.trim() === ""
                          ? ""
                          : this.props.contact.email
                      }
                    />
                    <div
                      className="displayError"
                      style={{
                        display: this.state.emailError ? "block" : "none",
                      }}
                    >
                      Please enter valid email id
                    </div>
                  </div>
                  <div className="two">
                    <input
                      type="tel"
                      placeholder={
                        this.props.contact.number === undefined
                          ? "Please enter your contact number!"
                          : "Contact number"
                      }
                      name="number"
                      onBlur={(event) => {
                        this.contactHandler(event);
                        this.phoneValidation(event);
                      }}
                      onChange={this.contactHandler}
                      className={
                        this.props.contact.number === undefined ||
                        this.state.phoneError
                          ? "error"
                          : ""
                      }
                      value={
                        this.props.contact.number === undefined ||
                        this.props.contact.number.trim() === ""
                          ? ""
                          : this.props.contact.number
                      }
                    />
                    <div
                      className="displayError"
                      style={{
                        display: this.state.phoneError ? "block" : "none",
                      }}
                    >
                      Please enter valid contact number
                    </div>
                  </div>
                </div>
                <div className="formRow">
                  <input
                    type="text"
                    placeholder={
                      this.props.contact.subject === undefined
                        ? "Please enter subject of your query!"
                        : "Subject"
                    }
                    name="subject"
                    onBlur={this.contactHandler}
                    onChange={this.contactHandler}
                    className={
                      this.props.contact.subject === undefined ? "error" : ""
                    }
                    value={
                      this.props.contact.subject === undefined ||
                      this.props.contact.subject.trim() === ""
                        ? ""
                        : this.props.contact.subject
                    }
                  />
                </div>
                <div className="formRow">
                  <div className="one">
                    <textarea
                      name="message"
                      onChange={this.contactHandler}
                      placeholder={
                        this.props.contact.message === undefined
                          ? "Please enter your query!"
                          : "Pleasse type your query here..."
                      }
                      name="message"
                      onBlur={this.contactHandler}
                      onChange={this.contactHandler}
                      className={
                        this.props.contact.message === undefined ? "error" : ""
                      }
                      value={
                        this.props.contact.message === undefined ||
                        this.props.contact.message.trim() === ""
                          ? ""
                          : this.props.contact.message
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="formRow">
                  <input
                    type="button"
                    value="Submit"
                    disabled={this.state.btn}
                    onClick={this.sendToServer}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  contact: state.CommonReducer.contact,
});

export default connect(mapStateToProps, { ContactUsAction })(Contact);
