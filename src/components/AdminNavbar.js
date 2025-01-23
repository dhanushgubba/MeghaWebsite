import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-button"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <nav className={`adminnavbar ${isOpen ? 'mobile-open' : ''}`}>
        <div className="adminnavbar-left">
          <img src="d.jpg" alt="Club Logo" className="adminnavbar-logo" />
          <h1 className="club-names">M E G H A</h1>
        </div>
        <div className="adminnavbar-right">
          <ul className="adminnavbar-links">
            <li>
              <Link to="/admindashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/adminevents" onClick={() => setIsOpen(false)}>
                Events
              </Link>
            </li>
            <li>
              <Link to="/admincertifications" onClick={() => setIsOpen(false)}>
                Certifications
              </Link>
            </li>
            <li>
              <Link to="/adminvouchers" onClick={() => setIsOpen(false)}>
                Vouchers
              </Link>
            </li>
            <li className="logout-container">
              <Link
                to="/adminlogin"
                className="navbar1-logout-button"
                onClick={() => setIsOpen(false)}
              >
                <button className="logout-button">Logout</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && <div className="mobile-overlay" onClick={toggleMenu} />}
    </>
  );
};

export default AdminNavbar;
