import React from "react";
import { Star, Award } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import FadeIn from "./FadeIn";

interface AboutSectionProps {
  onLearnMoreClick?: () => void;
}

export default function AboutSection({ onLearnMoreClick }: AboutSectionProps) {
  const { lang, t } = useLanguage();

  return (
    <section
      id="about-us"
      className="bg-[#FAF6F0] pt-10 lg:pt-14 pb-6 lg:pb-8 text-[#190F26] relative overflow-hidden"
    >
      {/* Subtle overlay decorative elements */}
      <div className="absolute top-[10%] right-[-50px] w-64 h-64 bg-[#2E1B5D]/5 rounded-full blurred-ellipse pointer-events-none" />
      <div className="absolute bottom-5 left-[-20px] w-80 h-80 bg-[#2E1B5D]/3 rounded-full blurred-ellipse pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column (55% Desktop layout spacing) */}
            <div className="col-span-1 lg:col-span-7 flex flex-col items-start text-left">
              {/* Gold Line */}
              <div className="w-[60px] h-[3px] bg-[#2E1B5D] rounded-[2px] mb-4" />

              {/* Section Label */}
              <span className="font-sans font-medium text-[12px] uppercase tracking-[3px] text-[#2E1B5D] mb-3 inline-block">
                {t("aboutLabel")}
              </span>

              {/* Title H2 */}
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[48px] text-[#190F26] leading-tight mb-2">
                {lang === "HI" ? "हमारे बारे में" : "Who We Are"}
              </h2>

              {/* Gold Underline Accent */}
              <div className="w-[80px] h-[3px] bg-[#2E1B5D] rounded-[2px] mt-2 mb-8" />

              {/* Paragraphs */}
              <div className="space-y-5 text-sm sm:text-base text-[#554466] font-sans leading-relaxed max-w-[620px]">
                <p>
                  {lang === "HI" ? (
                    <><strong>Memoir Tale</strong> भारत का पहला लिगेसी प्लेटफॉर्म है जो व्यक्तियों, परिवारों, संस्थापकों और समुदायों के जीवन, यादों, मूल्यों और विरासतों को खूबसूरती से तैयार की गई पुस्तकों और कालातीत यादों के माध्यम से सहेजने के लिए समर्पित है।</>
                  ) : (
                    <><strong>Memoir Tale</strong> is India's First Legacy Platform dedicated to preserving the lives, memories, values, and legacies of individuals, families, founders, and communities through beautifully crafted books and timeless keepsakes.</>
                  )}
                </p>
              </div>
            </div>

            {/* Right Column (45% Desktop layout spacing - Stats Grid) */}
            <div className="col-span-1 lg:col-span-5 w-full">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">

                {/* Stat Card 1 */}
                <div
                  id="stat-card-1"
                  className="bg-white p-6 rounded-[20px] shadow-[0_8px_40px_rgba(69,20,122,0.08)] border border-[#E3DDE9]/60 hover:border-[#2E1B5D]/50 transition-all duration-300 transform hover:scale-[1.03]"
                >
                  <div className="bg-[#FAF6F0] p-2 rounded-xl text-[#2E1B5D] w-fit mb-3">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="block font-serif font-bold text-2xl sm:text-[34px] text-[#2E1B5D] leading-tight mb-1">
                    {lang === "HI" ? "सैकड़ों" : "Hundreds of"}
                  </span>
                  <span className="block font-sans font-medium text-xs sm:text-sm text-[#554466]">
                    {lang === "HI" ? "विरासतें सहेजी गईं" : "Legacies Preserved"}
                  </span>
                </div>

                {/* Stat Card 2 */}
                <div
                  id="stat-card-2"
                  className="bg-white p-6 rounded-[20px] shadow-[0_8px_40px_rgba(69,20,122,0.08)] border border-[#E3DDE9]/60 hover:border-[#2E1B5D]/50 transition-all duration-300 transform hover:scale-[1.03]"
                >
                  <div className="bg-[#FAF6F0] p-2 rounded-xl text-[#2E1B5D] w-fit mb-3 flex items-center justify-center">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  </div>
                  <span className="block font-serif font-bold text-3xl sm:text-[46px] text-[#2E1B5D] leading-none mb-1">
                    4.9★
                  </span>
                  <span className="block font-sans font-medium text-xs sm:text-sm text-[#554466]">
                    {lang === "HI" ? "औसत रेटिंग" : "Average Rating"}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
