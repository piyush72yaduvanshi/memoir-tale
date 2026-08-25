import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Import local book images
import bookEkYatra from '../assets/books/WhatsApp Image 2026-06-09 at 2.27.06 PMm.jpeg';
import bookHumareBabuJi from '../assets/books/WhatsApp Image 2026-06-09 at 2.27.06 PM.jpeg';
import bookStormsStruggles from '../assets/books/WhatsApp Image 2026-06-09 at 2.27.06 PMk.jpeg';
import bookUnveilingDimensions from '../assets/books/WhatsApp Image 2026-08-24 at 11.11.22 PM.jpeg';
import bookMaheeshTrikha from '../assets/books/WhatsApp Image 2026-06-09 at 2.27.50 PMh.jpeg';
import book95Countries from '../assets/books/WhatsApp Image 2026-08-24 at 11.11.23 PM.jpeg';

interface StoryItem {
  id: string;
  title: string;
  subject: string;
  year: string;
  excerpt: string;
  image: string;
  pageCount: string;
}

const STORIES: StoryItem[] = [
  {
    id: 'story-1',
    title: 'Ek Yatra',
    subject: 'The story that gave birth to Memoir Tale',
    year: 'Published',
    excerpt: 'Ek Yatra began with a deeply personal loss. Abhinav Shakya created this book in memory of his grandfather, with whom he wished he had spent more time while he was alive. After his grandfather passed away, Abhinav began gathering his memories and stories with the help of his father—and turned them into his first book. That experience made him realise that countless families carry the same feeling of losing someone before their story can be fully preserved. Ek Yatra became the inspiration behind Memoir Tale and the dream of building India\'s first legacy platform.',
    image: bookEkYatra,
    pageCount: '130 Pages'
  },
  {
    id: 'story-2',
    title: 'Humare Babu Ji',
    subject: 'Shree Vishwanath Sharma Ji',
    year: 'Coming Soon',
    excerpt: 'Humare Babu Ji is a tribute to the life and legacy of Vishwanath Sharma, an Indian politician who served as a Member of Parliament from Jhansi and later Hamirpur. More than a record of public life, the book seeks to preserve the memories, values, relationships, and moments that made him who he was—so that his story continues to live within the generations that follow.',
    image: bookHumareBabuJi,
    pageCount: '250 Pages'
  },
  {
    id: 'story-3',
    title: 'Storms & Struggles',
    subject: 'Dr. Archana Lala',
    year: 'Published',
    excerpt: 'Storms & Struggles is a story of perseverance, self-belief, and unwavering dedication. Through the journey of a woman who faced obstacles at every stage of life, the book captures how courage, hard work, and the belief in oneself can transform struggles into strength and dreams into achievements.',
    image: bookStormsStruggles,
    pageCount: '130 Pages'
  },
  {
    id: 'story-4',
    title: 'Unveiling Many Dimensions',
    subject: 'Nona Bhogal Preenja',
    year: 'Published',
    excerpt: 'Unveiling Many Dimensions follows the remarkable journey of Nona Bhogal Preenja—a woman whose life was shaped by an extraordinary family legacy and unexpected turns of fate. From the influence of her father, remembered as the youngest IAS officer in Maharashtra, to the challenges and transformations that followed, this is a story of discovering oneself, overcoming circumstances, and ultimately blooming into one\'s own identity.',
    image: bookUnveilingDimensions,
    pageCount: '105 Pages'
  },
  {
    id: 'story-5',
    title: 'Martyr Flight Lieutenant Maheesh Trikha',
    subject: 'Flight Lieutenant Maheesh Trikha',
    year: 'Published',
    excerpt: 'A tribute to Flight Lieutenant Maheesh Trikha, whose life reflected discipline, courage, patriotism, and an unwavering commitment to service. From RIMC and NDA to the Air Force and the Siachen Pioneers, his journey traces the making of a young air warrior who gave his life in service of the nation. Told through memories, interviews, family stories, and tributes, this biography also honours the parents, brother, and comrades who continue to carry his legacy with pride and love.',
    image: bookMaheeshTrikha,
    pageCount: '110 Pages'
  },
  {
    id: 'story-6',
    title: '95 Countries — Journeys & Memories',
    subject: 'Sunanda & Hari',
    year: 'Published',
    excerpt: 'A lifetime of travel captured in one extraordinary story. Sunanda and Hari, both in their 60s, have travelled across nearly 95 countries, collecting experiences, friendships, cultures, and memories along the way. And their journey isn\'t over yet—they continue to explore the world, chasing their next destinations and working toward their dream of completing a century of countries.',
    image: book95Countries,
    pageCount: '250 Pages'
  }
];

export default function PortfolioGallery() {
  const { lang } = useLanguage();
  const isHindi = lang === "HI";
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const maxIndex = Math.max(0, STORIES.length - itemsPerPage);

  const slideNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const slidePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const gap = 24;
  const translatePercent = (currentIndex * 100) / itemsPerPage;

  return (
    <section
      id="portfolio-gallery"
      className="py-16 md:py-24 bg-[#2d1e2f] text-white relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-full h-[800px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none paper-grain-dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header with Slide Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div className="text-left max-w-2xl">
            <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-[#D4AF37] block mb-3">
              {isHindi ? "पोर्टफोलियो" : "PORTFOLIO"}
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[44px] leading-tight text-[#D4AF37]">
              {isHindi ? "जो कहानियाँ सहेजने का हमें सौभाग्य मिला" : "Stories We've Had The Privilege To Preserve"}
            </h2>
            <p className="mt-3 font-sans text-white/70 text-xs md:text-sm leading-relaxed max-w-2xl">
              {isHindi
                ? "हमारे इमर्सिव स्टोरीबुक इंटरैक्टिव रीडर को खोलने और एक समाप्त मेमोयरटेल अध्याय की साहित्यिक गहराई का अनुभव करने के लिए नीचे किसी भी कार्ड पर क्लिक करें।"
                : "Click on any story card below to open our immersive reader and experience the literary depth of our preserved volumes."}
            </p>
          </div>

          {/* Navigation Chevron Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
            <button
              onClick={slidePrev}
              aria-label="Previous Book"
              className="w-11 h-11 rounded-full border border-white/20 hover:border-[#D4AF37] text-white hover:bg-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={slideNext}
              aria-label="Next Book"
              className="w-11 h-11 rounded-full border border-white/20 hover:border-[#D4AF37] text-white hover:bg-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Compact Horizontal Slideshow Area */}
        <div className="relative overflow-hidden w-full rounded-2xl pt-1 pb-4">
          <motion.div
            animate={{ x: `calc(-${translatePercent}% - ${(currentIndex * gap) / itemsPerPage}px)` }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="flex gap-6 w-full"
          >
            {STORIES.map((story) => (
              <div
                key={story.id}
                className="shrink-0 flex flex-col cursor-pointer text-left"
                style={{
                  width: `calc((100% - ${(itemsPerPage - 1) * gap}px) / ${itemsPerPage})`,
                }}
                onClick={() => setSelectedStory(story)}
              >
                <div className="group rounded-2xl overflow-hidden bg-[#3b273d]/40 border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-300 relative shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/15 flex flex-col justify-between h-full transform hover:-translate-y-1.5">
                  {/* Cover Image */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#2d1e2f]/50 opacity-40 group-hover:opacity-10 transition-opacity duration-300" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-95 flex flex-col items-center justify-center p-6 text-center transition-all duration-300">
                      <div className="p-3 bg-[#D4AF37] rounded-full text-black scale-90 group-hover:scale-105 transition-transform duration-300 mb-3 shadow-lg">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <span className="font-serif italic text-[#D4AF37] text-base sm:text-lg block font-medium">
                        {isHindi ? "कहानी का अंश पढ़ें" : "Read Story Excerpt"}
                      </span>
                      <span className="font-sans text-[10px] uppercase font-bold tracking-[2px] text-white/70 block mt-1">
                        {isHindi ? "खोलने के लिए क्लिक करें" : "Click to Open"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-2.5">
                        <span className="font-sans text-[10px] uppercase font-bold tracking-[2px] text-[#D4AF37]">
                          {story.subject}
                        </span>
                        <span className="font-sans text-[10px] text-white/50 font-bold">
                          {story.year}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-lg text-white mb-2.5 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                        {story.title}
                      </h3>

                      <p className="font-sans text-xs text-white/60 leading-relaxed line-clamp-2">
                        {story.excerpt}
                      </p>
                    </div>

                    {/* Footer stats */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-sans font-bold text-white/50">
                      <span>{isHindi ? "कस्टम बाइंड" : "Custom Bind"}</span>
                      <span className="text-[#D4AF37]">{story.pageCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-6 mb-10">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? "w-7 h-2 bg-[#D4AF37]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="py-3.5 px-8 bg-gradient-to-r from-accent-purple to-accent-purple-dark text-white uppercase tracking-[3px] font-sans font-bold text-xs rounded-md shadow-lg shadow-accent-purple/25 active:scale-95 cursor-pointer hover:brightness-110 transition-all border border-accent-purple/20"
          >
            {isHindi ? "अपनी आत्मकथा बुक करें" : "Book Your Autobiography"}
          </button>
        </div>

      </div>

      {/* Modal for Story Preview */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#160b17]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#faf2e1] text-primary rounded-xl p-5 sm:p-8 relative max-h-[90vh] overflow-y-auto my-auto"
            >
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 cursor-pointer"
              >
                <X className="w-5 h-5 text-accent-purple" />
              </button>

              <div className="text-center mb-6 pb-6 border-b border-accent-purple/15">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[4px] text-accent-purple block mb-2">
                  {isHindi ? "एक मेमोयरटेल क्रॉनिकल" : "A MemoirTale Chronicle"}
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl mb-2">
                  {selectedStory.title}
                </h2>
                <span className="font-serif-sub italic text-sm text-text-muted">
                  {isHindi ? "के जीवन अभिलेख " : "The life archives of "}{selectedStory.subject}
                </span>
              </div>

              <div className="mb-6">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  className="w-full h-64 object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="font-serif-sub text-base leading-relaxed mb-6 italic text-[#190F26]">
                {selectedStory.excerpt}
              </p>

              <div className="flex items-center justify-between gap-4 pt-6 border-t border-accent-purple/15">
                <span className="font-sans text-xs text-[#554466]">
                  {selectedStory.pageCount} • {selectedStory.year}
                </span>
                <button
                  onClick={() => {
                    setSelectedStory(null);
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2.5 px-6 bg-accent-purple text-white hover:brightness-110 rounded text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {isHindi ? "मेरी पुस्तक कमीशन करें" : "Commission My Book"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
