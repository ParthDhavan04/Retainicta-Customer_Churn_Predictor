// src/components/ContactUs/ContactUs.js
import React,{useCallback,useEffect,useState} from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './ContactUs.css';

// Social media icons
import facebookIcon from '../../assets/facebook.jpeg';
import twitterIcon from '../../assets/instagram.jpeg';
import linkedinIcon from '../../assets/linkedin.png';

const ContactUs = () => {
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
    <div className="contactus-container">
      <Sidebar isVisible={sidebarVisible} />
      <div className="contactus-content">
        <h1 className="contactus-heading">Contact Us</h1>
        <section className="contactus-section">
          <h2 className="contactus-section-heading">Get in Touch</h2>
          <p className="contactus-section-paragraph">
            We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us.
          </p>
          <form className="contactus-form">
            <div className="contactus-form-group">
              <label htmlFor="name" className="contactus-form-label">Name</label>
              <input type="text" id="name" className="contactus-form-input" placeholder="Your Name" required />
            </div>
            <div className="contactus-form-group">
              <label htmlFor="email" className="contactus-form-label">Email</label>
              <input type="email" id="email" className="contactus-form-input" placeholder="Your Email" required />
            </div>
            <div className="contactus-form-group">
              <label htmlFor="message" className="contactus-form-label">Message</label>
              <textarea id="message" className="contactus-form-input" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="contactus-form-button">Send Message</button>
          </form>
        </section>
        <section className="contactus-social">
          <h2 className="contactus-social-heading">Follow Us</h2>
          <div className="contactus-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="contactus-social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" className="contactus-social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="contactus-social-icon" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
