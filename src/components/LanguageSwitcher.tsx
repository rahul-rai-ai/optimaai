import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
        aria-label="Toggle language menu"
      >
        <Globe size={20} />
        <span className="uppercase">{i18n.language}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-background rounded-lg shadow-lg py-2 min-w-[120px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 hover:bg-background-light transition-colors ${
                i18n.language === lang.code ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;