import React from 'react';
import Icon from '../../../components/AppIcon';
import { UploadStats } from '../types';

interface OverallProgressIndicatorProps {
  stats: UploadStats;
  className?: string;
}

const OverallProgressIndicator = ({ stats, className = '' }: OverallProgressIndicatorProps) => {
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)} saniye`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatSpeed = (bytesPerSecond: number) => {
    if (bytesPerSecond < 1024) return `${Math.round(bytesPerSecond)} B/s`;
    if (bytesPerSecond < 1024 * 1024) return `${Math.round(bytesPerSecond / 1024)} KB/s`;
    return `${(bytesPerSecond / (1024 * 1024)).toFixed(1)} MB/s`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const isCompleted = stats.overallProgress >= 100;

  return (
    <div className={`bg-surface rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {isCompleted ? 'Yükleme Tamamlandı' : 'Yükleme Durumu'}
        </h3>
        <div className="flex items-center space-x-2">
          <Icon
            name={isCompleted ? 'CheckCircle' : 'Upload'}
            size={20}
            color={isCompleted ? 'var(--color-success)' : 'var(--color-primary)'}
          />
          <span className="text-sm font-medium text-foreground">
            {Math.round(stats.overallProgress)}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ease-out ${
              isCompleted 
                ? 'bg-gradient-to-r from-success to-accent' :'bg-gradient-to-r from-primary to-accent'
            }`}
            style={{ width: `${Math.min(stats.overallProgress, 100)}%` }}
          />
        </div>
        
        {!isCompleted && (
          <div className="flex justify-between mt-2 text-xs text-text-secondary">
            <span>
              {formatFileSize(stats.uploadedSize)} / {formatFileSize(stats.totalSize)}
            </span>
            <span>
              {stats.estimatedTimeRemaining > 0 && `${formatTime(stats.estimatedTimeRemaining)} kaldı`}
            </span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {stats.completedFiles}
          </div>
          <div className="text-xs text-text-secondary">
            / {stats.totalFiles} Dosya
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {Math.round(stats.overallProgress)}%
          </div>
          <div className="text-xs text-text-secondary">
            Tamamlandı
          </div>
        </div>
        
        {!isCompleted && (
          <>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {formatSpeed(stats.uploadSpeed)}
              </div>
              <div className="text-xs text-text-secondary">
                Hız
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {stats.estimatedTimeRemaining > 0 ? formatTime(stats.estimatedTimeRemaining) : '--'}
              </div>
              <div className="text-xs text-text-secondary">
                Kalan Süre
              </div>
            </div>
          </>
        )}
        
        {isCompleted && (
          <>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                ✓
              </div>
              <div className="text-xs text-text-secondary">
                Başarılı
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                100%
              </div>
              <div className="text-xs text-text-secondary">
                Güvenli
              </div>
            </div>
          </>
        )}
      </div>

      {/* Success Message */}
      {isCompleted && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span className="text-sm text-success-foreground">
              Tüm fotoğraflarınız güvenli bir şekilde yüklendi ve şifrelendi.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverallProgressIndicator;