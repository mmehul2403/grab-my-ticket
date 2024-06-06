import React from "react";
import "../styles/AboutUs.css"; // Import the CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="header">
        <h1>About GrabMyTicket</h1>
      </header>
      <section className="intro">
        <h2>Who We Are</h2>
        <p>
          GrabMyTicket is a leading platform for booking tickets for movies,
          events, concerts, and more. Our mission is to provide a seamless and
          enjoyable booking experience for our users.
        </p>
      </section>
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          We aim to be the one-stop destination for all your ticketing needs,
          ensuring you have access to the best events and entertainment options
          available.
        </p>
      </section>
      <section className="team">
        <h2>Meet the Team</h2>
        <p>
          Our dedicated team works tirelessly to bring you the latest and
          greatest in entertainment. From customer service to tech support, we
          are here to help you have the best experience possible. GrabMyTicket
          is developed by Mehul, Yingying(Emma) and Ravi
        </p>
      </section>
      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need support, feel free to reach out to
          us at mmehul2403@gmail.com.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
