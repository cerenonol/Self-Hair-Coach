import React, { useEffect, useRef } from 'react';
import TipCard from './TipCard';
import NavigationDots from './NavigationDots';
import Icon from '../../../components/AppIcon';
import { CarouselProps } from '../types';

const PhotoCarousel = ({ tips, currentSlide, onSlideChange, className = '' }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < tips.length - 1) {
      onSlideChange(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      onSlideChange(currentSlide - 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      onSlideChange(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < tips.length - 1) {
      onSlideChange(currentSlide + 1);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentSlide * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {tips.map((tip, index) => (
            <TipCard
              key={tip.id}
              tip={tip}
              isActive={index === currentSlide}
            />
          ))}
        </div>

        {/* Navigation Arrows - Desktop */}
        <div className="hidden md:block">
          <button
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            className={`
              absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 
              bg-background/80 backdrop-blur-sm rounded-full 
              flex items-center justify-center transition-all duration-300
              ${currentSlide === 0 
                ? 'opacity-30 cursor-not-allowed' :'hover:bg-background shadow-elevated focus-ring'
              }
            `}
            aria-label="Önceki ipucu"
          >
            <Icon name="ChevronLeft" size={20} color="var(--color-foreground)" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentSlide === tips.length - 1}
            className={`
              absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 
              bg-background/80 backdrop-blur-sm rounded-full 
              flex items-center justify-center transition-all duration-300
              ${currentSlide === tips.length - 1 
                ? 'opacity-30 cursor-not-allowed' :'hover:bg-background shadow-elevated focus-ring'
              }
            `}
            aria-label="Sonraki ipucu"
          >
            <Icon name="ChevronRight" size={20} color="var(--color-foreground)" />
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <NavigationDots
        total={tips.length}
        current={currentSlide}
        onDotClick={onSlideChange}
        className="mt-6"
      />

      {/* Progress Indicator */}
      <div className="mt-4 text-center">
        <span className="text-xs text-text-secondary font-mono">
          {currentSlide + 1} / {tips.length} • Fotoğraf Rehberi
        </span>
      </div>
    </div>
  );
};

export default PhotoCarousel;