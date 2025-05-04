import React, { useState } from 'react';
import { Mail, MapPin, Phone, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail('');
  };
  
  return (
    <footer className="bg-background-light py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4 text-primary">Optima AI Solutions</h3>
            <p className="text-text-secondary mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/optimaai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com/optimaai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com/optimaai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4 text-primary">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'How It Works', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {t(`nav.${item.toLowerCase().replace(/\s+/g, '')}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4 text-primary">{t('footer.contact.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                <a href="mailto:info@optimaai.co" className="text-text-secondary hover:underline">info@optimaai.co</a>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                <span className="text-text-secondary">+491622968335</span>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                <span className="text-text-secondary">{t('footer.location')}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading font-semibold mb-4 text-primary">{t('footer.newsletter.title')}</h3>
            <p className="text-text-secondary mb-4">
              {t('footer.newsletter.description')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  isSubscribed
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-white hover:bg-secondary'
                }`}
              >
                {isSubscribed ? t('footer.newsletter.success') : t('footer.newsletter.button')}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center text-text-secondary text-sm">
          <p>© {currentYear} Optima AI Solutions. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
