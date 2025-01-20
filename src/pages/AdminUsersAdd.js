import React, { useState } from 'react';

const AdminUsersAdd = ({ admins, setAdmins }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMember, setIsMember] = useState(false);

  const handleAddAdmins = async (e) => {
    e.preventDefault();

    // Validation
    if (!firstname || !lastname || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    const adminsData = { firstname, lastname, email, password, isMember };

    try {
      const response = await fetch(
        `https://megha-app.render.com/api/addadmins`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(adminsData),
        }
      );

      if (response.ok) {
        const newAdmin = await response.json();
        setAdmins([...admins, newAdmin]); // Add the new admin to the state
        alert('Admin added successfully!');

        // Clear form fields
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setIsMember(false);
      } else {
        alert('Failed to add admin. Please try again.');
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div
      className="add-users-container"
      style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}
    >
      <h1>Add Admins</h1>
      <form onSubmit={handleAddAdmins}>
        <div style={{ marginBottom: '15px' }}>
          <label>First Name:</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Is a Megha Club Member?</label>
          <input
            type="checkbox"
            checked={isMember}
            onChange={(e) => setIsMember(e.target.checked)}
            style={{ marginLeft: '10px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Admin
        </button>
      </form>
    </div>
  );
};

export default AdminUsersAdd;
