/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../data';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface MemoirLifestyleProps {
  darkMode: boolean;
  onCtaClick?: () => void;
}

export default function MemoirLifestyle({ darkMode, onCtaClick }: MemoirLifestyleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (currentIndex < SERVICES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const scrollPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(SERVICES.length - 1); // Loop to end
    }
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

  return (
    <section 
      id="services-section"
      className={`py-20 md:py-28 transition-colors duration-500 overflow-hidden ${
        darkMode ? 'bg-[#1d0e24]' : 'bg-[#FAF8F5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header with Left/Right Controls alignment */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="text-left max-w-2xl">
            <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-[#2E1B5D] dark:text-[#A78BFA] block mb-3">
              Our Services
            </span>
            <h2 className={`font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight ${
              darkMode ? 'text-[#F5F0F8]' : 'text-[#190F26]'
            }`}>
              Every Story Deserves a <br />
              <span className="font-serif italic text-[#2E1B5D] dark:text-[#A78BFA]">Beautiful Home</span>
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                darkMode
                  ? 'border-white/10 hover:border-[#A78BFA] text-white hover:text-[#A78BFA] bg-[#3a2244]'
                  : 'border-[#E3DDE9]/60 hover:border-[#2E1B5D] text-[#190F26] hover:text-[#2E1B5D] bg-[#FAF6F0]'
              }`}
              title="Previous Service"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                darkMode
                  ? 'border-white/10 hover:border-[#A78BFA] text-white hover:text-[#A78BFA] bg-[#3a2244]'
                  : 'border-[#E3DDE9]/60 hover:border-[#2E1B5D] text-[#190F26] hover:text-[#2E1B5D] bg-[#FAF6F0]'
              }`}
              title="Next Service"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel slider area */}
        <div className="relative overflow-hidden w-full">
          <motion.div 
            animate={{ x: `-${currentIndex * (100 / (window.innerWidth < 768 ? 1 : 2.5))}%` }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="flex gap-6 md:gap-8 w-full cursor-grab active:cursor-grabbing"
            ref={containerRef}
            style={{
              width: `${SERVICES.length * (window.innerWidth < 768 ? 100 : 40)}%`,
              display: 'flex'
            }}
          >
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="w-full md:w-[32%] shrink-0"
                style={{
                  width: window.innerWidth < 768 ? '100%' : '31.333%'
                }}
              >
                <div className={`rounded-xl overflow-hidden shadow-lg border relative transition-all duration-300 group ${
                  darkMode 
                    ? 'bg-[#24152b] border-white/5 hover:border-[#A78BFA]/45' 
                    : 'bg-white border-[#E3DDE9]/60 hover:border-[#2E1B5D]/45'
                }`}>
                  
                  {/* Photo Slot */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                    
                    {/* Tag badge */}
                    <div className="absolute top-4 left-4 py-1 px-2.5 bg-[#2E1B5D]/85 backdrop-blur-md rounded border border-[#A78BFA]/30 text-[10px] uppercase tracking-widest font-sans font-bold text-white">
                      {svc.tagline}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif font-bold text-xl text-white select-none">
                        {svc.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description Info Area */}
                  <div className="p-6 text-left flex flex-col justify-between min-h-[170px]">
                    <p className={`font-sans text-xs leading-relaxed line-clamp-3 mb-6 ${
                      darkMode ? 'text-[#F5F0F8]/60' : 'text-[#554466]'
                    }`}>
                      {svc.description}
                    </p>

                    <div className="h-px w-full bg-[#2E1B5D]/25 mb-4" />

                    <button
                      onClick={handleCtaClick}
                      className="inline-flex items-center gap-1 text-xs uppercase font-sans font-bold tracking-wider text-[#2E1B5D] dark:text-[#A78BFA] cursor-pointer hover:brightness-110 group/learn"
                    >
                      {svc.linkText}
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/learn:translate-x-0.5 group-hover/learn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel indicators dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === i 
                  ? 'w-8 bg-[#2E1B5D] dark:bg-[#A78BFA]' 
                  : `w-2 ${darkMode ? 'bg-white/20' : 'bg-[#E3DDE9]'}`
              }`}
              title={`Slide to service ${i+1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
