import React from 'react';
import { useState } from 'react';
import './AdminRegister.css';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    idno: '',
    firstname: '',
    lastname: '',
    email: '',
    contact: '',
    password: '',
    repassword: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { idno, firstname, lastname, email, contact, password, repassword } =
      formData;

    if (
      !idno ||
      !firstname ||
      !lastname ||
      !email ||
      !contact ||
      !password ||
      !repassword
    ) {
      setStatusMessage('All fields are requzired.');
      return;
    }

    if (password !== repassword) {
      setStatusMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        'https://megha-app.onrender.com/adminregister/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatusMessage('Registration successful!');
        // Clear form data if needed
        setFormData({
          idno: '',
          firstname: '',
          lastname: '',
          email: '',
          contact: '',
          password: '',
          repassword: '',
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
  return (
    <div className="adminregister-container">
      <h1>Admin Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="idno">ID Number</label>
        <input
          type="number"
          id="idno"
          name="idno"
          value={formData.idno}
          onChange={(e) => setFormData({ ...formData, idno: e.target.value })}
          placeholder="Enter University ID"
          required
        />

        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          id="firsname"
          name="firstname"
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
          placeholder="Enter your First name"
          required
        />

        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
          placeholder="Enter your Last name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your Email"
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
          placeholder="Enter your Contact No"
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
          placeholder="Enter your Password"
          required
        />

        <label htmlFor="repassword">Re-Type Password</label>
        <input
          type="password"
          id="repassword"
          name="repassword"
          value={formData.repassword}
          onChange={(e) =>
            setFormData({ ...formData, repassword: e.target.value })
          }
          placeholder="Re-enter password"
          required
        />

        <button type="regbtn-submit" disabled={isSubmitting}>
          Add Admin
        </button>
      </form>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};
export default AdminRegister;
