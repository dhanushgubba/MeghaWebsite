import React, { useState } from "react";
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        collegeid: '',
        password: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { collegeid, password } = formData;

        if (collegeid === '' || password === '') {
            setStatusMessage('All fields are required.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:5000/login/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();  

            if (response.ok) {
                localStorage.setItem('userID', collegeid);
                setStatusMessage('Login successful!');
                setTimeout(() => {
                    window.location.href = "/dashboard";  
                }, 1000); 
                setFormData({
                    collegeid: '',
                    password: ''
                });
            } else {
                setStatusMessage(data.error || 'Login failed. Please try again later.');
            }
        } catch (error) {
            setStatusMessage('Error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="collegeid">College ID</label>
                <input
                    type="text"
                    id="collegeid"
                    name="collegeid"
                    value={formData.collegeid}
                    onChange={(e) => setFormData({ ...formData, collegeid: e.target.value })}
                    placeholder="Enter your University ID"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    required
                />
                
                <a href="/forgot-password">Forgot Password</a>
                <button type="submit" disabled={isSubmitting}>Login</button>
            </form>
            {statusMessage && <p className="status-message">{statusMessage}</p>}

            <p>Don't have an account?<a href="/register">Register Here</a></p>

            <div className="social-login">
                <p>Or login with:</p>
                <button className="social-button google">Google</button>
                <button className="social-button linkedin">LinkedIn</button>
                <button className="social-button twitter">Twitter</button>
            </div>
        </div>
    );
}

export default Login;
