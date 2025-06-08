
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo = ({ size = 'medium', className }: LogoProps) => {
  const sizeClasses = {
    small: 'w-20 h-auto', // 80px for mobile
    medium: 'w-25 h-auto sm:w-28 h-auto', // 100px for tablet, 112px for larger
    large: 'w-30 h-auto sm:w-32 h-auto' // 120px for tablet, 128px for larger
  };

  return (
    <svg 
      viewBox="0 0 200 120" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
      aria-label="GoCarbonTracker Logo"
    >
      {/* Three descending bars representing emissions tracking */}
      <rect x="20" y="30" width="30" height="70" fill="#059669" rx="4"/>
      <rect x="60" y="50" width="30" height="50" fill="#059669" rx="4"/>
      <rect x="100" y="65" width="30" height="35" fill="#059669" rx="4"/>
      
      {/* Circle indicator for zero emissions target */}
      <circle cx="155" cy="82" r="12" fill="none" stroke="#059669" strokeWidth="3"/>
      
      {/* Outer rounded rectangle border */}
      <rect x="10" y="20" width="170" height="85" fill="none" stroke="#059669" strokeWidth="3" rx="8"/>
    </svg>
  );
};

export default Logo;
