import React, { useState, useEffect } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles, BookOpen, Layers, Heart, Camera } from "lucide-react";
import { GALLERY_ITEMS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import FadeIn from "./FadeIn";

type FilterCategory = "ALL" | "LIFE_MEMOIRS" | "FAMILY_LEGACIES" | "TRAVEL_JOURNALS" | "FOUNDER_STORIES" | "TRIBUTE_BOOKS" | "COFFEE_TABLE";

function GalleryCard({ item, onClick, index, labelInspect }: { item: any; onClick: () => void; index: number; labelInspect: string; key?: React.Key }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="relative group overflow-hidden rounded-2xl border border-[#E3DDE9]/60 hover:border-[#2E1B5D]/60 shadow-[0_8px_30px_rgba(69,20,122,0.04)] hover:shadow-2xl cursor-pointer aspect-[4/3] sm:aspect-square flex-grow transition-all duration-300 transform hover:-translate-y-2 bg-white select-none outline-none focus:outline-none focus:ring-0 active:scale-[0.98] tap-light-feedback"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Premium Loader pulse */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#FAF6F0] animate-pulse flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-[#2E1B5D]/40 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
      )}
      <img
        src={item.url}
        alt={item.title}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
      />

      {/* Advanced visual overlay with smooth slide up */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#190F26]/95 via-[#190F26]/75 to-[#2E1B5D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
        <div className="flex justify-between items-start">
          <span className="text-[10px] uppercase tracking-widest text-white font-mono font-bold bg-[#2E1B5D]/80 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {item.type}
          </span>
          <div className="bg-[#2E1B5D] p-2 rounded-full text-white shadow-lg transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-350 ease-out">
            <Maximize2 className="h-4 w-4" />
          </div>
        </div>

        <div className="text-left transform translate-y-4 group-hover:translate-y-0 transition-transform duration-350 ease-out">
          <h3 className="font-serif font-bold text-lg text-white leading-tight mb-2">
            {item.title}
          </h3>
          <p className="font-sans text-[11px] text-white/70">
            {labelInspect}
          </p>
          <div className="w-12 h-[2px] bg-[#2E1B5D] mt-3 rounded" />
        </div>
      </div>
    </div>
  );
}

function TheaterImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false); // Reset when image source changes
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
        className={`max-h-[45vh] sm:max-h-[58vh] object-contain mx-auto transition-all duration-350 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
      />
    </div>
  );
}

export default function GallerySection() {
  const { lang, t } = useLanguage();
  const isHindi = lang === "HI";
  const [activeImageId, setActiveImageId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("ALL");
  const lastScrollPosRef = React.useRef<number>(0);

  // Lock body scroll and restore previous scroll position on close
  useEffect(() => {
    if (activeImageId !== null) {
      // Record current scroll position
      lastScrollPosRef.current = window.scrollY;
      // Lock scroll interaction
      document.body.style.overflow = "hidden";
    } else {
      // Unlock scroll
      document.body.style.overflow = "";

      // Return to exact previous scroll position cleanly
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

  const labels = {
    portfolio: isHindi ? "वास्तविक कहानियां। स्थायी विरासत। ⭐" : "REAL STORIES. LASTING LEGACIES. ⭐",
    heading: isHindi ? "कहानियां जिन्हें सहेजने का हमें सौभाग्य मिला" : "Stories We've Had the Privilege to Preserve",
    desc: isHindi
      ? "प्रत्येक प्रोजेक्ट एक गहराई से व्यक्तिगत यात्रा है। व्यक्तियों, परिवारों और संगठनों के लिए विचारपूर्वक बनाए गए संस्मरणों, विरासत पुस्तकों, यात्रा पुस्तिकाओं और विशेष कहानियों के चयन को एक्सप्लोर करें।"
      : "Every project is a deeply personal journey. Explore a selection of memoirs, legacy books, travel journals, and bespoke storytelling experiences thoughtfully created for individuals, families, and organizations.",
    all: isHindi ? "सभी प्रोजेक्ट्स" : "All Projects",
    lifeMemoirs: isHindi ? "जीवन संस्मरण" : "Life Memoirs",
    familyLegacies: isHindi ? "पारिवारिक विरासत" : "Family Legacies",
    travelJournals: isHindi ? "यात्रा संस्मरण" : "Travel Journals",
    founderStories: isHindi ? "संस्थापक गाथाएं" : "Founder Stories",
    tributeBooks: isHindi ? "श्रद्धांजलि पुस्तकें" : "Tribute Books",
    coffeeTable: isHindi ? "कॉफी टेबल बुक्स" : "Coffee Table Books",
    empty: isHindi ? "आपकी चुनी हुई श्रेणी के लिए कोई चित्र उपलब्ध नहीं है।" : "No items match your category selection.",
    slideshow: isHindi ? "हमारी कहानी संग्रह एक्सप्लोर करें →" : "Explore Our Story Collection →",
    proTip: isHindi ? "💡 सुझाव: बदलने के लिए ← और → कीबोर्ड कुंजियों का उपयोग करें" : "💡 Pro tip: Use ← and → keyboard arrows to scroll",
    escTip: isHindi ? "बंद करने के लिए Esc बटन दबाएं" : "Esc to close",
    detailsText: isHindi
      ? "अत्यधिक प्यार से संजोई गई यह विरासत स्मृति पुस्तक भारतीय जीवनी लेखकों द्वारा उच्च-कौशल, प्रीमियम अभिलेखीय कागज़ और सुनहरी जिल्द की सिलाई से निर्मित है।"
      : "Carefully preserved memory book legacy item. Handcrafted in India using premium archival-grade paper and bespoke hardbound covers, designed to live for multiple generations.",
    zoomTip: isHindi ? "विस्तार से देखने और ज़ूम करने के लिए क्लिक करें" : "Click to inspect full details & zoom",
    closeBtn: isHindi ? "बंद करें" : "Close Gallery",
    backBtn: isHindi ? "← गैलरी पर वापस" : "← Back to Gallery",
    keepsakeTitle: isHindi ? "सदाबहार स्मृति चिन्ह विवरण" : "Timeless Keepsake Details"
  };

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === "ALL") return true;
    return item.category === activeCategory;
  });

  const activeItem = GALLERY_ITEMS.find((item) => item.id === activeImageId);

  // Keyboard accessibility for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageId === null) return;
      if (e.key === "Escape") {
        setActiveImageId(null);
      } else if (e.key === "ArrowRight") {
        const currentIndex = filteredItems.findIndex((item) => item.id === activeImageId);
        if (currentIndex !== -1) {
          const nextIndex = (currentIndex + 1) % filteredItems.length;
          setActiveImageId(filteredItems[nextIndex].id);
        }
      } else if (e.key === "ArrowLeft") {
        const currentIndex = filteredItems.findIndex((item) => item.id === activeImageId);
        if (currentIndex !== -1) {
          const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
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
    const currentIndex = filteredItems.findIndex((item) => item.id === activeImageId);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveImageId(filteredItems[nextIndex].id);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeImageId === null) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeImageId);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveImageId(filteredItems[prevIndex].id);
  };

  return (
    <section
      id="gallery"
      className="bg-[#FCFBF7] py-20 lg:py-28 text-[#190F26] relative overflow-hidden border-b border-[#E3DDE9]/40"
    >
      {/* Background visual elements */}
      <div className="absolute top-[10%] left-[-80px] w-96 h-96 bg-[#8B3CDC]/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-80px] w-80 h-80 bg-[#2E1B5D]/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Block */}
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-12">
            <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-[rgb(46,27,93)] mb-3 block">
              {labels.portfolio}
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4.5xl lg:text-[48px] text-[#190F26] tracking-tight leading-tight">
              {labels.heading}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#554466] mt-4 max-w-3xl leading-relaxed">
              {labels.desc}
            </p>
          </div>
        </FadeIn>

        {/* Gallery Filters */}
        <FadeIn delay={0.1}>
          <div className="flex justify-center flex-wrap gap-2.5 mb-12">
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
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-sans text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${activeCategory === cat.id
                  ? "bg-[#2E1B5D] text-white shadow-[0_4px_20px_rgba(139, 92, 246,0.25)] scale-105"
                  : "bg-white hover:bg-[#FAF6F0] border border-[#E3DDE9]/60 text-[#190F26]"
                  }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Optimized Grid layout with reduced spacing */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 min-h-[460px] transition-all duration-500">
            {filteredItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => setActiveImageId(item.id)}
                index={index}
                labelInspect={labels.zoomTip}
              />
            ))}
          </div>
        </FadeIn>

        {/* Empty state when category is empty */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#E3DDE9] w-full">
            <p className="text-[#554466] font-sans text-sm">{labels.empty}</p>
          </div>
        )}

        {/* Launch Interactive Slideshow CTA */}
        <FadeIn delay={0.25}>
          <div className="flex justify-center mt-12 w-full">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveImageId(filteredItems[0]?.id || GALLERY_ITEMS[0].id);
              }}
              className="px-8 py-3.5 rounded-full border border-[#2E1B5D] text-[#2E1B5D] font-sans font-bold text-sm hover:bg-[#2E1B5D] hover:text-[#FCFBF7] transition-all duration-300 shadow-[0_4px_12px_rgba(139, 92, 246,0.05)] hover:shadow-[0_8px_24px_rgba(139, 92, 246,0.2)] cursor-pointer hover:scale-105 select-none outline-none focus:outline-none"
            >
              {labels.slideshow}
            </button>
          </div>
        </FadeIn>

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
                  {filteredItems.findIndex(i => i.id === activeItem.id) + 1} / {filteredItems.length}
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
                  <TheaterImage
                    src={activeItem.url}
                    alt={activeItem.title}
                  />
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
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shrink-0 ${item.id === activeItem.id
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



