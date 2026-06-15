import React, { useState } from "react";
import { Calendar, MapPin, Users, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import FadeIn from "./FadeIn";

// Import event images
import event1 from "../assets/event/WhatsApp Image 2026-06-09 at 2.16.21 PM.jpeg";
import event2 from "../assets/event/WhatsApp Image 2026-06-09 at 2.16.21 PM (1).jpeg";
import event3 from "../assets/event/WhatsApp Image 2026-06-09 at 2.16.21 PM (2).jpeg";
import event4 from "../assets/event/WhatsApp Image 2026-06-09 at 2.16.21 PM (3).jpeg";
import event5 from "../assets/event/WhatsApp Image 2026-06-09 at 2.16.21 PM (4).jpeg";
import event6 from "../assets/event/WhatsApp Image 2026-06-09 at 2.16.21 PM (5).jpeg";
import event7 from "../assets/event/WhatsApp Image 2026-06-09 at 2.16.21 PM (6).jpeg";
import event8 from "../assets/event/WhatsApp Image 2026-06-09 at 2.16.22 PM.jpeg";
import event9 from "../assets/event/WhatsApp Image 2026-06-09 at 2.16.22 PM (1).jpeg";
import event10 from "../assets/event/WhatsApp Image 2026-06-09 at 2.17.22 PM.jpeg";
import event11 from "../assets/event/WhatsApp Image 2026-06-09 at 2.17.22 PM (1).jpeg";
import event12 from "../assets/event/WhatsApp Image 2026-06-09 at 2.17.23 PM.jpeg";
import event13 from "../assets/event/WhatsApp Image 2026-06-09 at 2.17.23 PM (1).jpeg";

const EVENT_IMAGES = [
  event1, event2, event3, event4, event5, event6, event7,
  event8, event9, event10, event11, event12, event13
];

function EventCard({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="relative group overflow-hidden rounded-2xl border border-[#E3DDE9]/60 hover:border-[#8B5CF6]/60 shadow-[0_8px_30px_rgba(69,20,122,0.04)] hover:shadow-2xl cursor-pointer aspect-square transition-all duration-300 transform hover:-translate-y-2 bg-white select-none"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#FAF6F0] animate-pulse flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-[#8B5CF6]/40 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
      )}
      
      <img
        src={src}
        alt={`Event moment ${index + 1}`}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#190F26]/95 via-[#190F26]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-350 ease-out">
          <div className="w-12 h-[2px] bg-[#8B5CF6] rounded mb-3" />
          <p className="font-sans text-xs text-white/80 uppercase tracking-wide">
            {index + 1} / {EVENT_IMAGES.length}
          </p>
        </div>
      </div>
    </div>
  );
}

function LightboxImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#8B5CF6]/5">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-[#8B5CF6] border-r-transparent border-b-[#8B5CF6] border-l-transparent" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`max-h-[60vh] sm:max-h-[70vh] object-contain mx-auto transition-all duration-350 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />
    </div>
  );
}

export default function EventSection() {
  const { lang } = useLanguage();
  const isHindi = lang === "HI";
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const lastScrollPosRef = React.useRef<number>(0);

  // Lock body scroll when lightbox is open
  React.useEffect(() => {
    if (activeImageIndex !== null) {
      lastScrollPosRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (lastScrollPosRef.current !== 0) {
        const targetScroll = lastScrollPosRef.current;
        requestAnimationFrame(() => {
          window.scrollTo({
            top: targetScroll,
            behavior: "auto"
          });
        });
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImageIndex]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev! + 1) % EVENT_IMAGES.length);
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev! - 1 + EVENT_IMAGES.length) % EVENT_IMAGES.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex]);

  const labels = {
    label: isHindi ? "हमारे आयोजन" : "OUR EVENTS",
    heading: isHindi ? "यादगार पलों की झलकियां" : "Memorable Moments Captured",
    subtitle: isHindi 
      ? "हमारे विशेष कार्यक्रमों और समारोहों से कुछ खूबसूरत पल जहां हम परिवारों को उनकी यादों को संजोने में मदद करते हैं"
      : "Beautiful moments from our special events and celebrations where we help families preserve their precious memories",
    eventDate: isHindi ? "9 जून 2026" : "June 9, 2026",
    eventLocation: isHindi ? "मेमोयरटेल कार्यक्रम" : "MemoirTale Event",
    eventAttendees: isHindi ? "परिवार और मित्र" : "Families & Friends",
    viewAll: isHindi ? "सभी तस्वीरें देखें" : "View All Photos",
    close: isHindi ? "बंद करें" : "Close",
    back: isHindi ? "← गैलरी पर वापस" : "← Back to Gallery",
    proTip: isHindi ? "💡 सुझाव: बदलने के लिए ← और → कुंजियों का उपयोग करें" : "💡 Pro tip: Use ← and → arrows to navigate",
    escTip: isHindi ? "Esc दबाएं बंद करने के लिए" : "Press Esc to close"
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % EVENT_IMAGES.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + EVENT_IMAGES.length) % EVENT_IMAGES.length);
  };

  return (
    <section
      id="events"
      className="bg-[#FCFBF7] py-20 lg:py-28 text-[#190F26] relative overflow-hidden border-b border-[#E3DDE9]/40"
    >
      {/* Background decorative elements */}
      <div className="absolute top-[10%] right-[-80px] w-96 h-96 bg-[#8B5CF6]/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-80px] w-80 h-80 bg-[#8B3CDC]/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-[60px] h-[3px] bg-[#8B5CF6] rounded-[2px] mb-4" />
            <span className="font-sans font-semibold text-[11px] uppercase tracking-[3px] text-[#8B5CF6] mb-3 flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {labels.label}
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4.5xl lg:text-[48px] text-[#190F26] tracking-tight leading-tight">
              {labels.heading}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#554466] mt-4 max-w-2xl leading-relaxed">
              {labels.subtitle}
            </p>
          </div>
        </FadeIn>

        {/* Event Info Bar */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full border border-[#E3DDE9]/60 shadow-sm">
              <Calendar className="h-4 w-4 text-[#8B5CF6]" />
              <span className="font-sans text-sm font-medium text-[#190F26]">{labels.eventDate}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full border border-[#E3DDE9]/60 shadow-sm">
              <MapPin className="h-4 w-4 text-[#8B5CF6]" />
              <span className="font-sans text-sm font-medium text-[#190F26]">{labels.eventLocation}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full border border-[#E3DDE9]/60 shadow-sm">
              <Users className="h-4 w-4 text-[#8B5CF6]" />
              <span className="font-sans text-sm font-medium text-[#190F26]">{labels.eventAttendees}</span>
            </div>
          </div>
        </FadeIn>

        {/* Event Images Grid */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[460px] transition-all duration-500">
            {EVENT_IMAGES.map((image, index) => (
              <EventCard 
                key={index}
                src={image}
                index={index}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
        </FadeIn>

        {/* View All CTA */}
        <FadeIn delay={0.25}>
          <div className="flex justify-center mt-12 w-full">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveImageIndex(0);
              }}
              className="px-8 py-3.5 rounded-full border border-[#8B5CF6] text-[#8B5CF6] font-sans font-bold text-sm hover:bg-[#8B5CF6] hover:text-[#FCFBF7] transition-all duration-300 shadow-[0_4px_12px_rgba(139,92,246,0.05)] hover:shadow-[0_8px_24px_rgba(139,92,246,0.2)] cursor-pointer hover:scale-105 select-none"
            >
              {labels.viewAll} ({EVENT_IMAGES.length}) →
            </button>
          </div>
        </FadeIn>

        {/* Fullscreen Lightbox Modal */}
        {activeImageIndex !== null && (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveImageIndex(null);
            }}
            className="fixed inset-0 bg-black/98 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4 animate-fade-in"
          >
            <div className="relative max-w-5xl w-full flex flex-col items-center">
              
              {/* Top Navigation Bar */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl flex items-center justify-between mb-4 px-2 sm:px-0 z-50 select-none"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveImageIndex(null);
                  }}
                  className="px-5 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans font-bold text-xs rounded-full transition-all duration-200 cursor-pointer shadow-[0_4px_16px_rgba(139,92,246,0.3)] flex items-center space-x-1.5 hover:scale-105 active:scale-95"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>{labels.back}</span>
                </button>

                <div className="flex items-center space-x-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-white font-mono text-xs font-semibold backdrop-blur-sm select-none">
                  <span className="text-[#8B5CF6] font-bold uppercase tracking-wider">
                    {isHindi ? "कार्यक्रम" : "EVENT"}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/90">
                    {activeImageIndex + 1} / {EVENT_IMAGES.length}
                  </span>
                </div>
              </div>

              {/* Main Image Display */}
              <div className="relative w-full aspect-video sm:h-[65vh] flex items-center justify-center">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-[-70px] text-white/85 hover:text-[#8B5CF6] hover:bg-white/10 bg-black/40 p-3 sm:p-4 rounded-full transition-all cursor-pointer z-30"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                </button>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-h-full max-w-full rounded-2xl border border-white/25 overflow-hidden bg-black shadow-2xl flex items-center justify-center w-full h-full"
                >
                  <LightboxImage
                    src={EVENT_IMAGES[activeImageIndex]}
                    alt={`Event moment ${activeImageIndex + 1}`}
                  />
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-[-70px] text-white/85 hover:text-[#8B5CF6] hover:bg-white/10 bg-black/40 p-3 sm:p-4 rounded-full transition-all cursor-pointer z-30"
                  aria-label="Next Image"
                >
                  <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="flex justify-center gap-2 mt-4 overflow-x-auto py-1 max-w-full px-4 scrollbar-none"
              >
                {EVENT_IMAGES.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer shrink-0 ${
                      index === activeImageIndex
                        ? "border-[#8B5CF6] scale-110 shadow-lg shadow-[#8B5CF6]/20"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Bottom Info Card */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl mt-5 p-5 sm:p-6 bg-[#190F26] border border-[#8B5CF6]/30 rounded-2xl text-left shadow-2xl mx-auto select-none"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-[#8B5CF6] animate-pulse" />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#8B5CF6] uppercase bg-[#8B5CF6]/10 px-2 py-0.5 rounded border border-[#8B5CF6]/20">
                      {labels.eventDate}
                    </span>
                  </div>
                  <span className="text-xs text-white/50 font-mono font-bold">
                    {activeImageIndex + 1} {isHindi ? "का" : "of"} {EVENT_IMAGES.length}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg sm:text-2xl text-[#FCFBF7] tracking-tight">
                    {labels.heading}
                  </h3>
                  <p className="text-[#8B5CF6] font-sans font-medium text-xs sm:text-sm tracking-wide">
                    {labels.eventLocation}
                  </p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-white/80 mt-3.5 leading-relaxed border-t border-white/5 pt-3.5">
                  {labels.subtitle}
                </p>

                {/* Keyboard Tips */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                  <div className="text-[10px] text-white/45 font-mono space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#8B5CF6]">💡</span> {labels.proTip}
                    </div>
                    <div>
                      <span className="text-[#8B5CF6]">⌨️</span> {labels.escTip}
                    </div>
                  </div>
                  
                  <span className="text-[9px] uppercase tracking-wider font-mono text-[#8B5CF6]/70 font-semibold bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 px-2 py-1 rounded inline-block self-start sm:self-auto">
                    {isHindi ? "मेमोयरटेल" : "MEMOIRTALE"}
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
