import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-section">
        <h1>Welcome to Megha Cloud Computing Club</h1>
        <p>Empowering the next generation with cloud technologies.</p>
        <a href="/myevents" className="btn-main">Explore Events</a>
      </header>

      <section className="services-section">
        <h2>Our Focus Areas</h2>
        <div className="services">
          <div className="service-card">
            <i className="fas fa-cloud"></i>
            <h3>Cloud Computing</h3>
            <p>Explore cloud infrastructure, platforms, and services.</p>
          </div>
          <div className="service-card">
            <i className="fas fa-lock"></i>
            <h3>Security</h3>
            <p>Understand cloud security and best practices.</p>
          </div>
          <div className="service-card">
            <i className="fas fa-server"></i>
            <h3>Big Data</h3>
            <p>Learn how to process, store, and analyze large datasets.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
