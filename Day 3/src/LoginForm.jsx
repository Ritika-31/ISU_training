import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // State to store submitted data to display below
  const [submittedData, setSubmittedData] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to an API
    // Here we just save it to state to display it
    setSubmittedData(formData);

    // Optional: Clear form after submit
    // setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className="login-card">
      <h2>Login Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Sign In
        </button>
      </form>

      {/* Conditionally render the submitted data if it exists */}
      {submittedData && (
        <div className="result-card">
          <h3>Submitted Data</h3>
          <div className="result-data">
            <div className="data-row">
              <span className="data-label">Username:</span>
              <span className="data-value">{submittedData.username}</span>
            </div>
            <div className="data-row">
              <span className="data-label">Password:</span>
              <span className="data-value">
                {/* Normally we shouldn't display passwords, but for this exercise we do or mask it */}
                {submittedData.password}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
