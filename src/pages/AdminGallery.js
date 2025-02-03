import React, { useState, useEffect } from 'react';
import './AdminGallery.css';
const AdminGallery = ({ gallery, setGallery }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGallery();
    // eslint-disable-next-line
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch(
        'https://megha-app.onrender.com/api/gallery'
      );
      const data = await response.json();
      setGallery(data); // Update gallery in the parent state
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    const galleryData = { title, date, description, image };

    try {
      if (editId) {
        await fetch(`https://megha-app.onrender.com/api/gallery/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(galleryData),
        });
        setEditId(null);
      } else {
        await fetch('https://megha-app.onrender.com/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(galleryData),
        });
      }

      fetchGallery(); // Refresh gallery after adding or updating
      setTitle('');
      setDate('');
      setDescription('');
      setImage('');
    } catch (error) {
      console.error('Error adding/updating gallery:', error);
    }
  };

  const handleEdit = (gallery) => {
    setTitle(gallery.title);
    setDate(gallery.date);
    setDescription(gallery.description);
    setImage(gallery.image);
    setEditId(gallery._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://megha-app.onrender.com/api/gallery/${id}`, {
        method: 'DELETE',
      });
      fetchGallery(); // Refresh gallery after deleting
    } catch (error) {
      console.error('Error deleting gallery:', error);
    }
  };

  return (
    <div className="admin-gallery-container">
      <div className="admin-gallery-title">
        <h1>Admin Gallery</h1>
        <form className="admin-gallery-form" onSubmit={handleAddGallery}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button type="submit">
            {editId ? 'Update Gallery' : 'Add Gallery'}
          </button>
        </form>
      </div>

      <div className="gallery-list">
        <h2>Gallery Items</h2>
        <div className="gallery-items">
          {gallery && gallery.length > 0 ? (
            gallery.map((item) => (
              <div key={item._id} className="gallery-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-image"
                />
                <div className="gallery-info">
                  <h3>{item.title}</h3>
                  <p>{item.date}</p>
                  <p>{item.description}</p>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No gallery items available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
