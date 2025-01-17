import React, { useEffect } from 'react';
import { useState } from 'react';
const AdminVouchers = ({ vouchers, setVouchers }) => {
  const [title, setTitle] = useState('');
  const [Expirydate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    fetchVouchers();
    //eslint-disable-next-line
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await fetch(
        'https://megha-app.onrender.com/api/vouchers'
      );
      const data = await response.json();
      setVouchers(data);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
  };

  const handleAddVoucher = async (e) => {
    e.preventDefault();
    const voucherData = { title, Expirydate, description, image };
    try {
      if (editId) {
        await fetch(`https://megha-app.onrender.com/api/vouchers/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(voucherData),
        });
        setEditId(null);
      } else {
        await fetch('https://megha-app.onrender.com/api/vouchers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(voucherData),
        });
      }
      fetchVouchers();
      setTitle('');
      setExpiryDate('');
      setDescription('');
      setImage('');
    } catch (error) {
      console.error('Error adding/updating voucher:', error);
    }
  };
  const handleEdit = (voucher) => {
    setTitle(voucher.title);
    setExpiryDate(voucher.Expirydate);
    setDescription(voucher.description);
    setImage(voucher.image);
    setEditId(voucher._id);
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`https://megha-app.onrender.com/api/vouchers/${id}`, {
        method: 'DELETE',
      });
      fetchVouchers();
    } catch (error) {
      console.error('Error deleting voucher:', error);
    }
  };
  return (
    <div className="admin-vouchers-container">
      <h1 className="admin-vouchers-title">Vouchers</h1>
      <div className="admin-vouchers-form" onSubmit={handleAddVoucher}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Expiry Date"
          value={Expirydate}
          onChange={(e) => setExpiryDate(e.target.value)}
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

        <button type="submit">{editId ? 'Update' : 'Add'}</button>

        <h2 className="admin-vouchers-current-title">Current Vouchers</h2>
        <ul className="admin-vouchers-list">
          {vouchers.map((voucher) => (
            <li key={voucher._id} className="admin-vouchers-item">
              <h3 className="admin-vouchers-title">{voucher.title}</h3>
              <p className="admin-vouchers-Expirydate">{voucher.Expirydate}</p>
              <p className="admin-vouchers-description">
                {voucher.description}
              </p>
              <img
                src={voucher.image}
                alt={voucher.title}
                className="admin-vouchers-image"
              />
              <button onClick={() => handleEdit(voucher)}>Edit</button>
              <button onClick={() => handleDelete(voucher._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AdminVouchers;
