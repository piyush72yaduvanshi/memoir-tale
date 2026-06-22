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
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import FAQSection from './components/FAQSection';
import FooterSection from './components/FooterSection';
import FloatingCallbackButton from './components/FloatingCallbackButton';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [showAdmin, setShowAdmin] = useState<boolean>(false);

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
      <MarqueeSection />
      <TopicsSection />
      <div id="how-it-works">
        <HowItWorksSection onCtaClick={() => scrollToSection('contact')} />
      </div>
      <WriterMatchmaker />
      <TrustStatsStrip />
      <div id="services">
        <ServicesSection onChoosePackage={(pkg) => scrollToSection('contact')} />
      </div>
      <div id="gallery">
        <GallerySection darkMode={darkMode} />
      </div>
      <TestimonialsSection />
      <FAQSection />
      <div id="contact">
        <ContactSection selectedService="" />
      </div>
      <FooterSection onQuoteClick={() => scrollToSection('contact')} isMobilePreview={false} />
      
      {/* Floating Callback Button */}
      <FloatingCallbackButton />
    </div>
  );
}
