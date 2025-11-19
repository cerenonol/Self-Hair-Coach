import React from 'react';
import Icon from '../../../components/AppIcon';
import { TrustSignal } from '../types';

interface TrustSignalsProps {
  trustSignals: TrustSignal[];
}

const TrustSignals = ({ trustSignals }: TrustSignalsProps) => {
  return (
    <div className="px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Güven & Kalite Garantisi
        </h2>
        <p className="text-text-secondary">
          Uluslararası standartlarda hizmet kalitesi
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trustSignals.map((signal) => (
            <div
              key={signal.id}
              className="bg-surface rounded-xl p-6 clinical-border shadow-subtle hover:shadow-elevated transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    signal.verified 
                      ? 'bg-success/10' :'bg-primary/10'
                  }`}>
                    <Icon 
                      name={signal.icon as any} 
                      size={24} 
                      color={signal.verified ? "var(--color-success)" : "var(--color-primary)"} 
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-base font-medium text-foreground mr-2">
                      {signal.title}
                    </h3>
                    {signal.verified && (
                      <Icon 
                        name="CheckCircle" 
                        size={16} 
                        color="var(--color-success)" 
                      />
                    )}
                  </div>
                  
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {signal.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Medical Certifications */}
        <div className="mt-12 bg-surface/50 rounded-xl p-8 clinical-border">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Tıbbi Sertifikalar & Akreditasyonlar
            </h3>
            <p className="text-sm text-text-secondary">
              Türkiye Sağlık Bakanlığı onaylı klinik
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <Icon name="Award" size={32} color="var(--color-warning)" className="mx-auto mb-2" />
              <div className="text-xs font-medium text-foreground">ISO 9001</div>
              <div className="text-xs text-text-secondary">Kalite Yönetimi</div>
            </div>
            
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <Icon name="Shield" size={32} color="var(--color-success)" className="mx-auto mb-2" />
              <div className="text-xs font-medium text-foreground">ISHRS</div>
              <div className="text-xs text-text-secondary">Üyelik Sertifikası</div>
            </div>
            
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <Icon name="Star" size={32} color="var(--color-primary)" className="mx-auto mb-2" />
              <div className="text-xs font-medium text-foreground">JCI</div>
              <div className="text-xs text-text-secondary">Akreditasyon</div>
            </div>
            
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <Icon name="Heart" size={32} color="var(--color-error)" className="mx-auto mb-2" />
              <div className="text-xs font-medium text-foreground">TSE</div>
              <div className="text-xs text-text-secondary">Türk Standardı</div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-primary/5 rounded-xl p-6 clinical-border">
          <div className="flex items-start space-x-3">
            <Icon name="Lock" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                Veri Güvenliği & Gizlilik
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Tüm fotoğraflarınız ve kişisel bilgileriniz SSL şifreleme ile korunur. 
                KVKK uyumlu veri işleme politikamız ile bilgileriniz güvende.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;