import React, { useEffect, useRef } from 'react';
import Button from '../components/Button';
import { Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.add('translate-y-0');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 opacity-0 translate-y-10 transition-all duration-1000 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
          poster="https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg"
        >
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/689949818/rendition/1080p?loc=external&oauth2_token_id=1027659655&signature=cf602155bf49e4e74db6f2ec9d4ecf067fbab44c4295a8950d58ecdb88910882"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80 backdrop-blur-[2px]"></div>
      </div>
      <div className="text-center max-w-5xl mx-auto relative z-10">
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 p-4 rounded-full">
            <Bot size={48} className="text-primary" />
          </div>
        </div>
        <p className="text-primary font-medium mb-4">{t('hero.subtitle')}</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-8 leading-tight">
          {t('hero.title')}
        </h1>
        <div className="flex justify-center gap-6 mt-12">
          <Button href="#contact">
            {t('hero.cta.primary')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;