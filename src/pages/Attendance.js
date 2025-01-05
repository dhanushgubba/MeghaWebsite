import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Attendance.css';

const Attendance = () => {
    const { eventId } = useParams();
    const [participants, setParticipants] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [attendanceStatus, setAttendanceStatus] = useState({});
    const [attendanceSubmitted, setAttendanceSubmitted] = useState(
        localStorage.getItem(`attendanceSubmitted_${eventId}`) === 'true'
    );

    const fetchParticipants = async () => {
        if (attendanceSubmitted) return; // Skip if already submitted

        try {
            const response = await fetch(`http://localhost:5000/api/events/${eventId}/participants`);
            if (!response.ok) {
                throw new Error('Failed to fetch participants');
            }
            const data = await response.json();
            setParticipants(data);
        } catch (error) {
            console.error("Error fetching participants:", error);
            setError('Failed to load participants.');
        }
    };

    useEffect(() => {
        fetchParticipants();
        // eslint-disable-next-line
    }, [eventId, attendanceSubmitted]);

    const handleAttendanceChange = (index) => {
        setAttendanceStatus((prevStatus) => ({
            ...prevStatus,
            [index]: !prevStatus[index],
        }));
    };

    const handleSubmit = async () => {
        const collegeid = localStorage.getItem('userID');
        const attendanceData = participants.map((participant, index) => ({
            collegeid: participant,
            present: attendanceStatus[index] || false,
        }));

        try {
            const response = await fetch(`http://localhost:5000/api/events/${eventId}/attendance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ collegeid, attendanceStatus: attendanceData }),
            });
            const result = await response.json();

            if (response.ok) {
                setMessage(`Successfully posted Attendance for ${result.message || "the event."}`);
                localStorage.setItem(`attendanceSubmitted_${eventId}`, 'true');
                setAttendanceSubmitted(true);
            } else {
                setMessage(`Failed to post Attendance: ${result.message || "unknown error."}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while submitting attendance.');
        }
    };

    if (attendanceSubmitted) {
        return <div className="attendance-message">Attendance has already been submitted for this event.</div>;
    }

    return (
        <div className="attendance-container">
            <h1>Registered Participants</h1>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="message">{message}</div>}
            <table className="participants-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Present</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.length > 0 ? (
                        participants.map((participant, index) => (
                            <tr key={index} className="participant-item">
                                <td>{index + 1}</td>
                                <td>{participant}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={attendanceStatus[index] || false}
                                        onChange={() => handleAttendanceChange(index)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="no-participants">
                                No participants registered for this event.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="submit-button" onClick={handleSubmit}>
                Submit Attendance
            </button>
        </div>
    );
};

export default Attendance;
