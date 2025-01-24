import React, { useState } from 'react';
import './Faqs.css'; // You can create a CSS file for styling

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is cloud computing?',
      answer:
        'Cloud computing is the delivery of computing services over the internet, allowing for faster innovation, flexible resources, and economies of scale.',
    },
    {
      question: 'What are the benefits of using cloud services?',
      answer:
        'Cloud services provide scalability, cost efficiency, accessibility from anywhere, and enhanced collaboration among teams.',
    },
    {
      question: 'Is cloud storage secure?',
      answer:
        'Yes, reputable cloud service providers implement strong security measures, including encryption and multi-factor authentication, to protect your data.',
    },
    {
      question: 'How do I choose the right cloud service provider?',
      answer:
        'Consider factors such as service offerings, pricing, security features, customer support, and compliance with regulations.',
    },
    {
      question: 'Can I migrate my existing applications to the cloud?',
      answer:
        "Yes, most applications can be migrated to the cloud. However, the process may vary depending on the application's architecture.",
    },
    {
      question: 'What is the difference between IaaS, PaaS, and SaaS?',
      answer:
        'IaaS (Infrastructure as a Service) provides virtualized computing resources; PaaS (Platform as a Service) offers a platform for developing applications; SaaS (Software as a Service) delivers software over the internet.',
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faqs-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faqs">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFaq(index)}>
              <h3>{faq.question}</h3>
              <span>{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
