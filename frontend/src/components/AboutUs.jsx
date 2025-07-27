import React from 'react';
import '../css/aboutUs.css';

function AboutUs() {
  return (
    <div className="aboutus-outer">
      <div className="aboutus-card">
        <h2 className="aboutus-title">About Us</h2>
        <div className="aboutus-underline"></div>
        <p className="aboutus-text">
          Welcome to <span className="aboutus-brand">NodeMart</span>!<br /><br />
          We are passionate about bringing you the best tech products at unbeatable prices. Our team is dedicated to providing a seamless shopping experience, fast shipping, and top-notch customer support.<br /><br />
          Whether you’re a gadget enthusiast or just looking for a great deal, we’re here to help you find exactly what you need.<br /><br />
          <b>Thank you for choosing NodeMart!</b>
        </p>
      </div>
    </div>
  );
}

export default AboutUs;