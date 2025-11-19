import React from 'react';
import Icon from '../../../components/AppIcon';
import { SecurityBadge } from '../types';

interface SecurityTrustBadgesProps {
  badges: SecurityBadge[];
  className?: string;
}

const SecurityTrustBadges = ({ badges, className = '' }: SecurityTrustBadgesProps) => {
  return (
    <div className={`bg-surface rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Shield" size={20} color="var(--color-success)" />
        <h3 className="text-lg font-semibold text-foreground">
          Güvenlik & Gizlilik
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
              badge.verified
                ? 'bg-success/5 border-success/20 hover:bg-success/10' :'bg-muted border-border hover:bg-muted/80'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                badge.verified ? 'bg-success/10' : 'bg-muted'
              }`}
            >
              <Icon
                name={badge.iconName}
                size={18}
                color={badge.verified ? 'var(--color-success)' : 'var(--color-text-secondary)'}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-medium text-foreground">
                  {badge.name}
                </h4>
                {badge.verified && (
                  <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                )}
              </div>
              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                {badge.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Data Protection Notice */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lock" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              KVKK Uyumlu Veri İşleme
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Fotoğraflarınız end-to-end şifreleme ile korunmakta ve sadece tedavi planlaması amacıyla kullanılmaktadır. 
              Verileriniz 3. taraflarla paylaşılmaz ve istediğiniz zaman silinmesini talep edebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      {/* Medical Certifications */}
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="inline-flex items-center px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
          <Icon name="Award" size={12} color="var(--color-accent)" className="mr-1" />
          <span className="text-xs font-medium text-accent-foreground">ISO 27001</span>
        </div>
        <div className="inline-flex items-center px-3 py-1 bg-success/10 border border-success/20 rounded-full">
          <Icon name="Shield" size={12} color="var(--color-success)" className="mr-1" />
          <span className="text-xs font-medium text-success-foreground">HIPAA Uyumlu</span>
        </div>
        <div className="inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
          <Icon name="CheckCircle" size={12} color="var(--color-primary)" className="mr-1" />
          <span className="text-xs font-medium text-primary-foreground">Sağlık Bakanlığı Onaylı</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityTrustBadges;