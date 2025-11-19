import React from 'react';
import { CameraAngle } from '../types';
import Icon from '../../../components/AppIcon';

interface AngleInstructionsProps {
  currentAngle: CameraAngle;
  className?: string;
}

const AngleInstructions = ({ currentAngle, className = '' }: AngleInstructionsProps) => {
  return (
    <div className={`bg-black/60 backdrop-blur-sm rounded-lg p-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="Info" size={20} color="var(--color-primary)" />
        <h3 className="text-white text-sm font-medium">Çekim Talimatları</h3>
      </div>

      <div className="space-y-2">
        {currentAngle.instructions.map((instruction, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-primary text-xs font-medium">{index + 1}</span>
            </div>
            <p className="text-white/90 text-xs leading-relaxed">{instruction}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <Icon name="Lightbulb" size={16} color="var(--color-warning)" />
          <p className="text-warning text-xs font-medium">
            İpucu: Yeşil çerçeveyi takip edin ve sabit durun
          </p>
        </div>
      </div>
    </div>
  );
};

export default AngleInstructions;