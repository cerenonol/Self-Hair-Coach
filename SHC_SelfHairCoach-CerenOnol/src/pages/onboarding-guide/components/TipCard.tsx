import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import { TipCardProps } from '../types';

const TipCard = ({ tip, isActive, className = '' }: TipCardProps) => {
  return (
    <div className={`
      flex-shrink-0 w-full px-4 transition-all duration-500 ease-out
      ${isActive ? 'opacity-100 scale-100' : 'opacity-60 scale-95'}
      ${className}
    `}>
      <div className="bg-surface rounded-2xl p-6 shadow-elevated clinical-border">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon 
              name={tip.icon as any} 
              size={24} 
              color="var(--color-primary)" 
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {tip.angle}
            </h3>
            <p className="text-sm text-text-secondary">
              {tip.title}
            </p>
          </div>
        </div>

        {/* Visual Guide */}
        <div className="relative mb-6 overflow-hidden rounded-xl">
          <Image
            src={tip.image}
            alt={tip.alt}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-sm text-text-secondary leading-relaxed">
            {tip.description}
          </p>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mr-2" />
            Doğru Teknik
          </h4>
          <ul className="space-y-2">
            {tip.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                <span className="text-xs text-text-secondary leading-relaxed">
                  {instruction}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Common Mistakes */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mr-2" />
            Kaçınılması Gerekenler
          </h4>
          <ul className="space-y-2">
            {tip.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0" />
                <span className="text-xs text-text-secondary leading-relaxed">
                  {mistake}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TipCard;