import { 
  Users, 
  BookOpen, 
  UserCheck, 
  Compass, 
  Heart, 
  TrendingUp, 
  Building2, 
  History, 
  Sparkles, 
  Shield, 
  GraduationCap, 
  Landmark 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data';

const TOPIC_ICONS = [
  Users, 
  BookOpen, 
  UserCheck, 
  Compass, 
  Heart, 
  TrendingUp, 
  Building2, 
  History, 
  Sparkles, 
  Shield, 
  GraduationCap, 
  Landmark
];

export default function TopicsSection() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].topics;
  const items = TRANSLATIONS[lang].topicItems;
  
  // Gradient colors for each of the 12 topic cards
  const gradientColors = [
    'from-purple-500/10 to-purple-600/5 hover:from-purple-500/20 hover:to-purple-600/10 border-purple-500/20 hover:border-purple-400',
    'from-blue-500/10 to-blue-600/5 hover:from-blue-500/20 hover:to-blue-600/10 border-blue-500/20 hover:border-blue-400',
    'from-amber-500/10 to-amber-600/5 hover:from-amber-500/20 hover:to-amber-600/10 border-amber-500/20 hover:border-amber-400',
    'from-emerald-500/10 to-emerald-600/5 hover:from-emerald-500/20 hover:to-emerald-600/10 border-emerald-500/20 hover:border-emerald-400',
    'from-rose-500/10 to-rose-600/5 hover:from-rose-500/20 hover:to-rose-600/10 border-rose-500/20 hover:border-rose-400',
    'from-orange-500/10 to-orange-600/5 hover:from-orange-500/20 hover:to-orange-600/10 border-orange-500/20 hover:border-orange-400',
    'from-indigo-500/10 to-indigo-600/5 hover:from-indigo-500/20 hover:to-indigo-600/10 border-indigo-500/20 hover:border-indigo-400',
    'from-teal-500/10 to-teal-600/5 hover:from-teal-500/20 hover:to-teal-600/10 border-teal-500/20 hover:border-teal-400',
    'from-pink-500/10 to-pink-600/5 hover:from-pink-500/20 hover:to-pink-600/10 border-pink-500/20 hover:border-pink-400',
    'from-cyan-500/10 to-cyan-600/5 hover:from-cyan-500/20 hover:to-cyan-600/10 border-cyan-500/20 hover:border-cyan-400',
    'from-yellow-500/10 to-yellow-600/5 hover:from-yellow-500/20 hover:to-yellow-600/10 border-yellow-500/20 hover:border-yellow-400',
    'from-violet-500/10 to-violet-600/5 hover:from-violet-500/20 hover:to-violet-600/10 border-violet-500/20 hover:border-violet-400',
  ];

  const iconColors = [
    'text-purple-400',
    'text-blue-400',
    'text-amber-400',
    'text-emerald-400',
    'text-rose-400',
    'text-orange-400',
    'text-indigo-400',
    'text-teal-400',
    'text-pink-400',
    'text-cyan-400',
    'text-yellow-400',
    'text-violet-400',
  ];

  const borderColors = [
    'border-purple-500/40',
    'border-blue-500/40',
    'border-amber-500/40',
    'border-emerald-500/40',
    'border-rose-500/40',
    'border-orange-500/40',
    'border-indigo-500/40',
    'border-teal-500/40',
    'border-pink-500/40',
    'border-cyan-500/40',
    'border-yellow-500/40',
    'border-violet-500/40',
  ];
  
  return (
    <section className="bg-[#220E24] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-full mb-4 backdrop-blur-sm">
            <span className="text-purple-300 text-xs font-semibold uppercase tracking-wider">
              {t.label}
            </span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
            {t.heading}
          </h2>
          <p className="text-white/70 text-sm lg:text-base max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 12 Story Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((topic: { title: string; description: string }, index: number) => {
            const Icon = TOPIC_ICONS[index % TOPIC_ICONS.length];
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${gradientColors[index % gradientColors.length]} rounded-xl p-6 border transition-all duration-300 group cursor-pointer backdrop-blur-sm hover:scale-[1.02] flex flex-col justify-between`}
              >
                <div>
                  <div className={`h-12 w-12 rounded-full bg-[#220E24] border-2 ${borderColors[index % borderColors.length]} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <Icon className={`h-6 w-6 ${iconColors[index % iconColors.length]}`} />
                  </div>
                  <h3 className={`text-white font-serif font-semibold text-base mb-2 group-hover:${iconColors[index % iconColors.length]} transition-colors`}>
                    {topic.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Statement & CTA */}
        <div className="mt-14 text-center max-w-3xl mx-auto">
          <p className="text-purple-200 text-sm sm:text-base font-sans leading-relaxed mb-6 italic">
            "{TRANSLATIONS[lang].topicsFooter}"
          </p>
          <button
            onClick={() => {
              const contactElem = document.getElementById('contact');
              if (contactElem) {
                contactElem.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-3.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-sans font-bold text-xs uppercase tracking-[2px] rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105 cursor-pointer"
          >
            {lang === "HI" ? "अपनी कहानी शुरू करें →" : "Start Your Story →"}
          </button>
        </div>
      </div>
    </section>
  );
}
