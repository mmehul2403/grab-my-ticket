import React from "react";
import Slider from "react-slick";
import "../styles/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Slider Setting
const LandingPage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  //Put movies image
  // src/components/LandingPage.js
  const movieImages = [
    "../../images/HomePage/badboys_RideOrDie.jpg",
    "../../images/HomePage/DeadpoolAndWolverine.jpg",
    "../../images/HomePage/FallGuy.jpg",
    "../../images/HomePage/InsideOut2.jpg",
  ];

  return (
    <div className="landing-page-container">
      <header className="header">
        <h1>Welcome to GrabMyTicket</h1>
      </header>
      <section className="slider-section">
        <Slider {...sliderSettings}>
          {movieImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Movie ${index + 1}`}
                className="movie-image"
              />
            </div>
          ))}
        </Slider>
      </section>
      <section className="content-section">
        <h2>Book Your Tickets Now</h2>
        <p>
          GrabMyTicket provides a seamless experience for booking tickets for
          movies, events, concerts, and more. Enjoy the best entertainment
          options available at your fingertips.
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
