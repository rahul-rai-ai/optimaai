import React from 'react';
import { ServiceCardProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="bg-background p-8 rounded-2xl shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
      <h3 className="text-2xl font-heading font-semibold mb-4 text-primary">{title}</h3>
      <p className="text-text-secondary text-lg">{description}</p>
    </div>
  );
};

export default ServiceCard;