import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import StatusNotificationSystem from '../../components/ui/StatusNotificationSystem';
import HeroSection from './components/HeroSection';
import AssessmentProcess from './components/AssessmentProcess';
import TestimonialSection from './components/TestimonialSection';
import TrustSignals from './components/TrustSignals';
import { LandingScreenData } from './types';

const LandingScreen = () => {
  // Mock data for the landing screen
  const landingData: LandingScreenData = {
    clinic: {
      name: "Self Hair Coach",
      slogan: "Smile Hair Clinic ile Geleceğinizi Keşfedin",
      description: "Yapay zeka destekli saç analizi ile kişiselleştirilmiş tedavi planınızı keşfedin. Uzman doktorlarımız ve son teknoloji ile saç sağlığınızı yeniden kazanın.",
      certifications: ["ISO 9001", "ISHRS", "JCI", "TSE"]
    },
    assessmentSteps: [
    {
      id: "step-1",
      title: "Tam Yüz",
      description: "Frontal açıdan tam yüz fotoğrafı",
      icon: "User"
    },
    {
      id: "step-2",
      title: "45° Sağ",
      description: "Sağ profil açısından çekim",
      icon: "RotateCw"
    },
    {
      id: "step-3",
      title: "45° Sol",
      description: "Sol profil açısından çekim",
      icon: "RotateCcw"
    },
    {
      id: "step-4",
      title: "Tepe/Vertex",
      description: "Baş tepesi bölgesi çekimi",
      icon: "Circle"
    },
    {
      id: "step-5",
      title: "Ense/Donör",
      description: "Arka bölge donör alan çekimi",
      icon: "Square"
    }],

    testimonials: [
    {
      id: "testimonial-1",
      name: "Mehmet Yılmaz",
      rating: 5,
      comment: "Harika bir deneyim yaşadım. AI rehberlik sistemi sayesinde fotoğrafları kolayca çekebildim. Sonuçlar çok detaylı ve anlaşılır geldi.",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14a5ca983-1763300171126.png",
      alt: "Orta yaşlı erkek hasta gülümserken ofis ortamında",
      location: "İstanbul"
    },
    {
      id: "testimonial-2",
      name: "Ayşe Demir",
      rating: 5,
      comment: "Evden çıkmadan profesyonel bir analiz yaptırabildim. Doktorlarla görüşme çok faydalıydı. Kesinlikle tavsiye ederim.",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b41b3e1b-1763301484596.png",
      alt: "Genç kadın hasta beyaz bluzla gülümserken",
      location: "Ankara"
    },
    {
      id: "testimonial-3",
      name: "Can Özkan",
      rating: 5,
      comment: "Teknoloji gerçekten etkileyici. 5 dakikada tüm süreci tamamladım ve aynı gün geri dönüş aldım. Çok memnunum.",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11d1736c8-1763294309380.png",
      alt: "Genç erkek hasta lacivert gömlek ile profesyonel pozda",
      location: "İzmir"
    }],

    trustSignals: [
    {
      id: "trust-1",
      title: "15+ Yıl Deneyim",
      description: "Saç ekimi alanında 15 yılı aşkın deneyim ve binlerce başarılı operasyon.",
      icon: "Award",
      verified: true
    },
    {
      id: "trust-2",
      title: "Sağlık Bakanlığı Onaylı",
      description: "T.C. Sağlık Bakanlığı tarafından onaylanmış ve denetlenen klinik.",
      icon: "Shield",
      verified: true
    },
    {
      id: "trust-3",
      title: "Uluslararası Standartlar",
      description: "JCI akreditasyonu ile uluslararası kalite standartlarında hizmet.",
      icon: "Globe",
      verified: true
    },
    {
      id: "trust-4",
      title: "7/24 Destek",
      description: "Uzman ekibimiz size 7 gün 24 saat destek sağlamaya hazır.",
      icon: "Headphones",
      verified: true
    }]

  };

  return (
    <>
      <Helmet>
        <title>Self Hair Coach - Saç Analizi Başlat | Smile Hair Clinic</title>
        <meta
          name="description"
          content="AI destekli saç analizi ile kişiselleştirilmiş tedavi planınızı keşfedin. 5 dakikada profesyonel saç sağlığı değerlendirmesi." />

        <meta name="keywords" content="saç analizi, saç ekimi, hair transplant, AI analiz, Smile Hair Clinic" />
        <meta property="og:title" content="Self Hair Coach - Saç Analizi Başlat" />
        <meta property="og:description" content="Yapay zeka destekli saç analizi ile saç sağlığınızı değerlendirin" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/landing-screen" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />
        
        {/* Progress Indicator */}
        <ProgressIndicator />
        
        {/* Main Content */}
        <main className="pt-32 pb-24">
          {/* Hero Section */}
          <section className="mb-16">
            <HeroSection clinic={landingData.clinic} />
          </section>

          {/* Assessment Process */}
          <section className="mb-16 bg-surface/30">
            <AssessmentProcess steps={landingData.assessmentSteps} />
          </section>

          {/* Testimonials */}
          <section className="mb-16">
            <TestimonialSection testimonials={landingData.testimonials} />
          </section>

          {/* Trust Signals */}
          <section className="mb-16 bg-surface/30">
            <TrustSignals trustSignals={landingData.trustSignals} />
          </section>
        </main>

        {/* Contextual Action Bar */}
        <ContextualActionBar onAction={() => {}} />
        
        {/* Status Notification System */}
        <StatusNotificationSystem />
      </div>
    </>);

};

export default LandingScreen;