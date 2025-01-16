import React, { useEffect, useState } from 'react';
import './UserEvents.css';

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState(''); // State to show feedback message

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

  // Function to handle registration
  /*const registerForEvent = async (eventId) => {
    const collegeid = localStorage.getItem('userID'); // Fetch email from local storage

    // Ensure email is available
    if (!collegeid) {
      setMessage(
        'User is not logged in. Please log in to register for events.'
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ collegeid }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        setMessage(`Successfully registered for ${result.title}`);
      } else {
        setMessage(`Failed to register: ${result.error || result.message}`);
      }
    } catch (error) {
      setMessage('An error occurred during registration.');
      console.error('Error:', error);
    }
  };*/

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="userevents-container">
      <h1>User Events</h1>
      {message && <div className="message">{message}</div>}{' '}
      {/* Display feedback message */}
      <div className="userevents-list">
        {events.map((event) => (
          <div className="events-card" key={event._id}>
            <h2>{event.title}</h2>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <img src={event.image} alt={event.title} />
            {/*<div
              className="user-btn"
              onClick={() => registerForEvent(event._id)}
            >*/}
            <div className="user-btn">
              <a href="https://academics.klef.in/login">Register Here</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserEvents;
