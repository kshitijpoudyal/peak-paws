import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = ({ currentSlide = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const slideColors = [
    { primary: '#667eea', secondary: '#764ba2' },
    { primary: '#ff6b6b', secondary: '#ee5a52' },
    { primary: '#4ecdc4', secondary: '#26d0ce' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      style={{
        background: isScrolled 
          ? `linear-gradient(135deg, ${slideColors[currentSlide].primary}66, ${slideColors[currentSlide].secondary}66)`
          : `linear-gradient(135deg, ${slideColors[currentSlide].primary}33, ${slideColors[currentSlide].secondary}33)`
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/dog_chew_logo.png" alt="Himalayan Dog Chew Logo" />
          <span>Himalayan Dog Chew</span>
        </div>
        
        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <motion.a
            href="#home"
            className="nav-link"
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.a>
          <motion.a
            href="#products"
            className="nav-link"
            onClick={() => scrollToSection('products')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Products
          </motion.a>
          <motion.a
            href="#features"
            className="nav-link"
            onClick={() => scrollToSection('features')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Benefits
          </motion.a>
          <motion.a
            href="#buy-now"
            className="nav-link"
            onClick={() => scrollToSection('buy-now')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Buy Now
          </motion.a>
        </div>

        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
