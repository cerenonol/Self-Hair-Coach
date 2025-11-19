import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/landing-screen':
        return 'Saç Analizi Başlat';
      case '/onboarding-guide':
        return 'Rehber';
      case '/camera-capture-interface':
        return 'Fotoğraf Çekimi';
      case '/upload-progress-success':
        return 'Tamamlandı';
      default:
        return 'Self Hair Coach';
    }
  };

  const showBackButton = () => {
    return !['/landing-screen', '/upload-progress-success'].includes(location.pathname);
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}>
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {/* Metallic Gradient Logo */}
            <div className="relative">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-sm"
              >
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#007AFF" />
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#22C55E" />
                  </linearGradient>
                </defs>
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="url(#logoGradient)"
                  className="animate-pulse-gentle"
                />
                <path
                  d="M12 10c2-2 6-2 8 0M12 14c1.5-1 4.5-1 6 0M12 18c1-0.5 3-0.5 4 0"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground leading-none">
                Self Hair Coach
              </span>
              <span className="text-xs text-text-secondary leading-none">
                Smile Hair Clinic
              </span>
            </div>
          </div>
        </div>

        {/* Center Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-base font-medium text-foreground">
            {getPageTitle()}
          </h1>
        </div>

        {/* Action Section */}
        <div className="flex items-center space-x-2">
          {showBackButton() && (
            <button
              onClick={handleBackClick}
              className="p-2 rounded-lg bg-surface hover:bg-surface/80 transition-fast focus-ring"
              aria-label="Geri dön"
            >
              <Icon name="ArrowLeft" size={20} color="var(--color-foreground)" />
            </button>
          )}
          
          {/* Status Indicator */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-gentle"></div>
            <span className="text-xs text-text-secondary font-mono">
              AI Aktif
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;