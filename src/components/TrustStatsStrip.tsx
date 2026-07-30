import { useState, useEffect, useRef } from 'react';
import { BookOpen, Globe, Star, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Stat {
  id: number;
  display: string;
  displayHi: string;
  label: string;
  labelHi: string;
  icon: any;
}

const STATS: Stat[] = [
  { 
    id: 1, 
    display: 'Hundreds of', 
    displayHi: 'सैकड़ों', 
    label: 'Stories Preserved', 
    labelHi: 'सहेजी गई कहानियां', 
    icon: BookOpen 
  },
  { 
    id: 2, 
    display: '12+', 
    displayHi: '12+', 
    label: 'Countries Served', 
    labelHi: 'देशों में सेवाएं', 
    icon: Globe 
  },
  { 
    id: 3, 
    display: '4.9★', 
    displayHi: '4.9★', 
    label: 'Client Satisfaction', 
    labelHi: 'ग्राहक संतुष्टि', 
    icon: Star 
  },
  { 
    id: 4, 
    display: '100%', 
    displayHi: '100%', 
    label: 'Confidential & Personalized', 
    labelHi: 'गोपनीय और व्यक्तिगत', 
    icon: ShieldCheck 
  },
];

export default function TrustStatsStrip() {
  const { lang } = useLanguage();
  const isHindi = lang === 'HI';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 lg:py-16 bg-gradient-to-b from-[#0F0C09] via-[#1A1410] to-[#0F0C09] border-y border-[#D4AF37]/30 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#D4AF37] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#E5C463] rounded-full blur-[120px]" />
      </div>

      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 paper-grain-dark opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            const displayVal = isHindi ? stat.displayHi : stat.display;
            const labelVal = isHindi ? stat.labelHi : stat.label;

            return (
              <div 
                key={stat.id} 
                className="text-center relative group"
                style={{
                  animation: isVisible ? `fade-in 0.6s ease-out ${index * 0.1}s forwards` : 'none',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <div className="flex flex-col items-center">
                  {/* Icon Container with Gold Glow */}
                  <div className="relative h-14 w-14 mb-4 transition-transform duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
                    <div className="relative h-full w-full rounded-full bg-[#2A211A] border-2 border-[#D4AF37]/50 flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                      <Icon className="h-6 w-6 text-[#E5C463]" />
                    </div>
                  </div>

                  {/* Stat Number / Display Text */}
                  <div className="font-serif text-3xl sm:text-4xl lg:text-4xl font-bold bg-gradient-to-br from-[#E5C463] via-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent mb-2 drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]">
                    {displayVal}
                  </div>

                  {/* Label */}
                  <p className="text-white/80 text-xs sm:text-sm font-sans font-semibold tracking-wide uppercase group-hover:text-[#E5C463] transition-colors">
                    {labelVal}
                  </p>

                  {/* Decorative Underline */}
                  <div className="mt-2 h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
                </div>

                {/* Enhanced Divider (except last item) */}
                {index < STATS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <div className="h-20 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Shine Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
    </section>
  );
}
