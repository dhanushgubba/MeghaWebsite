import React from "react";
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
        venue:'C307',
        image: Event1
    },
    {
        id: 2,
        title: 'Clouded Clues: The Ultimate Murder Mystery',
        date: 'October 4, 2024',
        venue: 'C325',
        image: Event2
    },
    {
        id: 3,
        title: 'CloudCare:Securing Mental Health with Cloud Technology',
        date: 'October 3, 2024',
        venue: 'C110',
        image: Event3
    },
    {
        id: 4,
        title: 'CloudCraft: Evaluate Your Cloud Skills on AWS 3',
        date: 'October 1, 2024',
        venue: 'FF LAB',
        image: Event4
    },
    {
        id: 5,
        title: 'CloudQuest: AWS Games and CSP Challenges 3',
        date: 'October 1, 2024',
        venue: 'C410',
        image: Event5
    },
    {
        id: 6,
        title: 'CloudShowDown: Azure V/S GCP V/S AWS 3',
        date: 'October 1, 2024',
        venue: 'C624B',
        image: Event6
    },
    {
        id: 7,
        title: 'CloudCraft: Evaluate Your Cloud Skills on AWS 2',
        date: 'September 30, 2024',
        venue: 'TF LAB',
        image: Event7
    },
    {
        id: 8,
        title: 'CloudCraft: Evaluate Your Cloud Skills on AWS 1',
        date: 'September 30, 2024',
        venue: 'TF LAB',
        image: Event8
    },
    {
        id: 9,
        title: 'CloudQuest: AWS Games and CSP Challenges 2',
        date: 'September 30, 2024',
        venue: 'C624B',
        image: Event9
    },
    {
        id: 10,
        title: 'CloudQuest: AWS Games and CSP Challenges 1',
        date: 'September 30, 2024',
        venue: 'C624B',
        image: Event10
    },
    {
        id: 11,
        title: 'CloudCraft: Evaluate Your Cloud Skills on AWS 1',
        date: 'September 30, 2024',
        venue: 'C624A',
        image: Event11
    },
    {
        id: 12,
        title: 'CloudCraft: Evaluate Your Cloud Skills on AWS 1',
        date: 'September 30, 2024',
        venue: 'C624A',
        image: Event12
    }
];

const Events = () => {
    return (
        <div className="events-intro">
            <h1 className="fadeIn">Events</h1> 
            <div className="event-cards">
                {eventData.map(event => (
                    <div className="event-card" key={event.id}>
                        <img src={event.image} alt={event.title} className="event-image" />
                        <h2>{event.title}</h2>
                        <p>{event.date}</p>
                        <p>{event.venue}</p>
                        <button className="event-btn"><a href="/login">Register Here</a></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
