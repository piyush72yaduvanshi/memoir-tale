import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Image, Mic, Award, Compass, Layers, CheckCircle2 } from 'lucide-react';

interface LegacyPlatformExplainerProps {
  darkMode?: boolean;
}

export default function LegacyPlatformExplainer({ darkMode }: LegacyPlatformExplainerProps) {
  const pillars = [
    {
      icon: BookOpen,
      title: "Hardcover Books",
      description: "Heirloom-grade typography & leather/linen bound volumes crafted to last for centuries."
    },
    {
      icon: Image,
      title: "Digital Archives",
      description: "High-resolution photo restoration, family documents, and interactive digital memories."
    },
    {
      icon: Mic,
      title: "Voices & Audio",
      description: "Recorded oral histories, interviews, audiobooks, and genuine voice recordings preserved."
    },
    {
      icon: Compass,
      title: "Life Milestones",
      description: "Chronologically organized timelines celebrating wisdom, lineage, and personal journeys."
    }
  ];

  const differentiators = [
    "Custom Ghostwriting & Oral Interviews",
    "Professional Photo Restoration & Curations",
    "Multi-Generational Digital & Audio Vaults",
    "Heirloom Book Design (Not Automated Templates)"
  ];

  return (
    <section className={`relative w-full py-16 px-4 md:px-8 overflow-hidden ${
      darkMode 
        ? 'bg-[#18081A] text-[#F5F0F8] border-y border-[#D4AF37]/20' 
        : 'bg-[#FAF6F0] text-[#1B101E] border-y border-[#D4AF37]/30'
    }`}>
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Category Pill */}
        <div className="flex justify-center mb-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs md:text-sm font-medium tracking-wide uppercase text-[#D4AF37]">
              Defining Our Category
            </span>
          </motion.div>
        </div>

        {/* Main Heading & Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-[#D4AF37] mb-4">
            What is a Legacy Platform?
          </h2>
          <p className="text-base md:text-lg opacity-90 leading-relaxed font-light">
            A Legacy Platform helps families preserve life stories, memories, photographs, voices, and milestones for future generations through books, digital archives, and meaningful storytelling.
          </p>
        </motion.div>

        {/* Core Definition Card & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Main Core Value Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`lg:col-span-7 p-8 rounded-2xl border flex flex-col justify-between ${
              darkMode 
                ? 'bg-[#220E24]/80 border-[#D4AF37]/30 shadow-2xl' 
                : 'bg-white/90 border-[#D4AF37]/30 shadow-xl'
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-medium">
                  Beyond Printers & Publishers
                </h3>
              </div>
              <p className="text-sm md:text-base opacity-90 leading-relaxed mb-6">
                Memoir Tale goes beyond traditional printing services and self-publishing houses. We provide an end-to-end ecosystem where personal history is gently extracted through conversational interviews, curated visually, and preserved across tangible heirlooms and permanent digital formats.
              </p>
            </div>

            {/* Key Differentiator Highlight */}
            <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm font-medium text-[#D4AF37]">
                  This differentiates Memoir Tale from printers and publishers. We are complete custodians of your family lineage and life story.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Pillars List Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start gap-4 transition-transform hover:-translate-y-0.5 ${
                    darkMode 
                      ? 'bg-[#251028] border-[#D4AF37]/20 hover:border-[#D4AF37]/40' 
                      : 'bg-white border-[#D4AF37]/20 hover:border-[#D4AF37]/40 shadow-sm'
                  }`}
                >
                  <div className="p-2.5 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1 text-[#D4AF37]">{pillar.title}</h4>
                    <p className="text-xs opacity-80 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Feature List Badges / Bullet Points */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-6 border-t border-[#D4AF37]/20 flex flex-wrap justify-center items-center gap-4 md:gap-8"
        >
          {differentiators.map((diff, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="text-xs md:text-sm font-medium opacity-90">{diff}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
