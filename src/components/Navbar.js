import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this file exists and contains the CSS styles

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className="navbar-left">
        <img src="imag.jpeg" alt="Logo" className="navbar-logo" />
        <span className="club-name">Club Name</span>
      </div>

      <div className="navbar-menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="navbar-right">
        <ul className="navbar-links">
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
          <li>
            <Link to="/mycertifications">Certifications</Link>
          </li>
          <li>
            <Link to="/vouchers">Vouchers</Link>
          </li>
          <li>
            <Link to="/myevents">Available Events</Link>
          </li>
          <li>
            <Link to="/faqs">FAQs</Link>
          </li>
        </ul>

        <Link to="/adminlogin" className="navbar-adminlogin-button">
          <button className="adminlogin-button">Admin Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
