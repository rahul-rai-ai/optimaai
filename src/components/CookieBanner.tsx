
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next'; // Add this import
import Button from './Button';

const CookieBanner: React.FC = () => {
  const { t } = useTranslation(); // Initialize translation
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm shadow-lg z-50 p-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-secondary text-sm flex-1">
          {t('cookies.text')} {/* Use translation key */}
          <a href="/privacy-policy" className="text-primary hover:text-secondary ml-1">
            {t('cookies.policy', { defaultValue: 'Learn more' })} {/* Add policy link translation */}
          </a>
        </p>
        <div className="flex gap-4">
          <Button onClick={acceptCookies} className="whitespace-nowrap">
            {t('cookies.button')} {/* Use translation key */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
