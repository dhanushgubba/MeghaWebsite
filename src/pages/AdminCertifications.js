import React, { useEffect, useState } from 'react';
import './AdminCertifications.css'; // Optional: Add custom styles

const AdminCertifications = ({ certifications, setCertifications }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCertifications();
    //eslint-disable-next-line
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await fetch(
        'https://megha-app.onrender.com/api/certifications'
      );
      const data = await response.json();
      setCertifications(data || []);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    }
  };

  const handleAddCertification = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !image.trim()) {
      alert('Please fill all fields!');
      return;
    }

    const certificationData = { title, description, image };
    try {
      if (editId) {
        await fetch(
          `https://megha-app.onrender.com/api/certifications/${editId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(certificationData),
          }
        );
        setEditId(null);
      } else {
        await fetch('https://megha-app.onrender.com/api/certifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(certificationData),
        });
      }
      fetchCertifications();
      setTitle('');
      setDescription('');
      setImage('');
    } catch (error) {
      console.error('Error adding/updating certification:', error);
    }
  };

  const handleEdit = (certification) => {
    setTitle(certification.title);
    setDescription(certification.description);
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
          <form
            onSubmit={handleAddCertification}
            className="certification-form"
          >
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input-field"
            />
            <button type="submit" className="submit-button">
              {editId ? 'Update' : 'Add'}
            </button>
          </form>
        </div>

        <div className="list-container">
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
