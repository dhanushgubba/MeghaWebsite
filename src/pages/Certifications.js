import React, { useEffect, useState } from 'react';
import './Certifications.css';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [messages, setMessage] = useState(''); // State to show feedback message

  const fetchCertifications = async () => {
    try {
      const response = await fetch(
        'https://megha-app.onrender.com/api/certifications'
      );
      const data = await response.json();
      setCertifications(data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      setMessage('Failed to load certifications.');
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  return (
    <div className="usercertifications-container">
      <h2>Certifications</h2>
      {messages && <p className="message">{messages}</p>}

      <div className="usercertifications-list">
        {certifications.map((certification) => (
          <div key={certification.id} className="usercertifications-item">
            <img src={certification.image} alt={certification.title} />
            <h3>{certification.title}</h3>
            <p>{certification.description}</p>
            <p>Pass Score: {certification.passscore}</p>
            <p>Price: {certification.price}</p>
            <p>Level: {certification.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
