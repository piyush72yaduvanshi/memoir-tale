import React, { useState } from "react";
import { BookOpen, Sparkles, Languages, ChevronRight, Bookmark } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";

interface SampleExcerpt {
  id: number;
  category: string;
  categoryHindi: string;
  bookTitle: string;
  bookTitleHindi: string;
  chapterNum: string;
  chapterNumHindi: string;
  excerptTitle: string;
  excerptTitleHindi: string;
  dropCap: string;
  proseLeft: string;
  proseLeftHindi: string;
  proseRight: string;
  proseRightHindi: string;
  quote: string;
  quoteHindi: string;
  authorSign: string;
  authorSignHindi: string;
}

const SAMPLE_EXCERPTS: SampleExcerpt[] = [
  {
    id: 1,
    category: "Family Heritage Memoir",
    categoryHindi: "पारिवारिक संस्मरण",
    bookTitle: "Whispers of the Banyan",
    bookTitleHindi: "बरगद की फुसफुसाहट",
    chapterNum: "Chapter I: Gwalior Childhood",
    chapterNumHindi: "अध्याय १: ग्वालियर का बचपन",
    excerptTitle: "The Courtyard of Eternal Summers",
    excerptTitleHindi: "सदाबहार गर्मियों का आंगन",
    dropCap: "T",
    proseLeft: "he ancient banyan tree at the center of our ancestral Gwalior home was not mere timber and leaves; it was a silent record-keeper. In the golden afternoons of 1958, my grandfather would gather us under its massive, protective canopy. The heavy scent of wet clay and boiling cardamoms drifted from my grandmother's clay hearth, while the hum of distant cicadas filled the dry air.",
    proseLeftHindi: "ग्वालियर के हमारे पुश्तैनी घर के आँगन में खड़ा वह विशाल बरगद का दरख़्त महज़ लकड़ी और पत्तियाँ नहीं था; वह हमारी पीढ़ियों का मौन गवाह था। सन् 1958 की तपती सुनहरी दोपहरियों में, दादाजी हम सब बच्चों को उसकी ठंडी, घनी जटाओं के नीचे बिठा लिया करते थे। रसोई से आती सोंधी गीली मिट्टी और इलायची की चाय की महक के बीच समय थम सा जाता था।",
    proseRight: "It was here that we learned the geometry of family honor and kindness. Grandfather would recount how our ancestors crossed the Chambal valleys with nothing but a trunk of Sanskrit manuscripts and iron grit. Each word was carved with deep pride, a soft reminder that we were children of resilience, meant to sustain the soil we were planted in.",
    proseRightHindi: "यहीं पर हमने पारिवारिक संस्कार और विनम्रता का पहला पाठ पढ़ा। दादाजी सुनाते थे कि कैसे हमारे पूर्वज केवल संस्कृत पाण्डुलिपियों का एक संदूक और फौलादी जिगर लेकर चम्बल के रास्तों से यहाँ पहुँचे थे। उनका बोला हर एक शब्द हमारी रगों में गर्व बनकर गूँजता था, यह याद दिलाते हुए कि हमारी जड़ें कितनी मज़बूत हैं।",
    quote: "Our roots do not bind us; they hold us upright so we can reach the heavens.",
    quoteHindi: "हमारी जड़ें हमें बाँधती नहीं हैं; वे हमें सीधा खड़ा रखती हैं ताकि हम आसमान छू सकें।",
    authorSign: "By Dr. Reva Sen, Biographer",
    authorSignHindi: "लेखक: डॉ. रेवा सेन"
  },
  {
    id: 2,
    category: "Business Legacy Chapter",
    categoryHindi: "व्यावसायिक विरासत",
    bookTitle: "A Life in Steel & Ink",
    bookTitleHindi: "आधुनिक भारत का शिल्प",
    chapterNum: "Chapter IV: Ranchi Foothills",
    chapterNumHindi: "अध्याय ४: रांची की घाटियां",
    excerptTitle: "Of Coal Dust & Gilded Dreams",
    excerptTitleHindi: "कोयले की धूल और सुनहरे सपने",
    dropCap: "I",
    proseLeft: "n the bone-chilling winters of Jharkhand, 1974, the furnace at our first metallurgy workshop was our sole source of comfort and courage. I could feel the microscopic graphite dust settling in the lines of my hands—hands that had swapped corporate pens for rough hammers. My father worked eighteen-hour shifts, his eyes reflecting the molten gold of pure iron ore.",
    proseLeftHindi: "झारखंड की हाड़ कंपाने वाली 1974 की सर्दियों में, हमारी पहली छोटी वर्कशॉप में लगातार धधकती हुई भट्टी ही हमारी हिम्मत और आराम का स्रोत थी। लोहे की गर्द मेरे हाथों की लकीरों में जम जाया करती थी—वे हाथ जिन्होंने बड़ी नौकरियाँ छोड़कर औजार चुन लिए थे। मेरे पिताजी अठारह-अठारह घंटे काम करते थे, उनकी आँखों में पिघले हुए लोहे सी चमक हुआ करती थी।",
    proseRight: "Many mocked our humble ambitions, calling us foolish dreamers on barren soil. But father walked with a heavy, certain pace. He often said, 'Steel is not strengthened by quiet rooms, son. It is born in the agonizing white fire.' That single foundry laid the multi-million rupee foundation of the modern manufacturing empire we manage today.",
    proseRightHindi: "बहुत से लोगों ने हमारी छोटी कोशिशों का मज़ाक उड़ाया, हमें बंजर भूमि पर महल बनाने वाले दीवाने कहा। लेकिन पिताजी के कदम अडिग थे। वे अक्सर कहते थे, 'लोहा शांत कमरों में मज़बूत आकार नहीं लेता बेटा, उसे सुलगती आग में तपना ही पड़ता है।' उसी एक भट्टी ने आज के इस विशाल औद्योगिक साम्राज्य की बुनियाद रखी थी।",
    quote: "Values are the only currency that inflation cannot touch.",
    quoteHindi: "मूल्य ही एकमात्र ऐसी मुद्रा हैं जिसे महंगाई कभी छू नहीं सकती।",
    authorSign: "By Jayesh Narang, Lead Archivist",
    authorSignHindi: "लेखक: जयेश नारंग"
  },
  {
    id: 3,
    category: "Beloved Tribute Memoir",
    categoryHindi: "श्रद्धांजलि संस्मरण",
    bookTitle: "Seven Flights of Clay",
    bookTitleHindi: "मिट्टी के सात आसमान",
    chapterNum: "Chapter III: The Lucknow Wedding",
    chapterNumHindi: "अध्याय ३: लखनऊ की शादी",
    excerptTitle: "Under the Vermilion Canopy",
    excerptTitleHindi: "सिंदूरी मंडप के तले",
    dropCap: "S",
    proseLeft: "eptapadi was not merely seven vows walked around a crackling Agni fire; it was the quiet surrender of two young souls to a lifetime of shared destinies. Under the starlit canopy on that breezy Lucknow night in 1969, her hands trembled slightly as we held the garland. The shehnai melodies danced through the jasmine-scented courtyard, casting a magical golden glow.",
    proseLeftHindi: "सप्तपदी का अर्थ केवल अग्नि के फेरे लेना भर नहीं था; यह दो युवा आत्माओं द्वारा एक साझी नियति को समर्पित होने का मौन उत्सव था। सन् 1969 के लखनऊ की उस सुहानी रात में, सिंदूरी मंडप तले जब हमारे हाथ जयमाला की डोरी से बंधे, तो शहनाई की धुनें चमेली की खुशबू के साथ पूरे आंगन में तैरने लगी थीं।",
    proseRight: "For fifty-two years, that gentle Lucknow night remained our anchor through life's storms. She held my hand when our bank account held zero rupees, and she shook her head laughing when we finally bought our first car. To capture her soft, unyielding spirit in written pages is to give her back the immortality she quietly bestowed on us.",
    proseRightHindi: "बावन वर्षों के सफ़र में, वह लखनऊ की शाम हर मुश्किल तूफान में हमारा संबल बनी रही। जब हमारे खाते में शून्य बचा था, तब भी उन्होंने मेरा हाथ मज़बूती से थामे रखा। आज उनकी उस कोमल लेकिन अडिग आत्मा को इन पन्नों पर उतारना मेरे लिए उन्हें एक ऐसा उपहार देना है, जो कभी फीका नहीं पड़ेगा।",
    quote: "A lifetime is short, but a written legacy stays young forever.",
    quoteHindi: "एक जीवन छोटा हो सकता है, लेकिन लिखा हुआ इतिहास सदा जीवित रहता है।",
    authorSign: "By Kavita Rao, Creative Lead",
    authorSignHindi: "लेखक: कविता राव"
  }
];

export default function SampleChapters() {
  const { lang } = useLanguage();
  const isHindi = lang === "HI";
  
  const [activeExcerptIndex, setActiveExcerptIndex] = useState<number>(0);
  const activeExcerpt = SAMPLE_EXCERPTS[activeExcerptIndex];

  const labels = {
    title: isHindi ? "साहित्यिक गुणवत्ता का पूर्वावलोकन" : "Preview Our Literary Standard",
    subtitle: isHindi 
      ? "स्टोरीटेरेस की तरह, वास्तविक उत्कृष्ट संस्मरण कतरनें देखें। महसूस करें कि कैसे आपके माता-पिता के साधारण किस्से इतिहास बन जाते हैं।"
      : "Step into the pages of our actual handcrafted memoirs. Experience the meticulous prose, emotional depth, and elite design.",
    tagline: isHindi ? "पढ़ें उत्कृष्ट अंश" : "READ TIMLESS EXCERPTS",
    signature: isHindi ? "गिल्डेड एडिशन बायोग्राफी" : "Gilded Heritage Edition",
    chooseStory: isHindi ? "विषय चुनें:" : "Choose Excerpt Type:",
    btnNext: isHindi ? "अगला अंश" : "Next Excerpt",
    tip: isHindi ? "💡 प्रत्येक अध्याय पूरी तरह से अनुकूलित डिज़ाइन में मुद्रित किया जाता है।" : "💡 Every book chapter is individually stylized with custom photographs and drop caps."
  };

  return (
    <section 
      id="sample-chapters" 
      className="bg-[#FCFBF7] py-16 lg:py-24 text-[#190F26] relative overflow-hidden"
    >
      {/* Decorative subtle background lighting lines */}
      <div className="absolute top-[20%] right-[-100px] w-96 h-96 bg-[#2E1B5D]/3 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-100px] w-96 h-96 bg-[#8B3CDC]/2 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-[60px] h-[3px] bg-[#2E1B5D] rounded-[2px] mb-4" />
          <span className="font-sans font-semibold text-[11px] uppercase tracking-[3px] text-[#2E1B5D] mb-3 flex items-center gap-1.5 justify-center">
            <BookOpen className="h-4 w-4 text-[#2E1B5D]" /> {labels.tagline}
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#190F26] leading-tight">
            {labels.title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#554466] mt-3 max-w-xl leading-relaxed">
            {labels.subtitle}
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {SAMPLE_EXCERPTS.map((ex, idx) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => setActiveExcerptIndex(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-sans font-bold border transition-all cursor-pointer select-none outline-none focus:outline-none flex items-center space-x-1.5 ${
                activeExcerptIndex === idx
                  ? "bg-[#2E1B5D] text-[#190F26] border-[#2E1B5D] shadow-[0_6px_20px_rgba(139, 92, 246,0.25)] scale-105"
                  : "bg-white text-slate-600 border-[#E3DDE9]/60 hover:bg-[#FAF6F0] hover:text-[#190F26]"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5 shrink-0" />
              <span>{isHindi ? ex.categoryHindi : ex.category}</span>
            </button>
          ))}
        </div>

        {/* Realistic Open Book Simulator with StoryTerrace 3D Page Flip and Perspective */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden sm:overflow-visible">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExcerpt.id}
              initial={{ opacity: 0, rotateY: -12, x: -30, filter: "blur(4px)" }}
              animate={{ opacity: 1, rotateY: 0, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, rotateY: 12, x: 30, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAF6F0] text-[#190F26] rounded-3xl p-6 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.55)] border-t-[8px] border-t-[#2E1B5D] relative transform-gpu"
              style={{ perspective: 1200 }}
            >
              {/* Gold Ribbon Bookmarker Accent */}
              <div className="absolute right-12 top-0 w-6 h-20 bg-[#2E1B5D] rounded-b-lg shadow-md hidden sm:block">
                <div className="absolute bottom-1 left-1.5 right-1.5 h-1 border-b-2 border-dashed border-[#FAF6F0]/50" />
              </div>

              {/* Book Header (Showing simulated book context) */}
              <div className="w-full border-b border-[#E3DDE9] pb-4 mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#554466]/60 font-mono tracking-wider space-y-2 sm:space-y-0">
                <span className="font-serif italic text-sm text-[#2E1B5D] font-bold">
                  📖 {isHindi ? activeExcerpt.bookTitleHindi : activeExcerpt.bookTitle}
                </span>
                <span className="font-sans font-bold uppercase text-[10px]">
                  {labels.signature} • {isHindi ? activeExcerpt.chapterNumHindi : activeExcerpt.chapterNum}
                </span>
              </div>

              {/* Layout: Dual Column open book pages */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start relative">
                
                {/* Book Page Spine Center shadow in between (for large sizes) */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#E3DDE9]/80 shadow-[0_0_8px_rgba(0,0,0,0.1)]" />

                {/* Left Page Column */}
                <div className="space-y-4 text-left">
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#190F26] leading-tight mb-2 selection:bg-[#2E1B5D]/20">
                    {isHindi ? activeExcerpt.excerptTitleHindi : activeExcerpt.excerptTitle}
                  </h3>
                  <p className="font-serif text-sm sm:text-base text-[#190F26]/90 leading-relaxed indent-0 first-line:tracking-wide">
                    {/* Large Drop Cap Accent */}
                    <span className="float-left text-5xl sm:text-6xl font-serif font-bold text-[#2E1B5D] mr-3 mt-1.5 line-height-none bg-[#2E1B5D]/10 px-2 rounded-md border border-[#2E1B5D]/10 font-bold select-none">
                      {activeExcerpt.dropCap}
                    </span>
                    {isHindi ? activeExcerpt.proseLeftHindi : activeExcerpt.proseLeft}
                  </p>
                </div>

                {/* Right Page Column */}
                <div className="space-y-6 text-left flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <p className="font-serif text-sm sm:text-base text-[#190F26]/90 leading-relaxed">
                      {isHindi ? activeExcerpt.proseRightHindi : activeExcerpt.proseRight}
                    </p>

                    {/* Highly aesthetic quote container panel inside pages */}
                    <div className="border-l-4 border-[#2E1B5D] bg-[#2E1B5D]/5 p-4 rounded-r-xl italic font-serif text-[#190F26]/85 text-sm sm:text-base pl-5 my-6 leading-relaxed">
                      "{isHindi ? activeExcerpt.quoteHindi : activeExcerpt.quote}"
                    </div>
                  </div>

                  {/* Writer signature / footer of book */}
                  <div className="border-t border-[#E3DDE9]/60 pt-4 mt-4 flex items-center justify-between text-[#554466]/80 text-xs sm:text-sm">
                    <span className="font-mono text-[10.5px] uppercase tracking-wider bg-[#E3DDE9]/35 px-2.5 py-1 rounded">
                      Legacy Series
                    </span>
                    <span className="font-sans font-bold tracking-wide italic text-[#2E1B5D]">
                      {isHindi ? activeExcerpt.authorSignHindi : activeExcerpt.authorSign}
                    </span>
                  </div>
                </div>

              </div>

              {/* Live interactive pagination navigation controls */}
              <div className="mt-8 pt-6 border-t border-[#E3DDE9] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-[#554466]/70">
                <p className="font-medium text-[11px] sm:text-xs">
                  {labels.tip}
                </p>
                <div className="flex items-center space-x-1">
                  {SAMPLE_EXCERPTS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveExcerptIndex(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activeExcerptIndex === i 
                          ? "w-8 bg-[#2E1B5D]" 
                          : "w-2.5 bg-[#E3DDE9] hover:bg-[#2E1B5D]/40"
                      }`}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}



