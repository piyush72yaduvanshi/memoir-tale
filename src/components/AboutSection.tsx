import React from "react";
import { ArrowRight, Star, Heart, Award, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import FadeIn from "./FadeIn";

interface AboutSectionProps {
  onLearnMoreClick: () => void;
}

export default function AboutSection({ onLearnMoreClick }: AboutSectionProps) {
  const { lang, t } = useLanguage();

  return (
    <section
      id="about-us"
      className="bg-[#FAF6F0] py-16 lg:py-24 text-[#190F26] relative overflow-hidden"
    >
      {/* Subtle overlay decorative elements */}
      <div className="absolute top-[10%] right-[-50px] w-64 h-64 bg-[#8B5CF6]/5 rounded-full blurred-ellipse pointer-events-none" />
      <div className="absolute bottom-5 left-[-20px] w-80 h-80 bg-[#45147A]/3 rounded-full blurred-ellipse pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column (55% Desktop layout spacing) */}
            <div className="col-span-1 lg:col-span-7 flex flex-col items-start text-left">
              {/* Gold Line */}
              <div className="w-[60px] h-[3px] bg-[#8B5CF6] rounded-[2px] mb-4" />

              {/* Section Label */}
              <span className="font-sans font-medium text-[12px] uppercase tracking-[3px] text-[#8B5CF6] mb-3 inline-block">
                {t("aboutLabel")}
              </span>

              {/* Title H2 */}
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[48px] text-[#190F26] leading-tight mb-2">
                {t("aboutHeadingPrimary")} <br className="hidden sm:inline" />
                {lang === "HI" ? "सहेजे हुए इतिहास का" : "To Be Remembered"}
              </h2>

              {/* Gold Underline Accent */}
              <div className="w-[80px] h-[3px] bg-[#8B5CF6] rounded-[2px] mt-2 mb-8" />

              {/* Paragraphs */}
              <div className="space-y-5 text-sm sm:text-base text-[#554466] font-sans leading-relaxed max-w-[620px]">
                <p>
                  {lang === "HI" ? (
                    <><strong>मेमोयर टेल (Memoir Tale)</strong> भारत की पहली समर्पित प्रीमियम जीवन कहानी पुस्तक सेवा है। हमारा मानना ​​है कि हर व्यक्ति - चाहे उसकी पृष्ठभूमि, प्रसिद्धि, या पेशा कुछ भी हो - उसकी एक अनूठी, गहरी कहानी होती है जो आने वाली पीढ़ियों के लिए सुरक्षित रखने योग्य है।</>
                  ) : (
                    <><strong>Memoir Tale</strong> is India's first dedicated premium life story book service. We believe that every person — regardless of their background, fame, or calling — has a unique, profound story worth preserving intact for future generations.</>
                  )}
                </p>
                <p>
                  {lang === "HI" ? (
                    "भारत भर में निर्देशित ऑफ़लाइन साक्षात्कारों के माध्यम से, हमारे संवेदनशील वरिष्ठ पत्रकार आपकी यादों, सीखों और मूल्यों को रिकॉर्ड करते हैं। हमारी दस्तावेजी-गुणवत्ता वाली पुस्तक डिज़ाइन टीम तब इसे एक समृद्ध विरासत पुस्तक (Heirloom Coffee-Table Book) का रूप देती है जो आपके घर की शान बनेगी।"
                  ) : (
                    "Our core team of professional biography writers, master editors, and book designers work closely with you and your parents to capture memories, milestones, and moments that define a life truly lived."
                  )}
                </p>
                <p>
                  {lang === "HI" ? (
                    "परिचयात्मक कॉल से लेकर अंतिम हार्डकवर पुस्तक वितरण तक — हम सब कुछ संभालते हैं। आप बस अपनी यादें हिंदी या अंग्रेजी में साझा करें, हम इन्हें एक उत्कृष्ट विरासत पुस्तक में बदल देंगे।"
                  ) : (
                    "From the first welcoming interview call to the final gilded hardcover book delivery — we handle absolutely everything. You simply share your memories in Hindustani or English. We transform them into a timeless masterpiece."
                  )}
                </p>
              </div>

              {/* CTA Arrow Link */}
              <button
                onClick={onLearnMoreClick}
                className="mt-8 group inline-flex items-center space-x-2 font-sans font-semibold text-base text-[#2D0F52] hover:text-[#8B5CF6] transition-colors cursor-pointer"
              >
                <span className="group-hover:underline">{lang === "HI" ? "हमारे बारे में अधिक जानें" : "Learn More About Us"}</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

            {/* Right Column (45% Desktop layout spacing - Stats Grid) */}
            <div className="col-span-1 lg:col-span-5 w-full">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                
                {/* Stat Card 1 */}
                <div
                  id="stat-card-1"
                  className="bg-white p-6 rounded-[20px] shadow-[0_8px_40px_rgba(69,20,122,0.08)] border border-[#E3DDE9]/60 hover:border-[#8B5CF6]/50 transition-all duration-300 transform hover:scale-[1.03]"
                >
                  <div className="bg-[#FAF6F0] p-2 rounded-xl text-[#8B5CF6] w-fit mb-3">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="block font-serif font-bold text-3xl sm:text-[46px] text-[#8B5CF6] leading-none mb-1">
                    500+
                  </span>
                  <span className="block font-sans font-medium text-xs sm:text-sm text-[#554466]">
                    {lang === "HI" ? "बनाई गई पुस्तकें" : "Books Created"}
                  </span>
                </div>

                {/* Stat Card 2 */}
                <div
                  id="stat-card-2"
                  className="bg-white p-6 rounded-[20px] shadow-[0_8px_40px_rgba(69,20,122,0.08)] border border-[#E3DDE9]/60 hover:border-[#8B5CF6]/50 transition-all duration-300 transform hover:scale-[1.03]"
                >
                  <div className="bg-[#FAF6F0] p-2 rounded-xl text-[#8B5CF6] w-fit mb-3">
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                  <span className="block font-serif font-bold text-3xl sm:text-[46px] text-[#8B5CF6] leading-none mb-1">
                    100+
                  </span>
                  <span className="block font-sans font-medium text-xs sm:text-sm text-[#554466]">
                    {lang === "HI" ? "खुशहाल परिवार" : "Happy Families"}
                  </span>
                </div>

                {/* Stat Card 3 */}
                <div
                  id="stat-card-3"
                  className="bg-white p-6 rounded-[20px] shadow-[0_8px_40px_rgba(69,20,122,0.08)] border border-[#E3DDE9]/60 hover:border-[#8B5CF6]/50 transition-all duration-300 transform hover:scale-[1.03]"
                >
                  <div className="bg-[#FAF6F0] p-2 rounded-xl text-[#8B5CF6] w-fit mb-3">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="block font-serif font-bold text-2xl sm:text-[40px] text-[#8B5CF6] leading-none mb-1">
                    5 yrs+
                  </span>
                  <span className="block font-sans font-medium text-xs sm:text-sm text-[#554466]">
                    {lang === "HI" ? "लेखन अनुभव" : "Writing Experience"}
                  </span>
                </div>

                {/* Stat Card 4 */}
                <div
                  id="stat-card-4"
                  className="bg-white p-6 rounded-[20px] shadow-[0_8px_40px_rgba(69,20,122,0.08)] border border-[#E3DDE9]/60 hover:border-[#8B5CF6]/50 transition-all duration-300 transform hover:scale-[1.03]"
                >
                  <div className="bg-[#FAF6F0] p-2 rounded-xl text-[#8B5CF6] w-fit mb-3 flex items-center justify-center">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  </div>
                  <span className="block font-serif font-bold text-3xl sm:text-[46px] text-[#8B5CF6] leading-none mb-1">
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
