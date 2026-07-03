/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export default function PhilosophyStrip() {
  return (
    <div 
      id="philosophy-strip"
      className="w-full py-12 md:py-16 bg-[#2D1B36] border-t border-b border-[rgb(46,27,93)]/20 flex items-center justify-center relative overflow-hidden"
    >
      {/* Decorative gold background circles */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-48 h-48 rounded-full border border-[#D4AF37]/5 pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 rounded-full border border-[#D4AF37]/5 pointer-events-none" />

      {/* Philosophy content */}
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-center gap-4 md:gap-8 flex-col sm:flex-row text-center">
        
        {/* Left gold decorative line */}
        <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]/20 max-w-[150px]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-1.5 focus:outline-none"
        >
          <span className="font-serif italic text-white text-xl sm:text-2xl md:text-3xl selection:bg-[#D4AF37] selection:text-[#2D1B36]">
            " Stories Unfolded, <span className="bg-gradient-to-r from-[#E5C463] via-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent font-serif not-italic drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]">Memories</span> Preserved. "
          </span>
        </motion.div>

        {/* Right gold decorative line */}
        <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]/20 max-w-[150px]" />

      </div>
    </div>
  );
}
