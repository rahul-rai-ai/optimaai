import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary/20 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;