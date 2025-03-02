import React, { useState, useEffect } from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <Navbar isScrolled={scrollPosition > 50} />
      <HeroSection />
      <Features />
      <HowItWorks />
      <Tokenomics />
      <Roadmap />
      <Team />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;