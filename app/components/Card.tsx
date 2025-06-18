import React from 'react';

interface CardProps {
    children?: React.ReactNode;
}

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`font-bold text-xl mb-2 ${className}`}>{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mt-4 ${className}`}>{children}</div>
);


export const Card: React.FC<CardProps & { className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`rounded overflow-hidden shadow-lg ${className}`}>
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );
};

