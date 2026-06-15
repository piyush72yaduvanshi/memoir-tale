import { motion } from 'motion/react';
import { FOUNDER, TRANSLATIONS } from '../data';
import { Linkedin, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutStripSectionProps {
  darkMode: boolean;
}

export default function AboutStripSection({ darkMode }: AboutStripSectionProps) {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].aboutStrip;
  
  return (
    <section 
      id="about-story-section"
      className={`py-20 md:py-28 transition-colors duration-500 overflow-hidden relative ${
        darkMode ? 'bg-[#1b101e] text-white border-b border-white/5' : 'bg-[#faf7f0] text-primary'
      }`}
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none paper-grain" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* Left Column - Founder Portrait Frame (40%) */}
          <div className="w-full md:w-[35%] flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-64 h-64 md:w-80 md:h-80 flex group"
            >
              {/* Decorative background rotating gold foil line */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-purple/40 group-hover:rotate-45 transition-transform duration-[10s] ease-linear pointer-events-none" />
              
              {/* Portrait main content */}
              <div className="absolute inset-4 rounded-full overflow-hidden border border-accent-purple/20 shadow-2xl relative flex">
                <img
                  src={FOUNDER.avatar}
                  alt={FOUNDER.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Warm photo treatment film overlay */}
                <div className="absolute inset-0 bg-accent-purple/10 mix-blend-color-burn" />
              </div>

              {/* Float branding medal */}
              <div className="absolute -bottom-2 right-4 p-3 bg-gradient-to-r from-accent-purple to-accent-purple-light rounded-full text-white shadow-lg animate-float">
                <Quote className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Story text detail (65%) */}
          <div className="w-full md:w-[65%] text-left">
            <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-accent-purple-light dark:text-accent-purple block mb-3">
              {t.label}
            </span>
            
            <h2 className="font-serif font-bold text-3xl sm:text-4xl leading-tight mb-6">
              {t.heading} <span className="font-serif italic text-accent-purple">{t.headingItalic}</span>
            </h2>

            <p className={`font-sans text-xs md:text-sm leading-relaxed mb-6 ${
              darkMode ? 'text-white/70' : 'text-text-muted'
            }`}>
              {t.para1}
            </p>

            {/* Philosophy quotes */}
            <blockquote className="border-l-4 border-accent-purple pl-5 py-2 my-6">
              <p className={`font-serif-sub italic text-lg sm:text-xl font-light leading-relaxed ${
                darkMode ? 'text-white' : 'text-primary'
              }`}>
                {t.quote}
              </p>
            </blockquote>

            {/* Founder details */}
            <div className="flex items-center justify-between gap-6 mt-6">
              <div>
                <span className={`font-serif font-bold text-base block ${darkMode ? 'text-white' : 'text-primary'}`}>
                  {t.founderName}
                </span>
                <span className={`font-sans text-[10px] uppercase font-bold tracking-[2px] transition-colors ${
                  darkMode ? 'text-accent-purple' : 'text-accent-purple-light'
                }`}>
                  {t.founderTitle}
                </span>
              </div>

              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-accent-purple/30 hover:border-accent-purple rounded-full text-accent-purple hover:bg-accent-purple hover:text-white transition-all cursor-pointer"
                title={`${FOUNDER.name} on LinkedIn`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
