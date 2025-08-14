import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div  id="footer-section" className="footer-section">
            <div className="footer-logo">
              <img src="/dog_chew_logo.png" alt="DogChew Logo" />
              <span>DogChew</span>
            </div>
            <p className="footer-description">
              Premium natural dog chews made with love for your furry friends. 
              Promoting dental health and happiness since day one.
            </p>
            <div className="social-links">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                📘
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                📷
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                🐦
              </motion.a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Customer Care</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          id='footer-bottom'
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} DogChew. All rights reserved. Made with ❤️ for dogs everywhere.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
