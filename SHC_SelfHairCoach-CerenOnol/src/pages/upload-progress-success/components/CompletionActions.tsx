import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

interface CompletionActionsProps {
  isCompleted: boolean;
  className?: string;
}

const CompletionActions = ({ isCompleted, className = '' }: CompletionActionsProps) => {
  const navigate = useNavigate();

  const handleInstallPWA = () => {
    // PWA installation logic would go here
    // For now, show a notification
    if ((window as any).showNotification) {
      (window as any).showNotification({
        type: 'info',
        title: 'PWA Kurulumu',
        message: 'Uygulama ana ekranınıza eklendi. Artık offline erişim sağlayabilirsiniz.',
        duration: 4000,
      });
    }
  };

  const handleReturnToClinic = () => {
    // In a real app, this would redirect to the clinic website
    window.open('https://smilehairclinic.com', '_blank');
  };

  const handleNewAssessment = () => {
    navigate('/landing-screen');
  };

  const handleContactSupport = () => {
    // In a real app, this would open support chat or contact form
    if ((window as any).showNotification) {
      (window as any).showNotification({
        type: 'info',
        title: 'Destek İletişim',
        message: 'Destek ekibimiz size 24 saat içinde dönüş yapacaktır.',
        duration: 3000,
      });
    }
  };

  if (!isCompleted) {
    return (
      <div className={`bg-surface rounded-lg border border-border p-6 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Upload" size={24} color="var(--color-primary)" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Fotoğraflar Yükleniyor
          </h3>
          <p className="text-sm text-text-secondary">
            Lütfen bekleyin, fotoğraflarınız güvenli sunucularımıza yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-surface rounded-lg border border-border p-6 ${className}`}>
      {/* Success Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={24} color="var(--color-success)" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          Değerlendirme Başarıyla Tamamlandı!
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          Fotoğraflarınız uzman doktorlarımıza iletildi. Kişiselleştirilmiş saç ekimi önerileriniz 
          24-48 saat içinde e-posta adresinize gönderilecektir.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={handleInstallPWA}
            className="w-full"
          >
            Uygulamayı Yükle
          </Button>
          
          <Button
            variant="outline"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={handleReturnToClinic}
            className="w-full"
          >
            Kliniğe Dön
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            variant="ghost"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={handleNewAssessment}
            className="w-full"
          >
            Yeni Değerlendirme
          </Button>
          
          <Button
            variant="ghost"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={handleContactSupport}
            className="w-full"
          >
            Destek İletişim
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/10 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Sonraki Adımlar
            </h4>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• E-posta kutunuzu kontrol edin (spam klasörü dahil)</li>
              <li>• Detaylı rapor ve tedavi seçeneklerini inceleyin</li>
              <li>• Ücretsiz konsültasyon randevusu alın</li>
              <li>• Sorularınız için destek ekibimizle iletişime geçin</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-4 text-center">
        <p className="text-xs text-text-secondary">
          Acil durumlar için: 
          <a href="tel:+902121234567" className="text-primary hover:text-primary/80 ml-1">
            +90 (212) 123 45 67
          </a>
        </p>
      </div>
    </div>
  );
};

export default CompletionActions;