import React, { useState } from "react";
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        collegeid: '',
        firstname: '',
        lastname: '',
        email: '',
        contact: '',
        password: '',
        repassword: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstname, lastname, email, contact, password, repassword } = formData;

        if (!firstname || !lastname || !email || !contact || !password || !repassword) {
            setStatusMessage('All fields are requzired.');
            return;
        }

        if (password !== repassword) {
            setStatusMessage('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:5000/register/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatusMessage('Registration successful!');
                // Clear form data if needed
                setFormData({
                    collegeid: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    contact: '',
                    password: '',
                    repassword: ''
                });
            } else {
                setStatusMessage('Registration failed. Please try again later.');
            }
        } catch (error) {
            setStatusMessage('Error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="register-container">
            <h1>Register Here</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="collegeid">College ID</label>
                <input
                    type="text"
                    id="collegeid"
                    name="collegeid"
                    value={formData.collegeid}
                    onChange={(e) => setFormData({ ...formData, collegeid: e.target.value })}
                    placeholder="Enter Your University ID"
                    required
                />
                <label htmlFor="firstname">First Name</label>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                    placeholder="Enter First name"
                    required
                />

                <label htmlFor="lastname">Last Name</label>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    placeholder="Enter Last Name"
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email"
                    required
                />

                <label htmlFor="contact">Contact Number</label>
                <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="Enter Contact No"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    placeholder="Enter Password"
                    required
                />

                <label htmlFor="repassword">Re-Type Password</label>
                <input
                    type="password"
                    id="repassword"
                    name="repassword"
                    value={formData.repassword}
                    onChange={handlePasswordChange}
                    placeholder="Re-Type Password"
                    required
                />

                <button type="submit" disabled={isSubmitting}>Register</button>

                <p>Already have an account? <a href="/login">Back to Login</a></p>
            </form>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
    );
};

export default Register;
