/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Brain } from 'lucide-react';

interface WhyMemoirProps {
  darkMode: boolean;
}

export default function WhyMemoirSection({ darkMode }: WhyMemoirProps) {
  const fadingPoints = [
    { text: 'Lost over time', desc: 'Oral details erode within two generations.' },
    { text: 'Only in one mind', desc: 'Personal wisdom stays isolated in memory.' },
    { text: 'Fragile, forgotten', desc: 'Old photographs decay in damp cardboard boxes.' },
    { text: 'Moments disappear', desc: 'Daily triumphs dissolve from the family narrative.' }
  ];

  const bookPoints = [
    { text: 'Preserved forever', desc: 'Archival paper stands resilient for over 300 years.' },
    { text: 'Shared with all', desc: 'Distant relatives and descendants read the same stories.' },
    { text: 'Printed, treasured', desc: 'Restored high-res photos nested inside leather-gilt binding.' },
    { text: 'Stories live on', desc: 'Your philosophies, beliefs, and struggles inspire others.' }
  ];

  return (
    <section 
      id="difference-section"
      className={`py-20 md:py-28 transition-colors duration-500 overflow-hidden relative ${
        darkMode ? 'bg-[#1d0e24] text-[#F5F0F8]' : 'bg-[#FAF8F5] text-[#190F26]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column - 7 columns */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Tag */}
            <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-[#2E1B5D] dark:text-[#A78BFA] block mb-3">
              The Memoir Difference
            </span>
            
            {/* Heading */}
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              What fades from memory...<br />
              <span className="font-serif italic text-[#2E1B5D] dark:text-[#A78BFA]">lives forever in a book.</span>
            </h2>

            {/* Description */}
            <p className={`font-serif-sub text-lg md:text-xl font-light leading-relaxed mb-10 italic ${
              darkMode ? 'text-white/80' : 'text-[#190F26]/80'
            }`}>
              Wisdom is the most expensive wealth to waste. While a lifetime of experience is gathered in a single mind, it is fragile. Over time, names blur, timelines drift, and historical contexts vanish. MemoirTale acts as a secure scribe, crystallizing your life’s trials and achievements into standard library masterpieces.
            </p>

            {/* Comparison Cards Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* FADING MEMORY CARD */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`p-6 rounded-xl border transition-all duration-300 shadow-sm ${
                  darkMode 
                    ? 'bg-[#1d0e24] border-white/5 hover:border-red-500/20' 
                    : 'bg-white border-[#E3DDE9]/60 hover:border-red-800/10'
                }`}
              >
                <div className="mb-4 inline-flex p-3 rounded-full bg-red-500/10 text-red-500">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-4 text-[#ff6b6b]">Fading Memory</h3>
                <ul className="space-y-4">
                  {fadingPoints.map((pt, idx) => (
                    <li key={idx} className="flex gap-2.5 text-left">
                      <span className="text-red-400 font-sans font-bold text-xs mt-0.5">•</span>
                      <div>
                        <span className={`font-sans font-bold text-xs uppercase tracking-wider block ${darkMode ? 'text-white/90' : 'text-[#190F26]'}`}>
                          {pt.text}
                        </span>
                        <span className={`font-sans text-[11px] block mt-0.5 ${darkMode ? 'text-[#a28da6]' : 'text-[#554466]'}`}>
                          {pt.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* MEMOIR BOOK CARD */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`p-6 rounded-xl border transition-all duration-300 shadow-md ${
                  darkMode 
                    ? 'bg-[#24152b] hover:scale-101 border-[#A78BFA]/30' 
                    : 'bg-white hover:scale-101 border-[#2E1B5D]/40'
                }`}
              >
                <div className="mb-4 inline-flex p-3 rounded-full bg-[#2E1B5D]/15 text-[#2E1B5D] dark:text-[#A78BFA]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-4 text-[#2E1B5D] dark:text-[#A78BFA]">Memoir Book</h3>
                <ul className="space-y-4">
                  {bookPoints.map((pt, idx) => (
                    <li key={idx} className="flex gap-2.5 text-left">
                      <span className="text-[#2E1B5D] dark:text-[#A78BFA] font-sans font-bold text-xs mt-0.5">✓</span>
                      <div>
                        <span className={`font-sans font-bold text-xs uppercase tracking-wider block ${darkMode ? 'text-white/90' : 'text-[#190F26]'}`}>
                          {pt.text}
                        </span>
                        <span className={`font-sans text-[11px] block mt-0.5 ${darkMode ? 'text-[#FAF6F0]/70' : 'text-[#554466]'}`}>
                          {pt.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>

          {/* Right Column - 5 columns (Full height layered image) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex items-center justify-center min-h-[400px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full h-full rounded-xl overflow-hidden relative border-l-4 border-[#2E1B5D] dark:border-[#A78BFA] min-h-[450px] shadow-2xl group flex"
            >
              <img
                src="https://picsum.photos/seed/mem_why/800/1000"
                alt="Three generations of family hands holding nostalgic old black and white photograph"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E1B5D]/95 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Decorative purple gradient overlay */}
              <div className="absolute inset-0 bg-[#8b3cdc]/5 pointer-events-none mix-blend-color-burn" />

              {/* Float narrative quote card on the image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-[#2E1B5D]/80 rounded-lg border border-[#A78BFA]/25">
                <span className="font-serif italic text-white text-xs block leading-relaxed">
                  "We preserve the whispers of your childhood, the courage of your migration, and the deep, rich wisdom of your twilight years."
                </span>
                <span className="font-sans font-bold text-[9px] uppercase tracking-wider text-[#A78BFA] mt-2 block">
                  — Lead Biographer, MemoirTale
                </span>
              </div>
            </motion.div>
          </div>

          </div>
      </div>
    </section>
  );
}
