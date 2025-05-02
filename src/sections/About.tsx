import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 opacity-0 transition-opacity duration-1000"
    >
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
            {t('about.title')}
          </h2>
          <div className="space-y-6 text-text-secondary">
            <p className="text-lg leading-relaxed">
              At Optima AI Solutions, we empower restaurants to thrive in a fast-paced world. 
              We were founded to address the challenges faced by independent restaurants in Europe, 
              combining industry knowledge with cutting-edge AI to streamline operations, boost revenue, 
              and enhance customer satisfaction.
            </p>
            <div className="bg-background-light p-6 rounded-lg border-l-4 border-primary">
              <h3 className="text-xl font-heading font-semibold mb-2">{t('about.mission.title')}</h3>
              <p>{t('about.mission.text')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;