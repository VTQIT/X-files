import { useState, useEffect } from 'react';
import SplashIntro from '../sections/SplashIntro';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import StatusDashboard from '../sections/StatusDashboard';
import Features from '../sections/Features';
import TickerTape from '../sections/TickerTape';
import PromptVaultPreview from '../sections/PromptVaultPreview';
import Security from '../sections/Security';
import Pricing from '../sections/Pricing';
import Footer from '../sections/Footer';

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showSplash ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showSplash]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setTimeout(() => setContentVisible(true), 100);
  };

  return (
    <>
      {showSplash && <SplashIntro onComplete={handleSplashComplete} />}

      <div
        className="transition-opacity duration-500"
        style={{ opacity: contentVisible ? 1 : 0 }}
      >
        <Navigation />
        <main>
          <Hero />
          <StatusDashboard />
          <Features />
          <TickerTape />
          <PromptVaultPreview />
          <Security />
          <Pricing />
        </main>
        <Footer />
      </div>
    </>
  );
}
