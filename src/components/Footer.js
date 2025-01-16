import React from 'react';
import {
  FaUsers,
  FaTicketAlt,
  FaListAlt,
  FaPen,
  FaAws,
  FaMicrosoft,
  FaGoogle,
  FaTelegram,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-section">
        <h3>Importance</h3>
        <ul>
          <li>
            <FaUsers /> <a href="/about">Our Team</a>
          </li>
          <li>
            <FaTicketAlt /> <a href="/vouchers">vouchers</a>
          </li>
          <li>
            <FaListAlt /> <a href="/resources">Resources</a>
          </li>
          <li>
            <FaPen /> Our Blogs
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Certifications</h3>
        <ul>
          <li>
            <FaAws />{' '}
            <a href="https://skillbuilder.aws/">Amazon Web Services</a>
          </li>
          <li>
            <FaMicrosoft />{' '}
            <a href="https://learn.microsoft.com/en-us/training/azure/">
              Microsoft Azure
            </a>
          </li>
          <li>
            <FaGoogle />{' '}
            <a href="https://www.cloudskillsboost.google/">Google Cloud</a>
          </li>
          {/*<li>
            <img
              src={Oracleimage}
              alt="Oracle"
              style={{ width: '20px', marginRight: '10px' }}
            />
            Oracle Cloud
          </li>
          <li>
            <img
              src={IbmLogo}
              alt="Oracle"
              style={{
                width: '20px',
                marginRight: '10px',
                backgroundColor: 'lightgreen',
              }}
            />
            IBM Cloud
          </li>*/}
        </ul>
      </div>

      <div className="footer-section">
        <h3>Follow us on Social Media</h3>
        <ul>
          <li>
            <FaTelegram />
            <a
              href="https://tinyurl.com/megha-klef"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Telegram
            </a>
          </li>
          <li>
            <FaInstagram />
            <a
              href="https://www.instagram.com/megha_klef/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <FaTwitter />
            <a
              href="https://www.linkedin.com/in/meghaklef/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <FaLinkedin />
            <a
              href="https://www.linkedin.com/in/meghaklef/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Information</h3>
        <ul>
          <li>
            <FaEnvelope />
            <a href="mailto:megha.techclub@kluniversity.in">
              {' '}
              megha.techclub@kluniversity.in
            </a>
          </li>
          <li>
            <FaPhoneAlt /> 9100-638-384
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
