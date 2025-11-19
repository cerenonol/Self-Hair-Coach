import React from 'react';
import { CameraSettings, CaptureSession } from '../types';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

interface CaptureControlsProps {
  settings: CameraSettings;
  session: CaptureSession;
  countdown: number | null;
  canCapture: boolean;
  onToggleCamera: () => void;
  onRetake: () => void;
  onManualCapture: () => void;
  className?: string;
}

const CaptureControls = ({
  settings,
  session,
  countdown,
  canCapture,
  onToggleCamera,
  onRetake,
  onManualCapture,
  className = ''
}: CaptureControlsProps) => {
  const isLastPhoto = session.currentAngleIndex === 4; // 5 photos total (0-4)
  const hasCurrentPhoto = session.capturedPhotos.some(
    photo => photo.angleId === `angle-${session.currentAngleIndex + 1}`
  );

  return (
    <div className={`bg-black/60 backdrop-blur-sm rounded-lg p-4 ${className}`}>
      {/* Countdown Overlay */}
      {countdown !== null && countdown > 0 && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 rounded-lg">
          <div className="text-center">
            <div className="text-6xl font-bold text-white mb-2 animate-bounce">
              {countdown}
            </div>
            <p className="text-white/80 text-sm">Fotoğraf çekiliyor...</p>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-sm font-medium">
            Fotoğraf {session.currentAngleIndex + 1} / 5
          </span>
          <span className="text-white/60 text-xs">
            {Math.round(((session.currentAngleIndex + (hasCurrentPhoto ? 1 : 0)) / 5) * 100)}% tamamlandı
          </span>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-success h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${((session.currentAngleIndex + (hasCurrentPhoto ? 1 : 0)) / 5) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Camera Toggle */}
        <Button
          variant="outline"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onToggleCamera}
          disabled={session.isCapturing}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          Kamerayı Çevir
        </Button>

        {/* Manual Capture */}
        <Button
          variant={canCapture ? "default" : "outline"}
          iconName="Camera"
          iconPosition="left"
          onClick={onManualCapture}
          disabled={session.isCapturing || !canCapture}
          className={canCapture 
            ? "bg-primary hover:bg-primary/80" :"bg-white/10 border-white/20 text-white/60"
          }
        >
          {canCapture ? 'Çek' : 'Bekleyin'}
        </Button>
      </div>

      {/* Retake Button (if photo exists) */}
      {hasCurrentPhoto && (
        <div className="mb-4">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onRetake}
            disabled={session.isCapturing}
            fullWidth
            className="bg-warning/10 border-warning/20 text-warning hover:bg-warning/20"
          >
            Bu Açıyı Tekrar Çek
          </Button>
        </div>
      )}

      {/* Status Information */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/60">Kamera Durumu:</span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              settings.isActive ? 'bg-success animate-pulse-gentle' : 'bg-error'
            }`} />
            <span className="text-white">
              {settings.isActive ? 'Aktif' : 'Kapalı'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-white/60">AI Analiz:</span>
          <div className="flex items-center space-x-1">
            <Icon name="Cpu" size={12} color="var(--color-success)" />
            <span className="text-success">Çalışıyor</span>
          </div>
        </div>

        {canCapture && (
          <div className="flex items-center justify-center mt-3 p-2 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mr-2" />
            <span className="text-success text-xs font-medium">
              Otomatik çekim hazır - Pozisyonunuzu koruyun
            </span>
          </div>
        )}
      </div>

      {/* Next Step Hint */}
      {!isLastPhoto && hasCurrentPhoto && (
        <div className="mt-3 p-2 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center">
            <Icon name="ArrowRight" size={16} color="var(--color-primary)" className="mr-2" />
            <span className="text-primary text-xs">
              Sonraki açıya geçmek için devam edin
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptureControls;