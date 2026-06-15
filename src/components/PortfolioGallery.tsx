import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Import local book images
import book1 from '../assets/books/WhatsApp Image 2026-06-09 at 2.27.06 PM.jpeg';
import book2 from '../assets/books/WhatsApp Image 2026-06-09 at 2.27.06 PMk.jpeg';
import book3 from '../assets/books/WhatsApp Image 2026-06-09 at 2.27.06 PMl.jpeg';
import book4 from '../assets/books/WhatsApp Image 2026-06-09 at 2.27.06 PMm.jpeg';
import book5 from '../assets/books/WhatsApp Image 2026-06-09 at 2.27.06 PMn.jpeg';
import book6 from '../assets/books/WhatsApp Image 2026-06-09 at 2.27.50 PMh.jpeg';

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
    title: 'The Whispering Pines of Jhansi',
    subject: 'Rameshwar Nath Prasad',
    year: '2024 Release',
    excerpt: 'A brilliant account of an ambitious student finding his purpose in pre-independence UP, setting up a telegraph line across small villages.',
    image: book1,
    pageCount: '194 Pages'
  },
  {
    id: 'story-2',
    title: 'Threads of the Silk Loom',
    subject: 'Anjali Deshmukh',
    year: '2025 Release',
    excerpt: 'Three generations of silk weavers preserved in an epic tapestry of heirloom stories, color dye recipes, and family letters.',
    image: book2,
    pageCount: '240 Pages'
  },
  {
    id: 'story-3',
    title: "The Navigator's Hourglass",
    subject: 'Capt. Hector Sterling',
    year: '2024 Release',
    excerpt: "A sea captain's journals recounting ocean voyages, high-seas squalls, and the tranquil starlight of the Southern Hemisphere.",
    image: book3,
    pageCount: '312 Pages'
  },
  {
    id: 'story-4',
    title: 'Echoes from the Railway Quarters',
    subject: 'Balwant Singh Rathore',
    year: '2025 Release',
    excerpt: 'A railwayman\'s memoir spanning four decades of service, documenting the evolution of Indian Railways and countless journeys across the subcontinent.',
    image: book4,
    pageCount: '256 Pages'
  },
  {
    id: 'story-5',
    title: 'The Herbalist\'s Daughter',
    subject: 'Dr. Meera Kulkarni',
    year: '2024 Release',
    excerpt: 'From traditional Ayurvedic remedies to modern medicine, a pioneering woman doctor\'s journey breaking barriers in rural Maharashtra.',
    image: book5,
    pageCount: '218 Pages'
  },
  {
    id: 'story-6',
    title: 'Letters from the Himalayan Outpost',
    subject: 'Col. Rajendra Thapa',
    year: '2025 Release',
    excerpt: 'A decorated army officer\'s chronicles from the highest military posts, blending duty with deep spiritual reflection in the mountain solitude.',
    image: book6,
    pageCount: '289 Pages'
  }
];

export default function PortfolioGallery() {
  const { lang } = useLanguage();
  const isHindi = lang === "HI";
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  return (
    <section 
      id="portfolio-gallery"
      className="py-20 md:py-28 bg-[#2d1e2f] text-white relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none paper-grain-dark" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-accent-purple block mb-3">
            {isHindi ? "पोर्टफोलियो" : "PORTFOLIO"}
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            {isHindi ? "जो कहानियाँ हमने बताने में मदद की" : "Stories We've Helped"}{" "}
            <span className="font-serif italic text-accent-purple">
              {isHindi ? "" : "Tell"}
            </span>
          </h2>
          <p className="mt-4 font-sans text-white/70 text-xs md:text-sm leading-relaxed">
            {isHindi 
              ? "हमारे इमर्सिव स्टोरीबुक इंटरैक्टिव रीडर को खोलने और एक समाप्त मेमोयरटेल अध्याय की साहित्यिक गहराई का अनुभव करने के लिए नीचे किसी भी वॉल्यूम पर क्लिक करें।"
              : "Click on any volume below to open our immersive storybook interactive reader and experience the literary depth and formatting of a finished MemoirTale chapter."}
          </p>
        </div>

        {/* Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
          {STORIES.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedStory(story)}
              className="group rounded-xl overflow-hidden bg-[#3b273d]/40 border border-white/10 hover:border-accent-purple/45 transition-all duration-300 relative cursor-pointer shadow-lg"
            >
              {/* Cover Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#2d1e2f]/50 opacity-40 group-hover:opacity-10 transition-opacity duration-300" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/75 opacity-0 group-hover:opacity-90 flex flex-col items-center justify-center p-6 text-center transition-all duration-300">
                  <div className="p-3 bg-accent-purple rounded-full text-white scale-90 group-hover:scale-100 transition-transform duration-300 mb-3 animate-float">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="font-serif italic text-accent-purple text-lg block font-medium">
                    {isHindi ? "कहानी का अंश पढ़ें" : "Read Story Excerpt"}
                  </span>
                  <span className="font-sans text-[10px] uppercase font-bold tracking-[2px] text-white/50 block mt-1">
                    {isHindi ? "खोलने के लिए क्लिक करें" : "Click to Open"}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="font-sans text-[10px] uppercase font-bold tracking-[2px] text-accent-purple">
                    {story.subject}
                  </span>
                  <span className="font-sans text-[10px] text-white/40 font-bold">
                    {story.year}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-white mb-3 group-hover:text-accent-purple transition-colors">
                  {story.title}
                </h3>

                <p className="font-sans text-xs text-white/60 leading-relaxed line-clamp-3">
                  {story.excerpt}
                </p>

                {/* Footer stats */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-sans font-bold text-white/40">
                  <span>{isHindi ? "कस्टम बाइंड" : "Custom Bind"}</span>
                  <span>{story.pageCount}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
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

      {/* Simple Modal for Story Preview */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#160b17]/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#faf2e1] text-primary rounded-xl p-8 relative"
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

              <p className="font-serif-sub text-base leading-relaxed mb-6 italic">
                {selectedStory.excerpt}
              </p>

              <div className="flex items-center justify-between gap-4 pt-6 border-t border-accent-purple/15">
                <span className="font-sans text-xs text-text-muted">
                  {selectedStory.pageCount} • {selectedStory.year}
                </span>
                <button
                  onClick={() => {
                    setSelectedStory(null);
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2 px-6 bg-accent-purple text-white hover:brightness-110 rounded text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
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
