import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { ClinicInfo } from '../types';

interface HeroSectionProps {
  clinic: ClinicInfo;
}

const HeroSection = ({ clinic }: HeroSectionProps) => {
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    navigate('/onboarding-guide');
  };

  return (
    <div className="text-center px-4 py-8">
      {/* Logo Section */}
      <div className="mb-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              <defs>
                <linearGradient id="heroLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#007AFF" />
                  <stop offset="30%" stopColor="#10B981" />
                  <stop offset="70%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#007AFF" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Outer Circle */}
              <circle
                cx="40"
                cy="40"
                r="38"
                fill="url(#heroLogoGradient)"
                filter="url(#glow)"
                className="animate-pulse-gentle"
              />
              
              {/* Inner H Shape with Bridge */}
              <g fill="white">
                {/* Left pillar */}
                <rect x="20" y="20" width="6" height="40" rx="3" />
                {/* Right pillar */}
                <rect x="54" y="20" width="6" height="40" rx="3" />
                {/* Bridge with smile curve */}
                <path d="M26 35 Q40 30 54 35 Q40 45 26 35 Z" />
                {/* Hair strands */}
                <path d="M30 22 Q35 18 40 22 Q45 18 50 22" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M28 26 Q35 22 42 26" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          {clinic.name}
        </h1>
        <p className="text-lg text-text-secondary font-medium">
          {clinic.slogan}
        </p>
      </div>

      {/* Description */}
      <div className="mb-8 max-w-2xl mx-auto">
        <p className="text-base text-text-secondary leading-relaxed">
          {clinic.description}
        </p>
      </div>

      {/* Primary CTA */}
      <div className="mb-6">
        <Button
          variant="default"
          size="lg"
          iconName="Camera"
          iconPosition="right"
          onClick={handleStartAnalysis}
          className="w-full max-w-sm mx-auto h-14 text-lg font-semibold shadow-elevated"
        >
          Analize Başla
        </Button>
      </div>

      {/* Secondary Info */}
      <div className="text-center">
        <p className="text-sm text-text-secondary">
          5 açıdan fotoğraf çekimi ile profesyonel saç analizi
        </p>
        <p className="text-xs text-text-secondary mt-1">
          AI rehberlik sistemi ile kolay ve hızlı değerlendirme
        </p>
      </div>
    </div>
  );
};

export default HeroSection;