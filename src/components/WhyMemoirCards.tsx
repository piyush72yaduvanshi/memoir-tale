import React from 'react';
import { motion } from 'motion/react';
import { Compass, Users, Award, ShieldCheck, Sparkles } from 'lucide-react';

interface WhyMemoirCardsProps {
  darkMode?: boolean;
}

export default function WhyMemoirCards({ darkMode }: WhyMemoirCardsProps) {
  const cards = [
    {
      icon: Compass,
      title: "India's First Legacy Platform",
      description: "Creating an entirely new category of legacy preservation.",
      tag: "Category Pioneer"
    },
    {
      icon: Users,
      title: "Human + AI",
      description: "Professional writers enhanced with AI-powered organization and research.",
      tag: "Intelligent Process"
    },
    {
      icon: Award,
      title: "Premium Craftsmanship",
      description: "Museum-quality books built to last generations.",
      tag: "Heirloom Quality"
    },
    {
      icon: ShieldCheck,
      title: "Private & Secure",
      description: "Every family story remains completely confidential.",
      tag: "Bank-Grade Privacy"
    }
  ];

  return (
    <section className={`py-16 md:py-24 transition-colors duration-500 overflow-hidden relative ${
      darkMode ? 'bg-[#1D0E24] text-[#F5F0F8]' : 'bg-[#FAF8F5] text-[#190F26]'
    }`}>
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border mb-4 ${
              darkMode 
                ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]' 
                : 'border-[#7A5000]/30 bg-[#7A5000]/10 text-[#7A5000]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${darkMode ? 'text-[#D4AF37]' : 'text-[#7A5000]'}`} />
            <span className="text-xs font-bold tracking-wider uppercase">
              Our Core Pillars
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`font-serif font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 ${
              darkMode ? 'text-[#D4AF37]' : 'text-[#2D1230]'
            }`}
          >
            WHY MEMOIR TALE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-[#F5F0F8]/80 font-light' : 'text-[#190F26] font-medium'
            }`}
          >
            Empowering families with timeless storytelling, advanced organization, and unmatched heirloom quality.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 ${
                  darkMode
                    ? 'bg-[#25132d] border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:shadow-2xl hover:shadow-[#D4AF37]/10 text-white'
                    : 'bg-white border-[#D4AF37]/30 hover:border-[#D4AF37]/70 shadow-md hover:shadow-xl text-[#190F26]'
                }`}
              >
                <div>
                  {/* Top Tag & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-xl group-hover:scale-110 transition-transform duration-300 ${
                      darkMode ? 'bg-[#D4AF37]/15 text-[#D4AF37]' : 'bg-[#2D1230]/10 text-[#2D1230]'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                      darkMode 
                        ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' 
                        : 'bg-[#7A5000]/10 text-[#7A5000] border-[#7A5000]/25'
                    }`}>
                      {card.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`font-serif font-bold text-xl mb-3 ${
                    darkMode ? 'text-[#D4AF37]' : 'text-[#2D1230]'
                  }`}>
                    {card.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    darkMode ? 'text-white/85 font-light' : 'text-[#190F26]/90 font-medium'
                  }`}>
                    {card.description}
                  </p>
                </div>

                {/* Subtle Decorative Line at Bottom */}
                <div className={`w-10 h-0.5 group-hover:w-full transition-all duration-500 mt-6 ${
                  darkMode ? 'bg-[#D4AF37]/30' : 'bg-[#2D1230]/30'
                }`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
