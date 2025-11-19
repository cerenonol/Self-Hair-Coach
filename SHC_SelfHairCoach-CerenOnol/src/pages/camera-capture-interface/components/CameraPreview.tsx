import React, { useRef, useEffect, useState } from 'react';
import { CameraSettings, CameraAngle } from '../types';
import Icon from '../../../components/AppIcon';

interface CameraPreviewProps {
  settings: CameraSettings;
  currentAngle: CameraAngle;
  onStreamReady: (stream: MediaStream) => void;
  onError: (error: string) => void;
  className?: string;
}

const CameraPreview = ({ 
  settings, 
  currentAngle, 
  onStreamReady, 
  onError,
  className = '' 
}: CameraPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        setIsLoading(true);
        
        if (settings.stream) {
          settings.stream.getTracks().forEach(track => track.stop());
        }

        const constraints = {
          video: {
            facingMode: settings.facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          onStreamReady(stream);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Camera initialization error:', error);
        onError('Kamera erişimi sağlanamadı. Lütfen kamera izinlerini kontrol edin.');
        setIsLoading(false);
      }
    };

    if (settings.isActive) {
      initializeCamera();
    }

    return () => {
      if (settings.stream) {
        settings.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [settings.facingMode, settings.isActive]);

  return (
    <div className={`relative w-full h-full bg-black rounded-lg overflow-hidden ${className}`}>
      {/* Video Preview */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
        style={{ transform: settings.facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin mb-4">
              <Icon name="Camera" size={48} color="var(--color-primary)" />
            </div>
            <p className="text-white text-sm">Kamera başlatılıyor...</p>
          </div>
        </div>
      )}

      {/* SVG Overlay Guide */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="opacity-60"
          dangerouslySetInnerHTML={{ __html: currentAngle.svgOverlay }}
        />
      </div>

      {/* Angle Information */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
        <h3 className="text-white text-sm font-medium">{currentAngle.displayName}</h3>
        <p className="text-white/80 text-xs">{currentAngle.description}</p>
      </div>

      {/* Camera Mode Indicator */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="flex items-center space-x-2">
          <Icon 
            name={settings.facingMode === 'user' ? 'User' : 'Camera'} 
            size={16} 
            color="white" 
          />
          <span className="text-white text-xs">
            {settings.facingMode === 'user' ? 'Ön Kamera' : 'Arka Kamera'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CameraPreview;