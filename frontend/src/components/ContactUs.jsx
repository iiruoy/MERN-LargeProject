import React from 'react';
import '../css/contactUs.css';

function ContactUs() {
  return (
    <div className="contactus-outer">
      <div className="contactus-card">
        <h2 className="contactus-title">Contact Us</h2>
        <div className="contactus-underline"></div>
        <p className="contactus-text">
          Have questions, feedback, or need support?<br /><br />
          Our team is here to help!<br /><br />
          <b>Email:</b> <a href="mailto:support@nodemart.com" className="contactus-link">support@nodemart.com</a><br />
          <b>Phone:</b> <a href="tel:+1234567890" className="contactus-link">+1 (234) 567-890</a><br /><br />
          Or use the form below and we’ll get back to you as soon as possible.
        </p>
        <form className="contactus-form" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Your Name" className="contactus-input" required />
          <input type="email" placeholder="Your Email" className="contactus-input" required />
          <textarea placeholder="Your Message" className="contactus-textarea" required />
          <button type="submit" className="contactus-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;