import React, { useState } from "react";
import './ResetPassword.css';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!newPassword) {
            setStatusMessage("Password is required");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/user/reset-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Include credentials to maintain session
                body: JSON.stringify({ newpassword: newPassword }) // Correct key
            });

            if (response.ok) {
                setStatusMessage("Password reset successfully!");
            } else {
                const data = await response.json();
                setStatusMessage(data.error || "Password reset failed");
            }
        } catch (err) {
            setStatusMessage("Error occurred. Please try again later");
        }
    };

    return (
        <div className="resetpassword-overview">
            <h1>Reset Password</h1>
            <form onSubmit={handleResetPassword}>
                <label htmlFor="newPassword">New Password</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
    );
};

export default ResetPassword;
