import React, { useEffect } from 'react';
import { ToastMessage } from '../types';
import Icon from '../../../components/AppIcon';

interface ToastNotificationProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
  className?: string;
}

const ToastNotification = ({ toast, onDismiss, className = '' }: ToastNotificationProps) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onDismiss();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  if (!toast) return null;

  const getToastIcon = (type: ToastMessage['type']) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      case 'info':
      default:
        return 'Info';
    }
  };

  const getToastStyles = (type: ToastMessage['type']) => {
    switch (type) {
      case 'success':
        return 'bg-success/90 border-success text-success-foreground';
      case 'warning':
        return 'bg-warning/90 border-warning text-warning-foreground';
      case 'error':
        return 'bg-error/90 border-error text-error-foreground';
      case 'info':
      default:
        return 'bg-primary/90 border-primary text-primary-foreground';
    }
  };

  return (
    <div className={`fixed top-20 left-4 right-4 z-100 ${className}`}>
      <div
        className={`
          p-4 rounded-lg border backdrop-blur-sm shadow-elevated
          animate-slide-down transition-all duration-300
          ${getToastStyles(toast.type)}
        `}
      >
        <div className="flex items-start space-x-3">
          <Icon
            name={getToastIcon(toast.type)}
            size={20}
            color="currentColor"
            className="flex-shrink-0 mt-0.5"
          />
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm mb-1">
              {toast.title}
            </h4>
            <p className="text-sm opacity-90 leading-relaxed">
              {toast.message}
            </p>
          </div>
          
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 rounded-md hover:bg-white/10 transition-fast"
            aria-label="Bildirimi kapat"
          >
            <Icon name="X" size={16} color="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;