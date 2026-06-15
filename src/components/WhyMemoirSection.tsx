import { motion } from 'motion/react';
import { Sparkles, Brain } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyMemoirSection() {
  const { lang } = useLanguage();
  const isHindi = lang === "HI";

  const fadingPoints = [
    { 
      text: isHindi ? 'समय के साथ खो जाता है' : 'Lost over time', 
      desc: isHindi ? 'दो पीढ़ियों में मौखिक विवरण मिट जाते हैं।' : 'Oral details erode within two generations.' 
    },
    { 
      text: isHindi ? 'केवल एक दिमाग में' : 'Only in one mind', 
      desc: isHindi ? 'व्यक्तिगत ज्ञान स्मृति में अलग-थलग रहता है।' : 'Personal wisdom stays isolated in memory.' 
    },
    { 
      text: isHindi ? 'नाजुक, भुला दिया गया' : 'Fragile, forgotten', 
      desc: isHindi ? 'पुरानी तस्वीरें नम गत्ते के बक्सों में सड़ जाती हैं।' : 'Old photographs decay in damp cardboard boxes.' 
    },
    { 
      text: isHindi ? 'पल गायब हो जाते हैं' : 'Moments disappear', 
      desc: isHindi ? 'दैनिक विजय पारिवारिक कथा से विलुप्त हो जाते हैं।' : 'Daily triumphs dissolve from the family narrative.' 
    }
  ];

  const bookPoints = [
    { 
      text: isHindi ? 'हमेशा के लिए संरक्षित' : 'Preserved forever', 
      desc: isHindi ? 'संग्रहीत कागज 300 से अधिक वर्षों तक लचीला रहता है।' : 'Archival paper stands resilient for over 300 years.' 
    },
    { 
      text: isHindi ? 'सभी के साथ साझा' : 'Shared with all', 
      desc: isHindi ? 'दूर के रिश्तेदार और वंशज वही कहानियाँ पढ़ते हैं।' : 'Distant relatives and descendants read the same stories.' 
    },
    { 
      text: isHindi ? 'मुद्रित, संजोया गया' : 'Printed, treasured', 
      desc: isHindi ? 'चमड़े की बाइंडिंग के अंदर पुनर्स्थापित उच्च-रिज़ॉल्यूशन फ़ोटो।' : 'Restored high-res photos nested inside leather-gilt binding.' 
    },
    { 
      text: isHindi ? 'कहानियाँ जीवित रहती हैं' : 'Stories live on', 
      desc: isHindi ? 'आपके दर्शन, विश्वास और संघर्ष दूसरों को प्रेरित करते हैं।' : 'Your philosophies, beliefs, and struggles inspire others.' 
    }
  ];

  return (
    <section 
      id="difference-section"
      className="py-20 md:py-28 bg-[#faf7f0] text-primary overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column - 7 columns */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Tag */}
            <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-accent-purple-light block mb-3">
              {isHindi ? "संस्मरण अंतर" : "THE MEMOIR DIFFERENCE"}
            </span>
            
            {/* Heading */}
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              {isHindi ? "जो स्मृति से फीका पड़ता है..." : "What fades from memory..."}<br />
              <span className="font-serif italic text-accent-purple">
                {isHindi ? "एक पुस्तक में हमेशा के लिए जीवित रहता है।" : "lives forever in a book."}
              </span>
            </h2>

            {/* Description */}
            <p className="font-serif-sub text-lg md:text-xl font-light leading-relaxed mb-10 italic text-primary/80">
              {isHindi 
                ? "ज्ञान बर्बाद करने के लिए सबसे महंगी संपत्ति है। जबकि अनुभव का एक जीवनकाल एक ही दिमाग में एकत्रित होता है, यह नाजुक है। समय के साथ, नाम धुंधले हो जाते हैं, समयसीमा बदल जाती है, और ऐतिहासिक संदर्भ गायब हो जाते हैं। मेमोयरटेल एक सुरक्षित लेखक के रूप में कार्य करता है, आपके जीवन के परीक्षणों और उपलब्धियों को मानक पुस्तकालय उत्कृष्ट कृतियों में क्रिस्टलीकृत करता है।"
                : "Wisdom is the most expensive wealth to waste. While a lifetime of experience is gathered in a single mind, it is fragile. Over time, names blur, timelines drift, and historical contexts vanish. MemoirTale acts as a secure scribe, crystallizing your life's trials and achievements into standard library masterpieces."}
            </p>

            {/* Comparison Cards Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* FADING MEMORY CARD */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="p-6 rounded-xl border transition-all duration-300 shadow-sm bg-white border-primary/5 hover:border-red-800/10"
              >
                <div className="mb-4 inline-flex p-3 rounded-full bg-red-500/10 text-red-500">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-4 text-[#ff6b6b]">
                  {isHindi ? "फीकी याद" : "Fading Memory"}
                </h3>
                <ul className="space-y-4">
                  {fadingPoints.map((pt, idx) => (
                    <li key={idx} className="flex gap-2.5 text-left">
                      <span className="text-red-400 font-sans font-bold text-xs mt-0.5">•</span>
                      <div>
                        <span className="font-sans font-bold text-xs uppercase tracking-wider block text-primary">
                          {pt.text}
                        </span>
                        <span className="font-sans text-[11px] block mt-0.5 text-text-muted">
                          {pt.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* MEMOIR BOOK CARD */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="p-6 rounded-xl border transition-all duration-300 shadow-md bg-white hover:scale-101 border-accent-purple/40"
              >
                <div className="mb-4 inline-flex p-3 rounded-full bg-accent-purple/15 text-accent-purple">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-4 text-accent-purple">
                  {isHindi ? "संस्मरण पुस्तक" : "Memoir Book"}
                </h3>
                <ul className="space-y-4">
                  {bookPoints.map((pt, idx) => (
                    <li key={idx} className="flex gap-2.5 text-left">
                      <span className="text-accent-purple font-sans font-bold text-xs mt-0.5">✓</span>
                      <div>
                        <span className="font-sans font-bold text-xs uppercase tracking-wider block text-primary">
                          {pt.text}
                        </span>
                        <span className="font-sans text-[11px] block mt-0.5 text-text-muted">
                          {pt.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>

          {/* Right Column - 5 columns (Image with quote) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex items-center justify-center min-h-[400px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full h-full rounded-xl overflow-hidden relative border-l-4 border-accent-purple min-h-[450px] shadow-2xl group flex"
            >
              <img
                src="https://picsum.photos/seed/mem_why/800/1000"
                alt="Three generations of family hands holding nostalgic old black and white photograph"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Purple overlay */}
              <div className="absolute inset-0 bg-accent-purple/8 pointer-events-none mix-blend-color-burn" />

              {/* Quote card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-primary/80 rounded-lg border border-accent-purple/25">
                <span className="font-serif italic text-white text-xs block leading-relaxed">
                  {isHindi 
                    ? '"हम आपके बचपन की फुसफुसाहट, आपके प्रवास की हिम्मत, और आपके जीवन के गोधूलि वर्षों की गहरी, समृद्ध बुद्धि को संरक्षित करते हैं।"'
                    : '"We preserve the whispers of your childhood, the courage of your migration, and the deep, rich wisdom of your twilight years."'}
                </span>
                <span className="font-sans font-bold text-[9px] uppercase tracking-wider text-accent-purple mt-2 block">
                  {isHindi ? "— मुख्य जीवनीकार, मेमोयरटेल" : "— Lead Biographer, MemoirTale"}
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
