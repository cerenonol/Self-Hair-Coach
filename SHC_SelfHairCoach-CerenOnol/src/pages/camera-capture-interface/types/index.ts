export interface CameraAngle {
  id: string;
  name: string;
  displayName: string;
  description: string;
  svgOverlay: string;
  instructions: string[];
}

export interface AIAgent {
  id: string;
  name: string;
  icon: string;
  status: 'inactive' | 'processing' | 'active';
  description: string;
}

export interface CaptureSession {
  guestId: string;
  currentAngleIndex: number;
  capturedPhotos: CapturedPhoto[];
  isCapturing: boolean;
  countdown: number | null;
}

export interface CapturedPhoto {
  angleId: string;
  blob: Blob;
  timestamp: Date;
  uploadStatus: 'pending' | 'uploading' | 'completed' | 'failed';
}

export interface CameraSettings {
  facingMode: 'user' | 'environment';
  isActive: boolean;
  stream: MediaStream | null;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  duration: number;
}