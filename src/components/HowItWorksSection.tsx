/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, Camera, PenTool, Headphones, BookOpen, 
  Sparkles, Compass, ArrowRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HowItWorksProps {
  darkMode?: boolean;
  onCtaClick: () => void;
}

interface DetailedStep {
  number: string;
  title: string;
  titleHi: string;
  shortDesc: string;
  shortDescHi: string;
  longDesc: string;
  longDescHi: string;
  icon: any;
  tip: string;
  tipHi: string;
  status: string;
  statusHi: string;
  subValue: string;
  subValueHi: string;
  image: string;
}

const stepsDetails: DetailedStep[] = [
  {
    number: '01',
    title: 'Share Memories',
    titleHi: 'यादें साझा करें',
    shortDesc: 'Begin by sharing raw anecdotes, diaries or verbal narratives.',
    shortDescHi: 'कहानियों, डायरियों या मौखिक संस्मरणों को साझा करने से शुरुआत करें।',
    longDesc: 'We match you with a dedicated professional biographer selected for your precise personality and cultural background. Through comfortable virtual or in-person conversational interviews, we guide you to narrate your life journey with zero stress. You discuss freely like old friends while we record and capture every emotional nuance.',
    longDescHi: 'हम आपकी पसंद और पृष्ठभूमि के अनुसार एक समर्पित पेशेवर जीवनी लेखक चुनते हैं। वीडियो कॉल या व्यक्तिगत बातचीत के माध्यम से, हम आपकी जीवन यात्रा को बिना किसी तनाव के साझा करने में आपका मार्गदर्शन करते हैं। आप पुराने दोस्तों की तरह खुलकर बातचीत करते हैं और हम हर भावना को सहेजते हैं।',
    icon: Radio,
    tip: 'No physical writing or notes required. Most families utilize 3 to 6 hours of conversational recording alongside afternoon tea.',
    tipHi: 'लिखने या नोट्स बनाने की कोई आवश्यकता नहीं है। अधिकांश परिवार दोपहर की चाय के साथ 3 से 6 घंटे की अनौपचारिक बातचीत का उपयोग करते हैं।',
    status: 'MATCHED WITH WRITER',
    statusHi: 'लेखक आवंटित',
    subValue: '1-on-1 Legacy Companion Paired',
    subValueHi: 'व्यक्तिगत जीवनी लेखक से मिलान',
    image: 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '02',
    title: 'Assemble Your Cache',
    titleHi: 'दस्तावेज़ एकत्रित करें',
    shortDesc: 'Collect vintage snapshots, hand-inked letters, or ancestry indexes.',
    shortDescHi: 'पुरानी तस्वीरें, हाथ से लिखे पत्र या वंश सूची एकत्रित करें।',
    longDesc: 'Gather physical photo albums, dusty clippings, vintage polaroids, recipes, and lineage maps. Send them in physical folders or upload digital scans. Our specialized graphical artists execute professional high-resolution scans, manually editing out dust, scuffs, and cracks so old treasures match modern clarity.',
    longDescHi: 'पारिवारिक फोटो एलबम, पुरानी तस्वीरें, रेसिपी और वंशावली के नक्शे एकत्र करें। हमारी विशेषज्ञ डिजाइनिंग टीम इन अमूल्य दस्तावेजों को उच्च-रिजॉल्यूशन में स्कैन करके डिजिटल रूप से पुनर्स्थापित (restore) करती है, जिससे वे बिल्कुल नए जैसे हो जाते हैं।',
    icon: Camera,
    tip: 'We repair tears digitally. Faded tint shades are manually balanced back to their authentic photographic warmth.',
    tipHi: 'हम फटी हुई तस्वीरों को डिजिटल रूप से ठीक करते हैं और फीके पड़ चुके रंगों को उनकी मूल चमक में वापस लाते हैं।',
    status: 'ARCHIVE RESTORATION ACTIVE',
    statusHi: 'डिजिटल बहाली सक्रिय',
    subValue: '600 DPI Non-destructive Scanning',
    subValueHi: '600 DPI उच्च-गुणवत्ता स्कैनिंग',
    image: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '03',
    title: 'We Compose the Story',
    titleHi: 'कहानी की रचना',
    shortDesc: 'Our elite authors mold transcriptions into a premium grade chronicle.',
    shortDescHi: 'हमारे उत्कृष्ट लेखक आपकी यादों को एक सुंदर पुस्तक का रूप देते हैं।',
    longDesc: 'Your expert author carefully structures historical events, diaries, and stories into logical chapters. We retain your precise voice, dry humor, and regional accents while ensuring top-tier syntactic grace. You receive drafts on premium parchment layouts with unlimited opportunities for revision.',
    longDescHi: 'आपके लेखक आपकी जीवन यात्रा को सुंदर अध्यायों में व्यवस्थित करते हैं। हम आपके वास्तविक लहजे, हास्य और क्षेत्रीय प्रभाव को बनाए रखते हुए उत्कृष्ट भाषा शैली सुनिश्चित करते हैं। आपको समीक्षा के लिए प्रारंभिक मसौदे भेजे जाते हैं और सुधार के असीमित अवसर मिलते हैं।',
    icon: PenTool,
    tip: 'Every single line is cross-checked under historical timelines of Jhansi and regional records for pristine accuracy.',
    tipHi: 'हर जानकारी को पूरी सटीकता के साथ ऐतिहासिक संदर्भों और क्षेत्रीय अभिलेखों से मिलान किया जाता है।',
    status: 'CHRONICLE SYNTAX APPLIED',
    statusHi: 'कहानी लेखन प्रगति पर',
    subValue: 'Empathetic Human Literary Editing',
    subValueHi: 'संवेदनशील साहित्यिक संपादन',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '04',
    title: 'Personalized Audio',
    titleHi: 'व्यक्तिगत ऑडियो संस्करण',
    shortDesc: 'Accompany printed books with atmospheric legacy audio narration.',
    shortDescHi: 'मुद्रित पुस्तकों के साथ एक सुंदर ऑडियो संस्मरण भी प्राप्त करें।',
    longDesc: 'Our sound engineers compile an optional companion legacy audiobook. We can master your actual interview recording into warm, crackle-free podcasts, embed serene instrumental strings, or employ AI voice cloning so grand-nieces can hear grandma reading her own recipes.',
    longDescHi: 'हमारे साउंड इंजीनियर एक वैकल्पिक ऑडियोबुक तैयार करते हैं। हम आपके साक्षात्कारों को मधुर संगीत के साथ पॉडकास्ट में बदल सकते हैं, या एआई आवाज तकनीक का उपयोग कर सकते हैं ताकि आने वाली पीढ़ियां आपकी आवाज में कहानियों को सुन सकें।',
    icon: Headphones,
    tip: 'Includes premium digital QR codes printed inside book pages, allowing instant playback from any mobile browser.',
    tipHi: 'पुस्तक के पन्नों के भीतर क्यूआर (QR) कोड मुद्रित होते हैं, जिससे मोबाइल पर तुरंत प्लेबैक किया जा सकता है।',
    status: 'AURAL MASTER COMPLETE',
    statusHi: 'ऑडियो संस्करण तैयार',
    subValue: '96kHz Atmospheric Spatial Audio',
    subValueHi: '96kHz उच्च-गुणवत्ता ऑडियो संस्करण',
    image: 'https://images.unsplash.com/photo-1484755560693-a4074577af3a?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '05',
    title: 'Unbox Your Memoir',
    titleHi: 'संस्मरण का अनावरण',
    shortDesc: 'Receive your masterfully bound hardcovers inside custom presentation cases.',
    shortDescHi: 'सुंदर सिल्क और मखमली बॉक्स में अपनी हस्तनिर्मित पुस्तक प्राप्त करें।',
    longDesc: 'The final layout is transferred to our classic bookbinding partners. We print on heavy, 300-year acid-free German paper, hand-stitch the spine signatures, and print title monograms with real gold-foil leaf. Your hand-wrapped volume is packed inside an elegant velvet and linen chest before courier transit.',
    longDescHi: 'आपकी अंतिम संतुष्टि के बाद, हमारी बाइंडिंग टीम इसे 300 वर्षों तक सुरक्षित रहने वाले जर्मन पेपर पर प्रिंट करती है। पुस्तक के कवर पर असली सोने की पत्ती (gold-foil leaf) से नक्काशी की जाती है और इसे मखमली बॉक्स में आपके घर भेजा जाता है।',
    icon: BookOpen,
    tip: 'Each layout is saved securely in our digital vaults, ensuring descendants can order extra copies at any time.',
    tipHi: 'प्रत्येक लेआउट हमारे सुरक्षित डिजिटल वॉल्ट में सहेजा जाता है ताकि भविष्य में परिवार के अन्य सदस्य अतिरिक्त प्रतियां मंगवा सकें।',
    status: 'LIBRARY DEPOSIT COMPLETE',
    statusHi: 'सुरक्षित मुद्रण पूर्ण',
    subValue: 'Linen Spine & Gold-Foil Embossed',
    subValueHi: 'सिल्क स्पाइन और गोल्ड-फॉइल एम्बॉस्ड',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop'
  }
];

export default function HowItWorksSection({ darkMode = false, onCtaClick }: HowItWorksProps) {
  const { lang } = useLanguage();
  const isHindi = lang === 'HI';
  
  const [activeStep, setActiveStep] = useState<number>(0);
  const [autoplay, setAutoplay] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const DURATION = 8000; // Elegant 8 seconds per phase

  useEffect(() => {
    setProgress(0);
  }, [activeStep]);

  useEffect(() => {
    if (!autoplay) return;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= DURATION) {
        setActiveStep((prev) => (prev < stepsDetails.length - 1 ? prev + 1 : 0));
      }
    }, 30); // smooth fluid updates

    return () => clearInterval(interval);
  }, [autoplay, activeStep]);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    setProgress(0);
  };

  const currentStepData = stepsDetails[activeStep];
  const StepIcon = currentStepData.icon;

  return (
    <section 
      id="how-it-works"
      className={`py-20 md:py-28 transition-colors duration-500 overflow-hidden relative border-t border-b ${
        darkMode 
          ? 'bg-[#2D1B36] border-white/5 text-[#F5F0F8]' 
          : 'bg-gradient-to-b from-[#FAF8F5] via-[#FCFBF7] to-[#FAF6F0] border-[#E3DDE9]/50 text-[#190F26]'
      }`}
    >
      {/* Decorative lens leaks in branding purple/indigo instead of gold */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#2E1B5D]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8B3CDC]/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none paper-grain z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        {/* Section Header with badge and layout centering */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center justify-center gap-3 flex-wrap mb-4" id="process-timeline-status-badge">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#2E1B5D]/10 dark:bg-[#A78BFA]/10 border border-[#2E1B5D]/25 dark:border-[#A78BFA]/25 rounded-full">
              <Compass className={`w-3.5 h-3.5 text-[#2E1B5D] dark:text-[#A78BFA] ${autoplay ? 'animate-spin-slow' : ''}`} style={{ animationDuration: '8s' }} />
              <span className="font-sans text-[10px] font-bold tracking-[2px] uppercase text-[#2E1B5D] dark:text-[#A78BFA]">
                {isHindi ? 'विशिष्ट समयरेखा' : 'Bespoke Timeline'}
              </span>
            </div>

            <button
              id="process-autoplay-toggle"
              onClick={() => setAutoplay(!autoplay)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-sans font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                autoplay 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold'
              }`}
              title="Click to toggle process auto-play"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${autoplay ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
              {autoplay ? (isHindi ? 'लाइव चल रहा है' : 'Playing Live') : (isHindi ? 'रुका हुआ है' : 'Paused')}
            </button>
          </div>
          
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            {isHindi ? (
              <>हम आपकी जीवन की कहानियों को <br /><span className="font-serif italic text-[#2E1B5D] dark:text-[#A78BFA]">साहित्यिक कला में कैसे बदलते हैं</span></>
            ) : (
              <>How We Transform Your Life Stories <br /><span className="font-serif italic text-[#2E1B5D] dark:text-[#A78BFA]">Into Literary Art</span></>
            )}
          </h2>
          <p className={`mt-4 font-sans text-xs md:text-sm leading-relaxed max-w-xl mx-auto ${
            darkMode ? 'text-[#F5F0F8]/60' : 'text-[#554466]'
          }`}>
            {isHindi 
              ? 'हम सब कुछ संभालते हैं। आपके लिविंग रूम में सहज साक्षात्कारों से लेकर धुंधली पारिवारिक तस्वीरों की बारीकी से बहाली तक, यहाँ हमारी संपूर्ण हस्तकला प्रक्रिया है।'
              : 'We handle everything. From gentle interviews in your living room to painstaking restoration of fading family snapshots, here is our complete artisan process.'
            }
          </p>
        </div>

        {/* Major split structural grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 columns) - The Stepper Directory */}
          <div className="lg:col-span-5 flex flex-col gap-4 relative">
            
            {/* Elegant vertical continuous progress line in theme purple */}
            <div className={`absolute left-8 top-10 bottom-10 w-0.5 pointer-events-none z-0 ${
              darkMode ? 'bg-white/15' : 'bg-[#2E1B5D]/15'
            }`}>
              {/* Purple filling line based on state index */}
              <motion.div 
                className="w-full bg-gradient-to-b from-[#2E1B5D] to-[#8B3CDC] origin-top"
                animate={{ height: `${(activeStep / (stepsDetails.length - 1)) * 100}%` }}
                transition={{ duration: 0.4 }}
                style={{ height: '0%' }}
              />
            </div>

            {stepsDetails.map((step, idx) => {
              const isActive = activeStep === idx;
              const title = isHindi ? step.titleHi : step.title;
              const shortDesc = isHindi ? step.shortDescHi : step.shortDesc;
              
              return (
                <button
                  key={step.number}
                  onClick={() => handleStepClick(idx)}
                  className={`w-full p-5 rounded-xl border flex items-start gap-4 transition-all duration-300 relative z-10 cursor-pointer outline-none text-left select-none group overflow-hidden ${
                    isActive
                      ? darkMode
                        ? 'border-[#A78BFA]/45 bg-[#3A2447] shadow-lg shadow-[#2E1B5D]/10 pb-6'
                        : 'border-[#2E1B5D]/45 bg-white shadow-lg pb-6'
                      : darkMode
                      ? 'border-white/5 bg-[#2D1B36]/45 hover:bg-[#3A2447]/60 hover:border-white/15'
                      : 'border-[#E3DDE9]/60 bg-white/45 hover:bg-white hover:border-[#2E1B5D]/40'
                  }`}
                  id={`process-step-trigger-${step.number}`}
                >
                  {/* Subtle filling progress bar inside the active card footer */}
                  {isActive && autoplay && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2E1B5D]/10 dark:bg-[#A78BFA]/10 overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#2E1B5D] via-[#8B3CDC] to-[#2E1B5D] dark:from-[#A78BFA] dark:via-[#C4B5FD] dark:to-[#A78BFA]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {/* Steps Number / Bubble */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border font-serif font-bold text-xs relative z-10 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#2E1B5D] to-[#8B3CDC] text-white border-[#2E1B5D] scale-110 shadow-md shadow-[#2E1B5D]/20'
                      : darkMode
                      ? 'bg-[#3A2447] text-[#F5F0F8]/50 border-white/10'
                      : 'bg-[#FAF6F0] text-[#2E1B5D]/50 border-[#E3DDE9]/60'
                  }`}>
                    {step.number}
                  </div>

                  {/* Header Title Information card */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-serif font-bold text-sm sm:text-base leading-none transition-colors ${
                        isActive 
                          ? 'text-[#2E1B5D] dark:text-[#A78BFA]' 
                          : darkMode 
                          ? 'text-[#F5F0F8]/80 group-hover:text-white' 
                          : 'text-[#190F26]/80 group-hover:text-[#190F26]'
                      }`}>
                        {title}
                      </span>
                      
                      {/* Active theme indicator dot */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-2 h-2 rounded-full bg-[#2E1B5D] dark:bg-[#A78BFA] animate-pulse"
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    <p className={`font-sans text-[11px] leading-relaxed transition-colors ${
                      isActive
                        ? darkMode ? 'text-[#F5F0F8]/70' : 'text-[#554466]'
                        : darkMode ? 'text-[#a28da6] group-hover:text-[#F5F0F8]/60' : 'text-[#554466]/65 group-hover:text-[#190F26]/65'
                    }`}>
                      {shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column (7 columns) - Large Aesthetic Display Frame */}
          <div className="lg:col-span-7" id="process-details-canvas">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.45 }}
                className={`rounded-2xl border overflow-hidden shadow-2xl text-left relative flex flex-col group ${
                  darkMode ? 'bg-[#2D1B36] border-white/10' : 'bg-white border-[#E3DDE9]/60'
                }`}
              >
                {/* Horizontal Live Progress Bar at the top of the details frame */}
                <div className="w-full h-1 bg-[#2E1B5D]/10 dark:bg-[#A78BFA]/10 relative overflow-hidden shrink-0 z-20">
                  <div 
                    className="h-full bg-gradient-to-r from-[#2E1B5D] via-[#8B3CDC] to-[#2E1B5D] dark:from-[#A78BFA] dark:via-[#C4B5FD] dark:to-[#A78BFA] transition-all duration-30"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Paper texture overlay for bookish finish */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none paper-grain mix-blend-multiply z-10" />

                {/* Cover High-Quality Picture Section */}
                <div className="relative h-64 sm:h-80 overflow-hidden flex">
                  
                  {/* Photo Display */}
                  <img
                    src={currentStepData.image}
                    alt={isHindi ? currentStepData.titleHi : currentStepData.title}
                    className="w-full h-full object-cover transition-transform duration-[8s] ease-out group-hover:scale-105 select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Theme purple atmospheric film filter */}
                  <div className="absolute inset-0 bg-[#1e102f]/50 dark:bg-[#1f102b]/75 opacity-80 pointer-events-none" />
                  
                  {/* Purple tone blend */}
                  <div className="absolute inset-0 bg-[#2E1B5D]/10 mix-blend-color-burn pointer-events-none" />

                  {/* Dark block gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

                  {/* Top Header metadata */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="py-1 px-3 bg-black/50 backdrop-blur-md rounded border border-[#2E1B5D]/20 text-[9px] uppercase tracking-widest font-sans font-bold text-[#A78BFA] shadow-md">
                      {isHindi ? `चरण ${currentStepData.number} / 05` : `STAGE ${currentStepData.number} OF 05`}
                    </span>
                    <span className="py-1 px-3 bg-[#3A2447]/90 text-[#FAF6F0] text-[9px] uppercase tracking-[1.5px] font-sans font-bold rounded shadow-md border border-white/10">
                      {isHindi ? currentStepData.statusHi : currentStepData.status}
                    </span>
                  </div>

                  {/* Selected step floating graphic description overlay */}
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-[#2E1B5D] to-[#8B3CDC] rounded-xl text-white shadow-lg shadow-[#2E1B5D]/20 flex select-none">
                        <StepIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-xl text-white select-none">
                          {isHindi ? currentStepData.titleHi : currentStepData.title}
                        </h3>
                        <span className="font-sans text-[10px] uppercase font-bold tracking-[1.5px] text-[#A78BFA] block mt-0.5 select-none">
                          {isHindi ? currentStepData.subValueHi : currentStepData.subValue}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Literary review detailed description card body area */}
                <div className="p-6 md:p-8 space-y-6 relative z-20">
                  
                  {/* Detailed Description */}
                  <p className={`font-sans text-xs md:text-sm leading-relaxed ${
                    darkMode ? 'text-[#F5F0F8]/80' : 'text-[#554466]'
                  }`}>
                    {isHindi ? currentStepData.longDescHi : currentStepData.longDesc}
                  </p>

                  {/* Custom Biographer Hand-written styled Notes Box in theme purple */}
                  <div className={`p-4 rounded-xl border border-dashed text-left transition-colors relative overflow-hidden flex items-start gap-3.5 ${
                    darkMode 
                      ? 'bg-[#2E1B5D]/5 border-[#A78BFA]/20 text-[#F5F0F8]/90' 
                      : 'bg-[#2E1B5D]/5 border-[#2E1B5D]/30 text-[#190F26]'
                  }`}>
                    {/* Decorative purple spiral on left border */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2E1B5D] to-[#8B3CDC]" />
                    
                    <div className="p-2 bg-gradient-to-r from-[#2E1B5D] to-[#8B3CDC] rounded-lg text-white font-bold shrink-0 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>

                    <div className="space-y-1">
                      <span className="font-sans text-[9px] uppercase tracking-[2px] font-bold text-[#2E1B5D] dark:text-[#A78BFA] block">
                        {isHindi ? 'जीवनीकार पुरालेख निर्देशिका' : 'Biographer Archival Guideline'}
                      </span>
                      <p className="font-serif-sub italic text-xs leading-normal font-light text-[#554466] dark:text-[#F5F0F8]/80">
                        "{isHindi ? currentStepData.tipHi : currentStepData.tip}"
                      </p>
                    </div>
                  </div>

                  {/* CTA button to begin legacy booking inside frame */}
                  <div className="pt-4 flex items-center justify-between border-t border-[#E3DDE9]/30 dark:border-white/10 flex-wrap gap-4">
                    <span className={`font-sans text-[10px] md:text-xs select-none ${darkMode ? 'text-[#F5F0F8]/40' : 'text-[#190F26]/45'}`}>
                      {isHindi 
                        ? '*साइन-अप के 14 दिनों के भीतर बिना शर्त 100% रिफंड गारंटी।'
                        : '*Unconditional 100% refund guarantee inside 14 days of sign-up.'
                      }
                    </span>

                    <button
                      onClick={onCtaClick}
                      className="inline-flex items-center gap-2 py-2.5 px-5 bg-gradient-to-r from-[#2E1B5D] to-[#1F1240] text-white hover:brightness-110 font-sans font-bold text-[10px] uppercase tracking-wider rounded transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                    >
                      {isHindi ? 'इस चरण को बुक करें' : 'Commission This Phase'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
