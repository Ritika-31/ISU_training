import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    emailid: '',
    feedback: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Feedback:', formData);
    setSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      emailid: '',
      feedback: ''
    });
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <h2>We Value Your Feedback</h2>
        <p className="subtitle">Let us know how we can improve our services.</p>
        
        {submitted && (
          <div className="success-message">
            Thank you for your feedback!
          </div>
        )}

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="emailid">Email ID</label>
            <input
              type="email"
              id="emailid"
              name="emailid"
              value={formData.emailid}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Tell us what you think..."
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
