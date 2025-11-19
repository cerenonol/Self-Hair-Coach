export interface PhotoUpload {
  id: string;
  angleName: string;
  angleNameTurkish: string;
  fileName: string;
  thumbnailUrl: string;
  uploadProgress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  fileSize: number;
  uploadedAt?: Date;
  alt: string;
}

export interface AssessmentData {
  id: string;
  guestId: string;
  createdAt: Date;
  status: 'processing' | 'completed' | 'error';
  totalPhotos: number;
  completedPhotos: number;
  estimatedProcessingTime: number;
  clinicNotified: boolean;
}

export interface UploadStats {
  totalFiles: number;
  completedFiles: number;
  totalSize: number;
  uploadedSize: number;
  overallProgress: number;
  estimatedTimeRemaining: number;
  uploadSpeed: number;
}

export interface SecurityBadge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  verified: boolean;
}

export interface NextStep {
  id: string;
  title: string;
  description: string;
  iconName: string;
  estimatedTime: string;
  status: 'pending' | 'in-progress' | 'completed';
}