import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col col-4">
          <h3>Schedule Builder</h3>
          <p>Create, manage, and share your schedules.</p>
        </div>
        <div className="col col-4">
          <h3>Products</h3>
          <ul>
            <li><Link href="/calendar">Calendar</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="col col-4">
          <h3>Support</h3>
          <ul>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-of-use">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 Schedule Builder. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
