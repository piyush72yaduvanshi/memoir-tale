import React, { useState, useEffect, useRef } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles, BookOpen, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GALLERY_ITEMS } from "../data";
import { useLanguage } from "../context/LanguageContext";

type FilterCategory = "ALL" | "LIFE_MEMOIRS" | "FAMILY_LEGACIES" | "TRAVEL_JOURNALS" | "FOUNDER_STORIES" | "TRIBUTE_BOOKS" | "COFFEE_TABLE";

interface GallerySectionProps {
  darkMode?: boolean;
}

function TheaterImage({ src, alt }: { src: string; alt: string }) {
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
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        className={`max-h-[45vh] sm:max-h-[58vh] object-contain mx-auto transition-all duration-350 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />
    </div>
  );
}

export default function GallerySection({ darkMode = false }: GallerySectionProps) {
  const { lang } = useLanguage();
  const isHindi = lang === "HI";
  const [activeImageId, setActiveImageId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const lastScrollPosRef = useRef<number>(0);

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

  const labels = {
    portfolio: isHindi ? "वास्तविक कहानियां। स्थायी विरासत। ⭐" : "REAL STORIES. LASTING LEGACIES. ⭐",
    heading: isHindi ? "कहानियां जिन्हें सहेजने का हमें सौभाग्य मिला" : "Stories We've Had the Privilege to Preserve",
    desc: isHindi
      ? "प्रत्येक प्रोजेक्ट एक गहराई से व्यक्तिगत यात्रा है। विचारपूर्वक बनाई गई विरासत पुस्तकों और संस्मरणों के चयन को एक्सप्लोर करें।"
      : "Every project is a deeply personal journey. Explore a curated selection of memoirs, legacy books, and bespoke storytelling experiences.",
    all: isHindi ? "सभी प्रोजेक्ट्स" : "All Projects",
    lifeMemoirs: isHindi ? "जीवन संस्मरण" : "Life Memoirs",
    familyLegacies: isHindi ? "पारिवारिक विरासत" : "Family Legacies",
    travelJournals: isHindi ? "यात्रा संस्मरण" : "Travel Journals",
    founderStories: isHindi ? "संस्थापक गाथाएं" : "Founder Stories",
    tributeBooks: isHindi ? "श्रद्धांजलि पुस्तकें" : "Tribute Books",
    coffeeTable: isHindi ? "कॉफी टेबल बुक्स" : "Coffee Table Books",
    empty: isHindi ? "आपकी चुनी हुई श्रेणी के लिए कोई चित्र उपलब्ध नहीं है।" : "No items match your category selection.",
    zoomTip: isHindi ? "विस्तार से देखने के लिए क्लिक करें" : "Click to inspect full details & zoom",
  };

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === "ALL") return true;
    return item.category === activeCategory;
  });

  const maxIndex = Math.max(0, filteredItems.length - itemsPerPage);

  // Reset index if filtered items change
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Next / Prev slide handlers
  const slideNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const slidePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Lock body scroll and restore previous scroll position on lightbox open
  useEffect(() => {
    if (activeImageId !== null) {
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
  }, [activeImageId]);

  const activeItem = GALLERY_ITEMS.find((item) => item.id === activeImageId);

  // Keyboard accessibility for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageId === null) return;
      if (e.key === "Escape") {
        setActiveImageId(null);
      } else if (e.key === "ArrowRight") {
        const idx = filteredItems.findIndex((item) => item.id === activeImageId);
        if (idx !== -1) {
          const nextIndex = (idx + 1) % filteredItems.length;
          setActiveImageId(filteredItems[nextIndex].id);
        }
      } else if (e.key === "ArrowLeft") {
        const idx = filteredItems.findIndex((item) => item.id === activeImageId);
        if (idx !== -1) {
          const prevIndex = (idx - 1 + filteredItems.length) % filteredItems.length;
          setActiveImageId(filteredItems[prevIndex].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageId, filteredItems]);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeImageId === null) return;
    const idx = filteredItems.findIndex((item) => item.id === activeImageId);
    if (idx === -1) return;
    const nextIndex = (idx + 1) % filteredItems.length;
    setActiveImageId(filteredItems[nextIndex].id);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeImageId === null) return;
    const idx = filteredItems.findIndex((item) => item.id === activeImageId);
    if (idx === -1) return;
    const prevIndex = (idx - 1 + filteredItems.length) % filteredItems.length;
    setActiveImageId(filteredItems[prevIndex].id);
  };

  const gap = 20;
  const translatePercent = (currentIndex * 100) / itemsPerPage;

  return (
    <section
      id="gallery"
      className={`py-16 md:py-24 relative overflow-hidden transition-colors duration-500 border-b ${
        darkMode ? "bg-[#180A1F] text-[#F5F0F8] border-white/10" : "bg-[#FCFBF7] text-[#190F26] border-[#E3DDE9]/50"
      }`}
    >
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-80px] w-96 h-96 bg-[#8B3CDC]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-80px] w-80 h-80 bg-[#2E1B5D]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Block with Prev / Next Slide Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="text-left max-w-2xl">
            <span className={`font-sans text-[11px] font-bold tracking-[3px] uppercase block mb-3 ${
              darkMode ? "text-[#E5C463]" : "text-[#2E1B5D]"
            }`}>
              {labels.portfolio}
            </span>
            <h2 className={`font-serif font-bold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-tight ${
              darkMode ? "text-white" : "text-[#190F26]"
            }`}>
              {labels.heading}
            </h2>
            <p className={`font-sans text-xs md:text-sm mt-3 leading-relaxed max-w-2xl ${
              darkMode ? "text-white/70" : "text-[#554466]"
            }`}>
              {labels.desc}
            </p>
          </div>

          {/* Navigation Chevron Controls */}
          {filteredItems.length > itemsPerPage && (
            <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
              <button
                onClick={slidePrev}
                aria-label="Previous Photo"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-95 ${
                  darkMode
                    ? "border-white/15 hover:border-[#9D75D4] text-white hover:bg-[#341A47] bg-[#22102e]"
                    : "border-[#E2D8E8] hover:border-[#2E1B5D] text-[#190F26] hover:bg-white bg-white hover:shadow-md"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={slideNext}
                aria-label="Next Photo"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-95 ${
                  darkMode
                    ? "border-white/15 hover:border-[#9D75D4] text-white hover:bg-[#341A47] bg-[#22102e]"
                    : "border-[#E2D8E8] hover:border-[#2E1B5D] text-[#190F26] hover:bg-white bg-white hover:shadow-md"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-start sm:justify-center flex-wrap gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "ALL", label: labels.all },
            { id: "LIFE_MEMOIRS", label: labels.lifeMemoirs },
            { id: "FAMILY_LEGACIES", label: labels.familyLegacies },
            { id: "TRAVEL_JOURNALS", label: labels.travelJournals },
            { id: "FOUNDER_STORIES", label: labels.founderStories },
            { id: "TRIBUTE_BOOKS", label: labels.tributeBooks },
            { id: "COFFEE_TABLE", label: labels.coffeeTable },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as FilterCategory);
                setActiveImageId(null);
              }}
              className={`px-4 py-2 rounded-full font-sans text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? darkMode
                    ? "bg-[#D4AF37] text-[#190F26] shadow-md scale-105"
                    : "bg-[#2E1B5D] text-white shadow-[0_4px_16px_rgba(46,27,93,0.3)] scale-105"
                  : darkMode
                  ? "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                  : "bg-white hover:bg-[#FAF6F0] border border-[#E3DDE9]/70 text-[#190F26]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Compact Slideshow Carousel Area */}
        <div
          className="relative overflow-hidden w-full rounded-2xl pt-1 pb-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {filteredItems.length > 0 ? (
            <motion.div
              animate={{ x: `calc(-${translatePercent}% - ${(currentIndex * gap) / itemsPerPage}px)` }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
              className="flex gap-5 w-full"
            >
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="shrink-0 flex flex-col cursor-pointer"
                  style={{
                    width: `calc((100% - ${(itemsPerPage - 1) * gap}px) / ${itemsPerPage})`,
                  }}
                  onClick={() => setActiveImageId(item.id)}
                >
                  <div
                    className={`group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border flex flex-col justify-between h-full transition-all duration-300 transform hover:-translate-y-1.5 ${
                      darkMode
                        ? "bg-[#22122b] border-white/10 hover:border-[#9D75D4]/60"
                        : "bg-white border-[#E9E1EE] hover:border-[#2E1B5D]/40"
                    }`}
                  >
                    {/* Image Frame */}
                    <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#FAF6F0]">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 select-none"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#190F26]/90 via-[#190F26]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] uppercase tracking-widest text-white font-mono font-bold bg-[#2E1B5D]/90 border border-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                            {item.type}
                          </span>
                          <div className="bg-[#2E1B5D] p-1.5 rounded-full text-white shadow-lg">
                            <Maximize2 className="h-3.5 w-3.5" />
                          </div>
                        </div>

                        <div className="text-left">
                          <span className="font-sans text-[10px] text-white/80 uppercase tracking-wider block">
                            {labels.zoomTip}
                          </span>
                        </div>
                      </div>

                      {/* Tag Badge Always Visible */}
                      <div className="absolute top-3 left-3 group-hover:opacity-0 transition-opacity duration-200">
                        <span className="py-1 px-2.5 bg-[#2E1B5D]/85 backdrop-blur-md rounded-full border border-white/20 text-[9px] uppercase tracking-widest font-sans font-bold text-white shadow-sm">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    {/* Card Caption */}
                    <div className="p-4 text-left">
                      <h3 className={`font-serif font-bold text-base leading-snug line-clamp-1 group-hover:text-[#2E1B5D] dark:group-hover:text-[#E5C463] transition-colors ${
                        darkMode ? "text-white" : "text-[#190F26]"
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`font-sans text-[11px] mt-1 line-clamp-1 ${
                        darkMode ? "text-white/60" : "text-[#554466]"
                      }`}>
                        {item.type} • Heirloom Keepsake
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-[#FAF6F0] dark:bg-white/5 rounded-2xl border border-dashed border-[#E3DDE9] dark:border-white/10 w-full">
              <p className="text-[#554466] dark:text-white/60 font-sans text-xs">{labels.empty}</p>
            </div>
          )}
        </div>

        {/* Carousel Pagination Dots */}
        {filteredItems.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-1.5 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? darkMode
                      ? "w-7 h-2 bg-[#D4AF37]"
                      : "w-7 h-2 bg-[#2E1B5D]"
                    : darkMode
                    ? "w-2 h-2 bg-white/20 hover:bg-white/40"
                    : "w-2 h-2 bg-[#E3DDE9] hover:bg-[#2E1B5D]/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* Interactive Fullscreen Theater Modal */}
        {activeImageId !== null && activeItem && (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveImageId(null);
            }}
            className="fixed inset-0 bg-[#0E0617]/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto animate-fade-in"
          >
            {/* Top Navigation Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl flex items-center justify-between z-50 select-none pb-2"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveImageId(null);
                }}
                className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white font-sans font-bold text-xs rounded-full transition-all duration-200 cursor-pointer border border-white/15 flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <X className="h-4 w-4 text-[#C5A3ED]" />
                <span>Back to Gallery</span>
              </button>

              <div className="flex items-center gap-2 bg-[#251336] border border-[#9D75D4]/30 px-4 py-1.5 rounded-full text-white font-mono text-xs font-semibold backdrop-blur-md">
                <span className="text-[#C5A3ED] font-bold uppercase tracking-wider">
                  {activeItem.type}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-white/80">
                  {filteredItems.findIndex((i) => i.id === activeItem.id) + 1} / {filteredItems.length}
                </span>
              </div>
            </div>

            {/* Central Media Viewer & Navigation */}
            <div className="relative max-w-5xl w-full flex flex-col items-center my-auto py-4">
              <div className="relative w-full flex items-center justify-center min-h-[350px] sm:min-h-[460px]">
                {/* Prev Trigger */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-[-20px] lg:left-[-60px] text-white hover:text-[#C5A3ED] hover:bg-[#251336] bg-black/60 border border-white/10 p-3 sm:p-4 rounded-full transition-all cursor-pointer z-30 shadow-2xl backdrop-blur-sm active:scale-95"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
                </button>

                {/* Main Showcase Image Frame */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-h-[55vh] sm:max-h-[62vh] rounded-2xl border border-white/15 overflow-hidden bg-[#150A1F] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center p-2"
                >
                  <TheaterImage src={activeItem.url} alt={activeItem.title} />
                </div>

                {/* Next Trigger */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-[-20px] lg:right-[-60px] text-white hover:text-[#C5A3ED] hover:bg-[#251336] bg-black/60 border border-white/10 p-3 sm:p-4 rounded-full transition-all cursor-pointer z-30 shadow-2xl backdrop-blur-sm active:scale-95"
                  aria-label="Next Image"
                >
                  <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
                </button>
              </div>

              {/* Thumbnails Strip */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex justify-center gap-2.5 mt-5 overflow-x-auto py-1 max-w-full px-4 scrollbar-none"
              >
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveImageId(item.id)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shrink-0 ${
                      item.id === activeItem.id
                        ? "border-[#C5A3ED] scale-108 ring-2 ring-[#C5A3ED]/40 shadow-lg"
                        : "border-white/10 opacity-50 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Project Metadata Card */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl p-5 sm:p-6 bg-gradient-to-b from-[#1C0D2A] to-[#12071C] border border-[#9D75D4]/25 rounded-2xl text-left shadow-2xl mx-auto select-none mt-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A3ED] uppercase bg-[#2A143D] px-3 py-1 rounded-full border border-[#9D75D4]/30">
                  {activeItem.type}
                </span>

                <div className="flex items-center gap-2 text-[11px] text-white/60 font-mono">
                  <span>📖 Archival Hardcover</span>
                  <span>•</span>
                  <span>✨ Bespoke Edition</span>
                </div>
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                {activeItem.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-white/80 mt-3 leading-relaxed border-t border-white/10 pt-3">
                Carefully preserved memory book legacy item. Handcrafted in India using premium archival-grade paper and bespoke hardbound covers, designed to live for multiple generations.
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/50 font-mono">
                <div className="flex items-center gap-3">
                  <span>💡 Press ← → arrows to navigate</span>
                  <span>•</span>
                  <span>Press Esc to exit</span>
                </div>
                <span className="text-[#C5A3ED] font-semibold">Memoir Tale Heritage Collection</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
