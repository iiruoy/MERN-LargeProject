import { Link } from 'react-router-dom';
import '../css/success.css';

function Success() {
  return (
    <div className="success-container">
      <div className="success-icon">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="36" fill="#ff7300" fillOpacity="0.12"/>
          <circle cx="36" cy="36" r="28" fill="#ff7300" fillOpacity="0.18"/>
          <path d="M24 37.5L33 46.5L48 31.5" stroke="#ff7300" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>
      <h2 className="success-title">Payment Successful!</h2>
      <p className="success-message">Thank you for your order. Your payment has been processed and your items are on their way!</p>
      <Link to="/" className="success-home-btn">Back to Home</Link>
    </div>
  );
}

export default Success;