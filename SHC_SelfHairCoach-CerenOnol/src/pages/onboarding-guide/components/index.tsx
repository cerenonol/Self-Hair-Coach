import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import StatusNotificationSystem from '../../components/ui/StatusNotificationSystem';
import PhotoCarousel from './components/PhotoCarousel';
import InstructionPanel from './components/InstructionPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { OnboardingTip, OnboardingGuideState } from './types';

const OnboardingGuide = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<OnboardingGuideState>({
    currentSlide: 0,
    isTransitioning: false,
    touchStart: null,
    touchEnd: null
  });

  const photographyTips: OnboardingTip[] = [
  {
    id: 'front-face',
    angle: 'Tam Yüz',
    title: 'Ön Görünüm Fotoğrafı',
    description: 'Yüzünüzü kameraya doğru çevirin ve saç çizginizin tamamını gösterecek şekilde fotoğraf çekin.',
    instructions: [
    'Kamerayı göz hizasında tutun',
    'Yüzünüz tam karşıya bakacak şekilde durun',
    'Saç çizginiz tamamen görünür olmalı',
    'Doğal yüz ifadesi koruyun',
    'Gözlük varsa çıkarın'],

    image: "https://images.unsplash.com/photo-1707302101544-ba98d092ff5c",
    alt: 'Erkek kişi kameraya doğru bakarak tam yüz pozisyonunda saç çizgisi görünür şekilde',
    commonMistakes: [
    'Başı eğmek veya çevirmek',
    'Çok yakın veya uzak durmak',
    'Gölgeli alanda çekim yapmak',
    'Saçları öne taramak'],

    icon: 'User'
  },
  {
    id: 'right-45',
    angle: '45° Sağ',
    title: 'Sağ Profil Görünümü',
    description: 'Başınızı sağa 45 derece çevirerek yan profil görünümünü sağlayın.',
    instructions: [
    'Başınızı sağa doğru 45° çevirin',
    'Temporal bölge net görünmeli',
    'Kulak arkası saç çizgisi dahil',
    'Boyun düz, omuzlar sabit',
    'Gözünüzün bir kısmı görünmeli'],

    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a81cdd2d-1763497109355.png",
    alt: 'Erkek kişi başını sağa 45 derece çevirerek temporal bölge ve saç çizgisi görünür pozisyonda',
    commonMistakes: [
    'Tam profil pozisyonu almak',
    'Çok az veya çok fazla çevirmek',
    'Omuzları da çevirmek',
    'Saçları kulak arkasına atmak'],

    icon: 'RotateCw'
  },
  {
    id: 'left-45',
    angle: '45° Sol',
    title: 'Sol Profil Görünümü',
    description: 'Başınızı sola 45 derece çevirerek diğer yan profil görünümünü tamamlayın.',
    instructions: [
    'Başınızı sola doğru 45° çevirin',
    'Sol temporal bölge görünür olmalı',
    'Kulak arkası dahil edilmeli',
    'Simetrik pozisyon koruyun',
    'Aynı mesafe ve açıyı koruyun'],

    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b648e1d9-1763497109414.png",
    alt: 'Erkek kişi başını sola 45 derece çevirerek sol temporal bölge ve saç çizgisi görünür pozisyonda',
    commonMistakes: [
    'Sağ profille aynı açıyı tutmamak',
    'Çok hızlı hareket etmek',
    'Farklı mesafede durmak',
    'Boyun pozisyonunu değiştirmek'],

    icon: 'RotateCcw'
  },
  {
    id: 'vertex-top',
    angle: 'Tepe/Vertex',
    title: 'Baş Üstü Görünümü',
    description: 'Başınızı öne eğerek tepe bölgesindeki saç durumunu gösterin.',
    instructions: [
    'Başınızı öne doğru eğin',
    'Vertex bölgesi tam görünür olmalı',
    'Kamera yukarıdan çeksin',
    'Saçları karıştırmayın',
    'Doğal saç akışını koruyun'],

    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1941b6225-1763497109442.png",
    alt: 'Erkek kişi başını öne eğerek tepe bölgesi ve vertex saç durumu görünür pozisyonda',
    commonMistakes: [
    'Çok az eğmek',
    'Saçları elle düzeltmek',
    'Kamerayı çok yakın tutmak',
    'Gölge oluşturmak'],

    icon: 'ArrowUp'
  },
  {
    id: 'donor-back',
    angle: 'Ense/Donör',
    title: 'Arka Görünüm',
    description: 'Ensenizdeki donör bölgeyi göstermek için arkaya dönün.',
    instructions: [
    'Kameraya sırtınızı dönün',
    'Ense bölgesi net görünmeli',
    'Donör alan tamamen dahil',
    'Boyun düz pozisyonda',
    'Saç uzunluğu doğal olmalı'],

    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7ad4a3b-1763497109639.png",
    alt: 'Erkek kişi arkaya dönerek ense ve donör bölge saç durumu görünür pozisyonda',
    commonMistakes: [
    'Başı eğmek',
    'Yan açıdan çekmek',
    'Çok yüksek veya alçak açı',
    'Kıyafet yakalığının görünmesi'],

    icon: 'ArrowDown'
  }];


  const handleSlideChange = (index: number) => {
    setState((prev) => ({
      ...prev,
      currentSlide: index,
      isTransitioning: true
    }));

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isTransitioning: false
      }));
    }, 500);
  };

  const handleStartCapture = () => {
    navigate('/camera-capture-interface');
  };

  // Auto-advance carousel every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        currentSlide: (prev.currentSlide + 1) % photographyTips.length
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, [photographyTips.length]);

  return (
    <>
      <Helmet>
        <title>Fotoğraf Rehberi - Self Hair Coach</title>
        <meta name="description" content="Saç analizi için doğru fotoğraf çekimi tekniklerini öğrenin. 5 farklı açıdan profesyonel kalitede fotoğraf çekme rehberi." />
        <meta name="keywords" content="saç analizi, fotoğraf rehberi, saç çekimi, hair transplant, fotoğraf teknikleri" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <ProgressIndicator />
        <StatusNotificationSystem />

        <main className="pt-32 pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <Icon name="BookOpen" size={16} color="var(--color-primary)" />
                <span className="text-sm font-medium text-primary">
                  Fotoğraf Rehberi
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Nasıl Çekim Yapılır?
              </h1>
              
              <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Doğru saç analizi için 5 farklı açıdan kaliteli fotoğraf çekimi gereklidir. 
                Her açı için özel teknikler ve dikkat edilmesi gereken noktalar aşağıda açıklanmıştır.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Carousel - Takes 2 columns on desktop */}
              <div className="lg:col-span-2">
                <PhotoCarousel
                  tips={photographyTips}
                  currentSlide={state.currentSlide}
                  onSlideChange={handleSlideChange} />


                {/* Quick Start Button - Mobile */}
                <div className="mt-8 lg:hidden">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Camera"
                    iconPosition="right"
                    onClick={handleStartCapture}
                    className="w-full">

                    Kamerayı Aç ve Başla
                  </Button>
                </div>
              </div>

              {/* Instruction Panel - Takes 1 column on desktop */}
              <div className="lg:col-span-1">
                <InstructionPanel />

                {/* Quick Start Button - Desktop */}
                <div className="hidden lg:block mt-6">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Camera"
                    iconPosition="right"
                    onClick={handleStartCapture}
                    className="w-full">

                    Kamerayı Aç ve Başla
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Clock" size={16} color="var(--color-text-secondary)" />
                    <span className="text-sm font-medium text-foreground">
                      Tahmini Süre
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Tüm fotoğrafları çekmek yaklaşık 3-5 dakika sürer. 
                    Acele etmeden her açıyı dikkatli çekin.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Statistics */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-surface rounded-xl clinical-border">
                <div className="text-2xl font-bold text-primary mb-1">5</div>
                <div className="text-xs text-text-secondary">Fotoğraf Açısı</div>
              </div>
              <div className="text-center p-4 bg-surface rounded-xl clinical-border">
                <div className="text-2xl font-bold text-success mb-1">AI</div>
                <div className="text-xs text-text-secondary">Kalite Kontrolü</div>
              </div>
              <div className="text-center p-4 bg-surface rounded-xl clinical-border">
                <div className="text-2xl font-bold text-accent mb-1">3-5</div>
                <div className="text-xs text-text-secondary">Dakika</div>
              </div>
              <div className="text-center p-4 bg-surface rounded-xl clinical-border">
                <div className="text-2xl font-bold text-warning mb-1">HD</div>
                <div className="text-xs text-text-secondary">Kalite</div>
              </div>
            </div>
          </div>
        </main>

        <ContextualActionBar
          onAction={(action) => {
            // Handle contextual actions if needed
            console.log('Action triggered:', action);
          }} />

      </div>
    </>);

};

export default OnboardingGuide;