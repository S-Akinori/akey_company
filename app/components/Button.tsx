import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ href, children, className = '' }) => {
  if (href) {
    return (
      <Link href={href} className={`px-4 py-2 bg-white text-black rounded ${className}`}>
          {children}
      </Link>
    );
  }

  return (
    <button className={`px-4 py-2 bg-white text-black rounded ${className}`}>
      {children}
    </button>
  );
};

export default Button;
