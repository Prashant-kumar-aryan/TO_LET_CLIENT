import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Our Project</h1>
      <p>
        This project aims to provide exceptional solutions for all your needs.
        We are dedicated to delivering the best service and support.
      </p>
      <Link to="/contact" className="contact-button">
        Contact Us
      </Link>
    </div>
  );
};

export default Home;
