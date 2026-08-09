
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Award, CheckCircle, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  darkMode?: boolean;
  onStartStoryClick?: () => void;
  onViewBooksClick?: () => void;
  isMobilePreview?: boolean;
}

// Particle configurations for floating golden particle animation
const PARTICLES = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  size: Math.floor(Math.random() * 4) + 2,
  left: `${Math.floor(Math.random() * 90) + 5}%`,
  top: `${Math.floor(Math.random() * 85) + 5}%`,
  duration: Math.random() * 4 + 4,
  delay: Math.random() * 2,
}));

export default function Hero({ darkMode, onStartStoryClick, onViewBooksClick }: HeroProps) {
  const { t } = useLanguage();

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
    <section className="relative w-full min-h-screen pt-24 pb-16 overflow-hidden flex flex-col items-center justify-between bg-[#220E24]">

      {/* Background Container - Pure Signature #220E24 Color with Glows */}
      <div className="absolute inset-0 z-0 bg-[#220E24]">
        <div className="absolute inset-0 bg-[#220E24]" />

        {/* Ambient Gold & Purple Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#8B3CDC]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Minimal Floating Golden Particles */}
        {PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.1, y: 0 }}
            animate={{
              opacity: [0.15, 0.5, 0.15],
              y: [-15, 15, -15],
              x: [-8, 8, -8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.left,
              top: particle.top,
            }}
            className="absolute rounded-full bg-[#D4AF37] pointer-events-none shadow-[0_0_8px_#D4AF37]"
          />
        ))}

        {/* Soft paper fibers / noise overlay */}
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-overlay paper-grain" />
      </div>

      {/* Right side decoration */}
      <div className="hidden lg:flex absolute right-8 top-1/3 h-1/3 flex-col items-center justify-center gap-6 z-10">
        <div className="w-px h-28 bg-gradient-to-t from-[#D4AF37]/40 to-transparent" />
        <span className="font-serif italic text-xs tracking-widest text-[#FAF6F0]/60 select-none">
          India's First Legacy Platform
        </span>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center select-text my-auto flex flex-col items-center">

        {/* Soft Glow behind H1 Heading */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[260px] bg-gradient-to-r from-[#8B3CDC]/20 via-[#D4AF37]/25 to-[#8B3CDC]/20 rounded-full blur-[100px] pointer-events-none opacity-80" />

        {/* Gold badge label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30 mb-6 backdrop-blur-sm shadow-sm"
        >
          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-sans text-[10px] font-semibold text-[#D4AF37] tracking-[3px] uppercase">
            {t("preservingSince")}
          </span>
        </motion.div>

        {/* H1 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-white font-bold text-4xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight text-center"
        >
          {t("turnLifeInto")} <br />
          <span className="font-serif italic bg-gradient-to-r from-[#E5C463] via-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent block mt-3 text-5xl sm:text-7xl md:text-8xl drop-shadow-[0_2px_20px_rgba(212,175,55,0.3)] pb-3">
            {t("masterpiece")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-7 text-white/90 font-serif-sub text-xl sm:text-2xl md:text-[23px] lg:text-[24px] font-light leading-relaxed max-w-2xl mx-auto italic"
        >
          {t("heroBody")}
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
            {t("startStory")}
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary dark button */}
          <button
            onClick={handleViewClick}
            className="w-full sm:w-auto py-3.5 px-8 bg-[#1A1410] border border-white/20 hover:bg-[#2A211A] hover:border-[#D4AF37]/40 text-white font-sans font-bold text-xs uppercase tracking-[2.5px] rounded-md transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            {t("viewBooks")}
          </button>
        </motion.div>

        {/* 4 Trust Badges Under Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-sans text-white/90 max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-colors">
            <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            {t("badge1")}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-colors">
            <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            {t("badge2")}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-colors">
            <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            {t("badge3")}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-colors">
            <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            {t("badge4")}
          </span>
        </motion.div>

      </div>

      {/* Small "Featured In" / Trust Strip below hero section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-12 mb-4"
      >
        <div className="py-4 px-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 hidden sm:block" />
            <span className="text-xs font-sans font-semibold tracking-wider text-[#D4AF37] uppercase">
              {t("trustedByHeading")}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-sans text-white/70">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-[#D4AF37]" /> Archival 200+ Year Quality
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#D4AF37]" /> 100% Privacy Protection
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-[#D4AF37]" /> Pan-India Senior Biographers
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating Animated Scroll Hint */}
      <motion.button
        onClick={() => scrollDown('philosophy-strip')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85, y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 1.2 }}
        className="relative z-10 mt-2 p-2 hover:opacity-100 text-white transition-opacity cursor-pointer flex items-center gap-2 group"
        aria-label="Scroll to next section"
      >
        <span className="text-xs font-sans font-medium text-[#D4AF37]/90 tracking-wider group-hover:text-[#D4AF37] transition-colors">
          {t("scrollHint")}
        </span>
        <ChevronDown className="w-4 h-4 text-[#D4AF37] group-hover:translate-y-0.5 transition-transform" />
      </motion.button>

    </section>
  );
}

