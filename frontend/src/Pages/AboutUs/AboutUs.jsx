// src/components/AboutUs/AboutUs.js
import React,{useCallback,useState,useEffect} from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './AboutUs.css';

const AboutUs = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const mouseX = e.clientX;

    // Show sidebar when mouse is near the left edge (within 100px from the left)
    if (mouseX < 100) {
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);
  return (
    <div className="about-us-container">
      <Sidebar isVisible={sidebarVisible}/>
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
