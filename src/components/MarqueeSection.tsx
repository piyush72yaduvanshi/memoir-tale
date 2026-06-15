import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data';

const BOOK_COVERS = [
  { id: 1, title: "Freedom Fighter's Legacy", author: "Rajesh Kumar", bg: "from-[#4E1015] to-[#230205]" },
  { id: 2, title: "Immigrant Journey", author: "Priya Sharma", bg: "from-[#743A15] to-[#421D05]" },
  { id: 3, title: "Business Empire Story", author: "Amit Verma", bg: "from-[#0F3624] to-[#051F13]" },
  { id: 4, title: "Partition Memories", author: "Kamal Singh", bg: "from-[#4A3010] to-[#271704]" },
  { id: 5, title: "Love Chronicle", author: "Anjali Mehta", bg: "from-[#521B27] to-[#2D060E]" },
  { id: 6, title: "Village to City", author: "Ramesh Patel", bg: "from-[#8B612C] to-[#553811]" },
  { id: 7, title: "Military Service", author: "Captain Ravi", bg: "from-[#2D2D30] to-[#171719]" },
  { id: 8, title: "Teacher's Wisdom", author: "Dr. Sunita", bg: "from-[#503E33] to-[#2E211A]" },
  { id: 9, title: "Entrepreneur's Path", author: "Vijay Desai", bg: "from-[#1B3A4A] to-[#0D1E28]" },
];

export default function MarqueeSection() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].marquee;
  
  // Triple the array for seamless infinite scroll
  const booksRow1 = [...BOOK_COVERS, ...BOOK_COVERS, ...BOOK_COVERS];
  const booksRow2 = [...BOOK_COVERS, ...BOOK_COVERS, ...BOOK_COVERS];

  return (
    <section className="bg-[#1B101E] py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">
            {t.heading} <span className="italic text-[#A78BFA]">{t.headingItalic}</span>
          </h2>
          <p className="text-white/60 mt-4 text-sm lg:text-base max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* First Row - Left to Right */}
      <div className="relative mb-8">
        <div className="animate-marquee-left">
          {booksRow1.map((book, index) => (
            <div
              key={`${book.id}-${index}`}
              className={`w-44 h-64 rounded-lg mx-3 flex-shrink-0 overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group relative shadow-xl bg-gradient-to-br ${book.bg}`}
            >
              {/* Book Cover Design */}
              <div className="h-full w-full p-5 flex flex-col justify-between relative">
                
                {/* Top Label */}
                <div className="text-left">
                  <span className="text-[#d4af37] text-[9px] font-sans uppercase tracking-[2px] font-bold">
                    MEMOIR
                  </span>
                </div>

                {/* Center - Title and Author */}
                <div className="flex-1 flex flex-col justify-center text-left">
                  <h3 className="text-white font-serif font-bold text-lg leading-tight mb-3">
                    {book.title}
                  </h3>
                  <p className="text-[#d4af37] text-sm font-sans italic">
                    {book.author}
                  </p>
                </div>

                {/* Bottom - Publisher Mark */}
                <div className="text-left">
                  <span className="text-white/40 text-[8px] font-sans uppercase tracking-[2px]">
                    MemoirTale
                  </span>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/30"></div>
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/30"></div>
                
                {/* Year Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/30 backdrop-blur-sm border border-[#d4af37]/30 rounded">
                  <span className="text-[#d4af37] text-[9px] font-semibold">
                    2024
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Row - Right to Left */}
      <div className="relative">
        <div className="animate-marquee-right">
          {booksRow2.map((book, index) => (
            <div
              key={`${book.id}-rev-${index}`}
              className={`w-44 h-64 rounded-lg mx-3 flex-shrink-0 overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group relative shadow-xl bg-gradient-to-br ${book.bg}`}
            >
              {/* Book Cover Design */}
              <div className="h-full w-full p-5 flex flex-col justify-between relative">
                
                {/* Top Label */}
                <div className="text-left">
                  <span className="text-[#d4af37] text-[9px] font-sans uppercase tracking-[2px] font-bold">
                    MEMOIR
                  </span>
                </div>

                {/* Center - Title and Author */}
                <div className="flex-1 flex flex-col justify-center text-left">
                  <h3 className="text-white font-serif font-bold text-lg leading-tight mb-3">
                    {book.title}
                  </h3>
                  <p className="text-[#d4af37] text-sm font-sans italic">
                    {book.author}
                  </p>
                </div>

                {/* Bottom - Publisher Mark */}
                <div className="text-left">
                  <span className="text-white/40 text-[8px] font-sans uppercase tracking-[2px]">
                    MemoirTale
                  </span>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/30"></div>
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/30"></div>
                
                {/* Year Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/30 backdrop-blur-sm border border-[#d4af37]/30 rounded">
                  <span className="text-[#d4af37] text-[9px] font-semibold">
                    2024
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
