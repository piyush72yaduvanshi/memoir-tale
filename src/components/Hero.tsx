/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data';

const heroImage = "/src/assets/images/memoir_hero_book_1780399806683.png";

interface HeroProps {
  darkMode: boolean;
  onStartStoryClick?: () => void;
  onViewBooksClick?: () => void;
  isMobilePreview?: boolean;
}

export default function Hero({ darkMode, onStartStoryClick, onViewBooksClick }: HeroProps) {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].hero;

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

  const handleStartClick = () => {
    if (onStartStoryClick) {
      onStartStoryClick();
    } else {
      scrollDown('contact');
    }
  };

  const handleViewClick = () => {
    if (onViewBooksClick) {
      onViewBooksClick();
    } else {
      scrollDown('gallery');
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[650px] overflow-hidden flex items-center justify-center">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Memoir Book"
          className="w-full h-full object-cover select-none scale-102 hover:scale-105 transition-transform duration-[12s] ease-out"
          referrerPolicy="no-referrer"
        />
        
        {/* Dynamic Overlay Gradient - Rich deep purple */}
        <div 
          className="absolute inset-0 transition-colors duration-500" 
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, rgba(29, 14, 36, 0.88) 10%, rgba(45, 27, 54, 0.82) 40%, rgba(29, 14, 36, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(45, 27, 54, 0.84) 10%, rgba(45, 27, 54, 0.72) 50%, rgba(29, 14, 36, 0.88) 100%)'
          }}
        />

        {/* Soft paper fibers / noise overlay */}
        <div className={`absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-overlay ${darkMode ? 'paper-grain' : 'paper-grain'}`} />
      </div>

      {/* Left side panel (Aesthetic vintage ornament in brand purple) */}
      <div className="hidden lg:flex absolute left-8 h-1/2 flex-col items-center justify-center gap-6 z-10">
        <span className="font-sans text-[10px] tracking-[6px] text-[#A78BFA]/75 uppercase vertical-text transform rotate-90 select-none font-bold">
          EST. 2024
        </span>
        <div className="w-px h-28 bg-gradient-to-b from-[#A78BFA]/60 to-transparent" />
      </div>

      {/* Right side decoration */}
      <div className="hidden lg:flex absolute right-8 h-1/2 flex-col items-center justify-center gap-6 z-10">
        <div className="w-px h-28 bg-gradient-to-t from-[#A78BFA]/60 to-transparent" />
        <span className="font-serif italic text-xs tracking-widest text-[#FAF6F0]/70 select-none">
          MemoirTale Publishing
        </span>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center select-text mt-12 flex flex-col items-center">
        
        {/* Small purple label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#2E1B5D]/20 dark:bg-[#A78BFA]/15 rounded-full border border-[#2E1B5D]/25 dark:border-[#A78BFA]/25 mb-6"
        >
          <Award className="w-3.5 h-3.5 text-[#A78BFA] animate-pulse" />
          <span className="font-sans text-[11px] font-bold text-[#FAF6F0] dark:text-[#A78BFA] tracking-[3px] uppercase">
            {t.badge || "Preserving Memories Since 2024"}
          </span>
        </motion.div>

        {/* H1 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-white font-semibold text-4xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight text-center"
        >
          {t.heading1 || "Turn Your Life Into"} <br />
          <span className="font-serif italic text-[#A78BFA] block mt-2 text-5xl sm:text-7xl md:text-8xl">
            {t.heading2 || "A Masterpiece"}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-[#FAF6F0]/90 font-serif-sub text-lg sm:text-2xl font-light leading-relaxed max-w-2xl mx-auto italic"
        >
          {t.subtitle || "We transform your spoken stories, old photos, and precious memories into beautiful memoir books — a timeless legacy for generations."}
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          {/* Main filled button in purple */}
          <button
            onClick={handleStartClick}
            className="w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-[#2E1B5D] to-[#8B3CDC] text-white hover:brightness-110 active:scale-[0.98] font-sans font-bold text-xs uppercase tracking-[3px] rounded-md transition-all duration-300 shadow-lg hover:shadow-[#2E1B5D]/30 flex items-center justify-center gap-2 cursor-pointer border border-[#A78BFA]/30"
          >
            {t.cta1 || t.ctaPrimary || "Start Your Memoir"}
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary outlined button */}
          <button
            onClick={handleViewClick}
            className="w-full sm:w-auto py-3.5 px-8 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-[#A78BFA] text-white font-sans font-bold text-xs uppercase tracking-[3px] rounded-md transition-all duration-300 backdrop-blur-sm cursor-pointer flex items-center justify-center gap-2"
          >
            {t.cta2 || t.ctaSecondary || "See Our Work"}
          </button>
        </motion.div>
      </div>

      {/* Floating Animated scroll down indicator */}
      <motion.button
        onClick={() => scrollDown('philosophy-strip')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 hover:opacity-100 text-[#A78BFA] z-10 transition-opacity cursor-pointer flex flex-col items-center gap-1"
      >
        <span className="font-sans text-[9px] font-semibold tracking-[4px] uppercase text-[#FAF6F0] opacity-80 z-10">
          {t.scroll || "Scroll"}
        </span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </section>
  );
}
