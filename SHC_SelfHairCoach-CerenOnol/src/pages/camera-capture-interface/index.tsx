import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import StatusNotificationSystem from '../../components/ui/StatusNotificationSystem';
import CameraPreview from './components/CameraPreview';
import AIAgentHUD from './components/AIAgentHUD';
import CaptureControls from './components/CaptureControls';
import AngleInstructions from './components/AngleInstructions';
import ToastNotification from './components/ToastNotification';
import { 
  CameraAngle, 
  AIAgent, 
  CaptureSession, 
  CapturedPhoto, 
  CameraSettings, 
  ToastMessage 
} from './types';

const CameraCaptureInterface = () => {
  const navigate = useNavigate();

  // Mock data for camera angles
  const cameraAngles: CameraAngle[] = [
    {
      id: 'angle-1',
      name: 'front',
      displayName: 'Tam Yüz',
      description: 'Yüzünüzü kameraya doğru çevirin',
      instructions: [
        'Kameraya doğru bakın ve başınızı dik tutun',
        'Saçınızın tamamı görünecek şekilde pozisyon alın',
        'Yeşil çerçeveyi yüzünüzle hizalayın',
        'Işık kaynağının önünüzde olmasına dikkat edin'
      ],
      svgOverlay: `
        <svg width="200" height="240" viewBox="0 0 200 240" fill="none">
          <ellipse cx="100" cy="120" rx="80" ry="100" stroke="#10B981" stroke-width="2" stroke-dasharray="5,5" fill="none" opacity="0.8"/>
          <circle cx="75" cy="100" r="3" fill="#10B981"/>
          <circle cx="125" cy="100" r="3" fill="#10B981"/>
          <path d="M85 130 Q100 140 115 130" stroke="#10B981" stroke-width="2" fill="none"/>
        </svg>
      `
    },
    {
      id: 'angle-2',
      name: 'right-45',
      displayName: '45° Sağ',
      description: 'Başınızı sağa 45 derece çevirin',
      instructions: [
        'Başınızı sağa doğru 45 derece çevirin',
        'Sağ kulağınız görünür olmalı',
        'Saç çizginiz net bir şekilde görünmeli',
        'Profil ve ön yüz arasında dengeli pozisyon'
      ],
      svgOverlay: `
        <svg width="200" height="240" viewBox="0 0 200 240" fill="none">
          <ellipse cx="120" cy="120" rx="70" ry="100" stroke="#10B981" stroke-width="2" stroke-dasharray="5,5" fill="none" transform="rotate(15 120 120)"/>
          <circle cx="140" cy="100" r="3" fill="#10B981"/>
          <path d="M130 130 Q140 135 150 130" stroke="#10B981" stroke-width="2" fill="none"/>
        </svg>
      `
    },
    {
      id: 'angle-3',
      name: 'left-45',
      displayName: '45° Sol',
      description: 'Başınızı sola 45 derece çevirin',
      instructions: [
        'Başınızı sola doğru 45 derece çevirin',
        'Sol kulağınız görünür olmalı',
        'Saç çizginiz net bir şekilde görünmeli',
        'Profil ve ön yüz arasında dengeli pozisyon'
      ],
      svgOverlay: `
        <svg width="200" height="240" viewBox="0 0 200 240" fill="none">
          <ellipse cx="80" cy="120" rx="70" ry="100" stroke="#10B981" stroke-width="2" stroke-dasharray="5,5" fill="none" transform="rotate(-15 80 120)"/>
          <circle cx="60" cy="100" r="3" fill="#10B981"/>
          <path d="M50 130 Q60 135 70 130" stroke="#10B981" stroke-width="2" fill="none"/>
        </svg>
      `
    },
    {
      id: 'angle-4',
      name: 'vertex',
      displayName: 'Tepe/Vertex',
      description: 'Başınızı öne eğin, tepe kısmı görünsün',
      instructions: [
        'Başınızı hafifçe öne doğru eğin',
        'Saçınızın tepe kısmı net görünmeli',
        'Vertex bölgesi tam ortada olmalı',
        'Çok fazla eğmeyin, yüzünüz de görünmeli'
      ],
      svgOverlay: `
        <svg width="200" height="240" viewBox="0 0 200 240" fill="none">
          <ellipse cx="100" cy="100" rx="90" ry="80" stroke="#10B981" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
          <circle cx="100" cy="80" r="4" fill="#10B981"/>
          <path d="M70 90 Q100 70 130 90" stroke="#10B981" stroke-width="2" fill="none"/>
        </svg>
      `
    },
    {
      id: 'angle-5',
      name: 'donor',
      displayName: 'Ense/Donör',
      description: 'Başınızı arkaya çevirin, ense görünsün',
      instructions: [
        'Başınızı arkaya doğru çevirin',
        'Ense bölgesi net görünmeli',
        'Donör alan tam ortada olmalı',
        'Boyun ve saç sınırı görünür olmalı'
      ],
      svgOverlay: `
        <svg width="200" height="240" viewBox="0 0 200 240" fill="none">
          <ellipse cx="100" cy="140" rx="80" ry="90" stroke="#10B981" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
          <path d="M60 120 Q100 100 140 120" stroke="#10B981" stroke-width="2" fill="none"/>
          <circle cx="100" cy="160" r="3" fill="#10B981"/>
        </svg>
      `
    }
  ];

  // Mock AI agents
  const aiAgents: AIAgent[] = [
    {
      id: 'vision',
      name: 'Görüş Analizi',
      icon: '👁️',
      status: 'inactive',
      description: 'Yüz tanıma ve pozisyon kontrolü'
    },
    {
      id: 'pose',
      name: 'Poz Kontrolü',
      icon: '📐',
      status: 'inactive',
      description: 'Açı ve duruş doğrulaması'
    },
    {
      id: 'lighting',
      name: 'Işık Analizi',
      icon: '💡',
      status: 'inactive',
      description: 'Aydınlatma kalitesi kontrolü'
    },
    {
      id: 'quality',
      name: 'Kalite Kontrolü',
      icon: '✅',
      status: 'inactive',
      description: 'Genel fotoğraf kalitesi'
    }
  ];

  // State management
  const [cameraSettings, setCameraSettings] = useState<CameraSettings>({
    facingMode: 'user',
    isActive: false,
    stream: null
  });

  const [captureSession, setCaptureSession] = useState<CaptureSession>({
    guestId: `guest_${Date.now()}`,
    currentAngleIndex: 0,
    capturedPhotos: [],
    isCapturing: false,
    countdown: null
  });

  const [allAgentsActive, setAllAgentsActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Safe current angle access with bounds checking
  const currentAngle = cameraAngles[captureSession.currentAngleIndex] || cameraAngles[0];

  // Initialize camera on mount
  useEffect(() => {
    setCameraSettings(prev => ({ ...prev, isActive: true }));
  }, []);

  // Handle stream ready
  const handleStreamReady = useCallback((stream: MediaStream) => {
    setCameraSettings(prev => ({ ...prev, stream }));
  }, []);

  // Handle camera error
  const handleCameraError = useCallback((error: string) => {
    showToast('error', 'Kamera Hatası', error);
  }, []);

  // Toggle camera facing mode
  const handleToggleCamera = useCallback(() => {
    setCameraSettings(prev => ({
      ...prev,
      facingMode: prev.facingMode === 'user' ? 'environment' : 'user'
    }));
    setAllAgentsActive(false);
  }, []);

  // Handle all agents active
  const handleAllAgentsActive = useCallback(() => {
    setAllAgentsActive(true);
    
    // Auto capture after 2 seconds
    setTimeout(() => {
      if (!captureSession.isCapturing) {
        handleCapture();
      }
    }, 2000);
  }, [captureSession.isCapturing]);

  // Handle photo capture
  const handleCapture = useCallback(async () => {
    if (!cameraSettings.stream || captureSession.isCapturing || !currentAngle) return;

    setCaptureSession(prev => ({ ...prev, isCapturing: true }));
    
    // Countdown animation
    for (let i = 3; i > 0; i--) {
      setCountdown(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setCountdown(null);

    try {
      // Simulate photo capture
      const canvas = document.createElement('canvas');
      const video = document.querySelector('video');
      
      if (video && currentAngle?.id) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob && currentAngle?.id) {
            const newPhoto: CapturedPhoto = {
              angleId: currentAngle.id,
              blob,
              timestamp: new Date(),
              uploadStatus: 'pending'
            };

            setCaptureSession(prev => ({
              ...prev,
              capturedPhotos: [...prev.capturedPhotos.filter(p => p.angleId !== currentAngle.id), newPhoto],
              isCapturing: false
            }));

            // Show success toast
            showToast('success', 'Fotoğraf Başarılı!', `${currentAngle.displayName} açısı başarıyla çekildi.`);

            // Move to next angle or complete
            setTimeout(() => {
              if (captureSession.currentAngleIndex < cameraAngles.length - 1) {
                setCaptureSession(prev => ({
                  ...prev,
                  currentAngleIndex: prev.currentAngleIndex + 1
                }));
                setAllAgentsActive(false);
              } else {
                // All photos captured, navigate to success
                navigate('/upload-progress-success');
              }
            }, 2000);
          }
        }, 'image/jpeg', 0.8);
      }
    } catch (error) {
      console.error('Capture error:', error);
      showToast('error', 'Çekim Hatası', 'Fotoğraf çekilemedi. Lütfen tekrar deneyin.');
      setCaptureSession(prev => ({ ...prev, isCapturing: false }));
    }
  }, [cameraSettings.stream, captureSession.isCapturing, currentAngle, captureSession.currentAngleIndex, navigate, cameraAngles.length]);

  // Handle retake
  const handleRetake = useCallback(() => {
    if (!currentAngle?.id) return;
    
    setCaptureSession(prev => ({
      ...prev,
      capturedPhotos: prev.capturedPhotos.filter(p => p.angleId !== currentAngle.id)
    }));
    setAllAgentsActive(false);
    showToast('info', 'Tekrar Çekim', 'Bu açı için yeni fotoğraf çekebilirsiniz.');
  }, [currentAngle?.id]);

  // Show toast notification
  const showToast = useCallback((type: ToastMessage['type'], title: string, message: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}`,
      type,
      title,
      message,
      duration: 4000
    };
    setToast(newToast);
  }, []);

  // Dismiss toast
  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  // Early return if no current angle is available
  if (!currentAngle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-lg">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator />
      <StatusNotificationSystem />
      
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Camera Preview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <div className="aspect-[4/3] bg-black rounded-lg overflow-hidden">
                <CameraPreview
                  settings={cameraSettings}
                  currentAngle={currentAngle}
                  onStreamReady={handleStreamReady}
                  onError={handleCameraError}
                />
              </div>
            </div>

            {/* AI Agent HUD */}
            <div className="space-y-4">
              <AIAgentHUD
                agents={aiAgents}
                onAllAgentsActive={handleAllAgentsActive}
                isCapturing={captureSession.isCapturing}
              />
              
              <AngleInstructions currentAngle={currentAngle} />
            </div>
          </div>

          {/* Capture Controls */}
          <div className="max-w-2xl mx-auto">
            <CaptureControls
              settings={cameraSettings}
              session={captureSession}
              countdown={countdown}
              canCapture={allAgentsActive}
              onToggleCamera={handleToggleCamera}
              onRetake={handleRetake}
              onManualCapture={handleCapture}
            />
          </div>
        </div>
      </main>

      <ContextualActionBar
        loading={captureSession.isCapturing}
        onAction={handleCapture}
        disabled={!allAgentsActive}
      />

      <ToastNotification
        toast={toast}
        onDismiss={dismissToast}
      />
    </div>
  );
};

export default CameraCaptureInterface;