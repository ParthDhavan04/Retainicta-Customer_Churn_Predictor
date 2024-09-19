// src/components/AboutUs/AboutUs.js
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <Sidebar />
      <div className="about-us-content">
        <h1 className="about-us-heading">About Us</h1>
        <section className="about-us-section">
          <h2 className="about-us-section-heading">Our Mission</h2>
          <p className="about-us-section-paragraph">
            Our mission is to enhance customer engagement through predictive analytics, 
            helping businesses anticipate customer behavior and make informed decisions.
          </p>
        </section>
        <section className="about-us-section">
          <h2 className="about-us-section-heading">Our Vision</h2>
          <p className="about-us-section-paragraph">
            We envision a future where businesses can seamlessly integrate predictive insights 
            into their strategies, fostering stronger customer relationships and driving sustainable growth.
          </p>
        </section>
        <section className="about-us-section">
          <h2 className="about-us-section-heading">Our Values</h2>
          <p className="about-us-section-paragraph">
            Integrity, Innovation, and Excellence are at the core of what we do. 
            We are committed to providing high-quality solutions that drive success and foster trust.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
