import React from "react";
import { Sparkles, ArrowDown } from "lucide-react";
import { PROCESS_STEPS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import FadeIn from "./FadeIn";

const STEPS_HI: Record<string, { title: string; description: string }> = {
  "01": {
    title: "यादें और तस्वीरें साझा करें",
    description: "हमें अपनी यादों, मील के पत्हरो और पारिवारिक तस्वीरों के बारे में बताएं। आप हिंदी या अंग्रेजी के मिले-जुले रूप में तस्वीरें, ऑडियो क्लिप या नोट्स साझा कर सकते हैं। हमारी संवेदनशील टीम संकलन के हर कदम पर आपका मार्गदर्शन करती है।"
  },
  "02": {
    title: "सहज और सौम्य साक्षात्कार सत्र",
    description: "आपके समर्पित वरिष्ठ पत्रकार और जीवनी लेखक वीडियो कॉल पर या व्यक्तिगत रूप से दोस्ताना बातचीत सत्र आयोजित करते हैं। हम ऐसे संवेदनशील प्रश्न पूछते हैं जो आपके परिवार के लिए अनमोल जीवन के अनुभवों को जादुनी रूप से बाहर लाते हैं।"
  },
  "03": {
    title: "गहरे प्रेम से लिखित आपकी जीवनी",
    description: "साक्षात्कार के बाद, हमारे पेशेवर जीवनी लेखक आपकी यादों को सुंदर अध्यायों में पिरोते हैं। हम आपको प्रारंभिक मसौदे समीक्षा के लिए भेजते हैं ताकि आप अपनी इच्छानुसार सुधार कर सकें।"
  },
  "04": {
    title: "विशेष कवर और पन्नों की डिजाइनिंग",
    description: "हमारी पुस्तक सज्जाकार टीम पन्नों की डिजाइनिंग करती है, जिसमें सुंदर फॉन्टों का चुनाव और आपकी बहुमूल्य पारिवारिक तस्वीरों को करीने से सजाया जाता है। आप अंतिम कवर डिज़ाइन का चुनाव करते हैं।"
  },
  "05": {
    title: "प्रीमियम हार्डकवर पुस्तक का घर पर वितरण",
    description: "संशोधन और आपकी अंतिम संतुष्टि के बाद, आपकी चमचमाती सुनहरी जिल्द (Gold-Gilded Hardcover) वाली विरासत पुस्तक भारत में कहीं भी आपके घर तक सीधे और सुरक्षित वितरित की जाती है।"
  }
};

interface HowItWorksProps {
  onCtaClick: () => void;
}

export default function HowItWorksSection({ onCtaClick }: HowItWorksProps) {
  const { lang, t } = useLanguage();
  const isHindi = lang === "HI";

  return (
    <section
      id="how-it-works"
      className="relative bg-gradient-to-b from-[#FAF8F5] via-[#FCFBF7] to-[#FAF6F0] py-16 lg:py-24 text-[#190F26] overflow-hidden border-b border-[#E3DDE9]/50"
    >
      {/* Decorative blurred ellipse per global guidelines */}
      <div className="absolute top-[20%] right-[-100px] w-[450px] h-[450px] bg-[#8B3CDC]/4 rounded-full blurred-ellipse pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-150px] w-[380px] h-[380px] bg-[#8B5CF6]/3 rounded-full blurred-ellipse pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-16">
            {/* Gold Accent Line */}
            <div className="w-[60px] h-[3px] bg-[#8B5CF6] rounded-[2px] mb-4" />

            {/* Section Label */}
            <span className="font-sans font-semibold text-[12px] uppercase tracking-[3px] text-[#8B5CF6] mb-3">
              {t("howLabel")}
            </span>

            {/* H2 Title */}
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[50px] text-[#190F26] tracking-tight leading-tight max-w-3xl">
              {t("howHeading")}
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-sm sm:text-base lg:text-lg text-[#554466] mt-4 max-w-2xl leading-relaxed">
              {t("howDesc")}
            </p>
          </div>
        </FadeIn>

        {/* 5 Alternating Numbered Steps */}
        <div className="space-y-16 lg:space-y-28 relative">
          
          {/* Visual vertical dashed path between steps (Desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-[2px] border-l-2 border-dashed border-[#8B5CF6]/20 -translate-x-1/2 z-0" />

          {PROCESS_STEPS.map((step, index) => {
            const isEven = index % 2 === 1;
            const localized = isHindi ? STEPS_HI[step.number] : null;
            const title = localized ? localized.title : step.title;
            const description = localized ? localized.description : step.description;

            return (
              <FadeIn key={step.number}>
                <div
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 z-10 relative ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step Image */}
                  <div className="w-full lg:w-1/2 order-first group">
                    <div className="relative overflow-hidden rounded-2xl border border-[#E3DDE9]/60 shadow-[0_12px_44px_rgba(69,20,122,0.06)] bg-white/60 p-2">
                      <img
                        src={step.image}
                        alt={title}
                        referrerPolicy="no-referrer"
                        className="w-full h-[260px] sm:h-[350px] object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Golden accent frame on hover */}
                      <div className="absolute inset-0 border-2 border-[#8B5CF6]/0 group-hover:border-[#8B5CF6]/30 rounded-2xl pointer-events-none transition-all duration-300" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-4">
                    
                    {/* Big Number Badge */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-[#8B5CF6] shadow-[0_4px_15px_rgba(139, 92, 246,0.15)]">
                        <span className="font-serif font-bold text-2xl text-[#8B5CF6]">
                          {step.number}
                        </span>
                      </div>
                      <span className="text-xs uppercase tracking-widest text-[#8B5CF6] font-sans font-bold">
                        {isHindi ? `चरण ${step.number} / 05` : `STAGE ${step.number} OF 05`}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#190F26]">
                      {title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-sm sm:text-base text-[#554466] leading-relaxed">
                      {description}
                    </p>

                    <div className="w-16 h-[2px] bg-[#8B5CF6]/40 pt-1" />
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Global Action Trigger at bottom */}
        <FadeIn>
          <div className="flex flex-col items-center text-center mt-20">
            <button
              onClick={onCtaClick}
              className="h-14 px-10 rounded-full bg-[#8B5CF6] text-white font-sans font-bold text-base hover:bg-[#8B5CF6] transition-all duration-300 hover:scale-[1.03] shadow-[0_8px_24px_rgba(139, 92, 246,0.25)] hover:shadow-[0_12px_30px_rgba(139, 92, 246,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{isHindi ? "अपनी सहेजने योग्य विरासत कॉल आज ही शेड्यूल करें →" : "Start Your Story Today"}</span>
              <ArrowDown className="h-4 w-4 text-white animate-bounce" />
            </button>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
