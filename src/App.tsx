import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LegacyPlatformExplainer from './components/LegacyPlatformExplainer';
import PhilosophyStrip from './components/PhilosophyStrip';
import TrustStatsStrip from './components/TrustStatsStrip';
import AboutSection from './components/AboutSection';
import AboutStripSection from './components/AboutStripSection';
import MarqueeSection from './components/MarqueeSection';
import TopicsSection from './components/TopicsSection';
import HowItWorksSection from './components/HowItWorksSection';
import MemoirLifestyle from './components/MemoirLifestyle';
import FeatureIconsGrid from './components/FeatureIconsGrid';
import WriterMatchmaker from './components/WriterMatchmaker';
import WhyMemoirCards from './components/WhyMemoirCards';
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
import AdminDashboardSecure from './components/AdminDashboardSecure';

// Legal & Careers Modals
import PrivacyPolicyModal from './components/modals/PrivacyPolicyModal';
import TermsModal from './components/modals/TermsModal';
import RefundModal from './components/modals/RefundModal';
import CareersModal from './components/modals/CareersModal';

export default function App() {
  // Dark mode with localStorage persistence (defaults to light mode)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('memoir-darkmode');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [showAdmin, setShowAdmin] = useState<boolean>(false);

  // Modal states
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [showRefundModal, setShowRefundModal] = useState<boolean>(false);
  const [showCareersModal, setShowCareersModal] = useState<boolean>(false);

  // Service selection state
  const [selectedService, setSelectedService] = useState('');

  // Package highlighting state
  const [highlightedPackageId, setHighlightedPackageId] = useState<number | null>(null);

  // Writer matchmaker state
  const [matchedWriter, setMatchedWriter] = useState<string | null>(null);

  // Check URL for admin and modal paths/hashes
  useEffect(() => {
    const handleRouteAndHash = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      // Admin route check
      if (path.includes('/admin') || hash === '#admin') {
        setShowAdmin(true);
      } else {
        setShowAdmin(false);
      }

      // Hash modal triggers
      if (hash === '#privacy') {
        setShowPrivacyModal(true);
      } else if (hash === '#terms') {
        setShowTermsModal(true);
      } else if (hash === '#refund') {
        setShowRefundModal(true);
      } else if (hash === '#careers') {
        setShowCareersModal(true);
      }
    };

    handleRouteAndHash();
    window.addEventListener('popstate', handleRouteAndHash);
    window.addEventListener('hashchange', handleRouteAndHash);

    return () => {
      window.removeEventListener('popstate', handleRouteAndHash);
      window.removeEventListener('hashchange', handleRouteAndHash);
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

  const closeModalsAndCleanHash = () => {
    setShowPrivacyModal(false);
    setShowTermsModal(false);
    setShowRefundModal(false);
    setShowCareersModal(false);
    if (['#privacy', '#terms', '#refund', '#careers'].includes(window.location.hash)) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  // If admin panel requested, show only AdminDashboardSecure
  if (showAdmin) {
    return <AdminDashboardSecure />;
  }

  return (
    <div className={`min-h-screen overflow-x-hidden ${darkMode ? 'bg-[#220E24] text-[#F5F0F8]' : 'bg-[#faf7f0] text-[#1B101E]'}`}>
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
      <LegacyPlatformExplainer darkMode={darkMode} />

      {/* Philosophy Separator */}
      <PhilosophyStrip />

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

      {/* Why Memoir Tale Core 4 Cards */}
      <WhyMemoirCards darkMode={darkMode} />

      {/* Comparison & Difference Core */}
      <WhyMemoirSection darkMode={darkMode} />

      {/* Real Legacy Book Sample Preview */}
      <SampleChapters />

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
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <PortfolioGallery />
      <EventSection />
      <div id="faq">
        <FAQSection />
      </div>
      <div id="contact">
        <ContactSection
          selectedService={selectedService}
          matchedWriter={matchedWriter}
          onClearMatchedWriter={() => setMatchedWriter(null)}
          darkMode={darkMode}
        />
      </div>

      {/* Redesigned Footer Section */}
      <FooterSection 
        onQuoteClick={() => scrollToSection('contact')} 
        onScrollToAbout={() => scrollToSection('about')}
        onScrollToHowItWorks={() => scrollToSection('how-it-works')}
        onScrollToServices={(packageId) => {
          scrollToSection('services');
          if (packageId) setHighlightedPackageId(packageId);
        }}
        onScrollToGallery={() => scrollToSection('gallery')}
        onScrollToTestimonials={() => scrollToSection('testimonials')}
        onOpenPrivacy={() => setShowPrivacyModal(true)}
        onOpenTerms={() => setShowTermsModal(true)}
        onOpenRefund={() => setShowRefundModal(true)}
        onOpenCareers={() => setShowCareersModal(true)}
      />

      {/* Floating Callback Button */}
      <FloatingCallbackButton />

      {/* Interactive Legal & Career Modals */}
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={closeModalsAndCleanHash}
        darkMode={darkMode}
      />
      <TermsModal
        isOpen={showTermsModal}
        onClose={closeModalsAndCleanHash}
        darkMode={darkMode}
      />
      <RefundModal
        isOpen={showRefundModal}
        onClose={closeModalsAndCleanHash}
        darkMode={darkMode}
      />
      <CareersModal
        isOpen={showCareersModal}
        onClose={closeModalsAndCleanHash}
        darkMode={darkMode}
      />
    </div>
  );
}
