import { motion } from 'motion/react';
import { FEATURES, TRANSLATIONS } from '../data';
import { 
  Users, Layout, Award, Sparkles, Volume2, 
  Palette, MapPin, Languages, Truck, Laptop, Lock 
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
      case 'Layout':
        return <Layout className="w-6 h-6 shrink-0" />;
      case 'Award':
        return <Award className="w-6 h-6 shrink-0" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 shrink-0" />;
      case 'Volume2':
        return <Volume2 className="w-6 h-6 shrink-0" />;
      case 'Palette':
        return <Palette className="w-6 h-6 shrink-0" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 shrink-0" />;
      case 'Languages':
        return <Languages className="w-6 h-6 shrink-0" />;
      case 'Truck':
        return <Truck className="w-6 h-6 shrink-0" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 shrink-0" />;
      case 'Lock':
        return <Lock className="w-6 h-6 shrink-0" />;
      default:
        return <Award className="w-6 h-6 shrink-0" />;
    }
  };

  return (
    <section 
      id="features-section"
      className={`py-20 md:py-28 transition-colors duration-500 relative overflow-hidden ${
        darkMode ? 'bg-[#1b101e] border-y border-white/5' : 'bg-[#faf7f0]'
      }`}
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none paper-grain" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-accent-purple-light dark:text-accent-purple block mb-3">
            {t.label}
          </span>
          <h2 className={`font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight ${
            darkMode ? 'text-[#f2e9d2]' : 'text-primary'
          }`}>
            {t.heading}
          </h2>
          <p className={`mt-4 font-sans text-xs md:text-sm leading-relaxed ${
            darkMode ? 'text-white/60' : 'text-text-muted'
          }`}>
            {t.subtitle}
          </p>
        </div>

        {/* 11 Icons Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-11 gap-6 items-start justify-center">
          {FEATURES.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center group cursor-help text-center"
              title={feat.description}
            >
              
              {/* Circular hovercard container */}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 relative border ${
                darkMode
                  ? 'bg-[#251829] border-white/5 text-accent-purple group-hover:border-accent-purple group-hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                  : 'bg-white border-accent-purple/20 text-primary group-hover:border-accent-purple group-hover:text-accent-purple group-hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]'
              }`}>
                {getFeatureIcon(feat.iconName)}
                
                {/* Decorative golden ring on hover */}
                <div className="absolute inset-0.5 rounded-full border border-dashed border-accent-purple/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Title label */}
              <span className={`font-sans font-bold text-[11px] uppercase tracking-wide leading-tight px-1 transition-colors duration-200 ${
                darkMode ? 'text-white group-hover:text-accent-purple' : 'text-primary group-hover:text-accent-purple'
              }`}>
                {feat.title}
              </span>
              
              {/* Micro-tooltip like sub-caption representing details */}
              <span className={`hidden sm:block text-[9px] font-sans mt-1 leading-normal transition-opacity duration-300 select-none max-w-[100px] text-center ${
                darkMode ? 'text-[#7e6f80] group-hover:text-white/60' : 'text-text-muted group-hover:text-primary/75'
              }`}>
                {feat.id.split('-').join(' ')}
              </span>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
