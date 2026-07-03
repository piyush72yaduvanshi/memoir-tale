import { useState, useEffect, useRef } from 'react';
import { BookOpen, Globe, Star, Award } from 'lucide-react';

interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
  icon: any;
}

const STATS: Stat[] = [
  { id: 1, value: 500, suffix: '+', label: 'Books Published', icon: BookOpen },
  { id: 2, value: 12, suffix: '+', label: 'Countries Delivered', icon: Globe },
  { id: 3, value: 4.9, suffix: '★', label: 'Client Rating', icon: Star },
  { id: 4, value: 15, suffix: '+', label: 'Years Experience', icon: Award },
];

function CountUp({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const current = easeOutQuart * end;
      
      countRef.current = current;
      setCount(current);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  const displayValue = end % 1 !== 0 ? count.toFixed(1) : Math.floor(count);
  
  return <span>{displayValue}{suffix}</span>;
}

export default function TrustStatsStrip() {
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
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#D4AF37] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#E5C463] rounded-full blur-[120px]"></div>
      </div>

      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 paper-grain-dark opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
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
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] opacity-20 blur-md group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative h-full w-full rounded-full bg-[#2A211A] border-2 border-[#D4AF37]/50 flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                      <Icon className="h-6 w-6 text-[#E5C463]" />
                    </div>
                  </div>

                  {/* Stat Number */}
                  <div className="font-serif text-4xl lg:text-5xl font-bold bg-gradient-to-br from-[#E5C463] via-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent mb-2 drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]">
                    {isVisible ? (
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </div>

                  {/* Label */}
                  <p className="text-white/70 text-sm font-sans font-semibold tracking-wide uppercase group-hover:text-[#E5C463]/90 transition-colors">
                    {stat.label}
                  </p>

                  {/* Decorative Underline */}
                  <div className="mt-2 h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>
                </div>

                {/* Enhanced Divider (except last item) */}
                {index < STATS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <div className="h-20 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Shine Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
    </section>
  );
}


