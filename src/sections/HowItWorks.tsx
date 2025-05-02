import React, { useEffect, useRef } from 'react';
import { ClipboardCheck, PenTool, LucideMonitor, BarChart2 } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardCheck className="text-primary h-8 w-8" />,
    title: 'Consultation',
    description: 'We analyze your restaurant\'s unique challenges and goals.',
  },
  {
    icon: <PenTool className="text-primary h-8 w-8" />,
    title: 'Customization',
    description: 'Our team tailors AI solutions to fit your operations seamlessly.',
  },
  {
    icon: <LucideMonitor className="text-primary h-8 w-8" />,
    title: 'Implementation',
    description: 'We integrate chatbots, voice agents, and automation with minimal disruption.',
  },
  {
    icon: <BarChart2 className="text-primary h-8 w-8" />,
    title: 'Optimization',
    description: 'Ongoing support ensures your AI tools evolve with your business.',
  },
];

const HowItWorks: React.FC = () => {
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
      id="how-it-works"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 opacity-0 transition-opacity duration-1000"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
          How It Works
        </h2>
        <div className="space-y-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0 bg-background-light p-4 rounded-full mb-4 md:mb-0">
                {step.icon}
              </div>
              <div className="md:ml-4">
                <h3 className="text-xl font-heading font-semibold mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-text-secondary">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;