import React from "react";
import './AdminDashboard.css';
const AdminDashboard = () => {

    return (
        <div className="admin-dashboard">
            <h1>Welcome Mr/Mrs. Megha Club Admin</h1>
            <div className="admin-btn">
                 <button><a href="/adminevents">Go to the Events</a></button>
            </div>
            
        </div>
    );
}
export default AdminDashboard;