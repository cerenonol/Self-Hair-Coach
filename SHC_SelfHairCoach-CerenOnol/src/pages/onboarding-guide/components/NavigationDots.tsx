import React from 'react';
import { NavigationDotsProps } from '../types';

const NavigationDots = ({ total, current, onDotClick, className = '' }: NavigationDotsProps) => {
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`
            w-2 h-2 rounded-full transition-all duration-300 ease-out focus-ring
            ${index === current 
              ? 'bg-primary w-6' :'bg-muted hover:bg-muted-foreground/30'
            }
          `}
          aria-label={`${index + 1}. ipucuna git`}
        />
      ))}
    </div>
  );
};

export default NavigationDots;