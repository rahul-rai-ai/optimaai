import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import { X } from 'lucide-react';

const CtaBanner: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercent > 50 && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-background via-primary/10 to-background p-4 transform transition-transform duration-500 shadow-lg backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <p className="text-lg font-medium">
          {t('ctaBanner.message')}
        </p>
        <div className="flex items-center gap-4">
          <Button href="#contact" className="transform hover:scale-105 transition-transform">
            {t('ctaBanner.button')}
          </Button>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-text-secondary hover:text-primary transition-colors"
            aria-label={t('ctaBanner.dismiss')}
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CtaBanner;
