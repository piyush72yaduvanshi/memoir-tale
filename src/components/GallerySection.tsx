import React, { useState, useEffect } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles, BookOpen, Layers, Heart, Camera } from "lucide-react";
import { GALLERY_ITEMS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import FadeIn from "./FadeIn";

type FilterCategory = "ALL" | "BOOKS" | "INTERVIEWS";

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
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />

      {/* Advanced visual overlay with smooth slide up */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#190F26]/95 via-[#190F26]/75 to-[#2E1B5D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
        <div className="flex justify-between items-start">
          <span className="text-[10px] uppercase tracking-widest text-[#2E1B5D] font-mono font-bold bg-[#2E1B5D]/10 border border-[#2E1B5D]/30 px-2 py-1 rounded">
            {item.type}
          </span>
          <div className="bg-[#2E1B5D] p-2 rounded-full text-[#190F26] shadow-lg transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-350 ease-out">
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
        className={`max-h-[45vh] sm:max-h-[58vh] object-contain mx-auto transition-all duration-350 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
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
    portfolio: isHindi ? "मुख्य प्रदर्शनियाँ व संविभाग" : "PREVIEWS & PORTFOLIO",
    heading: isHindi ? "हमारी अमूल्य विरासत गैलरी" : "Explore Our Legacy Gallery",
    desc: isHindi 
      ? "प्रीमियम ऐतिहासिक पुस्तकों, सुंदर आत्मीय साक्षात्कारों और सहेजने योग्य यादों के कुछ चुनिंदा दुर्लभ पलों की तस्वीरें।"
      : "Sneak previews of premium custom hardcovers, golden hour storytelling interviews, and beautiful unboxing memories across Indian households.",
    all: isHindi ? "सभी तस्वीरें" : "All Works",
    books: isHindi ? "मुद्रित तस्वीरें" : "Finished Hardcovers",
    interviews: isHindi ? "साक्षात्कार और मुस्कान" : "Interviews & Smiles",
    empty: isHindi ? "आपकी चुनी हुई श्रेणी के लिए कोई चित्र उपलब्ध नहीं है।" : "No items match your category selection.",
    slideshow: isHindi ? "इंटरैक्टिव स्लाइड-शो शुरू करें" : "Launch Interactive Slideshow",
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
    if (activeCategory === "BOOKS") {
      return ["Book Showcase", "Archival", "Craftsmanship", "Design", "Heirloom"].includes(item.type);
    }
    if (activeCategory === "INTERVIEWS") {
      return ["Emotional Legacy", "Interviews", "Family Smiles"].includes(item.type);
    }
    return true;
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
            <div className="w-[60px] h-[3px] bg-[#2E1B5D] rounded-[2px] mb-4" />
            <span className="font-sans font-semibold text-[11px] uppercase tracking-[3px] text-[#2E1B5D] mb-3 flex items-center gap-1.5">
              <Camera className="h-4 w-4" /> {labels.portfolio}
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4.5xl lg:text-[48px] text-[#190F26] tracking-tight leading-tight">
              {labels.heading}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#554466] mt-4 max-w-2xl leading-relaxed">
              {labels.desc}
            </p>
          </div>
        </FadeIn>

        {/* Dynamic Category Filtering Tabs */}
        <FadeIn delay={0.1}>
          <div className="flex justify-center flex-wrap gap-2.5 mb-12">
            {(
              [
                { id: "ALL", label: labels.all, icon: <Layers className="h-3.5 w-3.5" /> },
                { id: "BOOKS", label: labels.books, icon: <BookOpen className="h-3.5 w-3.5" /> },
                { id: "INTERVIEWS", label: labels.interviews, icon: <Heart className="h-3.5 w-3.5" /> },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveImageId(null);
                }}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-sans text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#2E1B5D] text-white shadow-[0_4px_20px_rgba(139, 92, 246,0.25)] scale-105"
                    : "bg-white hover:bg-[#FAF6F0] border border-[#E3DDE9]/60 text-[#190F26]"
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Highly Optimized Grid layout */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[460px] transition-all duration-500">
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
              {labels.slideshow} ({filteredItems.length} {isHindi ? "चित्र" : "Items"}) →
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
            className="fixed inset-0 bg-black/98 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4 animate-fade-in"
          >
            {/* Slider Wrap */}
            <div className="relative max-w-4xl w-full flex flex-col items-center">
              
              {/* Premium Top Navigation Action Bar (Close & Back atop image) */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl flex items-center justify-between mb-4 px-2 sm:px-0 z-50 select-none"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveImageId(null);
                  }}
                  className="px-5 py-2.5 bg-[#2E1B5D] hover:bg-amber-600 text-[#190F26] font-sans font-bold text-xs rounded-full transition-all duration-200 cursor-pointer shadow-[0_4px_16px_rgba(139, 92, 246,0.3)] flex items-center space-x-1.5 hover:scale-105 active:scale-95 outline-none focus:outline-none"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>{labels.backBtn}</span>
                </button>

                <div className="flex items-center space-x-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-white font-mono text-xs font-semibold backdrop-blur-sm select-none">
                  <span className="text-[#2E1B5D] font-bold uppercase tracking-wider">
                    {activeItem.type}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/90">
                    {filteredItems.findIndex(i => i.id === activeItem.id) + 1} / {filteredItems.length}
                  </span>
                </div>
              </div>

              {/* Central Active Frame */}
              <div className="relative w-full aspect-video sm:h-[60vh] flex items-center justify-center">
                {/* Prev Trigger */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-[-70px] text-white/85 hover:text-[#2E1B5D] hover:bg-white/10 bg-black/40 p-3 sm:p-4 rounded-full transition-all cursor-pointer z-30"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                </button>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-h-full max-w-full rounded-2xl border border-white/25 overflow-hidden bg-black shadow-2xl flex items-center justify-center w-full h-full"
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
                  className="absolute right-2 sm:right-[-70px] text-white/85 hover:text-[#2E1B5D] hover:bg-white/10 bg-black/40 p-3 sm:p-4 rounded-full transition-all cursor-pointer z-30"
                  aria-label="Next Image"
                >
                  <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                </button>
              </div>

              {/* Slideshow Thumbnails Indicator List */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="flex justify-center gap-2 mt-4 overflow-x-auto py-1 max-w-full px-4 scrollbar-none"
              >
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveImageId(item.id)}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer shrink-0 ${
                      item.id === activeItem.id
                        ? "border-[#2E1B5D] scale-110 shadow-lg shadow-[#2E1B5D]/20"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={item.url}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Bottom Metadata Info Card - Highly Enhanced Heirloom design */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl mt-5 p-5 sm:p-6 bg-[#190F26] border border-[#2E1B5D]/30 rounded-2xl text-left shadow-2xl mx-auto select-none"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-[#2E1B5D] animate-pulse" />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#2E1B5D] uppercase bg-[#2E1B5D]/10 px-2 py-0.5 rounded border border-[#2E1B5D]/20">
                      {activeItem.type}
                    </span>
                  </div>
                  <span className="text-xs text-white/50 font-mono font-bold">
                    {filteredItems.findIndex(i => i.id === activeItem.id) + 1} {isHindi ? "का" : "of"} {filteredItems.length}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg sm:text-2xl text-[#FCFBF7] tracking-tight">
                    {activeItem.title}
                  </h3>
                  <p className="text-[#2E1B5D] font-sans font-medium text-xs sm:text-sm tracking-wide">
                    {labels.keepsakeTitle}
                  </p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-white/80 mt-3.5 leading-relaxed border-t border-white/5 pt-3.5">
                  {labels.detailsText}
                </p>

                {/* Keyboard tip indicator & instruction notes */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                  <div className="text-[10px] text-white/45 font-mono space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#2E1B5D]">💡</span> {labels.proTip}
                    </div>
                    <div>
                      <span className="text-[#2E1B5D]">⌨️</span> {labels.escTip}
                    </div>
                  </div>
                  
                  {/* Premium Tag Badge */}
                  <span className="text-[9px] uppercase tracking-wider font-mono text-[#2E1B5D]/70 font-semibold bg-[#2E1B5D]/5 border border-[#2E1B5D]/20 px-2 py-1 rounded inline-block self-start sm:self-auto">
                    {isHindi ? "प्रीमियम एडिशन" : "Premium Edition"}
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



