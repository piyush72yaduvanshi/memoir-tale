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

  const customTestimonials = [
    {
      id: 1,
      quote: isHindi 
        ? "अपने पिता के जीवन को एक सुंदर ढंग से लिखे गए संस्मरण में बदलते देखना हमारे पूरे परिवार के लिए एक भावुक अनुभव था। यह सिर्फ एक किताब नहीं है—यह एक ऐसा उपहार है जो हमेशा हमारे साथ रहेगा।"
        : "Watching my father's life transformed into a beautifully written memoir was an emotional experience for our entire family. It's more than a book—it's a gift that will stay with us forever.",
      author: "Sunanda H.",
      location: isHindi ? "बेंगलुरु" : "Bengaluru",
      projectType: isHindi ? "यात्रा संस्मरण संग्रह" : "Travel Journal Collection",
      initials: "SH"
    },
    {
      id: 2,
      quote: isHindi
        ? "टीम ने हर याद को अद्भुत देखभाल और प्रामाणिकता के साथ सहेजा। उन्होंने केवल हमारी कहानी नहीं लिखी—उन्होंने हमारे परिवार की विरासत को हमेशा के लिए सुरक्षित कर दिया।"
        : "The team captured every memory with incredible care and authenticity. They didn't just write our story—they preserved our family's legacy.",
      author: "Rajesh K.",
      location: isHindi ? "नई दिल्ली" : "New Delhi",
      projectType: isHindi ? "जीवन कहानी संस्मरण" : "Life Story Memoir",
      initials: "RK"
    },
    {
      id: 3,
      quote: isHindi
        ? "पहले साक्षात्कार से लेकर अंतिम हार्डकवर पुस्तक तक, हर विवरण में व्यावसायिकता, सहानुभूति और कारीगरी झलकती थी। हम इससे अधिक सार्थक स्मृति चिह्न की उम्मीद नहीं कर सकते थे।"
        : "From the first interview to the final hardcover, every detail reflected professionalism, empathy, and craftsmanship. We couldn't have asked for a more meaningful keepsake.",
      author: "Priya S.",
      location: isHindi ? "मुंबई" : "Mumbai",
      projectType: isHindi ? "पारिवारिक विरासत पुस्तक" : "Family Legacy Book",
      initials: "PS"
    }
  ];

  const handleCtaClick = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="testimonials-section"
      className="py-20 md:py-28 bg-[#faf7f0] text-primary overflow-hidden relative border-b border-[#E3DDE9]/40"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none paper-grain" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-[rgb(46,27,93)] block mb-3">
            {isHindi ? "परिवारों द्वारा भरोसेमंद ⭐" : "TRUSTED BY FAMILIES ⭐"}
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4.5xl lg:text-[48px] text-[#190F26] tracking-tight leading-tight">
            {isHindi ? "जो कहानियां हम संजोते हैं, वे स्थायी प्रभाव छोड़ती हैं" : "The Stories We Preserve Leave a Lasting Impact"}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#554466] mt-4 leading-relaxed">
            {isHindi 
              ? "हमारे द्वारा बनाई जाने वाली हर बायोग्राफी गहराई से व्यक्तिगत होती है। यहाँ जानें कि व्यक्तियों और परिवारों ने सबसे महत्वपूर्ण कहानियों को सहेजने के अपने अनुभव के बारे में क्या कहा है।"
              : "Every memoir we create is deeply personal. Here's what individuals and families have shared about their experience of preserving the stories that matter most."}
          </p>
        </div>

        {/* 2-Column Layout: Video Left, Testimonials Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column - Video Player */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-2xl overflow-hidden border shadow-xl relative aspect-video sm:aspect-square flex items-center justify-center max-h-[480px] group bg-[#fcedca]/20 border-[rgb(46,27,93)]/20">
              {/* Background image */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                alt="Hear Their Story"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[8s] select-none ${isVideoPlaying ? 'scale-105 brightness-50' : 'scale-100 group-hover:scale-102 brightness-[0.85]'
                  }`}
                referrerPolicy="no-referrer"
              />

              {/* Dark atmospheric overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Play button */}
              <button
                onClick={() => {
                  setIsVideoPlaying(!isVideoPlaying);
                  setShowAudioDemo(true);
                }}
                className="relative z-20 w-16 h-16 rounded-full bg-[rgb(46,27,93)] text-white shadow-xl flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
                title={isHindi ? "उनकी कहानी सुनें" : "Hear Their Story"}
              >
                {isVideoPlaying ? (
                  <Pause className="w-6 h-6 animate-pulse fill-current" />
                ) : (
                  <Play className="w-6 h-6 translate-x-0.5 fill-current" />
                )}
              </button>

              {/* Video info overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 p-4 backdrop-blur-md bg-[#190F26]/85 border border-white/10 rounded-xl text-left">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#C5A3ED] block mb-1">
                  {isHindi ? "उनकी कहानी सुनें" : "HEAR THEIR STORY"}
                </span>
                <p className="font-sans text-xs text-white/90 leading-relaxed">
                  {isHindi
                    ? "देखें कि मेमोयर टेल ने परिवारों को यादों को सहेजने, प्रियजनों का जश्न मनाने और ऐसी विरासत बनाने में कैसे मदद की जो पीढ़ियों तक संजोई जाएगी।"
                    : "Watch how Memoir Tale helped families preserve memories, celebrate loved ones, and create legacies that will be cherished for generations."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Testimonial Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {customTestimonials.map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl border-l-4 border-l-[rgb(46,27,93)] border-t border-r border-b text-left shadow-sm transition-all duration-300 hover:-translate-y-1 bg-white border-[#E3DDE9]/60 hover:border-r-[rgb(46,27,93)]/30"
              >
                {/* Rating Stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#2E1B5D]">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-current text-amber-500" />
                    ))}
                  </div>

                  {/* Project Type Sub-Label */}
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[rgb(46,27,93)] bg-[rgb(46,27,93)]/10 px-3 py-1 rounded-full border border-[rgb(46,27,93)]/20">
                    {test.projectType}
                  </span>
                </div>

                {/* Quote */}
                <p className="font-serif italic text-base sm:text-lg leading-relaxed mb-4 text-[#190F26]">
                  "{test.quote}"
                </p>

                {/* Author info & project label */}
                <div className="flex items-center justify-between border-t border-[#E3DDE9]/50 pt-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[rgb(46,27,93)]/10 flex items-center justify-center border border-[rgb(46,27,93)]/20 font-sans font-bold text-[rgb(46,27,93)] text-xs">
                      {test.initials}
                    </div>
                    <div>
                      <span className="font-sans font-bold text-sm block text-[#190F26]">
                        {test.author}
                      </span>
                      <span className="font-sans text-[11px] block text-[#554466]">
                        {test.location}
                      </span>
                    </div>
                  </div>

                  <span className="font-sans text-xs italic text-[#554466]">
                    {test.projectType}
                  </span>
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


