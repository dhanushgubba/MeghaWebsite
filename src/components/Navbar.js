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
            <a href="/gallery" onClick={() => setIsOpen(false)}>
              Gallery
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
