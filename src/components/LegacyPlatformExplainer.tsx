import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Image, Mic, Compass, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LegacyPlatformExplainerProps {
  darkMode?: boolean;
}

export default function LegacyPlatformExplainer({ darkMode }: LegacyPlatformExplainerProps) {
  const { lang } = useLanguage();
  const isHindi = lang === 'HI';

  const pillars = [
    {
      icon: BookOpen,
      title: isHindi ? "हार्डकवर पुस्तकें" : "Hardcover Books",
      description: isHindi 
        ? "शताब्दियों तक सुरक्षित रहने वाली सुरुचिपूर्ण टाइपोग्राफी और लेदर/लिनेन बाउंड पुस्तकें।" 
        : "Heirloom-grade typography & leather/linen bound volumes crafted to last for centuries."
    },
    {
      icon: Image,
      title: isHindi ? "डिजिटल आर्काइव" : "Digital Archives",
      description: isHindi 
        ? "उच्च गुणवत्ता फोटो रेस्टोरेशन, पारिवारिक दस्तावेज़ और इंटरैक्टिव डिजिटल यादें।" 
        : "High-resolution photo restoration, family documents, and interactive digital memories."
    },
    {
      icon: Mic,
      title: isHindi ? "ध्वनि और ऑडियो" : "Voices & Audio",
      description: isHindi 
        ? "मौखिक इतिहास, साक्षात्कार, ऑडियोबुक्स और वास्तविक आवाज़ों का स्थायी संरक्षण।" 
        : "Recorded oral histories, interviews, audiobooks, and genuine voice recordings preserved."
    },
    {
      icon: Compass,
      title: isHindi ? "जीवन के मील के पत्थर" : "Life Milestones",
      description: isHindi 
        ? "अनुभव, वंशावली और व्यक्तिगत जीवन यात्रा को दर्शाने वाले कालानुक्रमिक टाइमलाइन।" 
        : "Chronologically organized timelines celebrating wisdom, lineage, and personal journeys."
    },
    {
      icon: Layers,
      title: isHindi ? "पारंपरिक प्रिंटिंग से परे" : "Beyond Printers & Publishers",
      description: isHindi 
        ? "एक संपूर्ण मंच: आत्मीय साक्षात्कार, सुरुचिपूर्ण संपादन और स्थायी पारिवारिक विरासत।" 
        : "An end-to-end ecosystem: conversational interviews, expert curation, and permanent family archiving."
    }
  ];

  return (
    <section className={`relative w-full py-14 px-4 md:px-8 overflow-hidden ${
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
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${
              darkMode 
                ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]' 
                : 'border-[#7A5000]/30 bg-[#7A5000]/10 text-[#7A5000]'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#7A5000]'}`} />
            <span className="text-xs md:text-sm font-bold tracking-wide uppercase">
              {isHindi ? "हमारी श्रेणी" : "Defining Our Category"}
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
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-4 ${
            darkMode ? 'text-[#D4AF37]' : 'text-[#2D1230]'
          }`}>
            {isHindi ? "लेगेसी प्लेटफॉर्म क्या है?" : "What is a Legacy Platform?"}
          </h2>
          <p className={`text-base md:text-lg leading-relaxed ${
            darkMode ? 'text-[#F5F0F8]/90 font-light' : 'text-[#1B101E] font-medium'
          }`}>
            {isHindi 
              ? "एक लेगेसी प्लेटफॉर्म परिवारों को किताबों, डिजिटल आर्काइव और सार्थक कहानी कहने के माध्यम से भावी पीढ़ियों के लिए जीवन की कहानियों, यादों, तस्वीरों, आवाजों और मील के पत्थरों को संरक्षित करने में मदद करता है।"
              : "A Legacy Platform helps families preserve life stories, memories, photographs, voices, and milestones for future generations through books, digital archives, and meaningful storytelling."}
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isLast = idx === pillars.length - 1;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isLast ? 'sm:col-span-2 lg:col-span-1' : ''
                } ${
                  darkMode 
                    ? isLast
                      ? 'bg-[#2A122E] border-[#D4AF37]/40 shadow-lg text-white'
                      : 'bg-[#220E24]/80 border-[#D4AF37]/20 hover:border-[#D4AF37]/40 text-white' 
                    : isLast
                      ? 'bg-[#FCF9F4] border-[#D4AF37]/50 shadow-md text-[#1B101E]'
                      : 'bg-white border-[#D4AF37]/30 hover:border-[#D4AF37]/60 shadow-sm text-[#1B101E]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      darkMode ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-[#2D1230]/10 text-[#2D1230]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className={`text-base md:text-lg font-serif font-bold ${
                      darkMode ? 'text-[#D4AF37]' : 'text-[#2D1230]'
                    }`}>
                      {pillar.title}
                    </h3>
                  </div>
                  <p className={`text-xs md:text-sm leading-relaxed ${
                    darkMode ? 'text-white/80 font-light' : 'text-[#1B101E]/80 font-medium'
                  }`}>
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
