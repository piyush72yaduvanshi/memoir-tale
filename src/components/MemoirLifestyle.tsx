/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../data';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MemoirLifestyleProps {
  darkMode: boolean;
  onCtaClick?: () => void;
}

export default function MemoirLifestyle({ darkMode, onCtaClick }: MemoirLifestyleProps) {
  const { lang } = useLanguage();
  const isHindi = lang === "HI";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive items-per-view calculator
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalSteps = Math.max(1, SERVICES.length - itemsPerPage + 1);

  // Auto-play infinite loop effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSteps);
    }, 4000); // 4 sec premium smooth interval

    return () => clearInterval(interval);
  }, [isPaused, totalSteps]);

  const scrollNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSteps);
  };

  const scrollPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSteps) % totalSteps);
  };

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Gap between cards in pixels
  const gap = 24;
  // Calculate percentage shift based on current index and items per page
  const translatePercent = (currentIndex * 100) / itemsPerPage;

  return (
    <section
      id="services-section"
      className={`py-16 md:py-24 transition-colors duration-500 overflow-hidden relative ${darkMode ? 'bg-[#180B21]' : 'bg-[#FAF7F2]'
        }`}
    >
      {/* Subtle Ambient Glow Background Elements */}
      <div
        className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${darkMode ? 'bg-[#3b1d54]/20' : 'bg-[#e2d5ed]/30'
          }`}
      />
      <div
        className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${darkMode ? 'bg-[#2E1B5D]/25' : 'bg-[#ecd8ff]/20'
          }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="text-left max-w-2xl">
            <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-[rgb(46,27,93)] dark:text-[rgb(46,27,93)] block mb-3">
              {isHindi ? "हमारी प्रमुख सेवाएं" : "OUR SIGNATURE SERVICES"}
            </span>

            <h2 className={`font-serif font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight ${darkMode ? 'text-[#F5F0F8]' : 'text-[#190F26]'
              }`}>
              {isHindi ? "हर कहानी को सुंदरता से" : "Every Story Deserves to Be"} <br className="hidden sm:inline" />
              <span className="font-serif italic text-[rgb(46,27,93)] dark:text-[rgb(46,27,93)]">
                {isHindi ? " संजोया जाना चाहिए" : " Preserved Beautifully"}
              </span>
            </h2>

            <p className={`font-sans text-sm sm:text-base mt-3 max-w-2xl leading-relaxed ${darkMode ? 'text-[#F5F0F8]/70' : 'text-[#554466]'
              }`}>
              {isHindi
                ? "व्यक्तिगत संस्मरणों से लेकर पारिवारिक इतिहास और कॉर्पोरेट विरासत तक, प्रत्येक सेवा को प्रामाणिकता, लालित्य और स्थायी अर्थ के साथ आपकी कहानी को सहेजने के लिए विचारपूर्वक डिज़ाइन किया गया है।"
                : "From personal memoirs to family histories and corporate legacies, each service is thoughtfully designed to preserve your story with authenticity, elegance, and lasting meaning."}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={scrollPrev}
              aria-label="Previous Service"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-95 ${darkMode
                  ? 'border-white/15 hover:border-[#9D75D4] text-white hover:bg-[#341A47] bg-[#22102e]'
                  : 'border-[#E2D8E8] hover:border-[#2E1B5D] text-[#190F26] hover:bg-white bg-white hover:shadow-md'
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next Service"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-95 ${darkMode
                  ? 'border-white/15 hover:border-[#9D75D4] text-white hover:bg-[#341A47] bg-[#22102e]'
                  : 'border-[#E2D8E8] hover:border-[#2E1B5D] text-[#190F26] hover:bg-white bg-white hover:shadow-md'
                }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slider Area */}
        <div
          className="relative overflow-hidden w-full rounded-2xl pt-2 pb-6 px-1"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            animate={{ x: `calc(-${translatePercent}% - ${(currentIndex * gap) / itemsPerPage}px)` }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className="flex gap-6 w-full"
            ref={containerRef}
          >
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="shrink-0 flex flex-col"
                style={{
                  width: `calc((100% - ${(itemsPerPage - 1) * gap}px) / ${itemsPerPage})`
                }}
              >
                <div
                  className={`group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border flex flex-col justify-between h-full transition-all duration-300 transform hover:-translate-y-1.5 ${darkMode
                      ? 'bg-[#22122b] border-white/10 hover:border-[#9D75D4]/50'
                      : 'bg-white border-[#E9E1EE] hover:border-[#2E1B5D]/40'
                    }`}
                >
                  {/* Card Image Banner */}
                  <div className="relative h-48 sm:h-52 overflow-hidden shrink-0">
                    <img
                      src={svc.image}
                      alt={isHindi && svc.titleHi ? svc.titleHi : svc.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 select-none"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Tag Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                      <span className="py-1 px-3 bg-[#2E1B5D]/90 backdrop-blur-md rounded-full border border-white/20 text-[10px] uppercase tracking-widest font-sans font-bold text-white shadow-sm">
                        {isHindi && svc.taglineHi ? svc.taglineHi : svc.tagline}
                      </span>
                      {svc.isComingSoon && (
                        <span className="py-1 px-2.5 bg-amber-500/90 backdrop-blur-md rounded-full border border-white/30 text-[9px] uppercase tracking-wider font-sans font-bold text-white shadow-sm">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    {/* Card Title Overlay */}
                    <div className="absolute bottom-3.5 left-4 right-4">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-white drop-shadow-sm select-none leading-snug">
                        {isHindi && svc.titleHi ? svc.titleHi : svc.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body Info */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <p className={`font-sans text-xs sm:text-sm leading-relaxed mb-4 flex-grow ${darkMode ? 'text-[#F5F0F8]/60' : 'text-[#554466]'
                      }`}>
                      {isHindi && svc.descriptionHi ? svc.descriptionHi : svc.description}
                    </p>

                    <div className="pt-3 border-t border-[rgb(46,27,93)]/20 dark:border-white/10 flex items-center justify-between">
                      {svc.isComingSoon ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                          Coming Soon
                        </span>
                      ) : (
                        <button
                          onClick={handleCtaClick}
                          className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[rgb(46,27,93)] dark:text-[rgb(46,27,93)] cursor-pointer hover:brightness-110 group/btn"
                        >
                          <span>{isHindi && svc.linkTextHi ? svc.linkTextHi : svc.linkText}</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dynamic Step Indicator Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === i
                  ? 'w-8 bg-[#2E1B5D] dark:bg-[#C5A3ED]'
                  : `w-2 ${darkMode ? 'bg-white/20 hover:bg-white/40' : 'bg-[#E0D5E5] hover:bg-[#2E1B5D]/40'}`
                }`}
              title={`Go to slide ${i + 1}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
