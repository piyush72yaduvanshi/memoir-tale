/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare, Mic, PenTool, Edit3, Palette, Printer, Truck,
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
    title: 'Consultation',
    titleHi: 'परामर्श',
    shortDesc: 'We begin with an in-depth consultation to understand your legacy goals, vision, scope, and family heritage requirements.',
    shortDescHi: 'हम आपके विरासत लक्ष्यों, दृष्टिकोण, दायरे और पारिवारिक विरासत की आवश्यकताओं को समझने के लिए गहन परामर्श से शुरुआत करते हैं।',
    longDesc: 'Our team listens to your story aspirations, connects you with the right legacy archivist, and crafts a bespoke roadmap tailored for your family or organization.',
    longDescHi: 'हमारी टीम आपकी कहानी की आकांक्षाओं को सुनती है, आपको सही लिगेसी आर्काइविस्ट से जोड़ती है, और आपके परिवार या संगठन के लिए एक विशेष रोडमैप तैयार करती है।',
    icon: MessageSquare,
    tip: 'Laying the foundation for your family heirloom.',
    tipHi: 'आपकी पारिवारिक यादगार की नींव रखना।',
    status: 'Step 01 — Consultation',
    statusHi: 'चरण 01 — परामर्श',
    subValue: 'Understanding your goals & heritage.',
    subValueHi: 'आपके लक्ष्यों और विरासत को समझना।',
    image: 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '02',
    title: 'Interview',
    titleHi: 'साक्षात्कार',
    shortDesc: 'Guided audio & video interviews conducted by professional biographers to capture authentic voices, emotions, and life anecdotes.',
    shortDescHi: 'प्रामाणिक आवाज़ों, भावनाओं और जीवन के किस्सों को कैद करने के लिए पेशेवर जीवनीकारों द्वारा निर्देशित ऑडियो और वीडियो साक्षात्कार।',
    longDesc: 'In-person or virtual guided sessions recorded smoothly to extract meaningful wisdom, childhood memories, key milestones, and family values.',
    longDescHi: 'अर्थपूर्ण ज्ञान, बचपन की यादों, मुख्य मील के पत्थरों और पारिवारिक मूल्यों को उजागर करने के लिए व्यक्तिगत या वर्चुअल सत्र।',
    icon: Mic,
    tip: 'Preserving real voices and genuine human emotion.',
    tipHi: 'वास्तविक आवाज़ों और मानवीय भावनाओं को सहेजना।',
    status: 'Step 02 — Interview',
    statusHi: 'चरण 02 — साक्षात्कार',
    subValue: 'Oral histories & personal storytelling.',
    subValueHi: 'मौखिक इतिहास और व्यक्तिगत कहानी।',
    image: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '03',
    title: 'Writing',
    titleHi: 'लेखन',
    shortDesc: 'Experienced ghostwriters and biographers synthesize interviews and archives into a captivating narrative.',
    shortDescHi: 'अनुभवी लेखक और जीवनीकार साक्षात्कारों और अभिलेखागारों को एक सम्मोहक कथा में बुनते हैं।',
    longDesc: 'Every chapter is meticulously written to retain your authentic tone of voice, personality, family chronology, and thematic depth.',
    longDescHi: 'आपकी वास्तविक आवाज़, व्यक्तित्व, पारिवारिक कालक्रम और विषयगत गहराई को बनाए रखने के लिए हर अध्याय को सावधानीपूर्वक लिखा जाता है।',
    icon: PenTool,
    tip: 'Turning spoken words into literature.',
    tipHi: 'बोले गए शब्दों को साहित्य में बदलना।',
    status: 'Step 03 — Writing',
    statusHi: 'चरण 03 — लेखन',
    subValue: 'Mastering tone & story architecture.',
    subValueHi: 'स्वर और कहानी वास्तुकला को महारत देना।',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '04',
    title: 'Editing',
    titleHi: 'संपादन',
    shortDesc: 'Rigorous editorial reviews, photo restoration, fact-checking, and manuscript polishing for total precision.',
    shortDescHi: 'पूर्ण सटीकता के लिए कठोर संपादकीय समीक्षा, फोटो बहाली, तथ्य-जांच और पांडुलिपि को निखारना।',
    longDesc: 'Our senior editors refine structure, check historical contexts, format photograph captions, and collaborate directly with your family.',
    longDescHi: 'हमारे वरिष्ठ संपादक संरचना को निखारते हैं, ऐतिहासिक संदर्भों की जांच करते हैं, और आपके परिवार के साथ सीधे सहयोग करते हैं।',
    icon: Edit3,
    tip: 'Precision editing for timeless readability.',
    tipHi: 'कालजयी पठनीयता के लिए सटीक संपादन।',
    status: 'Step 04 — Editing',
    statusHi: 'चरण 04 — संपादन',
    subValue: 'Manuscript refinement & family review.',
    subValueHi: 'पांडुलिपि शोधन और पारिवारिक समीक्षा।',
    image: 'https://images.unsplash.com/photo-1484755560693-a4074577af3a?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '05',
    title: 'Design',
    titleHi: 'डिज़ाइन',
    shortDesc: 'Bespoke layout design, elegant typography, archival photo spreads, and custom cover options.',
    shortDescHi: 'विशेष लेआउट डिज़ाइन, सुरुचिपूर्ण टाइपोग्राफी, अभिलेखीय फोटो स्प्रेड और कस्टम कवर विकल्प।',
    longDesc: 'Custom interior page layouts, archival binding selections, leather/linen cover gilding, and family tree diagrams tailored by master book designers.',
    longDescHi: 'मास्टर बुक डिजाइनरों द्वारा तैयार किए गए कस्टम इंटीरियर पेज लेआउट, बाइंडिंग चयन और लेदर/लिनन कवर।',
    icon: Palette,
    tip: 'Museum-grade typography and aesthetic beauty.',
    tipHi: 'संग्रहालय-स्तरीय टाइपोग्राफी और सौंदर्य सौंदर्य।',
    status: 'Step 05 — Design',
    statusHi: 'चरण 05 — डिज़ाइन',
    subValue: 'Heirloom book aesthetics & typography.',
    subValueHi: 'विरासत पुस्तक सौंदर्यशास्त्र और टाइपोग्राफी।',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '06',
    title: 'Printing',
    titleHi: 'मुद्रण',
    shortDesc: 'Printed on acid-free archival paper using state-of-the-art heirloom craft technique built to endure centuries.',
    shortDescHi: 'सदियों तक चलने वाली अत्याधुनिक विरासत तकनीक का उपयोग करके एसिड-मुक्त अभिलेखागार कागज पर मुद्रित।',
    longDesc: 'Crafted using heavy cotton papers, hand-sewn bindings, foil stamping, and protective slipcases that protect your legacy forever.',
    longDescHi: 'कॉटन पेपर, हाथ से सिली गई बाइंडिंग, फ़ॉइल स्टैम्पिंग और सुरक्षात्मक स्लिपकेस का उपयोग करके तैयार किया गया।',
    icon: Printer,
    tip: 'Archival quality built to endure for generations.',
    tipHi: 'पीढ़ियों तक टिकने के लिए बनी अभिलेखीय गुणवत्ता।',
    status: 'Step 06 — Printing',
    statusHi: 'चरण 06 — मुद्रण',
    subValue: 'Master binding & foil stamping.',
    subValueHi: 'मास्टर बाइंडिंग और फ़ॉइल स्टैम्पिंग।',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop'
  },
  {
    number: '07',
    title: 'Delivery',
    titleHi: 'वितरण',
    shortDesc: 'Securely packaged in bespoke presentation boxes and delivered to your family doorstep globally.',
    shortDescHi: 'विशेष प्रेजेंटेशन बॉक्स में सुरक्षित रूप से पैक किया गया और विश्व स्तर पर आपके परिवार के दरवाजे पर पहुंचाया गया।',
    longDesc: 'Your physical heirloom books and secure digital vaults are handed over with a formal unveiling experience for your loved ones.',
    longDescHi: 'आपकी भौतिक विरासत पुस्तकें और सुरक्षित डिजिटल वॉल्ट आपके प्रियजनों के लिए औपचारिक अनावरण अनुभव के साथ सौंपे जाते हैं।',
    icon: Truck,
    tip: 'A grand celebration of your family lineage.',
    tipHi: 'आपके पारिवारिक वंश का एक भव्य उत्सव।',
    status: 'Step 07 — Delivery',
    statusHi: 'चरण 07 — वितरण',
    subValue: 'White-glove delivery & digital archive access.',
    subValueHi: 'व्हाइट-ग्लोव डिलीवरी और डिजिटल आर्काइव एक्सेस।',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop'
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
      className={`py-20 md:py-28 transition-colors duration-500 overflow-hidden relative border-t border-b ${darkMode
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
                {isHindi ? 'द मेमोयर टेल प्रक्रिया' : 'THE MEMOIR TALE PROCESS'}
              </span>
            </div>

            <button
              id="process-autoplay-toggle"
              onClick={() => setAutoplay(!autoplay)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-sans font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${autoplay
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold'
                }`}
              title="Click to toggle process auto-play"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${autoplay ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
              {autoplay ? (isHindi ? 'लाइव चल रहा है' : 'Playing Live') : (isHindi ? 'रुका हुआ है' : 'Paused')}
            </button>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-[#D4AF37]">
            {isHindi ? 'हम आपकी विरासत को कैसे सहेजते हैं' : 'How We Preserve Your Legacy'}
          </h2>
          <p className={`mt-4 font-sans text-xs md:text-sm leading-relaxed max-w-2xl mx-auto ${darkMode ? 'text-[#F5F0F8]/70' : 'text-[#554466]'
            }`}>
            {isHindi
              ? 'आपकी पहली परामर्श से लेकर आपकी हस्तनिर्मित विरासत पुस्तक के अंतिम वितरण तक एक विचारशील, 7-चरणों की यात्रा।'
              : 'A seamless 7-step journey from initial consultation to the white-glove delivery of your handcrafted heirloom book.'
            }
          </p>
        </div>

        {/* Major split structural grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column (5 columns) - The Stepper Directory */}
          <div className="lg:col-span-5 flex flex-col gap-4 relative">

            {/* Elegant vertical continuous progress line in theme purple */}
            <div className={`absolute left-8 top-10 bottom-10 w-0.5 pointer-events-none z-0 ${darkMode ? 'bg-white/15' : 'bg-[#2E1B5D]/15'
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
                  className={`w-full p-5 rounded-xl border flex items-start gap-4 transition-all duration-300 relative z-10 cursor-pointer outline-none text-left select-none group overflow-hidden ${isActive
                    ? darkMode
                      ? 'bg-[#2B1638] border-[#A78BFA]/50 shadow-lg text-white'
                      : 'bg-white border-[#2E1B5D]/40 shadow-xl text-[#190F26]'
                    : darkMode
                      ? 'bg-[#1b101e]/60 border-white/5 text-white/60 hover:bg-[#251829] hover:border-white/20'
                      : 'bg-[#FAF6F0]/60 border-[#E3DDE9]/60 text-[#554466] hover:bg-white hover:border-[#2E1B5D]/20'
                    }`}
                >
                  {/* Step Number Circle */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm shrink-0 transition-all duration-300 ${isActive
                    ? 'bg-gradient-to-r from-[#2E1B5D] to-[#8B3CDC] text-white shadow-md'
                    : darkMode
                      ? 'bg-[#251829] border border-white/10 text-white/50 group-hover:text-white'
                      : 'bg-[#FAF6F0] border border-[#E3DDE9] text-[#554466] group-hover:text-[#2E1B5D]'
                    }`}>
                    {step.number}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-serif font-bold text-base md:text-lg transition-colors ${isActive
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

                    <p className={`font-sans text-[11px] leading-relaxed transition-colors ${isActive
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
                className={`rounded-2xl border overflow-hidden shadow-2xl text-left relative flex flex-col group ${darkMode ? 'bg-[#251829] border-white/10' : 'bg-white border-[#E3DDE9]/60'
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
                  <p className={`font-sans text-xs md:text-sm leading-relaxed ${darkMode ? 'text-[#F5F0F8]/80' : 'text-[#554466]'
                    }`}>
                    {isHindi ? currentStepData.longDescHi : currentStepData.longDesc}
                  </p>

                  {/* Archival Guideline Box */}
                  <div className={`p-4 rounded-xl border border-dashed text-left transition-colors relative overflow-hidden flex items-start gap-3.5 ${darkMode
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
