import React, { useEffect, useState } from 'react';
import './AdminCertifications.css'; // Optional: Add custom styles

const AdminCertifications = ({ certifications, setCertifications }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [passscore, setPassscore] = useState('');
  const [price, setPrice] = useState('');
  const [level, setLevel] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCertifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await fetch(
        'https://megha-app.onrender.com/api/certifications'
      );
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      const data = await response.json();
      setCertifications(data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const eventData = { title, description, passscore, price, level, image };

    try {
      if (editId) {
        await fetch(
          `https://megha-app.onrender.com/api/certifications/${editId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData),
          }
        );
        setEditId(null);
      } else {
        await fetch('https://megha-app.onrender.com/api/certifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        });
      }

      fetchCertifications();
      setTitle('');
      setDescription('');
      setPassscore('');
      setPrice('');
      setLevel('');
      setImage('');
    } catch (error) {
      console.error('Error adding/updating certification:', error);
    }
  };

  const handleEdit = (certification) => {
    setTitle(certification.title);
    setDescription(certification.description);
    setPassscore(certification.passscore);
    setPrice(certification.price);
    setLevel(certification.level);
    setImage(certification.image);
    setEditId(certification._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://megha-app.onrender.com/api/certifications/${id}`, {
        method: 'DELETE',
      });
      fetchCertifications();
    } catch (error) {
      console.error('Error deleting certification:', error);
    }
  };

  return (
    <div className="admin-certifications">
      <div className="container">
        <h1 className="header">Manage Certifications</h1>

        <div className="form-container">
          <form onSubmit={handleAddEvent} className="certification-form">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Pass Score"
              value={passscore}
              onChange={(e) => setPassscore(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-field"
              required
            />

            <input
              type="text"
              placeholder="level of Certification"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input-field"
              required
            />
            <button type="submit" className="submit-button">
              {editId ? 'Update' : 'Add'}
            </button>
          </form>
        </div>

        <div className="list-container">
          <h2 className="list-title"> Current Certifications</h2>
          <ul className="certification-list">
            {certifications &&
              certifications.map((certification) => (
                <li key={certification._id} className="certification-item">
                  <div className="certification-details">
                    <h3 className="certification-title">
                      {certification.title}
                    </h3>
                    <p className="certification-description">
                      {certification.description}
                    </p>
                    <p className="certification-passscore">
                      {certification.passscore}
                    </p>
                    <p className="certification-price">{certification.price}</p>
                    <p className="certification-level">{certification.level}</p>
                    <img
                      src={certification.image}
                      alt={certification.title}
                      className="certification-image"
                    />
                  </div>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleEdit(certification)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(certification._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminCertifications;
