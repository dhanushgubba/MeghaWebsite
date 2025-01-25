import React, { useState } from 'react';
import './Events.css';
import Event1 from '../events/event1.jpg';
import Event2 from '../events/event2.jpg';
import Event3 from '../events/event3.jpg';
import Event4 from '../events/event4.jpg';
import Event5 from '../events/event5.jpg';
import Event6 from '../events/event6.jpg';
import Event7 from '../events/event7.jpg';
import Event8 from '../events/event8.jpg';
import Event9 from '../events/event9.jpg';
import Event10 from '../events/event10.jpg';
import Event11 from '../events/event11.jpg';
import Event12 from '../events/event12.jpg';

const eventData = [
  {
    id: 1,
    title: 'The Future of Healthcare in the Cloud',
    date: 'October 19, 2024',
    venue: 'C307',
    image: Event1,
    category: 'Healthcare',
    seats: 100,
    registrationEndDate: '2024-10-18',
  },
  {
    id: 2,
    title: 'Clouded Clues: The Ultimate Murder Mystery',
    date: 'October 4, 2024',
    venue: 'C325',
    image: Event2,
    category: 'Entertainment',
    seats: 50,
    registrationEndDate: '2024-10-03',
  },
  {
    id: 3,
    title: 'CloudCare: Securing Mental Health with Cloud Technology',
    date: 'October 3, 2024',
    venue: 'C110',
    image: Event3,
    category: 'Healthcare',
    seats: 75,
    registrationEndDate: '2024-10-02',
  },
  {
    id: 4,
    title: 'CloudCraft: Evaluate Your Cloud Skills on AWS 3',
    date: 'October 1, 2024',
    venue: 'FF LAB',
    image: Event4,
    category: 'Workshop',
    seats: 120,
    registrationEndDate: '2024-09-30',
  },
  {
    id: 5,
    title: 'CloudQuest: AWS Games and CSP Challenges 3',
    date: 'October 1, 2024',
    venue: 'C410',
    image: Event5,
    category: 'Competition',
    seats: 80,
    registrationEndDate: '2024-09-30',
  },
  {
    id: 6,
    title: 'CloudShowDown: Azure V/S GCP V/S AWS 3',
    date: 'October 1, 2024',
    venue: 'C624B',
    image: Event6,
    category: 'Competition',
    seats: 90,
    registrationEndDate: '2024-09-30',
  },
  {
    id: 7,
    title: 'CloudCraft: Evaluate Your Cloud Skills on AWS 2',
    date: 'September 30, 2024',
    venue: 'TF LAB',
    image: Event7,
    category: 'Workshop',
    seats: 100,
    registrationEndDate: '2024-09-29',
  },
  {
    id: 8,
    title: 'CloudCraft: Evaluate Your Cloud Skills on AWS 1',
    date: 'September 30, 2024',
    venue: 'TF LAB',
    image: Event8,
    category: 'Workshop',
    seats: 100,
    registrationEndDate: '2024-09-29',
  },
  {
    id: 9,
    title: 'CloudQuest: AWS Games and CSP Challenges 2',
    date: 'September 30, 2024',
    venue: 'C624B',
    image: Event9,
    category: 'Competition',
    seats: 60,
    registrationEndDate: '2024-09-29',
  },
  {
    id: 10,
    title: 'CloudQuest: AWS Games and CSP Challenges 1',
    date: 'September 30, 2024',
    venue: 'C624B',
    image: Event10,
    category: 'Competition',
    seats: 60,
    registrationEndDate: '2024-09-29',
  },
  {
    id: 11,
    title: 'CloudCraft: Evaluate Your Cloud Skills on AWS 1',
    date: 'September 30, 2024',
    venue: 'C624A',
    image: Event11,
    category: 'Workshop',
    seats: 100,
    registrationEndDate: '2024-09-29',
  },
  {
    id: 12,
    title: 'CloudCraft: Evaluate Your Cloud Skills on AWS 1',
    date: 'September 30, 2024',
    venue: 'C624A',
    image: Event12,
    category: 'Workshop',
    seats: 100,
    registrationEndDate: '2024-09-29',
  },
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const categories = [
    'all',
    ...new Set(eventData.map((event) => event.category)),
  ];

  const filteredEvents = eventData
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'seats') {
        return b.seats - a.seats;
      }
      return 0;
    });

  const isRegistrationClosed = (endDate) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div className="events-container">
      <div className="events-header">
        <h1 className="fadeIn">Past Cloud Events</h1>
        <p className="events-subtitle">
          Discover and participate in exciting cloud computing events
        </p>

        <div className="events-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Sort by Date</option>
              <option value="seats">Sort by Capacity</option>
            </select>
          </div>
        </div>
      </div>

      <div className="event-cards">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-image-container">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-image"
                />
                <span className="event-category">{event.category}</span>
              </div>
              <div className="event-details">
                <h2>{event.title}</h2>
                <div className="event-info">
                  <p className="event-date">
                    <span className="icon">📅</span> {event.date}
                  </p>
                  <p className="event-venue">
                    <span className="icon">📍</span> {event.venue}
                  </p>
                  <p className="event-seats">
                    <span className="icon">👥</span> {event.seats} seats
                    available
                  </p>
                </div>
                <button
                  className={`event-btn ${
                    isRegistrationClosed(event.registrationEndDate)
                      ? 'closed'
                      : ''
                  }`}
                  disabled={isRegistrationClosed(event.registrationEndDate)}
                >
                  {isRegistrationClosed(event.registrationEndDate) ? (
                    'Registration Closed'
                  ) : (
                    <a
                      href="https://www.academics.klef.in/login"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Register Now
                    </a>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            <p>No events found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
