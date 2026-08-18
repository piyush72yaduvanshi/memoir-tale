import { motion } from 'motion/react';
import { FEATURES, TRANSLATIONS } from '../data';
import {
  Users, Layout, Award, Sparkles, Volume2,
  Palette, MapPin, Languages, Truck, Laptop, Lock,
  PenTool, Heart
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FeatureIconsGridProps {
  darkMode: boolean;
}

export default function FeatureIconsGrid({ darkMode }: FeatureIconsGridProps) {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].features;

  // Icon dictionary lookup
  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'Users':
        return <Users className="w-6 h-6 shrink-0" />;
      case 'PenTool':
        return <PenTool className="w-6 h-6 shrink-0" />;
      case 'Layout':
        return <Layout className="w-6 h-6 shrink-0" />;
      case 'Award':
        return <Award className="w-6 h-6 shrink-0" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 shrink-0" />;
      case 'Palette':
        return <Palette className="w-6 h-6 shrink-0" />;
      case 'Languages':
        return <Languages className="w-6 h-6 shrink-0" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 shrink-0" />;
      case 'Lock':
        return <Lock className="w-6 h-6 shrink-0" />;
      case 'Truck':
        return <Truck className="w-6 h-6 shrink-0" />;
      case 'Heart':
        return <Heart className="w-6 h-6 shrink-0" />;
      default:
        return <Award className="w-6 h-6 shrink-0" />;
    }
  };

  return (
    <section
      id="features-section"
      className={`py-20 md:py-28 transition-colors duration-500 relative overflow-hidden ${darkMode ? 'bg-[#1b101e] border-y border-white/5' : 'bg-[#faf7f0]'
        }`}
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none paper-grain" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-[#2E1B5D] dark:text-[#E5C463] block mb-3">
            {t.label}
          </span>
          <h2 className={`font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight ${darkMode ? 'text-[#f2e9d2]' : 'text-primary'
            }`}>
            {t.heading}
          </h2>
          <p className={`mt-4 font-sans text-xs md:text-sm leading-relaxed max-w-2xl mx-auto ${darkMode ? 'text-white/60' : 'text-[#554466]'
            }`}>
            {t.subtitle}
          </p>
        </div>

        {/* 11 Feature Cards Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch justify-center">
          {FEATURES.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 group shadow-sm ${darkMode
                  ? 'bg-[#251829] border-white/10 hover:border-accent-purple/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)]'
                  : 'bg-white border-[#E3DDE9]/60 hover:border-accent-purple/50 hover:shadow-[0_8px_30px_rgba(46,27,93,0.06)]'
                }`}
            >
              <div>
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${darkMode
                    ? 'bg-[#341738] text-accent-purple border border-white/10'
                    : 'bg-[#FAF6F0] text-primary border border-[#E3DDE9]'
                  }`}>
                  {getFeatureIcon(feat.iconName)}
                </div>

                {/* Feature Title */}
                <h3 className={`font-serif font-bold text-lg mb-2 leading-snug transition-colors ${darkMode ? 'text-white group-hover:text-accent-purple' : 'text-primary group-hover:text-[#2E1B5D]'
                  }`}>
                  {feat.title}
                </h3>

                {/* Feature Description */}
                <p className={`font-sans text-xs leading-relaxed ${darkMode ? 'text-white/60' : 'text-[#554466]'
                  }`}>
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        {t.footer && (
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <div className="w-16 h-0.5 bg-accent-purple/30 mx-auto mb-6" />
            <p className={`font-serif italic text-base sm:text-lg leading-relaxed ${darkMode ? 'text-white/80' : 'text-primary'
              }`}>
              "{t.footer}"
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
