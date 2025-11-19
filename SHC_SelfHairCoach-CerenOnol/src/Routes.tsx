import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LandingScreen from './pages/landing-screen';
import CameraCaptureInterface from './pages/camera-capture-interface';
import UploadProgressSuccess from './pages/upload-progress-success';
import OnboardingGuide from './pages/onboarding-guide';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
        <Route path="/" element={<LandingScreen />} />
        <Route path="/landing-screen" element={<LandingScreen />} />
        <Route path="/camera-capture-interface" element={<CameraCaptureInterface />} />
        <Route path="/upload-progress-success" element={<UploadProgressSuccess />} />
        <Route path="/onboarding-guide" element={<OnboardingGuide />} />
        <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
