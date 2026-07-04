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
        
        {/* Dynamic Overlay Gradient - Dark purple tone */}
        <div 
          className="absolute inset-0 transition-colors duration-500" 
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, rgba(38, 22, 45, 0.95) 10%, rgba(38, 22, 45, 0.92) 40%, rgba(38, 22, 45, 0.96) 100%)'
              : 'linear-gradient(135deg, rgba(38, 22, 45, 0.92) 10%, rgba(38, 22, 45, 0.88) 50%, rgba(38, 22, 45, 0.94) 100%)'
          }}
        />

        {/* Soft paper fibers / noise overlay */}
        <div className={`absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-overlay ${darkMode ? 'paper-grain' : 'paper-grain'}`} />
      </div>

      {/* Left side panel - Gold accent */}
      <div className="hidden lg:flex absolute left-8 h-1/2 flex-col items-center justify-center gap-6 z-10">
        <span className="font-sans text-[10px] tracking-[6px] text-[#D4AF37]/70 uppercase vertical-text transform rotate-90 select-none font-bold">
          EST. 2024
        </span>
        <div className="w-px h-28 bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
      </div>

      {/* Right side decoration */}
      <div className="hidden lg:flex absolute right-8 h-1/2 flex-col items-center justify-center gap-6 z-10">
        <div className="w-px h-28 bg-gradient-to-t from-[#D4AF37]/40 to-transparent" />
        <span className="font-serif italic text-xs tracking-widest text-[#FAF6F0]/60 select-none">
          MemoirTale Publishing
        </span>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center select-text mt-12 flex flex-col items-center">
        
        {/* Gold badge label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30 mb-6 backdrop-blur-sm"
        >
          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-sans text-[10px] font-semibold text-[#D4AF37] tracking-[3px] uppercase">
            {t.badge || "PRESERVING MEMORIES SINCE 2024"}
          </span>
        </motion.div>

        {/* H1 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-white font-bold text-4xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight text-center"
        >
          {t.heading1 || "Turn Your Life Into"} <br />
          <span className="font-serif italic bg-gradient-to-r from-[#E5C463] via-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent block mt-3 text-5xl sm:text-7xl md:text-8xl drop-shadow-[0_2px_20px_rgba(212,175,55,0.3)]">
            {t.heading2 || "A Masterpiece"}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-7 text-white/80 font-serif-sub text-base sm:text-xl md:text-[17px] font-light leading-relaxed max-w-2xl mx-auto italic"
        >
          {t.subtitle || "We transform your spoken stories, old photos, and precious memories into beautiful handcrafted premium memoir books — a timeless legacy for generations."}
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          {/* Main gold button with dark text */}
          <button
            onClick={handleStartClick}
            className="w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-[#D4AF37] via-[#E5C463] to-[#D4AF37] text-[#1A1410] hover:brightness-110 hover:shadow-lg hover:shadow-[#D4AF37]/30 active:scale-[0.98] font-sans font-bold text-xs uppercase tracking-[2.5px] rounded-md transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border border-[#B8941F]/20"
          >
            {t.cta1 || t.ctaPrimary || "START YOUR MEMOIR"}
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary dark button */}
          <button
            onClick={handleViewClick}
            className="w-full sm:w-auto py-3.5 px-8 bg-[#1A1410] border border-white/20 hover:bg-[#2A211A] hover:border-[#D4AF37]/40 text-white font-sans font-bold text-xs uppercase tracking-[2.5px] rounded-md transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            {t.cta2 || t.ctaSecondary || "SEE OUR WORK"}
          </button>
        </motion.div>
      </div>

      {/* Floating Animated scroll down indicator */}
      <motion.button
        onClick={() => scrollDown('philosophy-strip')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 hover:opacity-100 text-white z-10 transition-opacity cursor-pointer flex flex-col items-center gap-1"
      >
        <span className="font-sans text-[9px] font-semibold tracking-[4px] uppercase text-white/60 z-10">
          {t.scroll || "SCROLL"}
        </span>
        <ChevronDown className="w-5 h-5 text-white/60" />
      </motion.button>
    </section>
  );
}
