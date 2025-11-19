import React from 'react';
import Icon from '../../../components/AppIcon';
import { NextStep } from '../types';

interface AssessmentTimelineProps {
  nextSteps: NextStep[];
  className?: string;
}

const AssessmentTimeline = ({ nextSteps, className = '' }: AssessmentTimelineProps) => {
  const getStepStatusColor = (status: NextStep['status']) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success)';
      case 'in-progress':
        return 'var(--color-primary)';
      case 'pending':
      default:
        return 'var(--color-text-secondary)';
    }
  };

  const getStepBgColor = (status: NextStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 border-success/20';
      case 'in-progress':
        return 'bg-primary/10 border-primary/20';
      case 'pending':
      default:
        return 'bg-muted border-border';
    }
  };

  return (
    <div className={`bg-surface rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Clock" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-semibold text-foreground">
          Değerlendirme Süreci
        </h3>
      </div>

      <div className="space-y-4">
        {nextSteps.map((step, index) => {
          const isLast = index === nextSteps.length - 1;
          
          return (
            <div key={step.id} className="relative">
              <div className="flex items-start space-x-4">
                {/* Timeline Icon */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStepBgColor(step.status)}`}
                    style={{ borderColor: getStepStatusColor(step.status) }}
                  >
                    <Icon
                      name={step.iconName}
                      size={18}
                      color={getStepStatusColor(step.status)}
                    />
                  </div>
                  
                  {/* Timeline Line */}
                  {!isLast && (
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-border" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground">
                      {step.title}
                    </h4>
                    <span className="text-xs text-text-secondary font-mono">
                      {step.estimatedTime}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Status Badge */}
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        step.status === 'completed'
                          ? 'bg-success/10 text-success border border-success/20'
                          : step.status === 'in-progress' ?'bg-primary/10 text-primary border border-primary/20 animate-pulse-gentle' :'bg-muted text-text-secondary border border-border'
                      }`}
                    >
                      {step.status === 'completed' && '✓ Tamamlandı'}
                      {step.status === 'in-progress' && '⏳ İşleniyor'}
                      {step.status === 'pending' && '⏸️ Beklemede'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expected Results Info */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Sonuçlarınız Hakkında
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Uzman doktorlarımız fotoğraflarınızı analiz ederek kişiselleştirilmiş saç ekimi önerileri hazırlayacak. 
              Detaylı rapor ve tedavi seçenekleri e-posta adresinize gönderilecektir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentTimeline;