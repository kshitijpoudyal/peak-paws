import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PawsAnimation.css';

const PawsAnimation = () => {
  const [paws, setPaws] = useState([]);

  useEffect(() => {
    const createPaw = () => {
      const newPaw = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: 110, // Start below viewport
        size: Math.random() * 0.5 + 0.5, // 0.5 to 1
        duration: Math.random() * 8 + 12, // 12-20 seconds
        delay: Math.random() * 2,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4
      };

      setPaws(prev => [...prev, newPaw]);

      // Remove paw after animation
      setTimeout(() => {
        setPaws(prev => prev.filter(paw => paw.id !== newPaw.id));
      }, (newPaw.duration + newPaw.delay + 2) * 1000);
    };

    // Create initial paws
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createPaw(), i * 2000);
    }

    // Create new paws periodically
    const interval = setInterval(() => {
      if (Math.random() < 0.7) { // 70% chance to create a paw
        createPaw();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="paws-animation-container">
      <AnimatePresence>
        {paws.map(paw => (
          <motion.div
            key={paw.id}
            className="floating-paw"
            style={{
              left: `${paw.x}%`,
              fontSize: `${paw.size * 2}rem`,
              opacity: paw.opacity,
            }}
            initial={{
              y: '100vh',
              rotate: paw.rotation,
              scale: 0,
            }}
            animate={{
              y: '-10vh',
              rotate: paw.rotation + 180,
              scale: paw.size,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: paw.duration,
              delay: paw.delay,
              ease: 'linear',
              rotate: {
                duration: paw.duration * 0.5,
                repeat: Infinity,
                ease: 'linear',
              }
            }}
          >
            🐾
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PawsAnimation;
