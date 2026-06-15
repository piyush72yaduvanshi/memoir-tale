import React from "react";
import { Check, Sparkles, AlertCircle } from "lucide-react";
import { PACKAGES } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";
import FadeIn from "./FadeIn";

const PACKAGES_HI: Record<number, {
  title: string;
  badge: string;
  ctaText: string;
  features: string[];
  additionalNote?: string;
}> = {
  1: {
    title: "श्रद्धांजलि संस्मरण ग्रंथ",
    badge: "🕊️ हार्दिक श्रद्धांजलि",
    ctaText: "यह योजना चुनें",
    features: [
      "अपने प्रियजनों की मीठी यादों का आदरपूर्ण सम्मान करें",
      "संवेदनशील व पेशेवर लेखकों द्वारा श्रद्धांजलि लेखन",
      "पारिवारिक चित्रों और प्रमुख यादों का सुंदर संकलन",
      "कस्टम प्रीमियम डिज़ाइन वाला हार्डकवर प्रिंट",
      "1 भौतिक पुस्तक प्रति + डिजिटल पीडीएफ प्रति"
    ]
  },
  2: {
    title: "जीवन कहानी पुस्तक",
    badge: "⭐ सर्वाधिक लोकप्रिय",
    ctaText: "यह योजना चुनें",
    features: [
      "आपके लिए समर्पित पेशेवर लेखक व संस्मरण संपादक",
      "5 से 8 आरामदायक और निर्देशित साक्षात्कार सत्र",
      "150 पन्नों तक की पूर्ण रूप से रचनात्मक लिखित जीवनी",
      "कस्टम प्रीमियम सुनहरी जिल्द (Hardcover & Spine) डिजाइनिंग",
      "1 उच्च गुणवत्ता वाली भौतिक पुस्तक उपहार स्वरूप शामिल",
      "हाई-रिज़ॉल्यूशन वाली डिजिटल पीडीएफ प्रति",
      "सम्पूर्ण भारत में मुफ़्त और सुरक्षित एक्सप्रेस डिलीवरी"
    ],
    additionalNote: "अतिरिक्त मुद्रित प्रतियां केवल ₹2,999 प्रति कॉपी पर उपलब्ध"
  },
  3: {
    title: "वर्षगांठ और उत्सव पुस्तक",
    badge: "🎁 सुंदर उपहार",
    ctaText: "यह योजना चुनें",
    features: [
      "दंपति के दांपत्य जीवन या पारिवारिक विरासत पर विशेष ध्यान",
      "3 से 5 सुखद और निर्देशित व्यक्तिगत साक्षात्कार",
      "दुर्लभ तस्वीरों पर केंद्रित भव्य एडिटोरियल लेआउट",
      "शानदार प्रीमियम कस्टमाइज्ड हार्डकवर प्रिंट",
      "1 भौतिक विरासत प्रति + डिजिटल शेयरिंग संस्करण",
      "मांग पर परिवार के अन्य सदस्यों के लिए अतिरिक्त प्रतियां उपलब्ध"
    ]
  }
};

interface ServicesSectionProps {
  onChoosePackage: (packageName: string) => void;
  highlightedPackageId?: number | null;
  setHighlightedPackageId?: (id: number | null) => void;
}

export default function ServicesSection({ 
  onChoosePackage, 
  highlightedPackageId, 
  setHighlightedPackageId 
}: ServicesSectionProps) {
  const { lang, t } = useLanguage();
  const isHindi = lang === "HI";

  React.useEffect(() => {
    if (highlightedPackageId) {
      const timer = setTimeout(() => {
        if (setHighlightedPackageId) {
          setHighlightedPackageId(null);
        }
      }, 5000); // highlight lasts 5 seconds for superior visibility
      return () => clearTimeout(timer);
    }
  }, [highlightedPackageId, setHighlightedPackageId]);

  // We place the Centerpiece "Life Story Book" in the middle index for visual prominence
  const organizedPackages = [
    PACKAGES[0], // Tribute Book
    PACKAGES[1], // Life Story Book (Featured / Most Popular)
    PACKAGES[2], // Anniversary Book
  ];

  return (
    <section
      id="services"
      className="bg-[#FAF6F0] py-16 lg:py-24 text-[#190F26] relative overflow-hidden border-b border-[#E3DDE9]/60"
    >
      <div className="absolute top-1/4 left-[-100px] w-64 h-64 bg-[#8B5CF6]/4 rounded-full blurred-ellipse pointer-events-none" />
      <div className="absolute bottom-1/3 right-[-100px] w-72 h-72 bg-[#45147A]/3 rounded-full blurred-ellipse pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-[60px] h-[3px] bg-[#8B5CF6] rounded-[2px] mb-4" />
            <span className="font-sans font-medium text-[12px] uppercase tracking-[3px] text-[#8B5CF6] mb-3">
              {t("servicesLabel")}
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[48px] text-[#190F26] tracking-tight leading-tight">
              {t("servicesHeading")}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#554466] mt-4 max-w-2xl">
              {isHindi 
                ? "प्रत्येक संस्मरण पैकेज में सुविधानुसार निजी रिकॉर्डिंग सत्र, पन्नों की डिजाइनिंग, और भारत भर में सुंदर हार्डबाउंड पुस्तक की सुरक्षित होम डिलीवरी शामिल है।" 
                : "Every standard memoir package includes empathetic private interviews, physical layout design, and beautiful hardbound book shipments across India."
              }
            </p>
          </div>
        </FadeIn>

        {/* 3 Service Packages Grid */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-16">
            {organizedPackages.map((pkg) => {
              const isFeatured = pkg.isFeatured;
              const borderLeft = pkg.borderLeft;

              const localized = isHindi ? PACKAGES_HI[pkg.id] : null;
              const title = localized ? localized.title : pkg.title;
              const badge = localized ? localized.badge : pkg.badge;
              const ctaText = localized ? localized.ctaText : pkg.ctaText;
              const features = localized ? localized.features : pkg.features;
              const additionalNote = localized ? localized.additionalNote : pkg.additionalNote;

              const isHighlighted = pkg.id === highlightedPackageId;

              let cardStyleClasses = "";
              if (isHighlighted) {
                cardStyleClasses = "bg-stone-50 border-2 border-[#8B5CF6] ring-4 ring-[#8B5CF6]/40 shadow-[0_20px_50px_rgba(139, 92, 246,0.25)] scale-[1.03] relative z-20 transition-all duration-300";
              } else if (isFeatured) {
                cardStyleClasses = "bg-white text-[#190F26] border-2 border-[#8B5CF6] shadow-[0_12px_45px_rgba(139, 92, 246,0.12)] relative z-10 transition-all duration-300";
              } else if (borderLeft) {
                cardStyleClasses = "bg-white border-l-4 border-l-[#8B5CF6] border-y border-r border-[#E3DDE9]/70 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300";
              } else {
                cardStyleClasses = "bg-white border border-[#E3DDE9]/70 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300";
              }

              return (
                <motion.div
                  key={pkg.id}
                  id={`package-card-${pkg.id}`}
                  whileHover={{ y: -8, scale: isHighlighted ? 1.04 : 1.015, boxShadow: "0px 20px 40px rgba(139, 92, 246, 0.08)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className={`rounded-[24px] p-8 flex flex-col justify-between cursor-pointer ${cardStyleClasses}`}
                >
                  {/* Popular Corner Badge */}
                  {isFeatured && (
                    <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#8B5CF6] text-white font-sans font-bold text-[10px] sm:text-[11px] px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                      {badge}
                    </div>
                  )}

                  <div>
                    {/* Badge Row (Non-Featured) */}
                    {!isFeatured && (
                      <span className="inline-block bg-[#FAF6F0] border border-[#E3DDE9] text-[#8B5CF6] font-sans font-bold text-[10px] px-3 py-0.5 rounded-full mb-4">
                        {badge}
                      </span>
                    )}

                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl leading-none">{pkg.icon}</span>
                        <h3 className="font-serif font-bold text-2xl text-[#190F26]">
                          {title}
                        </h3>
                      </div>
                      {isHighlighted && (
                        <span className="text-[10px] bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30 font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse whitespace-nowrap">
                          {isHindi ? "चयनित" : "Selected"}
                        </span>
                      )}
                    </div>

                    {/* Price Row */}
                    <div className="mb-6">
                      <span className="text-xs uppercase tracking-wider block opacity-70 mb-1 text-[#554466]">
                        {isHindi ? "कुल पैकेज दर" : "Package Rate"}
                      </span>
                      <span className="font-serif font-bold text-3xl sm:text-[36px] text-[#8B5CF6]">
                        {pkg.price}
                      </span>
                    </div>

                    {/* Feature separator */}
                    <div className="h-[1px] w-full my-6 bg-[#E3DDE9]/60" />

                    {/* Features List */}
                    <ul className="space-y-3.5">
                      {features.map((feat, index) => (
                        <li key={index} className="flex items-start text-left space-x-2 text-sm">
                          <Check className="h-4.5 w-4.5 shrink-0 mt-0.5 text-[#8B5CF6]" />
                          <span className="text-[#554466]">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card footer details & CTA */}
                  <div className="mt-8 pt-4">
                    <motion.button
                      onClick={() => onChoosePackage(pkg.title)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3.5 px-6 rounded-full font-sans font-bold text-sm transition-all cursor-pointer ${
                        isFeatured
                          ? "bg-[#190F26] text-white hover:bg-[#8B5CF6] shadow-[0_4px_15px_rgba(25,15,38,0.15)]"
                          : "border border-[#190F26] text-[#190F26] hover:bg-[#190F26] hover:text-white"
                      }`}
                    >
                      {ctaText}
                    </motion.button>

                    {/* Subtext info */}
                    {additionalNote && (
                      <p className="text-center text-[11px] mt-3 font-sans opacity-75 text-[#554466]">
                        {additionalNote}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>

        {/* More upcoming services strip */}
        <FadeIn>
          <div className="pt-6 border-t border-[#E3DDE9]/60">
            <div className="flex flex-col items-center">
              <h4 className="font-sans font-semibold text-base text-[#190F26] mb-4 flex items-center space-x-1.5 justify-center">
                <Sparkles className="h-4.5 w-4.5 text-[#8B5CF6]" />
                <span>
                  {isHindi 
                    ? "शीघ्र ही आ रही अन्य नवीन विरासत सेवाएँ" 
                    : "More Innovative Heritage Services Coming Soon"
                  }
                </span>
              </h4>
              
              <div className="flex flex-wrap justify-center gap-3.5 max-w-4xl">
                {(isHindi 
                  ? [
                      "🎬 एनिमेटेड लघु चित्र (हेरिटेज)",
                      "🤖 व्यक्तिगत एआई लीगेसी बॉट्स (AI Bots)",
                      "🌳 वंशावली और संपूर्ण वंश-वृक्ष चित्रण",
                      "🎧 प्रीमियम ऑडियोबुक संस्करण (Audiobooks)",
                      "🗿 स्मारक मूर्तियां और ब्रास टैबलेट्स"
                    ]
                  : [
                      "🎬 Animated Short Films",
                      "🤖 Personalized AI Legacy Bots",
                      "🌳 Family Tree of Ancestry",
                      "🎧 Premium Audiobooks",
                      "🗿 Memorial Statues & Tablets"
                    ]
                ).map((badge, ind) => (
                  <span
                    key={ind}
                    className="bg-[#45147A]/5 border border-[#45147A]/15 text-[#45147A] font-sans font-medium text-xs px-4 py-2 rounded-full transform hover:scale-105 transition-transform cursor-default select-none"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
