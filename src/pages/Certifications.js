import React, { useEffect, useState } from 'react';
import './Certifications.css';

const CERTIFICATION_PROVIDERS = [
  { id: 'all', name: 'All Providers' },
  { id: 'aws', name: 'Amazon Web Services' },
  { id: 'azure', name: 'Microsoft Azure' },
  { id: 'gcp', name: 'Google Cloud Platform' },
];

const getProviderDisplayName = (providerId) => {
  const provider = CERTIFICATION_PROVIDERS.find(
    (p) => p.id === providerId?.toLowerCase()
  );
  return provider ? provider.name : providerId || 'Unknown Provider';
};

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [filteredCertifications, setFilteredCertifications] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchCertifications = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        'https://megha-app.onrender.com/api/certifications'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCertifications(data);
      setFilteredCertifications(data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      setError('Failed to load certifications. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, [retryCount]);

  useEffect(() => {
    if (selectedProvider === 'all') {
      setFilteredCertifications(certifications);
    } else {
      const filtered = certifications.filter(
        (cert) =>
          cert?.provider?.toLowerCase() === selectedProvider.toLowerCase()
      );
      setFilteredCertifications(filtered);
    }
  }, [selectedProvider, certifications]);

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="certifications-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading certifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="certifications-container">
        <div className="error-state">
          <svg
            className="error-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
          <p className="error-message">{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="certifications-container">
      <div className="provider-filter">
        {CERTIFICATION_PROVIDERS.map((provider) => (
          <button
            key={provider.id}
            className={`provider-button ${
              selectedProvider === provider.id ? 'active' : ''
            }`}
            onClick={() => handleProviderChange(provider.id)}
          >
            {provider.name}
          </button>
        ))}
      </div>

      {filteredCertifications.length === 0 ? (
        <p className="no-certifications">
          No certifications available for the selected provider.
        </p>
      ) : (
        <div className="certifications-grid">
          {filteredCertifications.map((certification) => {
            const key =
              certification?.id ||
              `${certification?.provider}-${certification?.title}`;
            const level = certification?.level || 'N/A';
            const providerDisplayName = getProviderDisplayName(
              certification?.provider
            );

            return (
              <div key={key} className="certification-card" tabIndex={0}>
                <div className="certification-image-container">
                  <img
                    src={certification?.image}
                    alt={certification?.title || 'Certification'}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800';
                      e.target.alt = 'Default certification image';
                    }}
                  />
                </div>

                <div className="certification-content">
                  <div className="provider-badge">{providerDisplayName}</div>
                  <h3>{certification?.title || 'Untitled Certification'}</h3>
                  <p className="description">
                    {certification?.description || 'No description available'}
                  </p>
                  <div className="certification-details">
                    <div className="detail-row">
                      <span className="detail-label">Level:</span>
                      <span className={`level-badge ${level.toLowerCase()}`}>
                        {level}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Pass Score:</span>
                      <span className="pass-score">
                        {certification?.passscore || 'N/A'}%
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Price:</span>
                      <span className="price">
                        {certification?.price || 'N/A'}
                      </span>
                    </div>
                  </div>
                  <button className="learn-more-btn">Learn More</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Certifications;
