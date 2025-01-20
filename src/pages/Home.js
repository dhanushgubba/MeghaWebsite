import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Homeimage from '../images/image1.jpg';
import Homeimage1 from '../images/image2.jpg';
import Homeimage2 from '../images/image3.jpg';
import Homeimage3 from '../images/image4.jpg';
import Homeimage4 from '../images/image5.jpg';
import Homeimage5 from '../images/image6.jpg';
import Homeimage6 from '../images/image7.jpg';
import Homeimage7 from '../images/image8.jpg';
import Homeimage8 from '../images/image9.jpg';

const Home = () => {
  return (
    <div className="home-content">
      {/* Hero Section */}
      <div className="hero-section fade-in">
        <h1>Welcome to Megha Club</h1>
        <p>Your journey towards mastering cloud concepts starts here!</p>
        <br />
        <button className="join-button slide-in">
          <Link to="/resources" className="join-link">
            Join Us
          </Link>
        </button>
      </div>

      {/* Topics Overview */}
      <div className="topics-overview">
        <h2 className="fade-in">Explore Cloud Technologies</h2>
        <div className="topic-cards">
          <div className="topic-card slide-up">
            <h3>AWS</h3>
            <p>
              Learn about Amazon Web Services, its features, and applications.
            </p>
            <button className="button-type">
              <Link to="/resources" className="join-link">
                Learn More
              </Link>
            </button>
          </div>
          <div className="topic-card slide-up">
            <h3>GCP</h3>
            <p>Discover Google Cloud Platform and its powerful tools.</p>
            <button className="button-type">
              <Link to="/resources" className="join-link">
                Learn More
              </Link>
            </button>
          </div>
          <div className="topic-card slide-up">
            <h3>Azure</h3>
            <p>Explore Microsoft Azure and its cloud services.</p>
            <button className="button-type">
              <Link to="/resources" className="join-link">
                Learn More
              </Link>
            </button>
          </div>
          <div className="topic-card slide-up">
            <h3>IBM Cloud</h3>
            <p>Explore IBM Services and its cloud services.</p>
            <button className="button-type">
              <Link to="/resources" className="join-link">
                Learn More
              </Link>
            </button>
          </div>
          <div className="topic-card slide-up">
            <h3>Oracle Cloud</h3>
            <p>Explore Oracle Services and its cloud services.</p>
            <button className="button-type">
              <Link to="/resources" className="join-link">
                Learn More
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Events Section with Horizontal Scroll */}
      <div className="events-content fade-in">
        <h2>Our Recent Events</h2>
        {/* Horizontal Scroll Image Section */}
        <div className="image-scroll slide-left">
          <img src={Homeimage} alt="Cloud Concepts" />
          <img src={Homeimage1} alt="Cloud Concepts" />
          <img src={Homeimage2} alt="Cloud Concepts" />
          <img src={Homeimage3} alt="Cloud Concepts" />
          <img src={Homeimage4} alt="Cloud Concepts" />
          <img src={Homeimage5} alt="Cloud Concepts" />
          <img src={Homeimage6} alt="Cloud Concepts" />
          <img src={Homeimage7} alt="Cloud Concepts" />
          <img src={Homeimage8} alt="Cloud Concepts" />
        </div>
      </div>
    </div>
  );
};

export default Home;
