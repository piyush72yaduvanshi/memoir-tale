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
    title: 'Discover Your Story',
    titleHi: 'अपनी कहानी खोजें',
    shortDesc: 'Every journey begins with a conversation. We take the time to understand your life, memories, milestones, and the legacy you wish to preserve.',
    shortDescHi: 'हर यात्रा एक बातचीत से शुरू होती है। हम आपके जीवन, यादों, मील के पत्थरों और उस विरासत को समझने के लिए समय लेते हैं जिसे आप सहेजना चाहते हैं।',
    longDesc: 'Through personal conversations and guided interviews, we understand your journey, values, and memories. This foundation allows us to create a story that is authentic, deeply personal, and uniquely yours.',
    longDescHi: 'व्यक्तिगत बातचीत और निर्देशित साक्षात्कारों के माध्यम से, हम आपकी यात्रा, मूल्यों और यादों को समझते हैं। यह नींव हमें एक ऐसी कहानी बनाने की अनुमति देती है जो प्रामाणिक, गहराई से व्यक्तिगत और आपकी अनूठी कहानी हो।',
    icon: Radio,
    tip: 'Every meaningful legacy begins with listening.',
    tipHi: 'हर सार्थक विरासत सुनने से शुरू होती है।',
    status: 'Step 01 — Discover Your Story',
    statusHi: 'चरण 01 — अपनी कहानी खोजें',
    subValue: 'Every meaningful legacy begins with listening.',
    subValueHi: 'हर सार्थक विरासत सुनने से शुरू होती है।',
    image: 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '02',
    title: 'Gather Your Memories',
    titleHi: 'अपनी यादें एकत्रित करें',
    shortDesc: 'Photographs, letters, journals, certificates, family records, videos, and cherished keepsakes help bring your story to life. Our team carefully organizes and preserves every detail.',
    shortDescHi: 'तस्वीरें, पत्र, पत्रिकायें, प्रमाण पत्र, पारिवारिक रिकॉर्ड और कीमती यादें आपकी कहानी को जीवंत बनाने में मदद करती हैं। हमारी टीम हर विवरण को ध्यान से व्यवस्थित और संरक्षित करती है।',
    longDesc: 'We collect and organize photographs, letters, journals, certificates, and treasured keepsakes to build a rich archive that supports your memoir and preserves your family\'s history.',
    longDescHi: 'हम आपकी संस्मरण पुस्तक का समर्थन करने और आपके परिवार के इतिहास को संरक्षित करने के लिए एक समृद्ध पुरालेख बनाने के लिए तस्वीरें, पत्र, पत्रिकायें, प्रमाण पत्र और कीमती यादें एकत्र और व्यवस्थित करते हैं।',
    icon: Camera,
    tip: 'Every photograph tells part of the story.',
    tipHi: 'हर तस्वीर कहानी का एक हिस्सा बताती है।',
    status: 'Step 02 — Gather Your Memories',
    statusHi: 'चरण 02 — अपनी यादें एकत्रित करें',
    subValue: 'Every photograph tells part of the story.',
    subValueHi: 'हर तस्वीर कहानी का एक हिस्सा बताती है।',
    image: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '03',
    title: 'Craft Your Narrative',
    titleHi: 'अपनी कहानी रचें',
    shortDesc: 'Our writers transform conversations, memories, and historical details into a beautifully written story that reflects your voice, personality, and life\'s journey.',
    shortDescHi: 'हमारे लेखक साक्षात्कारों, यादों और ऐतिहासिक विवरणों को एक सुंदर ढंग से लिखी गई कहानी में बदलते हैं जो आपकी आवाज़, व्यक्तित्व और जीवन यात्रा को दर्शाती है।',
    longDesc: 'Our experienced storytellers weave together interviews, family history, and personal experiences into a compelling narrative that captures your voice with authenticity and elegance.',
    longDescHi: 'हमारे अनुभवी कहानीकार साक्षात्कारों, पारिवारिक इतिहास और व्यक्तिगत अनुभवों को एक सम्मोहक कहानी में बुनते हैं जो आपकी आवाज़ को प्रामाणिकता और लालित्य के साथ पकड़ती है।',
    icon: PenTool,
    tip: 'Where memories become meaningful stories.',
    tipHi: 'जहाँ यादें अर्थपूर्ण कहानियाँ बन जाती हैं।',
    status: 'Step 03 — Craft Your Narrative',
    statusHi: 'चरण 03 — अपनी कहानी रचें',
    subValue: 'Where memories become meaningful stories.',
    subValueHi: 'जहाँ यादें अर्थपूर्ण कहानियाँ बन जाती हैं।',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '04',
    title: 'Design & Refine',
    titleHi: 'डिज़ाइन और निखारें',
    shortDesc: 'Every page is thoughtfully designed with elegant layouts, restored photographs, and carefully curated visuals. You review the manuscript and share your feedback before final approval.',
    shortDescHi: 'हर पृष्ठ को सुरुचिपूर्ण लेआउट, पुनर्स्थापित तस्वीरों और सावधानीपूर्वक क्यूरेट किए गए दृश्यों के साथ सोच-समझकर डिज़ाइन किया गया है। आप अंतिम अनुमोदन से पहले पांडुलिपि की समीक्षा करते हैं।',
    longDesc: 'From page layouts and typography to photo restoration and premium design, every detail is carefully perfected. You review the manuscript and collaborate with us until it feels complete.',
    longDescHi: 'पेज लेआउट और टाइपोग्राफी से लेकर फोटो बहाली और प्रीमियम डिज़ाइन तक, हर विवरण को सावधानीपूर्वक परिपूर्ण किया जाता है। आप पांडुलिपि की समीक्षा करते हैं और जब तक यह पूर्ण महसूस न हो तब तक हमारे साथ सहयोग करते हैं।',
    icon: Headphones,
    tip: 'Crafted with care, refined with precision.',
    tipHi: 'देखभाल के साथ निर्मित, सटीकता के साथ परिष्कृत।',
    status: 'Step 04 — Design & Refine',
    statusHi: 'चरण 04 — डिज़ाइन और निखारें',
    subValue: 'Crafted with care, refined with precision.',
    subValueHi: 'देखभाल के साथ निर्मित, सटीकता के साथ परिष्कृत।',
    image: 'https://images.unsplash.com/photo-1484755560693-a4074577af3a?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '05',
    title: 'Preserve Your Legacy',
    titleHi: 'अपनी विरासत को सहेजें',
    shortDesc: 'Your finished memoir is printed using premium materials and presented as a timeless keepsake—created to be treasured today and passed on to future generations.',
    shortDescHi: 'आपकी तैयार संस्मरण पुस्तक प्रीमियम सामग्रियों का उपयोग करके मुद्रित की जाती है और एक कालजयी यादगार के रूप में प्रस्तुत की जाती है — जो आज संजोकर रखने और आने वाली पीढ़ियों को सौंपने के लिए बनाई गई है।',
    longDesc: 'Your memoir is beautifully printed, carefully packaged, and delivered as a timeless keepsake—designed not only to be read today, but to be treasured by generations to come.',
    longDescHi: 'आपकी संस्मरण पुस्तक को खूबसूरती से मुद्रित, सावधानीपूर्वक पैक किया जाता है और एक कालजयी यादगार के रूप में वितरित किया जाता है — जिसे न केवल आज पढ़ा जा सके, बल्कि आने वाली पीढ़ियों के लिए संजोकर रखा जा सके।',
    icon: BookOpen,
    tip: 'A story created to outlive generations.',
    tipHi: 'पीढ़ियों तक जीवित रहने के लिए बनाई गई एक कहानी।',
    status: 'Step 05 — Preserve Your Legacy',
    statusHi: 'चरण 05 — अपनी विरासत को सहेजें',
    subValue: 'A story created to outlive generations.',
    subValueHi: 'पीढ़ियों तक जीवित रहने के लिए बनाई गई एक कहानी।',
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
    }, 30);

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
          ? 'bg-[#220E24] border-white/5 text-[#F5F0F8]' 
          : 'bg-gradient-to-b from-[#FAF8F5] via-[#FCFBF7] to-[#FAF6F0] border-[#E3DDE9]/50 text-[#190F26]'
      }`}
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#2E1B5D]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8B3CDC]/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none paper-grain z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center justify-center gap-3 flex-wrap mb-4" id="process-timeline-status-badge">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2E1B5D]/10 dark:bg-white/10 border border-[#2E1B5D]/20 dark:border-white/20 rounded-full">
              <Compass className={`w-3.5 h-3.5 text-[#2E1B5D] dark:text-[#E5C463] ${autoplay ? 'animate-spin-slow' : ''}`} style={{ animationDuration: '8s' }} />
              <span className="font-sans text-[11px] font-bold tracking-[2px] uppercase text-[#2E1B5D] dark:text-[#E5C463]">
                {isHindi ? 'द मेमोयर टेल अनुभव' : 'THE MEMOIR TALE EXPERIENCE'}
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
              <>स्मृति से <span className="font-serif italic text-[#2E1B5D] dark:text-[#E5C463]">विरासत तक की यात्रा</span></>
            ) : (
              <>The Journey from <span className="font-serif italic text-[#2E1B5D] dark:text-[#E5C463]">Memory to Legacy</span></>
            )}
          </h2>
          <p className={`mt-4 font-sans text-xs md:text-sm leading-relaxed max-w-2xl mx-auto ${
            darkMode ? 'text-[#F5F0F8]/70' : 'text-[#554466]'
          }`}>
            {isHindi 
              ? 'हर कहानी एक विचारशील यात्रा का अनुसरण करती है। हमारी पहली बातचीत से लेकर अंतिम हस्तनिर्मित पुस्तक तक, हम आपकी यादों को देखभाल, प्रामाणिकता और असाधारण शिल्प कौशल के साथ सहेजते हैं।'
              : 'Every story follows a thoughtful journey. From our first conversation to the final handcrafted keepsake, we preserve your memories with care, authenticity, and exceptional craftsmanship.'
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
              <motion.div 
                className="w-full bg-gradient-to-b from-[#2E1B5D] via-[#8B3CDC] to-[#E5C463] origin-top"
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
                        ? 'bg-[#2B1638] border-[#A78BFA]/50 shadow-lg text-white'
                        : 'bg-white border-[#2E1B5D]/40 shadow-xl text-[#190F26]'
                      : darkMode
                        ? 'bg-[#1b101e]/60 border-white/5 text-white/60 hover:bg-[#251829] hover:border-white/20'
                        : 'bg-[#FAF6F0]/60 border-[#E3DDE9]/60 text-[#554466] hover:bg-white hover:border-[#2E1B5D]/20'
                  }`}
                >
                  {/* Step Number Circle */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#2E1B5D] to-[#8B3CDC] text-white shadow-md'
                      : darkMode
                        ? 'bg-[#251829] border border-white/10 text-white/50 group-hover:text-white'
                        : 'bg-[#FAF6F0] border border-[#E3DDE9] text-[#554466] group-hover:text-[#2E1B5D]'
                  }`}>
                    {step.number}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-serif font-bold text-base md:text-lg transition-colors ${
                        isActive 
                          ? darkMode ? 'text-white' : 'text-[#2E1B5D]'
                          : darkMode ? 'text-white/70 group-hover:text-white' : 'text-[#190F26]/80 group-hover:text-[#190F26]'
                      }`}>
                        {title}
                      </h3>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-2 h-2 rounded-full bg-[#8B3CDC] dark:bg-[#E5C463] animate-pulse"
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    <p className={`font-sans text-[11px] leading-relaxed transition-colors ${
                      isActive
                        ? darkMode ? 'text-white/80' : 'text-[#554466]'
                        : darkMode ? 'text-white/40 group-hover:text-white/60' : 'text-[#554466]/70 group-hover:text-[#190F26]'
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
                  darkMode ? 'bg-[#251829] border-white/10' : 'bg-white border-[#E3DDE9]/60'
                }`}
              >
                {/* Horizontal Live Progress Bar at the top */}
                <div className="w-full h-1 bg-[#2E1B5D]/10 relative overflow-hidden shrink-0 z-20">
                  <div 
                    className="h-full bg-gradient-to-r from-[#2E1B5D] via-[#8B3CDC] to-[#E5C463] transition-all duration-30"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none paper-grain mix-blend-multiply z-10" />

                {/* Photo Header Section */}
                <div className="relative h-64 sm:h-80 overflow-hidden flex">
                  <img
                    src={currentStepData.image}
                    alt={isHindi ? currentStepData.titleHi : currentStepData.title}
                    className="w-full h-full object-cover transition-transform duration-[8s] ease-out group-hover:scale-105 select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Photo Overlays */}
                  <div className="absolute inset-0 bg-[#1e102f]/50 dark:bg-[#1f102b]/75 opacity-80 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="py-1 px-3 bg-black/60 backdrop-blur-md rounded border border-white/20 text-[9px] uppercase tracking-widest font-sans font-bold text-[#E5C463] shadow-md">
                      {isHindi ? `चरण ${currentStepData.number} / 05` : `STAGE ${currentStepData.number} OF 05`}
                    </span>
                    <span className="py-1 px-3 bg-[#2E1B5D]/90 text-white text-[9px] uppercase tracking-[1.5px] font-sans font-bold rounded shadow-md border border-white/20">
                      {isHindi ? currentStepData.statusHi : currentStepData.status}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Content */}
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-[#2E1B5D] to-[#8B3CDC] rounded-xl text-white shadow-lg flex select-none">
                        <StepIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-xl text-white select-none">
                          {isHindi ? currentStepData.titleHi : currentStepData.title}
                        </h3>
                        <span className="font-sans text-[11px] font-medium text-[#E5C463] block mt-0.5 select-none">
                          {isHindi ? currentStepData.subValueHi : currentStepData.subValue}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Details Body */}
                <div className="p-6 md:p-8 space-y-6 relative z-20">
                  <p className={`font-sans text-xs md:text-sm leading-relaxed ${
                    darkMode ? 'text-[#F5F0F8]/80' : 'text-[#554466]'
                  }`}>
                    {isHindi ? currentStepData.longDescHi : currentStepData.longDesc}
                  </p>

                  {/* Archival Guideline Box */}
                  <div className={`p-4 rounded-xl border border-dashed text-left transition-colors relative overflow-hidden flex items-start gap-3.5 ${
                    darkMode 
                      ? 'bg-[#2E1B5D]/20 border-white/15 text-white/90' 
                      : 'bg-[#FAF6F0] border-[#2E1B5D]/20 text-[#190F26]'
                  }`}>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2E1B5D] to-[#8B3CDC]" />
                    
                    <div className="p-2 bg-gradient-to-r from-[#2E1B5D] to-[#8B3CDC] rounded-lg text-white font-bold shrink-0 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>

                    <div className="space-y-1">
                      <span className="font-sans text-[9px] uppercase tracking-[2px] font-bold text-[#2E1B5D] dark:text-[#E5C463] block">
                        {isHindi ? 'पुरालेख निर्देशिका' : 'ARCHIVAL GUIDELINE'}
                      </span>
                      <p className="font-serif-sub italic text-xs leading-normal font-light text-[#554466] dark:text-white/80">
                        "{isHindi ? currentStepData.tipHi : currentStepData.tip}"
                      </p>
                    </div>
                  </div>

                  {/* CTA Box inside panel */}
                  <div className="pt-4 flex items-center justify-between border-t border-[#E3DDE9]/40 dark:border-white/10 flex-wrap gap-4">
                    <span className={`font-sans text-[11px] md:text-xs font-semibold select-none ${darkMode ? 'text-white/80' : 'text-[#2E1B5D]'}`}>
                      {isHindi 
                        ? 'आपकी विरासत केवल यादों से अधिक की हकदार है — यह सहेजे जाने की हकदार है।'
                        : 'Your legacy deserves more than memories—it deserves to be preserved.'
                      }
                    </span>

                    <button
                      onClick={onCtaClick}
                      className="inline-flex items-center gap-2 py-2.5 px-6 bg-gradient-to-r from-[#2E1B5D] via-[#45147A] to-[#2E1B5D] text-white hover:brightness-110 font-sans font-bold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 border border-white/20"
                    >
                      {isHindi ? 'अपनी कहानी शुरू करें →' : 'Start Your Story →'}
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
