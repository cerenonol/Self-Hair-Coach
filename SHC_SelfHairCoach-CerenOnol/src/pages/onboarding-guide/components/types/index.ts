export interface OnboardingTip {
  id: string;
  angle: string;
  title: string;
  description: string;
  instructions: string[];
  image: string;
  alt: string;
  commonMistakes: string[];
  icon: string;
}

export interface CarouselProps {
  tips: OnboardingTip[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  className?: string;
}

export interface TipCardProps {
  tip: OnboardingTip;
  isActive: boolean;
  className?: string;
}

export interface NavigationDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
  className?: string;
}

export interface InstructionPanelProps {
  className?: string;
}

export interface OnboardingGuideState {
  currentSlide: number;
  isTransitioning: boolean;
  touchStart: number | null;
  touchEnd: number | null;
}