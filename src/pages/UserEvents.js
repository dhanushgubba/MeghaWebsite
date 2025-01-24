import React, { useEffect, useState } from 'react';
import './UserEvents.css';

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://megha-app.onrender.com/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setMessage('Failed to load events.');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="userevents-container">
      <div className="userevents-header">
        <h1>Upcoming Events</h1>
        {message && <div className="message error">{message}</div>}
      </div>

      <div className="userevents-list">
        {events.map((event) => (
          <div className="events-card" key={event._id}>
            <div className="events-card-image">
              <img src={event.image} alt={event.title} />
              <div className="events-card-date">
                <span className="date-icon">📅</span>
                {formatDate(event.date)}
              </div>
            </div>
            <div className="events-card-content">
              <div className="events-card-badge">Featured Event</div>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <div className="events-card-footer">
                <div className="events-meta">
                  <span className="events-location">
                    <span className="meta-icon">📍</span> KL University
                  </span>
                  <span className="events-time">
                    <span className="meta-icon">⏰</span> 10:00 AM
                  </span>
                </div>
                <div className="user-btn-wrapper">
                  <a
                    href="https://academics.klef.in/login"
                    className="user-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now
                    <span className="btn-arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserEvents;
