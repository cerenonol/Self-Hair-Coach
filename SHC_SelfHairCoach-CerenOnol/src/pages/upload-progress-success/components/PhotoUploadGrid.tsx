import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import { PhotoUpload } from '../types';

interface PhotoUploadGridProps {
  photos: PhotoUpload[];
  className?: string;
}

const PhotoUploadGrid = ({ photos, className = '' }: PhotoUploadGridProps) => {
  const getStatusIcon = (status: PhotoUpload['status']) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'uploading':
        return 'Upload';
      case 'error':
        return 'XCircle';
      case 'pending':
      default:
        return 'Clock';
    }
  };

  const getStatusColor = (status: PhotoUpload['status']) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success)';
      case 'uploading':
        return 'var(--color-primary)';
      case 'error':
        return 'var(--color-error)';
      case 'pending':
      default:
        return 'var(--color-text-secondary)';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Yüklenen Fotoğraflar
        </h3>
        <span className="text-sm text-text-secondary">
          {photos.filter(p => p.status === 'completed').length} / {photos.length} Tamamlandı
        </span>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative bg-surface rounded-lg border border-border overflow-hidden"
          >
            <div className="aspect-square relative">
              <Image
                src={photo.thumbnailUrl}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
              
              {/* Upload Progress Overlay */}
              {photo.status === 'uploading' && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <span className="text-xs text-foreground font-medium">
                      {photo.uploadProgress}%
                    </span>
                  </div>
                </div>
              )}
              
              {/* Status Icon */}
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-background/90 rounded-full flex items-center justify-center">
                  <Icon
                    name={getStatusIcon(photo.status)}
                    size={14}
                    color={getStatusColor(photo.status)}
                  />
                </div>
              </div>
            </div>
            
            <div className="p-3">
              <h4 className="text-sm font-medium text-foreground truncate">
                {photo.angleNameTurkish}
              </h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-text-secondary">
                  {formatFileSize(photo.fileSize)}
                </span>
                {photo.status === 'uploading' && (
                  <span className="text-xs text-primary font-medium">
                    Yükleniyor...
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile List Layout */}
      <div className="md:hidden space-y-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="flex items-center space-x-3 bg-surface rounded-lg border border-border p-3"
          >
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={photo.thumbnailUrl}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
              
              {photo.status === 'uploading' && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {photo.angleNameTurkish}
                </h4>
                <Icon
                  name={getStatusIcon(photo.status)}
                  size={16}
                  color={getStatusColor(photo.status)}
                />
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-text-secondary">
                  {formatFileSize(photo.fileSize)}
                </span>
                {photo.status === 'uploading' && (
                  <span className="text-xs text-primary font-medium">
                    {photo.uploadProgress}%
                  </span>
                )}
              </div>
              
              {/* Progress Bar for Mobile */}
              {photo.status === 'uploading' && (
                <div className="mt-2 w-full bg-muted rounded-full h-1">
                  <div
                    className="bg-primary h-1 rounded-full transition-all duration-300"
                    style={{ width: `${photo.uploadProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUploadGrid;