import React from 'react';
import Icon from '../../../components/AppIcon';
import { AssessmentStep } from '../types';

interface AssessmentProcessProps {
  steps: AssessmentStep[];
}

const AssessmentProcess = ({ steps }: AssessmentProcessProps) => {
  return (
    <div className="px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Nasıl Çalışır?
        </h2>
        <p className="text-text-secondary">
          Basit adımlarla profesyonel saç analizi
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step Card */}
              <div className="bg-surface rounded-xl p-6 text-center clinical-border shadow-subtle hover:shadow-elevated transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon 
                      name={step.icon as any} 
                      size={24} 
                      color="var(--color-primary)" 
                    />
                  </div>
                </div>
                
                <h3 className="text-sm font-medium text-foreground mb-2">
                  {step.title}
                </h3>
                
                <p className="text-xs text-text-secondary leading-relaxed">
                  {step.description}
                </p>
                
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>

              {/* Connector Arrow (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <Icon 
                    name="ArrowRight" 
                    size={20} 
                    color="var(--color-primary)" 
                    className="opacity-60"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Process Benefits */}
      <div className="mt-12 bg-surface/50 rounded-xl p-6 clinical-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mb-3">
              <Icon name="Clock" size={20} color="var(--color-success)" />
            </div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              5 Dakikada Tamamla
            </h4>
            <p className="text-xs text-text-secondary">
              Hızlı ve kolay fotoğraf çekimi
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Icon name="Shield" size={20} color="var(--color-primary)" />
            </div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Güvenli & Gizli
            </h4>
            <p className="text-xs text-text-secondary">
              Verileriniz güvenli şekilde korunur
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-3">
              <Icon name="Zap" size={20} color="var(--color-accent)" />
            </div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              AI Destekli
            </h4>
            <p className="text-xs text-text-secondary">
              Yapay zeka rehberliği ile optimal sonuç
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentProcess;