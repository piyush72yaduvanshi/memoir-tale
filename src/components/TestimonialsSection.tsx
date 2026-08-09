import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Play, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TestimonialData {
  id: number;
  quote: string;
  author: string;
  location: string;
  service: string;
  completionDate: string;
  clientPhoto: string;
  bookPhoto: string;
}

export default function TestimonialsSection() {
  const { lang } = useLanguage();
  const isHindi = lang === "HI";
  const [showVideoModal, setShowVideoModal] = useState(false);

  const customTestimonials: TestimonialData[] = [
    {
      id: 1,
      quote: isHindi
        ? "अपने पिता के जीवन को एक सुंदर ढंग से लिखे गए संस्मरण में बदलते देखना हमारे पूरे परिवार के लिए एक अत्यंत भावुक अनुभव था। यह सिर्फ एक किताब नहीं है—यह एक ऐसा उपहार है जो हमेशा हमारी आने वाली पीढ़ियों के साथ रहेगा।"
        : "Watching my father's life transformed into a beautifully written memoir was an emotional experience for our entire family. It's more than a book—it's a gift that will stay with us for generations.",
      author: "Sunanda Hegde",
      location: isHindi ? "बेंगलुरु, कर्नाटक" : "Bengaluru, Karnataka",
      service: isHindi ? "लाइफ स्टोरी लेगेसी बुक" : "Life Story Legacy Book",
      completionDate: isHindi ? "नवंबर 2025" : "November 2025",
      clientPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      bookPhoto: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 2,
      quote: isHindi
        ? "टीम ने हर याद को अद्भुत देखभाल और प्रामाणिकता के साथ सहेजा। उन्होंने केवल हमारी कहानी नहीं लिखी—उन्होंने हमारे परिवार की 80 साल पुरानी परंपराओं और तस्वीरों को सहेजकर हमेशा के लिए अमर कर दिया।"
        : "The team captured every memory with incredible care and authenticity. They didn't just write our story—they preserved 80 years of our family lineage and photos in museum-quality print.",
      author: "Rajesh Kapoor",
      location: isHindi ? "नई दिल्ली" : "New Delhi",
      service: isHindi ? "मल्टी-जनरेशनल फैमिली हिस्ट्री" : "Multi-Generational Family History",
      completionDate: isHindi ? "जनवरी 2026" : "January 2026",
      clientPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      bookPhoto: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 3,
      quote: isHindi
        ? "प्रथम परामर्श साक्षात्कार से लेकर अंतिम गिल्डेड बाइंडिंग तक, हर विवरण में उच्चतम स्तर का सम्मान और शिल्प कौशल झलकता था। हम इससे अधिक खूबसूरत और गरिमापूर्ण स्मृति चिन्ह की कल्पना नहीं कर सकते थे।"
        : "From the initial interviews to the final gilded binding, every step reflected deep respect and master craftsmanship. We couldn't have asked for a more meaningful family heirloom.",
      author: "Priya Sharma",
      location: isHindi ? "मुंबई, महाराष्ट्र" : "Mumbai, Maharashtra",
      service: isHindi ? "फाउंडर एंड एंटरप्राइज बायोग्राफी" : "Founder & Enterprise Biography",
      completionDate: isHindi ? "मार्च 2026" : "March 2026",
      clientPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      bookPhoto: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <section
      id="testimonials-section"
      className="py-20 md:py-28 bg-[#faf7f0] text-primary overflow-hidden relative border-b border-[#E3DDE9]/40"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none paper-grain" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-[#D4AF37] block mb-3">
            {isHindi ? "परिवारों द्वारा भरोसेमंद ⭐" : "VERIFIED CLIENT TESTIMONIALS ⭐"}
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4.5xl lg:text-[48px] text-[#190F26] tracking-tight leading-tight">
            {isHindi ? "जो कहानियां हम संजोते हैं, वे स्थायी प्रभाव छोड़ती हैं" : "The Stories We Preserve Leave a Lasting Impact"}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#554466] mt-4 leading-relaxed">
            {isHindi
              ? "हमारे द्वारा बनाई जाने वाली हर बायोग्राफी गहराई से व्यक्तिगत होती है। यहाँ जानें कि व्यक्तियों और परिवारों ने अपनी विरासत सहेजने के अपने अनुभव के बारे में क्या कहा है।"
              : "Every memoir we create is deeply personal. Here's what verified families and founders have shared about their legacy preservation journey with Memoir Tale."}
          </p>
        </div>

        {/* 2-Column Layout: Video Left, Testimonials Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

          {/* Left Column - Featured Video Testimonial */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="rounded-2xl overflow-hidden border shadow-xl relative aspect-[4/5] sm:aspect-square lg:aspect-auto h-full flex flex-col justify-between group bg-[#190F26] border-[#D4AF37]/30 min-h-[420px]">
              {/* Background image */}
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
                alt="Featured Video Testimonial"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 select-none group-hover:scale-105 brightness-75"
                referrerPolicy="no-referrer"
              />

              {/* Dark atmospheric gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

              {/* Top Tag Badge */}
              <div className="relative z-10 p-6 flex justify-between items-center">
                <span className="px-3 py-1 bg-[#D4AF37] text-black font-sans font-bold text-[10px] uppercase tracking-widest rounded-full shadow-md">
                  Featured Video Story
                </span>
                <span className="text-xs text-white/80 font-mono">2:45 mins</span>
              </div>

              {/* Play button */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto p-6 text-center">
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="w-20 h-20 rounded-full bg-[#D4AF37] text-black shadow-2xl flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 group/play mb-4"
                  title={isHindi ? "वीडियो साक्षात्कार देखें" : "Watch Video Testimonial"}
                >
                  <Play className="w-8 h-8 translate-x-0.5 fill-current text-black" />
                </button>
                <span className="font-serif italic text-white text-lg font-medium">
                  "Memoir Tale gave my mother's journey eternal life."
                </span>
              </div>

              {/* Video info overlay */}
              <div className="relative z-10 p-6 backdrop-blur-md bg-black/60 border-t border-white/10 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37] shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
                      alt="Sunanda Hegde"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-white text-sm">Sunanda Hegde & Family</h4>
                    <p className="font-sans text-[11px] text-[#D4AF37]">Bengaluru • Life Story Book • Completed Nov 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Rich Detailed Testimonial Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {customTestimonials.map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl border-l-4 border-l-[#D4AF37] border-t border-r border-b text-left shadow-sm transition-all duration-300 hover:-translate-y-1 bg-white border-[#E3DDE9]/60 hover:border-[#D4AF37]/40 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Completion Date */}
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, sIdx) => (
                        <Star key={sIdx} className="w-4 h-4 fill-current text-amber-500" />
                      ))}
                    </div>

                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2E1B5D] bg-[#2E1B5D]/10 px-3 py-1 rounded-full border border-[#2E1B5D]/20">
                      Completed: {test.completionDate}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="font-serif italic text-sm sm:text-base leading-relaxed mb-5 text-[#190F26]">
                    "{test.quote}"
                  </p>
                </div>

                {/* Author Info + Client Photo & Book Thumbnail */}
                <div className="flex items-center justify-between border-t border-[#E3DDE9]/50 pt-4 mt-2">
                  {/* Client details */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37] shrink-0 shadow-sm">
                      <img
                        src={test.clientPhoto}
                        alt={test.author}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="font-sans font-bold text-sm block text-[#190F26]">
                        {test.author}
                      </span>
                      <span className="font-sans text-[11px] block text-[#554466]">
                        {test.location} • <strong className="text-[#2E1B5D] font-medium">{test.service}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Preserved Book Thumbnail */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-sans font-medium text-slate-400 hidden sm:inline">Preserved Volume:</span>
                    <div className="w-10 h-12 rounded overflow-hidden border border-[#D4AF37]/40 shadow-sm relative group/book">
                      <img
                        src={test.bookPhoto}
                        alt="Preserved Book Volume"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Featured Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#160b17]/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-3xl p-6 rounded-2xl border border-[#D4AF37]/30 flex flex-col relative bg-[#190F26] text-white shadow-2xl"
            >
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black flex items-center justify-center border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
                  alt="Sunanda Hegde Interview"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="p-4 rounded-full bg-[#D4AF37] text-black mb-3">
                    <Play className="w-8 h-8 fill-current text-black" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-white">Sunanda Hegde's Legacy Story</h3>
                  <p className="text-xs text-[#D4AF37] mt-1 font-sans">Full Video Interview • Recorded in Bengaluru</p>
                </div>
              </div>

              <div className="text-left space-y-2">
                <p className="text-xs text-white/80 italic font-serif leading-relaxed">
                  "Having Memoir Tale sit with our mother to record her life stories from the 1960s was the single best decision our family made. The hardcover book and digital voice archive are now our family's proudest treasure."
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


