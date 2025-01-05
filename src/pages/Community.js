import React, { useEffect, useState } from "react";
import CommunityImage from '../events/community.jpg';
import './Community.css';

const Community = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const response = await fetch("http://localhost:5000/messages");
        const data = await response.json();
        setMessages(data);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            const response = await fetch("http://localhost:5000/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: input }),
            });

            if (response.ok) {
                setInput("");
                fetchMessages(); // Refresh messages after sending
            }
        }
    };

    return (
        <div className="community-section">
            <h1>Join Our Community!</h1>
            <div className="community-image">
            `   <img src={CommunityImage} alt="A community gathering" />
            </div>
            
            <div className="chat-container">
                <div className="messages">
                    {messages.map((msg) => (
                        <div key={msg._id} className="message">
                            {msg.text}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage} className="chat-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="chat-input"
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Community;
