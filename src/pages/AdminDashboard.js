import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Welcome Mr/Mrs. Megha Club Admin</h1>
      <div className="admin-cards">
        {/* Events Card */}
        <div className="card">
          <a href="/adminevents">
            <div className="card-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <p>Go to the Events</p>
          </a>
        </div>

        <div className="card">
          <a href="/addusers">
            <div className="card-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <p>Add Admins</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
