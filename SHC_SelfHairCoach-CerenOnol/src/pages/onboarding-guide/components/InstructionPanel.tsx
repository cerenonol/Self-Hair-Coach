import React from 'react';
import Icon from '../../../components/AppIcon';
import { InstructionPanelProps } from '../types';

const InstructionPanel = ({ className = '' }: InstructionPanelProps) => {
  const generalTips = [
    {
      icon: 'Lightbulb',
      title: 'Aydınlatma',
      description: 'Doğal ışık kullanın, gölgelerden kaçının'
    },
    {
      icon: 'Smartphone',
      title: 'Cihaz Konumu',
      description: 'Telefonu sabit tutun, titreşimi önleyin'
    },
    {
      icon: 'Eye',
      title: 'Kamera Kalitesi',
      description: 'Lensi temizleyin, net görüntü alın'
    },
    {
      icon: 'Clock',
      title: 'Zaman',
      description: 'Acele etmeyin, her açıyı dikkatli çekin'
    }
  ];

  const browserTips = [
    {
      icon: 'Shield',
      title: 'Kamera İzni',
      description: 'Tarayıcınız kamera erişimi isteyecek, "İzin Ver" seçeneğini tıklayın'
    },
    {
      icon: 'Download',
      title: 'Uygulama Yükleme',
      description: 'Ana ekrana ekle seçeneği ile hızlı erişim sağlayın'
    },
    {
      icon: 'Wifi',
      title: 'İnternet Bağlantısı',
      description: 'Kararlı internet bağlantısı fotoğraf yükleme için gerekli'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* General Photography Tips */}
      <div className="bg-surface rounded-xl p-6 clinical-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Camera" size={20} color="var(--color-primary)" />
          <h3 className="text-base font-semibold text-foreground">
            Genel Fotoğraf İpuçları
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {generalTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={tip.icon as any} size={16} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {tip.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browser & Technical Tips */}
      <div className="bg-surface rounded-xl p-6 clinical-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Settings" size={20} color="var(--color-accent)" />
          <h3 className="text-base font-semibold text-foreground">
            Teknik Hazırlık
          </h3>
        </div>
        
        <div className="space-y-4">
          {browserTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={tip.icon as any} size={16} color="var(--color-accent)" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {tip.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Assurance Note */}
      <div className="bg-success/5 border border-success/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Icon name="CheckCircle" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Kalite Güvencesi
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              AI sistemimiz her fotoğrafı otomatik olarak analiz eder. Kalite standartlarına uymayan 
              fotoğraflar için tekrar çekim önerileri sunulur. Bu sayede en doğru değerlendirmeyi 
              alabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionPanel;