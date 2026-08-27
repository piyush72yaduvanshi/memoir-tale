import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Sparkles, Globe, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import logoUrl from "../assets/images/memoir_logo_1780375728663.png";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onScrollToContact: () => void;
  onScrollToHowItWorks: () => void;
  onScrollToServices: (packageId?: number) => void;
  onScrollToAbout: () => void;
  onScrollToGallery: () => void;
  isMobilePreview: boolean;
  announcementOpen?: boolean;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  onScrollToContact,
  onScrollToHowItWorks,
  onScrollToServices,
  onScrollToAbout,
  onScrollToGallery,
  isMobilePreview,
  announcementOpen = true,
}: NavbarProps) {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dropdown = document.getElementById('services-dropdown');
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 ${scrolled
            ? darkMode
              ? 'bg-[#1b101e]/95 backdrop-blur-md border-b border-primary/20 shadow-lg'
              : 'bg-white/95 backdrop-blur-md border-b border-accent-purple/20 shadow-md'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group text-left min-w-0 shrink"
            id="nav-logo"
          >
            <img
              src={logoUrl}
              alt="MemoirTale Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 shrink-0 object-contain rounded-full group-hover:scale-105 transition-transform duration-300 shadow-lg"
            />
            <div className="min-w-0">
              <span className={`font-serif font-bold text-lg sm:text-2xl tracking-wide block transition-colors duration-300 truncate ${scrolled
                  ? darkMode ? 'text-white' : 'text-primary'
                  : 'text-white'
                }`}>
                Memoir<span className="text-[#D4AF37]">Tale</span>
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] font-bold text-[#D4AF37] tracking-wider block -mt-0.5 truncate">
                India's First Legacy Platform
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`font-sans font-medium text-sm tracking-wide cursor-pointer transition-colors duration-200 outline-none ${
                scrolled
                  ? (darkMode ? 'text-white hover:text-accent-purple' : 'text-primary hover:text-accent-purple')
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {t("home")}
            </button>

            {/* Services Dropdown Trigger */}
            <div className="relative" id="services-dropdown">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`font-sans font-medium text-sm tracking-wide cursor-pointer flex items-center gap-1 transition-colors duration-200 outline-none ${
                  scrolled
                    ? (darkMode ? 'text-white hover:text-accent-purple' : 'text-primary hover:text-accent-purple')
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {t("services")}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''} ${scrolled ? 'text-accent-purple' : 'text-white'}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-lg pointer-events-auto shadow-xl p-2 border border-accent-purple/25 ${darkMode ? 'bg-[#221626]' : 'bg-white'
                      }`}
                  >
                    <button
                      onClick={() => {
                        onScrollToServices(2);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left font-sans text-[13px] font-medium py-2.5 px-4 rounded-md transition-all duration-200 cursor-pointer ${darkMode
                          ? 'text-[#f2e9d2] hover:bg-[#34213a] hover:text-white border-l-0 hover:border-l-4 hover:border-accent-purple'
                          : 'text-[#2a1f2d] hover:bg-cream hover:text-primary border-l-0 hover:border-l-4 hover:border-accent-purple-dark'
                        }`}
                    >
                      {t("lifeStoryBook")}
                    </button>
                    <button
                      onClick={() => {
                        onScrollToServices(1);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left font-sans text-[13px] font-medium py-2.5 px-4 rounded-md transition-all duration-200 cursor-pointer ${darkMode
                          ? 'text-[#f2e9d2] hover:bg-[#34213a] hover:text-white border-l-0 hover:border-l-4 hover:border-accent-purple'
                          : 'text-[#2a1f2d] hover:bg-cream hover:text-primary border-l-0 hover:border-l-4 hover:border-accent-purple-dark'
                        }`}
                    >
                      {t("obituariesBook")}
                    </button>
                    <button
                      onClick={() => {
                        onScrollToServices(3);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left font-sans text-[13px] font-medium py-2.5 px-4 rounded-md transition-all duration-200 cursor-pointer ${darkMode
                          ? 'text-[#f2e9d2] hover:bg-[#34213a] hover:text-white border-l-0 hover:border-l-4 hover:border-accent-purple'
                          : 'text-[#2a1f2d] hover:bg-cream hover:text-primary border-l-0 hover:border-l-4 hover:border-accent-purple-dark'
                        }`}
                    >
                      {t("anniversaryBook")}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={onScrollToGallery}
              className={`font-sans font-medium text-sm tracking-wide cursor-pointer transition-colors duration-200 outline-none ${
                scrolled
                  ? (darkMode ? 'text-white hover:text-accent-purple' : 'text-primary hover:text-accent-purple')
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {t("gallery")}
            </button>
            <button
              onClick={onScrollToAbout}
              className={`font-sans font-medium text-sm tracking-wide cursor-pointer transition-colors duration-200 outline-none ${
                scrolled
                  ? (darkMode ? 'text-white hover:text-accent-purple' : 'text-primary hover:text-accent-purple')
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {t("aboutUs")}
            </button>
            <button
              onClick={onScrollToContact}
              className={`font-sans font-medium text-sm tracking-wide cursor-pointer transition-colors duration-200 outline-none ${
                scrolled
                  ? (darkMode ? 'text-white hover:text-accent-purple' : 'text-primary hover:text-accent-purple')
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {t("contact")}
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle Button */}
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/20">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <button
                onClick={() => setLang("EN")}
                className={`px-2.5 py-1 rounded-md font-sans text-xs font-bold tracking-wide cursor-pointer transition-all ${lang === "EN"
                    ? 'bg-accent-purple text-white shadow-sm'
                    : scrolled
                      ? (darkMode ? 'text-white/70 hover:text-white' : 'text-primary/70 hover:text-primary')
                      : 'text-white/70 hover:text-white'
                  }`}
              >
                English
              </button>
              <span className="text-white/30 text-xs select-none">|</span>
              <button
                onClick={() => setLang("HI")}
                className={`px-2.5 py-1 rounded-md font-sans text-xs font-bold tracking-wide cursor-pointer transition-all ${lang === "HI"
                    ? 'bg-accent-purple text-white shadow-sm'
                    : scrolled
                      ? (darkMode ? 'text-white/70 hover:text-white' : 'text-primary/70 hover:text-primary')
                      : 'text-white/70 hover:text-white'
                  }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Book Now Button */}
            <button
              onClick={onScrollToContact}
              className="py-2.5 px-5 bg-gradient-to-r from-accent-purple to-[#7C3AED] text-white hover:brightness-95 active:scale-95 font-sans font-bold text-xs uppercase tracking-wider rounded-md transition-all duration-300 shadow-md hover:shadow-accent-purple/25 cursor-pointer border border-[#A78BFA]/35"
              id="cta-book-now"
            >
              {t("getQuote")}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language Toggle Button - Mobile */}
            <div className={`flex items-center gap-0.5 sm:gap-1 backdrop-blur-sm px-1.5 py-0.5 rounded-lg border transition-colors ${
              scrolled && !darkMode
                ? 'bg-black/5 border-black/10'
                : 'bg-white/10 border-white/20'
            }`}>
              <Globe className={`w-3 h-3 shrink-0 ${scrolled && !darkMode ? 'text-accent-purple' : 'text-[#D4AF37]'}`} />
              <button
                onClick={() => setLang("EN")}
                className={`px-1.5 py-0.5 rounded-md font-sans text-[10px] sm:text-[11px] font-bold tracking-wide cursor-pointer transition-all ${lang === "EN"
                    ? 'bg-accent-purple text-white shadow-sm'
                    : scrolled && !darkMode
                      ? 'text-gray-700 hover:text-black'
                      : 'text-white/70 hover:text-white'
                  }`}
              >
                EN
              </button>
              <span className={`${scrolled && !darkMode ? 'text-black/30' : 'text-white/30'} text-[10px] select-none`}>|</span>
              <button
                onClick={() => setLang("HI")}
                className={`px-1.5 py-0.5 rounded-md font-sans text-[10px] sm:text-[11px] font-bold tracking-wide cursor-pointer transition-all ${lang === "HI"
                    ? 'bg-accent-purple text-white shadow-sm'
                    : scrolled && !darkMode
                      ? 'text-gray-700 hover:text-black'
                      : 'text-white/70 hover:text-white'
                  }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-1.5 sm:p-2 rounded-md transition-colors ${scrolled
                  ? darkMode ? 'text-white' : 'text-primary'
                  : 'text-white'
                }`}
              id="mobile-menu-trigger"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1b101e]/98 backdrop-blur-lg flex flex-col justify-between p-6 overflow-y-auto max-h-screen"
          >
            {/* Mobile Drawer Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={logoUrl}
                  alt="MemoirTale Logo"
                  className="h-12 w-12 object-contain rounded-full"
                />
                <span className="font-serif font-bold text-xl text-white tracking-wide">
                  Memoir<span className="text-accent-purple">Tale</span>
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white border border-white/20 rounded-md"
                id="mobile-menu-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <nav className="flex flex-col gap-6 items-center text-center my-auto">
              {[
                { name: t("home"), action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                { name: t("services"), action: onScrollToServices },
                { name: t("gallery"), action: onScrollToGallery },
                { name: t("howItWorks"), action: onScrollToHowItWorks },
                { name: t("aboutUs"), action: onScrollToAbout },
                { name: t("contact"), action: onScrollToContact }
              ].map((link, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => {
                    link.action();
                    setMobileMenuOpen(false);
                  }}
                  className="font-serif text-xl tracking-wide text-white hover:text-accent-purple"
                >
                  {link.name}
                </motion.button>
              ))}

              <motion.button
                onClick={() => {
                  onScrollToContact();
                  setMobileMenuOpen(false);
                }}
                className="mt-6 w-full max-w-xs py-3 px-6 bg-gradient-to-r from-accent-purple to-accent-purple-dark text-white uppercase tracking-wide font-sans font-bold text-sm rounded-md"
              >
                {t("getQuote")}
              </motion.button>
            </nav>

            {/* Mobile Drawer Footer */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-4 text-white/80">
                <a href="https://www.facebook.com/profile.php?id=61570540003417&sk=about" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                </a>
                <a href="https://www.instagram.com/memoirtale.co/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                </a>
                <a href="https://www.linkedin.com/company/memoirtale/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                </a>
                <a href="https://x.com/Memoirtale91680" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                  <Twitter className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                </a>
                <a href="https://www.youtube.com/@Memoir_tale" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                </a>
              </div>
              <p className="text-white/40 text-xs font-sans">
                © {new Date().getFullYear()} MemoirTale Pvt. Ltd. | All Rights Reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


