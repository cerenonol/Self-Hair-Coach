import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { Testimonial } from '../types';

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

const TestimonialSection = ({ testimonials }: TestimonialSectionProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < rating ? "var(--color-warning)" : "var(--color-muted-foreground)"}
        className={index < rating ? "fill-current" : ""}
      />
    ));
  };

  return (
    <div className="px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Hasta Deneyimleri
        </h2>
        <p className="text-text-secondary">
          Binlerce memnun hastamızın görüşleri
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-surface rounded-xl p-6 clinical-border shadow-subtle hover:shadow-elevated transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex space-x-1 mr-2">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-xs text-text-secondary">
                  {testimonial.rating}.0
                </span>
              </div>

              {/* Comment */}
              <blockquote className="text-sm text-text-secondary leading-relaxed">
                "{testimonial.comment}"
              </blockquote>

              {/* Verification Badge */}
              <div className="flex items-center mt-4 pt-3 border-t border-border">
                <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                <span className="text-xs text-success ml-1 font-medium">
                  Doğrulanmış Hasta
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 clinical-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground mb-1">
                15,000+
              </div>
              <div className="text-sm text-text-secondary">
                Başarılı Analiz
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-foreground mb-1">
                4.9/5
              </div>
              <div className="text-sm text-text-secondary">
                Ortalama Puan
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-foreground mb-1">
                98%
              </div>
              <div className="text-sm text-text-secondary">
                Memnuniyet Oranı
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-foreground mb-1">
                24/7
              </div>
              <div className="text-sm text-text-secondary">
                Destek Hizmeti
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;