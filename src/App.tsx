import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhilosophyStrip from './components/PhilosophyStrip';
import TrustStrip from './components/TrustStrip';
import TrustStatsStrip from './components/TrustStatsStrip';
import AboutSection from './components/AboutSection';
import AboutStripSection from './components/AboutStripSection';
import MarqueeSection from './components/MarqueeSection';
import TopicsSection from './components/TopicsSection';
import HowItWorksSection from './components/HowItWorksSection';
import MemoirLifestyle from './components/MemoirLifestyle';
import FeatureIconsGrid from './components/FeatureIconsGrid';
import WriterMatchmaker from './components/WriterMatchmaker';
import WhyMemoirSection from './components/WhyMemoirSection';
import GallerySection from './components/GallerySection';
import SampleChapters from './components/SampleChapters';
import TestimonialsSection from './components/TestimonialsSection';
import PortfolioGallery from './components/PortfolioGallery';
import EventSection from './components/EventSection';
import ContactSection from './components/ContactSection';
import FAQSection from './components/FAQSection';
import FooterSection from './components/FooterSection';
import FloatingCallbackButton from './components/FloatingCallbackButton';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // Dark mode with localStorage persistence (defaults to light mode)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('memoir-darkmode');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  
  // Service selection state
  const [selectedService, setSelectedService] = useState('');
  
  // Package highlighting state
  const [highlightedPackageId, setHighlightedPackageId] = useState<number | null>(null);
  
  // Writer matchmaker state
  const [matchedWriter, setMatchedWriter] = useState<string | null>(null);

  // Check URL for admin path
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname;
      if (path.includes('/admin') || window.location.hash === '#admin') {
        setShowAdmin(true);
      } else {
        setShowAdmin(false);
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);

    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Persist dark mode preference
    localStorage.setItem('memoir-darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If admin panel requested, show only AdminDashboard
  if (showAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className={`min-h-screen overflow-x-hidden ${darkMode ? 'bg-[#2D1B36] text-[#F5F0F8]' : 'bg-[#faf7f0] text-[#1B101E]'}`}>
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        onScrollToContact={() => scrollToSection('contact')}
        onScrollToHowItWorks={() => scrollToSection('how-it-works')}
        onScrollToServices={(packageId) => {
          scrollToSection('services');
          if (packageId) setHighlightedPackageId(packageId);
        }}
        onScrollToAbout={() => scrollToSection('about')}
        onScrollToGallery={() => scrollToSection('gallery')}
        isMobilePreview={false}
        announcementOpen={true}
      />
      <Hero 
        darkMode={darkMode}
        onStartStoryClick={() => scrollToSection('contact')}
        onViewBooksClick={() => scrollToSection('gallery')}
        isMobilePreview={false}
      />
      
      {/* Philosophy Separator */}
      <PhilosophyStrip />
      
      <TrustStrip />
      <div id="about">
        <AboutSection onLearnMoreClick={() => scrollToSection('how-it-works')} />
      </div>
      <AboutStripSection darkMode={darkMode} />
      <MarqueeSection />
      <TopicsSection />
      
      {/* The 5 Step Timeline Process */}
      <div id="how-it-works">
        <HowItWorksSection onCtaClick={() => scrollToSection('contact')} darkMode={darkMode} />
      </div>
      
      {/* Feature Details Grid */}
      <FeatureIconsGrid darkMode={darkMode} />
      
      {/* Writer Matchmaker */}
      <WriterMatchmaker 
        onMatchWriter={(writer) => {
          setMatchedWriter(writer);
          scrollToSection('contact');
        }}
      />
      
      {/* Comparison & Difference Core */}
      <WhyMemoirSection darkMode={darkMode} />
      
      {/* Trust Counters */}
      <TrustStatsStrip />
      
      {/* Our Services Slider */}
      <div id="services">
        <MemoirLifestyle 
          darkMode={darkMode} 
          onCtaClick={() => scrollToSection('contact')} 
        />
      </div>
      
      {/* Legacy Gallery */}
      <div id="gallery">
        <GallerySection darkMode={darkMode} />
      </div>
      <SampleChapters />
      <TestimonialsSection />
      <PortfolioGallery />
      <EventSection />
      <FAQSection />
      <div id="contact">
        <ContactSection 
          selectedService={selectedService}
          matchedWriter={matchedWriter}
          onClearMatchedWriter={() => setMatchedWriter(null)}
          darkMode={darkMode}
        />
      </div>
      <FooterSection onQuoteClick={() => scrollToSection('contact')} isMobilePreview={false} />
      
      {/* Floating Callback Button */}
      <FloatingCallbackButton />
    </div>
  );
}
