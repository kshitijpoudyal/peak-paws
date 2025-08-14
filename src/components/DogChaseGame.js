import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SampleForm from './SampleForm';
import './DogChaseGame.css';

const DogChaseGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [dogPosition, setDogPosition] = useState(50); // percentage from left
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [fallingChews, setFallingChews] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSampleForm, setShowSampleForm] = useState(false);

  const TARGET_SCORE = 10;

  // Generate falling chews
  useEffect(() => {
    if (!gameStarted || gameWon) return;

    const interval = setInterval(() => {
      const newChew = {
        id: Date.now() + Math.random(),
        x: Math.random() * 90, // random position from 0-90%
        y: -10, // start above the game area
        speed: 1 + Math.random() * 2 // random speed
      };
      
      setFallingChews(prev => [...prev, newChew]);
    }, 1000); // spawn a new chew every second

    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  // Move falling chews
  useEffect(() => {
    if (!gameStarted || gameWon) return;

    const interval = setInterval(() => {
      setFallingChews(prev => 
        prev.map(chew => ({
          ...chew,
          y: chew.y + chew.speed
        })).filter(chew => chew.y < 100) // remove chews that fell off screen
      );
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  // Check for collisions
  useEffect(() => {
    if (!gameStarted || gameWon) return;

    const dogWidth = 8; // dog width percentage
    const chewWidth = 4; // chew width percentage
    const dogY = 80; // dog y position percentage
    const catchRange = 15; // vertical range for catching

    setFallingChews(prev => {
      const remaining = [];
      let caught = 0;

      prev.forEach(chew => {
        // Check if chew is in catch range (near the dog's Y position)
        if (chew.y >= dogY - catchRange && chew.y <= dogY + catchRange) {
          // Check horizontal collision
          if (chew.x + chewWidth >= dogPosition && chew.x <= dogPosition + dogWidth) {
            caught++;
            return; // Don't add to remaining array (chew was caught)
          }
        }
        remaining.push(chew);
      });

      if (caught > 0) {
        setScore(prevScore => {
          const newScore = prevScore + caught;
          if (newScore >= TARGET_SCORE) {
            setGameWon(true);
            setShowConfetti(true);
            // Show sample form after confetti
            setTimeout(() => {
              setShowConfetti(false);
              setShowSampleForm(true);
            }, 3000);
          }
          return newScore;
        });
      }

      return remaining;
    });
  }, [fallingChews, dogPosition, gameStarted, gameWon]);

  // Handle keyboard controls
  useEffect(() => {
    if (!gameStarted || gameWon) return;

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setDogPosition(prev => Math.max(0, prev - 8));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setDogPosition(prev => Math.min(92, prev + 8));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameWon]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setGameWon(false);
    setFallingChews([]);
    setDogPosition(50);
    setShowConfetti(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setGameWon(false);
    setFallingChews([]);
    setDogPosition(50);
    setShowConfetti(false);
    setShowSampleForm(false);
  };

  const handleSampleFormSubmit = (formData) => {
    console.log('Sample form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  const handleCloseSampleForm = () => {
    setShowSampleForm(false);
  };

  // Confetti component
  const Confetti = () => {
    const confettiPieces = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      color: ['#ff6b6b', '#4ecdc4', '#667eea', '#ffd93d', '#6bcf7f'][Math.floor(Math.random() * 5)]
    }));

    return (
      <div className="confetti-container">
        {confettiPieces.map(piece => (
          <motion.div
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.x}%`,
              backgroundColor: piece.color
            }}
            initial={{ y: -10, opacity: 1, rotate: 0 }}
            animate={{ 
              y: window.innerHeight + 100, 
              opacity: 0, 
              rotate: 720 
            }}
            transition={{ 
              duration: 3, 
              delay: piece.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="dog-game" className="dog-chase-game">
      <div className="container">
        <motion.div
          className="game-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2> Catch the Falling Chews!</h2>
          <p>Help the dog catch {TARGET_SCORE} falling chews to win a free sample!</p>
        </motion.div>

        <div className="game-container">
          {!gameStarted ? (
            <motion.div
              className="game-start"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>🎮 Ready to Play?</h3>
              <p>Use ← → arrow keys or A/D keys to move the dog</p>
              <p>Catch {TARGET_SCORE} falling chews to win!</p>
              <motion.button
                className="start-button"
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Game
              </motion.button>
            </motion.div>
          ) : (
            <div className="game-area">
              <div className="game-stats">
                <div className="score">Score: {score}/{TARGET_SCORE}</div>
                <div className="progress-bar">
                  <motion.div 
                    className="progress-fill"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(score / TARGET_SCORE) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="game-field">
                {/* Falling Chews */}
                <AnimatePresence>
                  {fallingChews.map(chew => (
                    <motion.div
                      key={chew.id}
                      className="falling-chew"
                      style={{
                        left: `${chew.x}%`,
                        top: `${chew.y}%`
                      }}
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        scale: { duration: 0.3 },
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                      }}
                    >
                      🦴
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Dog */}
                <motion.div
                  className="game-dog"
                  animate={{ 
                    left: `${dogPosition}%`,
                    x: [0, -3, 3, 0],
                    rotate: [0, -1, 1, 0]
                  }}
                  transition={{ 
                    left: { duration: 0.1, ease: "easeOut" },
                    x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  🐕
                </motion.div>

                {gameWon && (
                  <motion.div
                    className="win-message"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3>Congratulations!</h3>
                    <p>You caught {TARGET_SCORE} chews!</p>
                    <motion.button
                      className="claim-sample-button"
                      onClick={() => setShowSampleForm(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Claim FREE Sample! 🎁
                    </motion.button>
                    <motion.button
                      className="play-again-button"
                      onClick={resetGame}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Play Again
                    </motion.button>
                  </motion.div>
                )}
              </div>

              {!gameWon && (
                <div className="game-controls">
                  <p>Use ← → arrows or A/D keys to move</p>
                  <motion.button
                    className="reset-button"
                    onClick={resetGame}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset Game
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Confetti Effect */}
        <AnimatePresence>
          {showConfetti && <Confetti />}
        </AnimatePresence>

        {/* Sample Form */}
        <SampleForm
          isVisible={showSampleForm}
          onClose={handleCloseSampleForm}
          onSubmit={handleSampleFormSubmit}
        />
      </div>
    </section>
  );
};

export default DogChaseGame;
