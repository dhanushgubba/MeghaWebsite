import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="data:image/jpeg;base64,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"
          alt="Club Logo"
          className="navbar-logo"
        />
        <h1 className="club-name">M E G H A</h1>
      </div>

      {/* Custom Hamburger Menu Button */}
      <button className="hamburger-menu" onClick={toggleMenu}>
        <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div className={`navbar-right ${isOpen ? 'active' : ''}`}>
        {/* Navigation Links */}
        <ul className="navbar-links">
          <li>
            <a href="/" onClick={() => setIsOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="/about" onClick={() => setIsOpen(false)}>
              About Us
            </a>
          </li>
          <li>
            <a href="/events" onClick={() => setIsOpen(false)}>
              Events
            </a>
          </li>
          <li>
            <a href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </a>
          </li>
          <li>
            <a href="/resources" onClick={() => setIsOpen(false)}>
              Resources
            </a>
          </li>
          <li>
            <a href="/mycertifications" onClick={() => setIsOpen(false)}>
              Certifications
            </a>
          </li>
          <li>
            <a href="/vouchers" onClick={() => setIsOpen(false)}>
              Vouchers
            </a>
          </li>
          <li>
            <a href="/myevents" onClick={() => setIsOpen(false)}>
              Available Events
            </a>
          </li>
          <li>
            <a href="/faqs" onClick={() => setIsOpen(false)}>
              FAQs
            </a>
          </li>
          <li>
            <a
              href="/adminlogin"
              className="adminlogin-button"
              onClick={() => setIsOpen(false)}
            >
              Admin Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
