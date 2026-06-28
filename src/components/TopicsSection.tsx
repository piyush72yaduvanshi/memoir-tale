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
  
  return (
    <section className="bg-[#2D1B36] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#3A2447] border border-[#8B5CF6]/30 rounded-full mb-4">
            <span className="text-[#A78BFA] text-xs font-semibold uppercase tracking-wider">
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
                className="bg-[#3A2447] border border-[#8B5CF6]/20 rounded-xl p-6 hover:border-[#8B5CF6]/60 hover:bg-[#4A2D5E] transition-all duration-300 group cursor-pointer"
              >
                <div className="h-14 w-14 rounded-full bg-[#2D1B36] border-2 border-[#8B5CF6]/40 flex items-center justify-center mb-4 group-hover:border-[#A78BFA] group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-7 w-7 text-[#A78BFA]" />
                </div>
                <h3 className="text-white font-serif font-semibold text-base mb-2 group-hover:text-[#A78BFA] transition-colors">
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
          <p className="text-[#A78BFA] text-sm font-semibold mb-4">
            {TRANSLATIONS[lang].topicsFooter}
          </p>
          <button
            onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' })}
            className="px-8 py-3 bg-transparent border-2 border-[#8B5CF6]/50 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/10 text-[#A78BFA] hover:text-white font-semibold rounded-full transition-all duration-300"
          >
            Discuss Your Story
          </button>
        </div>
      </div>
    </section>
  );
}


