import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import StatusNotificationSystem from '../../components/ui/StatusNotificationSystem';
import PhotoUploadGrid from './components/PhotoUploadGrid';
import OverallProgressIndicator from './components/OverallProgressIndicator';
import AssessmentTimeline from './components/AssessmentTimeline';
import SecurityTrustBadges from './components/SecurityTrustBadges';
import CompletionActions from './components/CompletionActions';
import { PhotoUpload, AssessmentData, UploadStats, SecurityBadge, NextStep } from './types';

const UploadProgressSuccess = () => {
  const [photos, setPhotos] = useState<PhotoUpload[]>([]);
  const [uploadStats, setUploadStats] = useState<UploadStats>({
    totalFiles: 5,
    completedFiles: 0,
    totalSize: 15728640, // ~15MB total
    uploadedSize: 0,
    overallProgress: 0,
    estimatedTimeRemaining: 45,
    uploadSpeed: 524288 // 512 KB/s
  });
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    id: 'assessment_' + Date.now(),
    guestId: 'guest_' + Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    status: 'processing',
    totalPhotos: 5,
    completedPhotos: 0,
    estimatedProcessingTime: 2880, // 48 hours in minutes
    clinicNotified: false
  });

  // Mock photo data
  const initializePhotos = (): PhotoUpload[] => [
  {
    id: 'photo_1',
    angleName: 'front_face',
    angleNameTurkish: 'Tam Yüz',
    fileName: 'front_face.jpg',
    thumbnailUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1e67fcbcf-1763497108323.png",
    uploadProgress: 0,
    status: 'pending',
    fileSize: 3145728, // 3MB
    alt: 'Erkek hastanın tam yüz fotoğrafı, saç çizgisi ve alın bölgesi görünür'
  },
  {
    id: 'photo_2',
    angleName: 'right_45',
    angleNameTurkish: '45° Sağ',
    fileName: 'right_45.jpg',
    thumbnailUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_156bd6047-1763497109425.png",
    uploadProgress: 0,
    status: 'pending',
    fileSize: 2883584, // 2.75MB
    alt: 'Erkek hastanın sağ profil fotoğrafı, temporal bölge ve yan saç çizgisi görünür'
  },
  {
    id: 'photo_3',
    angleName: 'left_45',
    angleNameTurkish: '45° Sol',
    fileName: 'left_45.jpg',
    thumbnailUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_16a93f497-1763497109950.png",
    uploadProgress: 0,
    status: 'pending',
    fileSize: 3407872, // 3.25MB
    alt: 'Erkek hastanın sol profil fotoğrafı, temporal bölge ve yan saç çizgisi görünür'
  },
  {
    id: 'photo_4',
    angleName: 'vertex_top',
    angleNameTurkish: 'Tepe/Vertex',
    fileName: 'vertex_top.jpg',
    thumbnailUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1e19f7145-1763497109318.png",
    uploadProgress: 0,
    status: 'pending',
    fileSize: 3670016, // 3.5MB
    alt: 'Erkek hastanın tepe bölgesi fotoğrafı, vertex alanı ve saç yoğunluğu görünür'
  },
  {
    id: 'photo_5',
    angleName: 'donor_back',
    angleNameTurkish: 'Ense/Donör',
    fileName: 'donor_back.jpg',
    thumbnailUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_178f02e53-1763497109698.png",
    uploadProgress: 0,
    status: 'pending',
    fileSize: 2621440, // 2.5MB
    alt: 'Erkek hastanın ense bölgesi fotoğrafı, donör alan saç yoğunluğu görünür'
  }];


  // Mock security badges
  const securityBadges: SecurityBadge[] = [
  {
    id: 'ssl_encryption',
    name: 'SSL Şifreleme',
    description: 'End-to-end şifreleme ile veri güvenliği',
    iconName: 'Lock',
    verified: true
  },
  {
    id: 'hipaa_compliance',
    name: 'HIPAA Uyumlu',
    description: 'Sağlık verisi koruma standartları',
    iconName: 'Shield',
    verified: true
  },
  {
    id: 'gdpr_compliant',
    name: 'KVKK Uyumlu',
    description: 'Kişisel veri koruma mevzuatı',
    iconName: 'FileText',
    verified: true
  },
  {
    id: 'medical_certified',
    name: 'Tıbbi Sertifika',
    description: 'Sağlık Bakanlığı onaylı platform',
    iconName: 'Award',
    verified: true
  }];


  // Mock assessment timeline
  const nextSteps: NextStep[] = [
  {
    id: 'upload_complete',
    title: 'Fotoğraf Yükleme',
    description: 'Tüm fotoğraflar başarıyla yüklendi ve güvenli sunucularımızda saklanıyor.',
    iconName: 'Upload',
    estimatedTime: 'Tamamlandı',
    status: 'completed'
  },
  {
    id: 'ai_analysis',
    title: 'AI Ön Analiz',
    description: 'Yapay zeka sistemimiz fotoğrafları analiz ederek ön değerlendirme yapıyor.',
    iconName: 'Brain',
    estimatedTime: '15-30 dk',
    status: 'in-progress'
  },
  {
    id: 'doctor_review',
    title: 'Uzman Doktor İncelemesi',
    description: 'Deneyimli saç ekimi uzmanlarımız detaylı analiz ve tedavi önerileri hazırlıyor.',
    iconName: 'UserCheck',
    estimatedTime: '24-48 saat',
    status: 'pending'
  },
  {
    id: 'report_delivery',
    title: 'Rapor Teslimi',
    description: 'Kişiselleştirilmiş saç ekimi raporu ve tedavi seçenekleri e-posta ile gönderiliyor.',
    iconName: 'Mail',
    estimatedTime: '48 saat',
    status: 'pending'
  }];


  // Simulate upload progress
  useEffect(() => {
    setPhotos(initializePhotos());

    const simulateUpload = () => {
      let currentPhotoIndex = 0;
      let currentProgress = 0;

      const uploadInterval = setInterval(() => {
        setPhotos((prevPhotos) => {
          const updatedPhotos = [...prevPhotos];

          if (currentPhotoIndex < updatedPhotos.length) {
            const currentPhoto = updatedPhotos[currentPhotoIndex];

            if (currentPhoto.status === 'pending') {
              currentPhoto.status = 'uploading';
            }

            if (currentPhoto.status === 'uploading') {
              currentProgress += Math.random() * 15 + 5; // 5-20% increment
              currentPhoto.uploadProgress = Math.min(currentProgress, 100);

              if (currentPhoto.uploadProgress >= 100) {
                currentPhoto.status = 'completed';
                currentPhoto.uploadedAt = new Date();
                currentPhotoIndex++;
                currentProgress = 0;
              }
            }
          }

          return updatedPhotos;
        });

        // Update overall stats
        setUploadStats((prevStats) => {
          const completedPhotos = photos.filter((p) => p.status === 'completed').length;
          const uploadingPhoto = photos.find((p) => p.status === 'uploading');

          let uploadedSize = 0;
          photos.forEach((photo) => {
            if (photo.status === 'completed') {
              uploadedSize += photo.fileSize;
            } else if (photo.status === 'uploading') {
              uploadedSize += photo.fileSize * photo.uploadProgress / 100;
            }
          });

          const overallProgress = uploadedSize / prevStats.totalSize * 100;
          const remainingSize = prevStats.totalSize - uploadedSize;
          const estimatedTime = remainingSize / prevStats.uploadSpeed;

          return {
            ...prevStats,
            completedFiles: completedPhotos,
            uploadedSize: Math.round(uploadedSize),
            overallProgress: Math.min(overallProgress, 100),
            estimatedTimeRemaining: Math.max(estimatedTime, 0)
          };
        });

        // Clear interval when all uploads complete
        if (currentPhotoIndex >= 5) {
          clearInterval(uploadInterval);

          // Update assessment data
          setAssessmentData((prev) => ({
            ...prev,
            status: 'completed',
            completedPhotos: 5,
            clinicNotified: true
          }));

          // Show success notification
          setTimeout(() => {
            if ((window as any).showNotification) {
              (window as any).showNotification({
                type: 'success',
                title: 'Yükleme Tamamlandı',
                message: 'Tüm fotoğraflar başarıyla yüklendi. Uzman değerlendirmesi başlatıldı.',
                duration: 5000
              });
            }
          }, 1000);
        }
      }, 800);

      return () => clearInterval(uploadInterval);
    };

    const cleanup = simulateUpload();
    return cleanup;
  }, []);

  const isUploadCompleted = uploadStats.overallProgress >= 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator />
      <StatusNotificationSystem />
      
      {/* Main Content */}
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Fotoğraf Yükleme &amp; İşleme
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Fotoğraflarınız güvenli sunucularımıza yükleniyor ve uzman doktorlarımız tarafından 
              değerlendirilmek üzere hazırlanıyor.
            </p>
          </div>

          {/* Progress Overview */}
          <OverallProgressIndicator stats={uploadStats} />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <PhotoUploadGrid photos={photos} />
              <SecurityTrustBadges badges={securityBadges} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <AssessmentTimeline nextSteps={nextSteps} />
              <CompletionActions isCompleted={isUploadCompleted} />
            </div>
          </div>

          {/* Mobile Completion Actions */}
          <div className="lg:hidden">
            {isUploadCompleted &&
            <div className="mt-6 p-4 bg-success/5 border border-success/10 rounded-lg text-center">
                <p className="text-sm text-success-foreground">
                  🎉 Tebrikler! Saç analizi değerlendirmeniz başarıyla tamamlandı.
                </p>
              </div>
            }
          </div>
        </div>
      </main>

      <ContextualActionBar onAction={() => {}} />
    </div>);

};

export default UploadProgressSuccess;