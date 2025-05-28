import React, { useEffect, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import HowItWorks from './sections/HowItWorks';
import CaseStudy from './sections/CaseStudy';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CtaBanner from './components/CtaBanner';
import FloatingElements from './components/FloatingElements';
import MouseFollower from './components/MouseFollower';
import CookieBanner from './components/CookieBanner';
import { initGA, logPageView } from './utils/analytics';
import LoadingSpinner from './components/LoadingSpinner';
import './i18n'; // Initialize translations

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  return (
    <div className="bg-background text-text-primary min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <MouseFollower 
          enabled={true}
          baseColor="#6366F1"
          size={20}
        />
        <FloatingElements />
        <div className="bg-primary/10 text-center py-2 px-4">
          <p className="text-primary font-medium">
            {t('banner.trial')}
          </p>
        </div>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <HowItWorks />
          <CaseStudy />
          <Contact />
        </main>
        <Footer />
        <CtaBanner />
        <CookieBanner />
      </Suspense>
    </div>
  );
}

export default App;
