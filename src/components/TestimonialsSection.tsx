import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { Star, Play, Pause, Volume2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TestimonialsSection() {
  const { lang } = useLanguage();
  const isHindi = lang === "HI";
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showAudioDemo, setShowAudioDemo] = useState(false);

  return (
    <section 
      id="testimonials-section"
      className="py-20 md:py-28 bg-[#faf7f0] text-primary overflow-hidden relative"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none paper-grain" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-accent-purple-light block mb-3">
            {isHindi ? "ग्राहक आवाज़ें" : "CLIENT VOICES"}
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-primary">
            {isHindi ? "बहु-पीढ़ीगत" : "Loved by Multi-Generational"} <br />
            <span className="font-serif italic text-accent-purple">
              {isHindi ? "परिवारों द्वारा प्रिय" : "Families"}
            </span>
          </h2>
        </div>

        {/* 2-Column Layout: Video Left, Testimonials Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Video Player */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-xl overflow-hidden border shadow-xl relative aspect-video sm:aspect-square flex items-center justify-center max-h-[480px] group bg-[#fcedca]/20 border-accent-purple/20">
              {/* Background image */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                alt="Happy elderly person reading memoir book"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[8s] select-none ${
                  isVideoPlaying ? 'scale-105 brightness-50' : 'scale-100 group-hover:scale-102 brightness-[0.85]'
                }`}
                referrerPolicy="no-referrer"
              />
              
              {/* Purple atmospheric filter */}
              <div className="absolute inset-0 bg-accent-purple/10 mix-blend-color-burn pointer-events-none" />

              {/* Play button */}
              <button
                onClick={() => {
                  setIsVideoPlaying(!isVideoPlaying);
                  setShowAudioDemo(true);
                }}
                className="relative z-20 w-16 h-16 rounded-full bg-gradient-to-r from-accent-purple to-accent-purple-dark text-white shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-300 active:scale-95"
                title="Play Audio Interview"
              >
                {isVideoPlaying ? (
                  <Pause className="w-6 h-6 animate-pulse fill-current" />
                ) : (
                  <Play className="w-6 h-6 translate-x-0.5 fill-current" />
                )}
              </button>

              {/* Video info overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 p-3.5 backdrop-blur-md bg-primary/80 border border-accent-purple/20 rounded-lg text-left">
                <span className="font-sans text-[9px] font-bold uppercase tracking-[2px] text-accent-purple block">
                  {isHindi ? "विशेष कथावाचक" : "FEATURED NARRATOR"}
                </span>
                <span className="font-serif font-bold text-sm text-white block">
                  {isHindi ? "सरदार गुरदेव सिंह सिद्धू, 84" : "Sardar Gurdev Singh Sidhu, 84"}
                </span>
                <span className="font-sans text-[10px] text-white/50 block mt-0.5">
                  {isHindi 
                    ? '"1947 के विभाजन, लाहौर से लुधियाना की यात्रा को याद करते हैं।"'
                    : '"Remembers the partition in 1947, Lahore to Ludhiana journey."'}
                </span>
              </div>
            </div>
            
            {/* Info text */}
            <span className="text-[11px] font-sans italic mt-3 select-none text-center text-text-muted">
              {isHindi 
                ? '*हमारे रीमास्टर किए गए 1947 विभाजन संस्मरण ऑडियो पूर्वावलोकन को सुनने के लिए ऊपर प्ले पर क्लिक करें।'
                : '*Click play above to sample our remastered 1947 partition memoirs audio preview.'}
            </span>
          </div>

          {/* Right Column - Testimonial Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {TESTIMONIALS.slice(0, 3).map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-xl border-l-4 border-l-accent-purple border-t border-r border-b text-left shadow-sm transition-all duration-300 hover:translate-x-1 bg-[#faf7f0] border-primary/5 hover:border-r-accent-purple/20"
              >
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-accent-purple">
                  {[...Array(test.rating)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="font-sans text-[9px] uppercase tracking-wider font-bold text-accent-purple ml-2.5">
                    {test.service} {isHindi ? "सत्यापित" : "VERIFIED"}
                  </span>
                </div>

                {/* Quote */}
                <p className="font-serif-sub italic text-base sm:text-lg font-light leading-relaxed mb-4 text-primary">
                  "{test.quote}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-accent-purple/10 flex items-center justify-center border border-accent-purple/20 font-sans font-bold text-accent-purple">
                    {test.initials}
                  </div>
                  <div>
                    <span className="font-sans font-bold text-sm block text-primary">
                      {test.author}
                    </span>
                    <span className="font-sans text-[10px] block text-text-muted">
                      {test.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Audio Demo Modal */}
      <AnimatePresence>
        {showAudioDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-xl border border-accent-purple/30 flex flex-col relative bg-[#faf2e1] text-primary"
            >
              <button
                onClick={() => {
                  setShowAudioDemo(false);
                  setIsVideoPlaying(false);
                }}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/10 cursor-pointer"
              >
                <X className="w-4 h-4 text-accent-purple" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <Volume2 className="w-5 h-5 text-accent-purple animate-bounce" />
                <span className="font-sans text-xs uppercase font-bold tracking-[2px] text-accent-purple">
                  {isHindi ? "ऑडियोबुक मास्टर पूर्वावलोकन" : "AUDIOBOOK MASTER PREVIEW"}
                </span>
              </div>

              <div className="text-center space-y-6 my-4">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-accent-purple select-none flex">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
                    alt="Sardar Gurdev Singh Sidhu"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg">
                    {isHindi ? "सिद्धू विरासत श्रृंखला" : "Sidhu Legacy Series"}
                  </h3>
                  <p className="font-serif-sub italic text-sm text-text-muted mt-1">
                    {isHindi 
                      ? '"खंड 1: लंबी यात्रा घर — लुधियाना का विभाजन"'
                      : '"Vol 1: The Long Journey Home — Partition of Ludhiana"'}
                  </p>
                </div>

                {/* Audio Waveform */}
                <div className="flex items-center justify-center gap-1.5 h-12">
                  {[...Array(14)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        height: isVideoPlaying ? `${Math.floor(Math.random() * 35) + 12}px` : '4px'
                      }}
                      className="w-1 bg-accent-purple rounded-full transition-all duration-300"
                    />
                  ))}
                </div>

                <div className="p-4 rounded bg-black/5 text-left border border-accent-purple/15">
                  <span className="font-serif italic text-xs leading-relaxed block text-center select-text">
                    {isHindi 
                      ? '"हम आखिरी ट्रेन में सवार हुए... इंजन ने सीटी बजाई और कोयले की धूल उड़ी। मेरी माँ ने मुझे कसकर पकड़ा। मैं सिर्फ पाँच साल का था लेकिन मुझे लुधियाना की खामोशी याद है..."'
                      : '"We boarded the last train... the engine whistled and the coal dust blew. My mother held me tightly. I was only five years old but I remember the silence of Ludhiana..."'}
                  </span>
                </div>

                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="w-full py-2.5 bg-accent-purple text-white font-sans font-bold text-xs uppercase tracking-widest rounded cursor-pointer hover:brightness-110"
                >
                  {isVideoPlaying 
                    ? (isHindi ? 'ऑडियो विराम दें' : 'Pause Audio Player')
                    : (isHindi ? 'ऑडियो फिर से शुरू करें' : 'Resume Audio Player')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


