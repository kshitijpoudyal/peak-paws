import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Features from './components/Features';
import BuyNow from './components/BuyNow';
import DogChaseGame from './components/DogChaseGame';
import Footer from './components/Footer';
import PawsAnimation from './components/PawsAnimation';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="App">
      <PawsAnimation />
      <Navbar currentSlide={currentSlide} />
      <Hero onSlideChange={setCurrentSlide} />
      <Features />
      <Products />
      <BuyNow />
      <DogChaseGame />
      <Footer />
    </div>
  );
}

export default App;
