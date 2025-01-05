import React, { useState } from "react";
import './Certifications.css';

const Certifications = () => {
    const [expanded, setExpanded] = useState({}); // State to track expanded sections

    const certifications = [
        {
            id: 1,
            title: "AWS Certifications",
            imageUrl: "path/to/aws-image.jpg",
            details: [
                { id: 1, title: "AWS Certified Solutions Architect", imageUrl: "path/to/aws-cert1.jpg" },
                { id: 2, title: "AWS Certified Developer", imageUrl: "path/to/aws-cert2.jpg" },
            ],
        },
        {
            id: 2,
            title: "Google Cloud Certifications",
            imageUrl: "path/to/google-cloud-image.jpg",
            details: [
                { id: 1, title: "Google Cloud Professional Data Engineer", imageUrl: "path/to/google-cert1.jpg" },
                { id: 2, title: "Google Cloud Associate Cloud Engineer", imageUrl: "path/to/google-cert2.jpg" },
            ],
        },
        // Add more certification sections as needed
    ];

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="certifications-container">
            <div className="certification-header">
                <h1>Certification & Vouchers</h1>
            </div>
            <div className="certification-content">
                {certifications.map(cert => (
                    <div key={cert.id} className="certification-section">
                        <div className="certification-card" onClick={() => toggleExpand(cert.id)}>
                            <img src={cert.imageUrl} alt={cert.title} className="card-image" />
                            <h3 className="card-title">{cert.title}</h3>
                        </div>
                        {expanded[cert.id] && (
                            <div className="certification-details">
                                {cert.details.map(detail => (
                                    <div className="card" key={detail.id}>
                                        <img src={detail.imageUrl} alt={detail.title} className="card-image" />
                                        <h4 className="card-title">{detail.title}</h4>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Certifications;
