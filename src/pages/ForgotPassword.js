import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();  // To programmatically navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = formData;
        if (!email) {
            setStatusMessage("All fields are required");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:5000/user/forgot-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatusMessage("Email is valid. Redirecting...");
                setFormData({
                    email: ''
                });
                // If email is valid, navigate to reset-password
                navigate('/reset-password');
            } else {
                setStatusMessage("Email validation failed. Please check the email and try again.");
            }
        } catch (err) {
            setStatusMessage("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="forgotpassword-overview">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter your Email</label>
                <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    placeholder="Enter your email address" 
                    required 
                />
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </form>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>  
    );
}

export default ForgotPassword;
