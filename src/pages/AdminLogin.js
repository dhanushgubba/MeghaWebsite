import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (email === '' || password === '') {
      setStatusMessage('All fields are required');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(
        'https://megha-app.onrender.com/adminlogin/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setStatusMessage('Admin Login Successful!');
        setTimeout(() => {
          window.location.href = '/admindashboard';
        }, 1000);
        setFormData({
          email: '',
          password: '',
        });
      } else {
        setStatusMessage(data.error || 'Login failed. Please try again later.');
      }
    } catch (err) {
      setStatusMessage('Error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="adminlogin-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Enter your password"
          required
        />

        <button className="btn-submit" disabled={isSubmitting}>
          Admin Login
        </button>
      </form>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
      {/*<p>
        Don't have and account?<a href="/adminregister">Register Here</a>
      </p>*/}
    </div>
  );
};
export default AdminLogin;
