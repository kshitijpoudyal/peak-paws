import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './SampleForm.css';

const SampleForm = ({ isVisible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    dogName: '',
    dogSize: 'medium'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSubmit) {
        onSubmit(formData);
      }
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        // Reset form
        setFormData({
          name: '',
          email: '',
          address: '',
          address2: '',
          city: '',
          state: '',
          zipCode: '',
          dogName: '',
          dogSize: 'medium'
        });
      }, 3000);
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="sample-form-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="sample-form-container"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {!isSubmitted ? (
          <>
            <div className="form-header">
              <h2>🎉 Claim Your FREE Sample!</h2>
              <p>You did it! Get your complimentary Himalayan Dog Chew delivered to your door.</p>
              <button className="close-button" onClick={onClose}>×</button>
            </div>

            <form className="sample-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>👤 Contact Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>📍 Delivery Address</h3>
                <div className="form-group">
                  <label htmlFor="address">Street Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address2">Address Line 2</label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    placeholder="Apt, suite, unit, building, floor, etc. (optional)"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      placeholder="City"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      placeholder="State"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>🐕 Your Pup</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dogName">Dog's Name</label>
                    <input
                      type="text"
                      id="dogName"
                      name="dogName"
                      value={formData.dogName}
                      onChange={handleInputChange}
                      placeholder="Buddy"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dogSize">Size</label>
                    <select
                      id="dogSize"
                      name="dogSize"
                      value={formData.dogSize}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="small">Small (Under 25 lbs)</option>
                      <option value="medium">Medium (25-60 lbs)</option>
                      <option value="large">Large (Over 60 lbs)</option>
                    </select>
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Get My Free Sample 🚚'
                )}
              </motion.button>

              <p className="form-disclaimer">
                Free shipping • No purchase required • Privacy protected
              </p>
            </form>
          </>
        ) : (
          <motion.div
            className="success-message"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="success-icon">🎉</div>
            <h2>Sample On Its Way!</h2>
            <p>Your free Himalayan Dog Chew sample will arrive in 5-7 business days.</p>
            <p>Check your email for tracking details.</p>
            <div className="success-paws">🐾</div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SampleForm;
