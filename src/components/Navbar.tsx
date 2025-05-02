import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Case Study', href: '#case-study' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="font-heading text-xl md:text-2xl font-bold text-primary">
            Optima AI Solutions
          </div>
          
          <div className="flex items-center gap-8">
            <ul className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`relative text-lg font-medium transition-colors duration-300 
                        ${isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'}
                        group
                      `}
                    >
                      {t(`nav.${item.label.toLowerCase().replace(/\s+/g, '')}`)}
                      <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 
                        ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} 
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
            
            <LanguageSwitcher />
            
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-text-primary hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm shadow-lg">
          <ul className="flex flex-col py-4 px-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <li key={item.label} className="py-2">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`block text-lg font-medium transition-colors duration-300 relative
                      ${isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'}
                    `}
                  >
                    <span className="relative">
                      {t(`nav.${item.label.toLowerCase().replace(/\s+/g, '')}`)}
                      <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300
                        ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;