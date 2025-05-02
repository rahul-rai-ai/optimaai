import React, { useEffect, useRef } from 'react';
import { Clock, Users, TrendingUp, BarChart, Bot, MessageSquare, Phone } from 'lucide-react';

const CaseStudy: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      id="case-study"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 opacity-0 transition-opacity duration-1000 bg-background-light/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            BookMyTable: AI Success Story
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            How a UK-based restaurant booking platform transformed their operations with AI, handling over 5 million reservations annually
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="bg-background p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-heading font-semibold mb-4 text-primary">The Challenge</h3>
              <ul className="space-y-4 text-text-secondary">
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>6-8 minute wait times for customer reservations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Limited capacity during peak hours and holidays</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>High operational costs from manual reservation management</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-heading font-semibold mb-4 text-primary">The Solution</h3>
              <div className="space-y-6">
                <p className="text-text-secondary">
                  Implementation of an AI-powered chatbot solution with:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background-light p-4 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-primary mb-2" />
                    <h4 className="font-semibold mb-1">Smart Booking</h4>
                    <p className="text-sm text-text-secondary">Instant table availability checks</p>
                  </div>
                  <div className="bg-background-light p-4 rounded-xl">
                    <Bot className="w-6 h-6 text-primary mb-2" />
                    <h4 className="font-semibold mb-1">24/7 Service</h4>
                    <p className="text-sm text-text-secondary">Automated reservation management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-heading font-semibold mb-6 text-primary">Remarkable Results</h3>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-background-light rounded-xl">
                  <p className="text-4xl font-bold text-primary mb-2">75%</p>
                  <p className="text-text-secondary">Faster Bookings</p>
                  <p className="text-sm text-text-secondary mt-2">From 6-8 mins to 90 seconds</p>
                </div>
                <div className="text-center p-6 bg-background-light rounded-xl">
                  <p className="text-4xl font-bold text-primary mb-2">45%</p>
                  <p className="text-text-secondary">More Bookings</p>
                  <p className="text-sm text-text-secondary mt-2">In just 3 months</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-background-light rounded-xl">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">55% Increase in Repeat Business</h4>
                    <p className="text-sm text-text-secondary">Through personalized recommendations</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-background-light rounded-xl">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">€108,150 Quarterly Savings</h4>
                    <p className="text-sm text-text-secondary">In operational costs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-heading font-semibold mb-6 text-primary text-center">
            Key Takeaways for Restaurants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-background-light rounded-xl">
              <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Time Efficiency</h4>
              <p className="text-text-secondary">Dramatic reduction in booking times and wait periods</p>
            </div>
            <div className="text-center p-6 bg-background-light rounded-xl">
              <BarChart className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Revenue Growth</h4>
              <p className="text-text-secondary">Significant increase in bookings and customer retention</p>
            </div>
            <div className="text-center p-6 bg-background-light rounded-xl">
              <Users className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Resource Optimization</h4>
              <p className="text-text-secondary">Better staff allocation and reduced operational costs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;