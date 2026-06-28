import { 
  Flag, 
  Plane, 
  Briefcase, 
  Home, 
  Heart, 
  MapPin, 
  Shield, 
  BookOpen, 
  TrendingUp,
  Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data';

const TOPIC_ICONS = [Flag, Plane, Briefcase, Home, Heart, MapPin, Shield, BookOpen, TrendingUp, Users];

export default function TopicsSection() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].topics;
  const items = TRANSLATIONS[lang].topicItems;
  
  // Gradient colors for each topic card
  const gradientColors = [
    'from-purple-500/10 to-purple-600/5 hover:from-purple-500/20 hover:to-purple-600/10 border-purple-500/20 hover:border-purple-400',
    'from-blue-500/10 to-blue-600/5 hover:from-blue-500/20 hover:to-blue-600/10 border-blue-500/20 hover:border-blue-400',
    'from-amber-500/10 to-amber-600/5 hover:from-amber-500/20 hover:to-amber-600/10 border-amber-500/20 hover:border-amber-400',
    'from-rose-500/10 to-rose-600/5 hover:from-rose-500/20 hover:to-rose-600/10 border-rose-500/20 hover:border-rose-400',
    'from-pink-500/10 to-pink-600/5 hover:from-pink-500/20 hover:to-pink-600/10 border-pink-500/20 hover:border-pink-400',
    'from-teal-500/10 to-teal-600/5 hover:from-teal-500/20 hover:to-teal-600/10 border-teal-500/20 hover:border-teal-400',
    'from-emerald-500/10 to-emerald-600/5 hover:from-emerald-500/20 hover:to-emerald-600/10 border-emerald-500/20 hover:border-emerald-400',
    'from-indigo-500/10 to-indigo-600/5 hover:from-indigo-500/20 hover:to-indigo-600/10 border-indigo-500/20 hover:border-indigo-400',
    'from-orange-500/10 to-orange-600/5 hover:from-orange-500/20 hover:to-orange-600/10 border-orange-500/20 hover:border-orange-400',
    'from-cyan-500/10 to-cyan-600/5 hover:from-cyan-500/20 hover:to-cyan-600/10 border-cyan-500/20 hover:border-cyan-400',
  ];

  const iconColors = [
    'text-purple-400',
    'text-blue-400',
    'text-amber-400',
    'text-rose-400',
    'text-pink-400',
    'text-teal-400',
    'text-emerald-400',
    'text-indigo-400',
    'text-orange-400',
    'text-cyan-400',
  ];

  const borderColors = [
    'border-purple-500/40',
    'border-blue-500/40',
    'border-amber-500/40',
    'border-rose-500/40',
    'border-pink-500/40',
    'border-teal-500/40',
    'border-emerald-500/40',
    'border-indigo-500/40',
    'border-orange-500/40',
    'border-cyan-500/40',
  ];
  
  return (
    <section className="bg-[#2D1B36] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-full mb-4 backdrop-blur-sm">
            <span className="text-purple-300 text-xs font-semibold uppercase tracking-wider">
              {t.label}
            </span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
            {t.heading}
          </h2>
          <p className="text-white/60 text-sm lg:text-base max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((topic, index) => {
            const Icon = TOPIC_ICONS[index];
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${gradientColors[index]} rounded-xl p-6 border transition-all duration-300 group cursor-pointer backdrop-blur-sm`}
              >
                <div className={`h-14 w-14 rounded-full bg-[#2D1B36] border-2 ${borderColors[index]} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <Icon className={`h-7 w-7 ${iconColors[index]}`} />
                </div>
                <h3 className={`text-white font-serif font-semibold text-base mb-2 group-hover:${iconColors[index]} transition-colors`}>
                  {topic.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  {topic.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-purple-300 text-sm font-semibold mb-4">
            {TRANSLATIONS[lang].topicsFooter}
          </p>
          <button
            onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
          >
            Discuss Your Story
          </button>
        </div>
      </div>
    </section>
  );
}


