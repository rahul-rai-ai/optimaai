import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Phone, MessageCircle, Bot, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';

type TabType = 'chatbots' | 'voice' | 'whatsapp';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chatbots');
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

  const services = {
    chatbots: {
      title: t('services.chatbots.title'),
      tag: t('services.chatbots.tag'),
      description: t('services.chatbots.question'),
      longDescription: t('services.chatbots.description'),
      features: [
        'Instant Booking Management',
        'Smart FAQ Responses',
        'Personalized Recommendations',
        'Multi-platform Integration',
        '24/7 Availability',
        'Analytics Dashboard'
      ],
      image: 'https://images.pexels.com/photos/7438101/pexels-photo-7438101.jpeg',
      icon: <MessageSquare className="text-primary h-8 w-8" />
    },
    voice: {
      title: t('services.voice.title'),
      tag: t('services.voice.tag'),
      description: t('services.voice.question'),
      longDescription: t('services.voice.description'),
      features: [
        'Natural Voice Interactions',
        '24/7 Call Handling',
        'Seamless Order Taking',
        'Multi-language Support',
        'Peak Hour Management',
        'Call Analytics'
      ],
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
      icon: <Phone className="text-primary h-8 w-8" />
    },
    whatsapp: {
      title: t('services.whatsapp.title'),
      tag: t('services.whatsapp.tag'),
      description: t('services.whatsapp.question'),
      longDescription: t('services.whatsapp.description'),
      features: [
        'Automated Reminders',
        'Personalized Offers',
        'Feedback Collection',
        'Customer Re-engagement',
        'Campaign Management',
        'Performance Tracking'
      ],
      image: 'https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg',
      icon: <MessageCircle className="text-primary h-8 w-8" />
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light/30 opacity-0 transition-opacity duration-1000"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('services.title')}
        </motion.h2>

        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex bg-background-light rounded-full p-1">
            {(Object.keys(services) as TabType[]).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-text-secondary hover:text-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {services[tab].title}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            className="bg-background p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {services[activeTab].icon}
              </motion.div>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {services[activeTab].tag}
              </span>
            </div>
            
            <h3 className="text-3xl font-heading font-bold mb-2">
              {services[activeTab].description}
            </h3>
            
            <p className="text-text-secondary text-lg mb-6">
              {services[activeTab].longDescription}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {services[activeTab].features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Bot className="text-primary h-5 w-5" />
                  <span className="text-text-secondary">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button href="#contact" className="flex-1 justify-center">
                {t('cta.button')}
              </Button>
              <motion.button 
                className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                whileHover={{ x: 10 }}
              >
                Learn More
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className="relative rounded-2xl overflow-hidden aspect-video"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={services[activeTab].image}
              alt={services[activeTab].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;