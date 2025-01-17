import React, { useEffect, useState } from 'react';
import './Vouchers.css';
const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [message, setMessage] = useState(''); // State to show feedback message
  const fetchVouchers = async () => {
    try {
      const response = await fetch(
        'https://megha-app.onrender.com/api/vouchers'
      );
      const data = await response.json();
      setVouchers(data);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      setMessage('Failed to load vouchers.');
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);
  return (
    <div className="vouchers-container">
      <h1>Vouchers</h1>
      {message && <p className="message">{message}</p>}
      <div className="vouchers-list">
        {vouchers.map((voucher) => (
          <div key={voucher._id} className="voucher-card">
            <img src={voucher.image} alt={voucher.title} />
            <div className="voucher-details">
              <h2>{voucher.title}</h2>
              <p>{voucher.description}</p>
              <p>Expires on: {new Date(voucher.expiryDate).toDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Vouchers;
