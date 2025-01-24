import React, { useEffect, useState } from 'react';
import './Vouchers.css';

const LoadingSpinner = () => <div className="spinner"></div>;

const VoucherModal = ({ voucher, onClose }) => {
  if (!voucher) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-image">
          <img src={voucher.image} alt={voucher.title} />
        </div>
        <div className="modal-details">
          <h2>{voucher.title}</h2>
          <p className="modal-description">{voucher.description}</p>
          <div className="modal-info">
            <div className="info-item">
              <span className="info-label">Expiry Date</span>
              <span className="info-value">
                {new Date(voucher.expiryDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const fetchVouchers = async () => {
    try {
      const response = await fetch(
        'https://megha-app.onrender.com/api/vouchers'
      );
      const data = await response.json();
      setVouchers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      setMessage('Failed to load vouchers.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
        <p>Loading vouchers...</p>
      </div>
    );
  }

  return (
    <div className="vouchers-container">
      <div className="content-wrapper">
        <h1>Available Vouchers</h1>

        {message && (
          <div className="error-message">
            <p>{message}</p>
          </div>
        )}

        <div className="vouchers-grid">
          {vouchers.map((voucher) => (
            <div key={voucher._id} className="voucher-card">
              <div
                className="image-container"
                onClick={() => setSelectedVoucher(voucher)}
              >
                <img src={voucher.image} alt={voucher.title} />
                <div className="overlay">
                  <span className="view-details">Click to View Details</span>
                </div>
              </div>
              <div className="card-preview">
                <h2>{voucher.title}</h2>
                <button
                  className="details-button"
                  onClick={() => setSelectedVoucher(voucher)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedVoucher && (
          <VoucherModal
            voucher={selectedVoucher}
            onClose={() => setSelectedVoucher(null)}
          />
        )}

        {vouchers.length === 0 && !message && (
          <div className="empty-state">
            <p>No vouchers available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vouchers;
