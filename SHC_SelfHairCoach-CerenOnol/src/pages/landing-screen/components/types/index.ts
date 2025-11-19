export interface ClinicInfo {
  name: string;
  slogan: string;
  description: string;
  certifications: string[];
}

export interface AssessmentStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  alt: string;
  location: string;
}

export interface TrustSignal {
  id: string;
  title: string;
  description: string;
  icon: string;
  verified: boolean;
}

export interface LandingScreenData {
  clinic: ClinicInfo;
  assessmentSteps: AssessmentStep[];
  testimonials: Testimonial[];
  trustSignals: TrustSignal[];
}