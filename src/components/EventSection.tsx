import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Users, X, ChevronLeft, ChevronRight, Sparkles, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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

function LightboxImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#2E1B5D]/5">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-[#2E1B5D] border-r-transparent border-b-[#2E1B5D] border-l-transparent" />
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const lastScrollPosRef = React.useRef<number>(0);

  // Responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const maxIndex = Math.max(0, EVENT_IMAGES.length - itemsPerPage);

  const slideNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const slidePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Lock body scroll when lightbox is open
  useEffect(() => {
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

  const labels = {
    label: isHindi ? "विशेष कार्यक्रम एवं अनावरण" : "SPECIAL EVENT & UNVEILING",
    heading: isHindi ? "मेमोयर टेल का भव्य उद्घाटन" : "Grand Inauguration of Memoir Tale",
    subtitle: isHindi
      ? "बुंदेलखंड विश्वविद्यालय, झाँसी में आयोजित हमारे आधिकारिक उद्घाटन समारोह के कुछ यादगार पल, जहाँ मुख्य अतिथि श्री योगेन्द्र उपाध्याय जी (उच्च शिक्षा मंत्री, उत्तर प्रदेश) ने अपनी उपस्थिति से कार्यक्रम की शोभा बढ़ाई।"
      : "Memorable moments from our official inauguration at Bundelkhand University, Jhansi, graced by Chief Guest Shri Yogendra Upadhyaya Ji (Cabinet Minister of Higher Education, Govt of UP).",
    eventDate: isHindi ? "9 जून 2026" : "June 9, 2026",
    eventLocation: isHindi ? "झाँसी, उत्तर प्रदेश" : "Jhansi, Uttar Pradesh",
    eventAttendees: isHindi ? "200+ प्रतिष्ठित अतिथि" : "200+ Distinguished Guests",
    viewAll: isHindi ? "सभी तस्वीरें देखें" : "Explore Event Gallery",
    back: isHindi ? "गैलरी पर वापस" : "Back to Gallery",
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % EVENT_IMAGES.length : 0));
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + EVENT_IMAGES.length) % EVENT_IMAGES.length : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex]);

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

  const gap = 20;
  const translatePercent = (currentIndex * 100) / itemsPerPage;

  return (
    <section
      id="events"
      className="bg-[#FCFBF7] py-16 md:py-24 text-[#190F26] relative overflow-hidden border-b border-[#E3DDE9]/40"
    >
      {/* Background decorative elements */}
      <div className="absolute top-[10%] right-[-80px] w-96 h-96 bg-[#2E1B5D]/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-80px] w-80 h-80 bg-[#8B3CDC]/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section with Navigation Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="text-left max-w-2xl">
            <span className="font-sans font-semibold text-[11px] uppercase tracking-[3px] text-[#2E1B5D] mb-3 flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {labels.label}
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[44px] text-[#190F26] tracking-tight leading-tight">
              {labels.heading}
            </h2>
            <p className="font-sans text-xs md:text-sm text-[#554466] mt-3 max-w-2xl leading-relaxed">
              {labels.subtitle}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
            <button
              onClick={slidePrev}
              aria-label="Previous Photo"
              className="w-11 h-11 rounded-full border border-[#E2D8E8] hover:border-[#2E1B5D] text-[#190F26] hover:bg-white bg-white hover:shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={slideNext}
              aria-label="Next Photo"
              className="w-11 h-11 rounded-full border border-[#E2D8E8] hover:border-[#2E1B5D] text-[#190F26] hover:bg-white bg-white hover:shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Event Info Bar */}
        <div className="flex flex-wrap justify-start sm:justify-center gap-3 sm:gap-6 mb-8">
          <div className="flex items-center gap-2 bg-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#E3DDE9]/60 shadow-sm text-xs sm:text-sm">
            <Calendar className="h-3.5 w-3.5 text-[#2E1B5D]" />
            <span className="font-sans font-medium text-[#190F26]">{labels.eventDate}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#E3DDE9]/60 shadow-sm text-xs sm:text-sm">
            <MapPin className="h-3.5 w-3.5 text-[#2E1B5D]" />
            <span className="font-sans font-medium text-[#190F26]">{labels.eventLocation}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#E3DDE9]/60 shadow-sm text-xs sm:text-sm">
            <Users className="h-3.5 w-3.5 text-[#2E1B5D]" />
            <span className="font-sans font-medium text-[#190F26]">{labels.eventAttendees}</span>
          </div>
        </div>

        {/* Compact Slideshow Area */}
        <div className="relative overflow-hidden w-full rounded-2xl pt-1 pb-4">
          <motion.div
            animate={{ x: `calc(-${translatePercent}% - ${(currentIndex * gap) / itemsPerPage}px)` }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="flex gap-5 w-full"
          >
            {EVENT_IMAGES.map((image, index) => (
              <div
                key={index}
                className="shrink-0 flex flex-col cursor-pointer"
                style={{
                  width: `calc((100% - ${(itemsPerPage - 1) * gap}px) / ${itemsPerPage})`,
                }}
                onClick={() => setActiveImageIndex(index)}
              >
                <div className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#E9E1EE] hover:border-[#2E1B5D]/40 bg-white transition-all duration-300 transform hover:-translate-y-1.5">
                  <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#FAF6F0]">
                    <img
                      src={image}
                      alt={`Event moment ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 select-none"
                      loading="lazy"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#190F26]/90 via-[#190F26]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] uppercase tracking-widest text-white font-mono font-bold bg-[#2E1B5D]/90 border border-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                          {index + 1} / {EVENT_IMAGES.length}
                        </span>
                        <div className="bg-[#2E1B5D] p-1.5 rounded-full text-white shadow-lg">
                          <Maximize2 className="h-3.5 w-3.5" />
                        </div>
                      </div>

                      <div className="text-left">
                        <span className="font-sans text-[10px] text-white/80 uppercase tracking-wider block">
                          Click to inspect full photo
                        </span>
                      </div>
                    </div>

                    {/* Tag badge */}
                    <div className="absolute top-3 left-3 group-hover:opacity-0 transition-opacity duration-200">
                      <span className="py-1 px-2.5 bg-[#2E1B5D]/85 backdrop-blur-md rounded-full border border-white/20 text-[9px] uppercase tracking-widest font-sans font-bold text-white shadow-sm">
                        Photo {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 text-left">
                    <h3 className="font-serif font-bold text-sm text-[#190F26] line-clamp-1 group-hover:text-[#2E1B5D] transition-colors">
                      Inauguration Moment {index + 1}
                    </h3>
                    <p className="font-sans text-[11px] text-[#554466] mt-0.5">
                      Bundelkhand University • June 2026
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? "w-7 h-2 bg-[#2E1B5D]"
                  : "w-2 h-2 bg-[#E3DDE9] hover:bg-[#2E1B5D]/40"
              }`}
            />
          ))}
        </div>

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
                  className="px-5 py-2.5 bg-[#2E1B5D] hover:bg-[#1F1240] text-white font-sans font-bold text-xs rounded-full transition-all duration-200 cursor-pointer shadow-[0_4px_16px_rgba(139,92,246,0.3)] flex items-center space-x-1.5 hover:scale-105 active:scale-95"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>{labels.back}</span>
                </button>

                <div className="flex items-center space-x-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-white font-mono text-xs font-semibold backdrop-blur-sm select-none">
                  <span className="text-[#E5C463] font-bold uppercase tracking-wider">
                    {isHindi ? "कार्यक्रम" : "EVENT"}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/90">
                    {activeImageIndex + 1} / {EVENT_IMAGES.length}
                  </span>
                </div>
              </div>

              {/* Main Image Display */}
              <div className="relative w-full flex items-center justify-center min-h-[350px] sm:min-h-[500px]">
                {/* Prev Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-[-20px] lg:left-[-60px] text-white hover:text-[#E5C463] hover:bg-black/80 bg-black/50 border border-white/20 p-3 sm:p-4 rounded-full transition-all cursor-pointer z-30 shadow-2xl backdrop-blur-sm active:scale-95"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
                </button>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-h-[60vh] sm:max-h-[70vh] rounded-2xl overflow-hidden bg-black/40 shadow-2xl flex items-center justify-center border border-white/10"
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
                  className="absolute right-2 sm:right-[-20px] lg:right-[-60px] text-white hover:text-[#E5C463] hover:bg-black/80 bg-black/50 border border-white/20 p-3 sm:p-4 rounded-full transition-all cursor-pointer z-30 shadow-2xl backdrop-blur-sm active:scale-95"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
                </button>
              </div>

              {/* Thumbnails Strip */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex justify-center gap-2 mt-4 overflow-x-auto py-2 max-w-full px-4 scrollbar-none"
              >
                {EVENT_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer shrink-0 ${
                      idx === activeImageIndex
                        ? "border-[#E5C463] scale-110 shadow-lg"
                        : "border-white/20 opacity-40 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Bottom Caption */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="text-center mt-3 text-white/70 text-xs font-sans"
              >
                <span>💡 {isHindi ? "तस्वीरें बदलने के लिए ← → तीर कुंजियों का उपयोग करें" : "Use ← → arrow keys to navigate"} • {isHindi ? "बंद करने के लिए Esc दबाएं" : "Press Esc to exit"}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
