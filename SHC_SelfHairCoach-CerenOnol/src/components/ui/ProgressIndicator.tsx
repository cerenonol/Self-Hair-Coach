import React from 'react';
import { useLocation } from 'react-router-dom';

interface ProgressStep {
  id: string;
  route: string;
  labelTurkish: string;
  labelShort: string;
  stepNumber: number;
}

interface ProgressIndicatorProps {
  className?: string;
}

const ProgressIndicator = ({ className = '' }: ProgressIndicatorProps) => {
  const location = useLocation();

  const steps: ProgressStep[] = [
    {
      id: 'landing',
      route: '/landing-screen',
      labelTurkish: 'Başlangıç',
      labelShort: 'Başla',
      stepNumber: 1,
    },
    {
      id: 'onboarding',
      route: '/onboarding-guide',
      labelTurkish: 'Rehber',
      labelShort: 'Rehber',
      stepNumber: 2,
    },
    {
      id: 'capture',
      route: '/camera-capture-interface',
      labelTurkish: 'Fotoğraf Çekimi',
      labelShort: 'Çekim',
      stepNumber: 3,
    },
    {
      id: 'success',
      route: '/upload-progress-success',
      labelTurkish: 'Tamamlandı',
      labelShort: 'Bitti',
      stepNumber: 4,
    },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.route === location.pathname);
  };

  const currentStepIndex = getCurrentStepIndex();
  const currentStep = currentStepIndex >= 0 ? currentStepIndex + 1 : 1;

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className={`fixed top-16 left-0 right-0 z-90 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}>
      <div className="px-4 py-3">
        {/* Mobile Progress Bar */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Adım {currentStep} / {steps.length}
            </span>
            <span className="text-xs text-text-secondary font-mono">
              {Math.round((currentStep / steps.length) * 100)}%
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                        status === 'completed'
                          ? 'bg-success text-success-foreground'
                          : status === 'current' ?'bg-primary text-primary-foreground ring-2 ring-primary/30' :'bg-muted text-muted-foreground'
                      }`}
                    >
                      {status === 'completed' ? '✓' : step.stepNumber}
                    </div>
                    <span className={`text-xs mt-1 ${
                      status === 'current' ? 'text-foreground font-medium' : 'text-text-secondary'
                    }`}>
                      {step.labelShort}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Progress Steps */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              const isLast = index === steps.length - 1;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        status === 'completed'
                          ? 'bg-success text-success-foreground'
                          : status === 'current' ?'bg-primary text-primary-foreground ring-2 ring-primary/30 animate-pulse-gentle' :'bg-muted text-muted-foreground'
                      }`}
                    >
                      {status === 'completed' ? '✓' : step.stepNumber}
                    </div>
                    <div className="ml-3">
                      <div className={`text-sm font-medium ${
                        status === 'current' ? 'text-foreground' : 'text-text-secondary'
                      }`}>
                        {step.labelTurkish}
                      </div>
                      <div className="text-xs text-text-secondary">
                        Adım {step.stepNumber}
                      </div>
                    </div>
                  </div>
                  
                  {!isLast && (
                    <div className="flex-1 mx-4">
                      <div className="h-0.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ease-out ${
                            status === 'completed' ? 'bg-success w-full' : 'bg-transparent w-0'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;