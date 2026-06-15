import React from "react";
import { ShieldCheck, CalendarRange, Truck, Heart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function TrustStrip() {
  const { lang } = useLanguage();
  const isHindi = lang === "HI";

  const labels = {
    booksCreated: isHindi ? "लिखित पुस्तकें" : "Books Created",
    satisfaction: isHindi ? "ग्राहक संतुष्टि" : "Client Satisfaction",
    support: isHindi ? "सतत सहयोग" : "Support Available",
    securePayments: isHindi ? "🔒 सुरक्षित भुगतान" : "🔒 Secure Payments",
    madeInIndia: isHindi ? "❤️ भारत में निर्मित" : "❤️ Made in India",
    panIndia: isHindi ? "📦 अखिल भारतीय वितरण" : "📦 Pan-India Delivery",
    guaranteed: isHindi ? "✅ विश्वसनीय सेवा" : "✅ Guaranteed",
  };

  return (
    <div
      id="trust-strip"
      className="bg-[#FAF6F0] border-y border-[#E3DDE9]/40 min-h-[100px] flex items-center py-6 lg:py-0 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Side: Stats (3 items) */}
          <div className="col-span-1 lg:col-span-7 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
            <div className="flex flex-col justify-center border-r border-[#E3DDE9]/60 pr-1 sm:pr-4">
              <span className="font-serif font-bold text-2xl sm:text-3xl lg:text-[36px] text-[#8B5CF6] leading-none mb-1">
                500+
              </span>
              <span className="font-sans font-semibold text-[10px] sm:text-xs text-[#554466] leading-tight">
                {labels.booksCreated}
              </span>
            </div>

            <div className="flex flex-col justify-center border-r border-[#E3DDE9]/60 px-1 sm:px-4 text-center">
              <span className="font-serif font-bold text-2xl sm:text-3xl lg:text-[36px] text-[#8B5CF6] leading-none mb-1">
                100%
              </span>
              <span className="font-sans font-semibold text-[10px] sm:text-xs text-[#554466] leading-tight">
                {labels.satisfaction}
              </span>
            </div>

            <div className="flex flex-col justify-center pl-1 sm:pl-4 text-center lg:text-left">
              <span className="font-serif font-bold text-2xl sm:text-3xl lg:text-[36px] text-[#8B5CF6] leading-none mb-1">
                24/7
              </span>
              <span className="font-sans font-semibold text-[10px] sm:text-xs text-[#554466] leading-tight">
                {labels.support}
              </span>
            </div>
          </div>

          {/* separating divider (desktop only) */}
          <div className="hidden lg:block lg:col-span-1 text-center">
            <div className="h-10 w-[1px] bg-[#E3DDE9] mx-auto" />
          </div>

          {/* Right Side: Trust & Quality Badges */}
          <div className="col-span-1 lg:col-span-4 flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-3">
            <span className="flex items-center space-x-1.5 font-sans font-bold text-xs sm:text-sm text-[#8B5CF6]">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>{labels.securePayments}</span>
            </span>
            <span className="flex items-center space-x-1.5 font-sans font-bold text-xs sm:text-sm text-[#8B5CF6]">
              <Heart className="h-4 w-4 shrink-0" />
              <span>{labels.madeInIndia}</span>
            </span>
            <span className="flex items-center space-x-1.5 font-sans font-bold text-xs sm:text-sm text-[#8B5CF6]">
              <Truck className="h-4 w-4 shrink-0" />
              <span>{labels.panIndia}</span>
            </span>
            <span className="flex items-center space-x-1.5 font-sans font-bold text-xs sm:text-sm text-[#8B5CF6]">
              <CalendarRange className="h-4 w-4 shrink-0" />
              <span>{labels.guaranteed}</span>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
