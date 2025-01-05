import React, { useEffect, useState } from 'react';
import './AdminEvents.css'; // Import the CSS file
import { Link } from 'react-router-dom';
const AdminEvents = ({ events, setEvents }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchEvents();
        // eslint-disable-next-line 
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/events');
            const data = await response.json();
            setEvents(data); // Update events in the parent state
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        const eventData = { title, date, description, image };

        try {
            if (editId) {
                await fetch(`http://localhost:5000/api/events/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(eventData),
                });
                setEditId(null);
            } else {
                await fetch('http://localhost:5000/api/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(eventData),
                });
            }

            fetchEvents(); // Refresh events after adding or updating
            setTitle('');
            setDate('');
            setDescription('');
            setImage('');
        } catch (error) {
            console.error("Error adding/updating event:", error);
        }
    };

    const handleEdit = (event) => {
        setTitle(event.title);
        setDate(event.date);
        setDescription(event.description);
        setImage(event.image);
        setEditId(event._id);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/events/${id}`, {
                method: 'DELETE',
            });
            fetchEvents(); // Refresh events after deletion
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <div className="admin-events-container">
            <h1 className="admin-events-title">Admin Events</h1>
            <form className="admin-events-form" onSubmit={handleAddEvent}>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="admin-events-input"
                />
                <input
                    type="text"
                    placeholder="Event Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="admin-events-input"
                />
                <textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="admin-events-textarea"
                />
                <input
                    type="text"
                    placeholder="Event Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    className="admin-events-input"
                />
                <button type="submit" className="admin-events-button">
                    {editId ? 'Update Event' : 'Add Event'}
                </button>
            </form>

            <h2 className="admin-events-current-title">Current Events</h2>
            <ul className="admin-events-list">
                {events.map((event) => (
                    <li key={event._id} className="admin-event-card">
                        <h3 className="admin-event-title">{event.title}</h3>
                        <p className="admin-event-date">{event.date}</p>
                        <p className="admin-event-description">{event.description}</p>
                        <img src={event.image} alt={event.title} className="admin-event-image" />
                        <button onClick={() => handleEdit(event)} className="admin-event-button">Edit</button>
                        <button onClick={() => handleDelete(event._id)} className="admin-event-button">Delete</button>

                        <Link to={`/attendance/${event._id}`}>
                            <button className="admin-event-button">Attendance Register</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminEvents;
