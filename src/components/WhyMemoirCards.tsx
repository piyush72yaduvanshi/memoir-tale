import React from 'react';
import { motion } from 'motion/react';
import { Compass, Users, Award, ShieldCheck, Sparkles, PenTool } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface WhyMemoirCardsProps {
  darkMode?: boolean;
}

export default function WhyMemoirCards({ darkMode }: WhyMemoirCardsProps) {
  const { lang } = useLanguage();
  const isHindi = lang === 'HI';

  const cards = [
    {
      icon: Compass,
      title: isHindi ? "भारत का पहला लीगेसी प्लेटफॉर्म" : "India's First Legacy Platform",
      description: isHindi
        ? "विरासत संरक्षण की एक पूरी तरह से नई श्रेणी का निर्माण।"
        : "Creating an entirely new category of legacy preservation.",
      tag: isHindi ? "श्रेणी के अग्रदूत" : "Category Pioneer"
    },
    {
      icon: Users,
      title: isHindi ? "मानव + एआई" : "Human + AI",
      description: isHindi
        ? "एआई-संचालित संगठन और शोध के साथ पेशेवर लेखकों का सशक्त तालमेल।"
        : "Professional writers enhanced with AI-powered organization and research.",
      tag: isHindi ? "इंटेलिजेंट प्रोसेस" : "Intelligent Process"
    },
    {
      icon: PenTool,
      title: isHindi ? "1,000+ विशेषज्ञ शिल्पकार" : "1,000+ Master Craftsmen",
      description: isHindi
        ? "लेखक, साक्षात्कारकर्ता, संपादक, डिज़ाइनर और विशेषज्ञ प्रिंटर्स का विशाल नेटवर्क।"
        : "Over a thousand vetted writers, interviewers, editors, designers, and master printers.",
      tag: isHindi ? "विशाल नेटवर्क" : "Artisan Network"
    },
    {
      icon: Award,
      title: isHindi ? "प्रीमियम शिल्प कौशल" : "Premium Craftsmanship",
      description: isHindi
        ? "पीढ़ियों तक चलने के लिए तैयार की गई संग्रहालय-गुणवत्ता वाली पुस्तकें।"
        : "Museum-quality books built to last generations.",
      tag: isHindi ? "कालजयी गुणवत्ता" : "Heirloom Quality"
    },
    {
      icon: ShieldCheck,
      title: isHindi ? "निजी और सुरक्षित" : "Private & Secure",
      description: isHindi
        ? "हर पारिवारिक कहानी पूरी तरह से गोपनीय और सुरक्षित रहती है।"
        : "Every family story remains completely confidential.",
      tag: isHindi ? "बैंक-ग्रेड प्राइवेसी" : "Bank-Grade Privacy"
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
                : 'border-[#2E1B5D]/20 bg-[#2E1B5D]/5 text-[#2E1B5D]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${darkMode ? 'text-[#D4AF37]' : 'text-[#2E1B5D]'}`} />
            <span className="text-xs font-bold tracking-wider uppercase">
              {isHindi ? "हमारे मूल स्तंभ" : "Our Core Pillars"}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`font-serif font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 ${
              darkMode ? 'text-[#D4AF37]' : 'text-[#2E1B5D]'
            }`}
          >
            {isHindi ? "मेमोयर टेल ही क्यों?" : "WHY MEMOIR TALE"}
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
            {isHindi
              ? "कालजयी कहानियों, उन्नत संगठन और अद्वितीय विरासत गुणवत्ता के साथ परिवारों को सशक्त बनाना।"
              : "Empowering families with timeless storytelling, advanced organization, and unmatched heirloom quality."}
          </motion.p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 ${
                  darkMode
                    ? 'bg-[#25132d] border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:shadow-2xl hover:shadow-[#D4AF37]/10 text-white'
                    : 'bg-white border-[#2E1B5D]/15 hover:border-[#2E1B5D]/40 shadow-sm hover:shadow-xl text-[#190F26]'
                }`}
              >
                <div>
                  {/* Top Tag & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${
                      darkMode ? 'bg-[#D4AF37]/15 text-[#D4AF37]' : 'bg-[#2E1B5D]/10 text-[#2E1B5D]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                      darkMode 
                        ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' 
                        : 'bg-[#2E1B5D]/5 text-[#2E1B5D] border-[#2E1B5D]/20'
                    }`}>
                      {card.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`font-serif font-bold text-lg mb-2.5 leading-snug ${
                    darkMode ? 'text-[#D4AF37]' : 'text-[#2E1B5D]'
                  }`}>
                    {card.title}
                  </h3>
                  <p className={`text-xs md:text-sm leading-relaxed ${
                    darkMode ? 'text-white/80 font-light' : 'text-[#554466] font-medium'
                  }`}>
                    {card.description}
                  </p>
                </div>

                {/* Subtle Decorative Line at Bottom */}
                <div className={`w-8 h-0.5 group-hover:w-full transition-all duration-500 mt-5 ${
                  darkMode ? 'bg-[#D4AF37]/30' : 'bg-[#2E1B5D]/30'
                }`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
