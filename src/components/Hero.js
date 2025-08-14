import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const Hero = ({ onSlideChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Premium Natural Dog Chews",
      subtitle: "Keep your furry friend happy and healthy with our all-natural, long-lasting dog chews made from the finest ingredients.",
      image: "/dog_chew_logo.png",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "Healthy Teeth, Happy Dogs",
      subtitle: "Our specially crafted chews promote dental health while providing hours of satisfying entertainment for your beloved pet.",
      image: "/dog_chew_for_small_dog.png",
      background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)"
    },
    {
      title: "Perfect for All Sizes",
      subtitle: "From small puppies to large breeds, we have the perfect chew size and texture to satisfy every dog's natural chewing instincts.",
      image: "/dog_chew_for_big_dog.png",
      background: "linear-gradient(135deg, #4ecdc4 0%, #26d0ce 100%)"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const newSlide = (prev + 1) % slides.length;
        if (onSlideChange) {
          onSlideChange(newSlide);
        }
        return newSlide;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length, onSlideChange]);

  // Initial call to set the navbar color
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentSlide);
    }
  }, [onSlideChange, currentSlide]);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const scrollToBuyNow = () => {
    const element = document.getElementById('buy-now');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGame = () => {
    const element = document.getElementById('dog-game');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="hero-background"
          style={{ background: slides[currentSlide].background }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="floating-shapes">
            <motion.div 
              className="shape shape-1"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="shape shape-2"
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -180, -360]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="shape shape-3"
              animate={{ 
                y: [0, -15, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="container">
        <AnimatePresence mode="wait" custom={currentSlide}>
          <motion.div
            key={currentSlide}
            className="hero-content"
            custom={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <motion.h1 className="hero-title" variants={itemVariants}>
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p className="hero-subtitle" variants={itemVariants}>
              {slides[currentSlide].subtitle}
            </motion.p>
            <motion.div className="hero-buttons" variants={itemVariants}>
              <motion.button
                className="btn"
                onClick={scrollToBuyNow}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
              <motion.button
                className="btn btn-secondary"
                onClick={scrollToGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Claim Sample
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="hero-image"
            initial={{ scale: 0.8, opacity: 0, x: 100 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.8, opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={slides[currentSlide].image}
              alt="Dog Chew Product"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
            <div className="hero-image-glow"></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
