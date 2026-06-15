import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import TrustStatsStrip from './components/TrustStatsStrip';
import AboutSection from './components/AboutSection';
import MarqueeSection from './components/MarqueeSection';
import TopicsSection from './components/TopicsSection';
import HowItWorksSection from './components/HowItWorksSection';
import WriterMatchmaker from './components/WriterMatchmaker';
import ServicesSection from './components/ServicesSection';
import FeatureIconsGrid from './components/FeatureIconsGrid';
import AboutStripSection from './components/AboutStripSection';
import WhyMemoirSection from './components/WhyMemoirSection';
import GallerySection from './components/GallerySection';
import PortfolioGallery from './components/PortfolioGallery';
import EventSection from './components/EventSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import FAQSection from './components/FAQSection';
import FooterSection from './components/FooterSection';
import FloatingCallbackButton from './components/FloatingCallbackButton';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen overflow-x-hidden ${darkMode ? 'bg-[#2D1B36] text-[#F5F0F8]' : 'bg-[#faf7f0] text-[#1B101E]'}`}>
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        onScrollToContact={() => scrollToSection('contact')}
        onScrollToHowItWorks={() => scrollToSection('how-it-works')}
        onScrollToServices={() => scrollToSection('services')}
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
      <TrustStrip />
      <div id="about">
        <AboutSection onLearnMoreClick={() => scrollToSection('how-it-works')} />
      </div>
      <AboutStripSection darkMode={darkMode} />
      <WhyMemoirSection />
      <MarqueeSection />
      <TopicsSection />
      <div id="how-it-works">
        <HowItWorksSection onCtaClick={() => scrollToSection('contact')} />
      </div>
      <WriterMatchmaker />
      <TrustStatsStrip />
      <FeatureIconsGrid darkMode={darkMode} />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="gallery">
        <GallerySection darkMode={darkMode} />
      </div>
      <PortfolioGallery />
      <EventSection />
      <TestimonialsSection />
      <FAQSection />
      <div id="contact">
        <ContactSection />
      </div>
      <FooterSection />
      
      {/* Floating Callback Button */}
      <FloatingCallbackButton />
    </div>
  );
}
