import React from 'react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  href,
}) => {
  const baseStyles = `bg-secondary hover:bg-primary text-white font-bold py-2 px-4 md:py-4 md:px-8 rounded-full transition-all duration-300 text-base md:text-lg ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          onClick?.();
        }}
        className={baseStyles}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseStyles}>
      {children}
    </button>
  );
};

export default Button;