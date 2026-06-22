import React, { useState, useEffect } from "react";
import { Phone, Mail, Sparkles, BookOpen, Heart, ArrowRight, ChevronDown, Award } from "lucide-react";
import { BOOK_COVERS, TRANSLATIONS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";

// Background images for slideshow - suitable for biography/memoir website
const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1280', // Old books on shelf
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1280', // Book stack with vintage feel
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1280', // Open book with glasses
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=1280', // Elderly person with memories
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1280', // Old photographs vintage
];

interface HeroProps {
  darkMode: boolean;
  onStartStoryClick: () => void;
  onViewBooksClick: () => void;
  isMobilePreview: boolean;
}

export default function Hero({ darkMode, onStartStoryClick, onViewBooksClick, isMobilePreview }: HeroProps) {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].hero;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);
  
  const scrollDown = (id: string) => {
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
    <section className="relative w-full h-screen min-h-[650px] overflow-hidden flex items-center justify-center bg-[#2D1B36]">
      
      {/* Background Image Container with Slideshow */}
      <div className="absolute inset-0 z-0">
        {/* Slideshow Images */}
        {BACKGROUND_IMAGES.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentImageIndex === index ? 1 : 0,
              zIndex: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}
        
        {/* Dynamic Overlay Gradient - Rich deep purple */}
        <div 
          className="absolute inset-0 transition-colors duration-500 z-10" 
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, rgba(23, 11, 26, 0.88) 10%, rgba(45, 30, 47, 0.82) 40%, rgba(20, 10, 22, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(45, 30, 47, 0.84) 10%, rgba(45, 30, 47, 0.72) 50%, rgba(27, 16, 29, 0.88) 100%)'
          }}
        />

        {/* Soft paper fibers / noise overlay */}
        <div className={`absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-overlay z-20 ${darkMode ? 'paper-grain-dark' : 'paper-grain'}`} />
      </div>

      {/* Left side panel (Aesthetic vintage ornament) */}
      <div className="hidden lg:flex absolute left-8 h-1/2 flex-col items-center justify-center gap-6 z-10">
        <span className="font-sans text-[10px] tracking-[6px] text-accent-purple/75 uppercase vertical-text transform rotate-90 select-none font-bold">
          EST. 2024
        </span>
        <div className="w-px h-28 bg-gradient-to-b from-accent-purple/60 to-transparent" />
      </div>

      {/* Right side decoration */}
      <div className="hidden lg:flex absolute right-8 h-1/2 flex-col items-center justify-center gap-6 z-10">
        <div className="w-px h-28 bg-gradient-to-t from-accent-purple/60 to-transparent" />
        <span className="font-serif italic text-xs tracking-widest text-[#f2e9d2]/70 select-none">
          MemoirTale Publishing
        </span>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center select-text mt-12 flex flex-col items-center">
        
        {/* Small gold label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/15 rounded-full border border-accent-purple/25 mb-6"
        >
          <Award className="w-3.5 h-3.5 text-accent-purple animate-pulse-gold rounded-full" />
          <span className="font-sans text-[11px] font-bold text-accent-purple tracking-[3px] uppercase">
            {t.badge}
          </span>
        </motion.div>

        {/* H1 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-white font-semibold text-4xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight text-center"
        >
          {t.heading1} <br />
          <span className="font-serif italic text-accent-purple block mt-2 text-5xl sm:text-7xl md:text-8xl">
            {t.heading2}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-[#faf5e4]/90 font-serif-sub text-lg sm:text-2xl font-light leading-relaxed max-w-2xl mx-auto italic"
        >
          {t.subtitle}
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          {/* Main filled button */}
          <button
            onClick={onStartStoryClick}
            className="w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-accent-purple to-[#b7943b] text-[#2d1e2f] hover:brightness-110 active:scale-[0.98] font-sans font-bold text-xs uppercase tracking-[3px] rounded-md transition-all duration-300 shadow-lg hover:shadow-accent-purple/30 flex items-center justify-center gap-2 cursor-pointer border border-[#dfca7d]/30"
          >
            {t.cta1}
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary outlined button */}
          <button
            onClick={onViewBooksClick}
            className="w-full sm:w-auto py-3.5 px-8 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-accent-purple text-white font-sans font-bold text-xs uppercase tracking-[3px] rounded-md transition-all duration-300 backdrop-blur-sm cursor-pointer flex items-center justify-center gap-2"
          >
            {t.cta2}
          </button>
        </motion.div>
      </div>

      {/* Floating Animated scroll down indicator */}
      <motion.button
        onClick={() => scrollDown('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 hover:opacity-100 text-accent-purple z-10 transition-opacity cursor-pointer flex flex-col items-center gap-1"
      >
        <span className="font-sans text-[9px] font-semibold tracking-[4px] uppercase text-white/80 opacity-80 z-10">{t.scroll}</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </section>
  );
}
