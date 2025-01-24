import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(
        'https://megha-app.onrender.com/contact/submit',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <div className="contact-card">
          {/* Header Section */}
          <div className="contact-header">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>

          {/* Form Section */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <div className="input-with-icon">
                  <i className="fas fa-user input-icon"></i>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <div className="input-with-icon">
                  <i className="fas fa-envelope input-icon"></i>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows="4"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin button-icon"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane button-icon"></i>
                    Send Message
                  </>
                )}
              </button>

              {/* Status Message */}
              {status.message && (
                <div className={`status-message ${status.type}`}>
                  {status.message}
                </div>
              )}
            </form>

            {/* Contact Info */}
            <div className="contact-info">
              <a
                href="mailto:meghacloudclub@example.com"
                className="email-link"
              >
                <i className="fas fa-envelope email-icon"></i>
                meghacloudclub@example.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
