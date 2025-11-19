import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

interface ContextualActionBarProps {
  className?: string;
  loading?: boolean;
  onAction?: () => void;
  disabled?: boolean;
}

const ContextualActionBar = ({ 
  className = '', 
  loading = false, 
  onAction,
  disabled = false 
}: ContextualActionBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActionConfig = () => {
    switch (location.pathname) {
      case '/landing-screen':
        return {
          primary: {
            label: 'Analizi Başlat',
            variant: 'default' as const,
            iconName: 'Camera',
            action: () => navigate('/onboarding-guide'),
          },
          secondary: null,
        };
      
      case '/onboarding-guide':
        return {
          primary: {
            label: 'Devam Et',
            variant: 'default' as const,
            iconName: 'ArrowRight',
            action: () => navigate('/camera-capture-interface'),
          },
          secondary: {
            label: 'Geri',
            variant: 'outline' as const,
            iconName: 'ArrowLeft',
            action: () => navigate('/landing-screen'),
          },
        };
      
      case '/camera-capture-interface':
        return {
          primary: {
            label: 'Fotoğraf Çek',
            variant: 'default' as const,
            iconName: 'Camera',
            action: onAction || (() => {}),
          },
          secondary: {
            label: 'Tekrar Çek',
            variant: 'outline' as const,
            iconName: 'RotateCcw',
            action: onAction || (() => {}),
          },
        };
      
      case '/upload-progress-success':
        return {
          primary: {
            label: 'Tamamla',
            variant: 'success' as const,
            iconName: 'Check',
            action: () => navigate('/landing-screen'),
          },
          secondary: null,
        };
      
      default:
        return {
          primary: null,
          secondary: null,
        };
    }
  };

  const { primary, secondary } = getActionConfig();

  if (!primary && !secondary) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-80 bg-background/95 backdrop-blur-sm border-t border-border ${className}`}>
      <div className="px-4 py-4 pb-6">
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 md:justify-center">
          {/* Secondary Action (Desktop: Left, Mobile: Top) */}
          {secondary && (
            <Button
              variant={secondary.variant}
              iconName={secondary.iconName}
              iconPosition="left"
              onClick={secondary.action}
              disabled={disabled}
              className="w-full md:w-auto md:min-w-[140px]"
            >
              {secondary.label}
            </Button>
          )}
          
          {/* Primary Action */}
          {primary && (
            <Button
              variant={primary.variant}
              iconName={primary.iconName}
              iconPosition="right"
              onClick={primary.action}
              loading={loading}
              disabled={disabled}
              className="w-full md:w-auto md:min-w-[160px]"
            >
              {primary.label}
            </Button>
          )}
        </div>
        
        {/* Progress Hint */}
        {location.pathname === '/camera-capture-interface' && (
          <div className="mt-3 text-center">
            <p className="text-xs text-text-secondary">
              AI rehberlik sistemi aktif • Optimal açı için yönergeleri takip edin
            </p>
          </div>
        )}
        
        {/* Upload Progress */}
        {location.pathname === '/upload-progress-success' && (
          <div className="mt-3 text-center">
            <p className="text-xs text-text-secondary">
              Analiziniz başarıyla tamamlandı • Sonuçlar e-posta ile gönderilecek
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContextualActionBar;