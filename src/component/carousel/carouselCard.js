import React from "react";
import Slider from "react-slick";

const Card = (props) => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    //variableWidth: true,
  };
  let item = props.flight;
  return (
    <div className="carouselWarpper">
      <Slider {...settings}>
        {item &&
          item.map((item, index) => {
            return (
              <div className="list" key={index}>
                <figure>
                  <img
                    src={`http://holidaystand.co.uk/upload/img/${item.image}`}
                    alt={item.heading}
                  />
                  <div className="overlay">
                    <span>Book Now</span>
                  </div>
                </figure>

                <div className="info">
                  <div className="head">
                    <div className="route">{item.heading}</div>
                    <div className="finfo">{item.trip_type}</div>
                  </div>
                  <div className="fare">
                    <div className="from">from</div>
                    <div className="cost">&#163;{item.fare}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default Card;
