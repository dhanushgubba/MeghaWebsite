import React from "react";
import './Resources.css';

const Resources = () => {
  return (
    <div className="resources-page">
      <h1>Cloud Computing Resources</h1>
      
      {/* Documentation Section */}
      <section className="resources-section">
        <h2>Documentation & Tutorials</h2>
        <p>Explore our comprehensive guides, API docs, and step-by-step tutorials to help you get started.</p>
        <ul>
          <li><a href="/">Getting Started Guides</a></li>
          <li><a href="/">API Documentation</a></li>
          <li><a href="/">Service-Specific Docs</a></li>
        </ul>
      </section>

      {/* Tools Section */}
      <section className="resources-section">
        <h2>Tools & SDKs</h2>
        <p>Find all the tools you need to build and manage your cloud projects.</p>
        <ul>
          <li><a href="/">Developer Tools</a></li>
          <li><a href="/">SDK Downloads</a></li>
          <li><a href="/">Cost Estimator</a></li>
        </ul>
      </section>

      {/* Training Section */}
      <section className="resources-section">
        <h2>Training & Certification</h2>
        <p>Enhance your skills with our training programs and get certified.</p>
        <ul>
          <li><a href="/">Training Courses</a></li>
          <li><a href="/">Hands-on Labs</a></li>
          <li><a href="/">Certifications</a></li>
        </ul>
      </section>

      {/* Community & Support */}
      <section className="resources-section">
        <h2>Community & Support</h2>
        <p>Join the community, find help, and engage with other cloud professionals.</p>
        <ul>
          <li><a href="/">Discussion Forums</a></li>
          <li><a href="/">User Groups</a></li>
          <li><a href="/">Support Channels</a></li>
        </ul>
      </section>

      {/* Events & Webinars */}
      <section className="resources-section">
        <h2>Events & Webinars</h2>
        <p>Learn from experts through our events and webinars, live and on-demand.</p>
        <ul>
          <li><a href="/">Upcoming Events</a></li>
          <li><a href="/">On-Demand Webinars</a></li>
        </ul>
      </section>

      {/* Case Studies */}
      <section className="resources-section">
        <h2>Case Studies & Success Stories</h2>
        <p>Discover how companies around the world are leveraging cloud technologies.</p>
        <ul>
          <li><a href="/">Case Studies</a></li>
          <li><a href="/">Customer Success Stories</a></li>
        </ul>
      </section>
    </div>
  );
};

export default Resources;
