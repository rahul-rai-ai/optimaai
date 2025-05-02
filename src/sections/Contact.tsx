import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import { Send, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormData } from '../types';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Here you would normally send the data to your backend
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

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
      id="contact"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light/30 opacity-0 transition-opacity duration-1000"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-center">
          {t('contact.title')}
        </h2>
        <p className="text-center text-text-secondary mb-10 text-lg">
          {t('contact.subtitle')}
        </p>
        
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto space-y-6"
        >
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              {t('contact.form.name')}
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-4 py-3 bg-background border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="John Doe"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{t('contact.form.name')} is required</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              {t('contact.form.email')}
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-3 bg-background border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="john@example.com"
              {...register('email', { 
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
              })}
            />
            {errors.email?.type === 'required' && (
              <p className="mt-1 text-sm text-red-500">{t('contact.form.email')} is required</p>
            )}
            {errors.email?.type === 'pattern' && (
              <p className="mt-1 text-sm text-red-500">Please enter a valid email</p>
            )}
          </div>
          
          <div>
            <label htmlFor="restaurant" className="block mb-2 text-sm font-medium">
              {t('contact.form.restaurant')}
            </label>
            <input
              id="restaurant"
              type="text"
              className={`w-full px-4 py-3 bg-background border ${errors.restaurant ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Awesome Restaurant"
              {...register('restaurant', { required: true })}
            />
            {errors.restaurant && (
              <p className="mt-1 text-sm text-red-500">{t('contact.form.restaurant')} is required</p>
            )}
          </div>
          
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              {t('contact.form.message')}
            </label>
            <textarea
              id="message"
              rows={5}
              className={`w-full px-4 py-3 bg-background border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Tell us about your restaurant and challenges..."
              {...register('message', { required: true })}
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{t('contact.form.message')} is required</p>
            )}
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center space-x-2"
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <Check size={20} />
                  <span>{t('contact.form.success')}</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>{t('contact.form.submit')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;