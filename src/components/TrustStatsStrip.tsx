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
      className="bg-[#1B101E] py-12 lg:py-16 border-y border-[#8B5CF6]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className="text-center relative"
                style={{
                  animation: isVisible ? `fade-in 0.6s ease-out ${index * 0.1}s forwards` : 'none',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-[#3A2447] border-2 border-[#8B5CF6]/40 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-[#A78BFA]" />
                  </div>
                  <div className="font-serif text-4xl lg:text-5xl font-bold text-[#A78BFA] mb-2">
                    {isVisible ? (
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </div>
                  <p className="text-white/60 text-sm font-sans font-semibold">
                    {stat.label}
                  </p>
                </div>

                {/* Divider (except last item) */}
                {index < STATS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 h-16 w-px bg-[#8B5CF6]/30" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
