import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../AppIcon';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface StatusNotificationSystemProps {
  className?: string;
}

const StatusNotificationSystem = ({ className = '' }: StatusNotificationSystemProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration || 5000,
    };

    setNotifications(prev => [...prev, newNotification]);

    if (!notification.persistent && newNotification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
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

  const getNotificationStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/20 text-success-foreground';
      case 'warning':
        return 'bg-warning/10 border-warning/20 text-warning-foreground';
      case 'error':
        return 'bg-error/10 border-error/20 text-error-foreground';
      case 'info':
      default:
        return 'bg-primary/10 border-primary/20 text-primary-foreground';
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'error':
        return 'var(--color-error)';
      case 'info':
      default:
        return 'var(--color-primary)';
    }
  };

  // Expose methods globally for use across the app
  useEffect(() => {
    (window as any).showNotification = addNotification;
    return () => {
      delete (window as any).showNotification;
    };
  }, [addNotification]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className={`fixed top-20 right-4 z-110 space-y-2 max-w-sm w-full ${className}`}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            relative p-4 rounded-lg border backdrop-blur-sm shadow-elevated
            animate-slide-up transition-all duration-300 ease-out
            ${getNotificationStyles(notification.type)}
          `}
        >
          <div className="flex items-start space-x-3">
            <Icon
              name={getNotificationIcon(notification.type)}
              size={20}
              color={getIconColor(notification.type)}
              className="flex-shrink-0 mt-0.5"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">
                    {notification.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    {notification.message}
                  </p>
                </div>
                
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="ml-2 p-1 rounded-md hover:bg-white/10 transition-fast focus-ring"
                  aria-label="Bildirimi kapat"
                >
                  <Icon name="X" size={14} color="var(--color-text-secondary)" />
                </button>
              </div>
              
              {notification.action && (
                <button
                  onClick={notification.action.onClick}
                  className="mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-fast"
                >
                  {notification.action.label}
                </button>
              )}
            </div>
          </div>
          
          {/* Progress bar for timed notifications */}
          {!notification.persistent && notification.duration && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 rounded-b-lg overflow-hidden">
              <div
                className="h-full bg-current opacity-30 animate-pulse"
                style={{
                  animation: `shrink ${notification.duration}ms linear`,
                }}
              />
            </div>
          )}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// Helper functions for easy notification usage
export const showSuccessNotification = (title: string, message: string, options?: Partial<Notification>) => {
  if ((window as any).showNotification) {
    (window as any).showNotification({
      type: 'success',
      title,
      message,
      ...options,
    });
  }
};

export const showWarningNotification = (title: string, message: string, options?: Partial<Notification>) => {
  if ((window as any).showNotification) {
    (window as any).showNotification({
      type: 'warning',
      title,
      message,
      ...options,
    });
  }
};

export const showErrorNotification = (title: string, message: string, options?: Partial<Notification>) => {
  if ((window as any).showNotification) {
    (window as any).showNotification({
      type: 'error',
      title,
      message,
      ...options,
    });
  }
};

export const showInfoNotification = (title: string, message: string, options?: Partial<Notification>) => {
  if ((window as any).showNotification) {
    (window as any).showNotification({
      type: 'info',
      title,
      message,
      ...options,
    });
  }
};

export default StatusNotificationSystem;