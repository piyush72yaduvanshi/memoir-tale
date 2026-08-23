import React, { useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, MessageCircle, Phone, Globe, Send, Sparkles, CheckCircle2, Heart } from "lucide-react";
import logoUrl from "../assets/images/memoir_logo_1780375728663.png";
import { useLanguage } from "../context/LanguageContext";

interface FooterProps {
  onQuoteClick: () => void;
  isMobilePreview?: boolean;
  onScrollToAbout?: () => void;
  onScrollToHowItWorks?: () => void;
  onScrollToServices?: (packageId?: number) => void;
  onScrollToGallery?: () => void;
  onScrollToTestimonials?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenRefund?: () => void;
  onOpenCareers?: () => void;
}

const footerTranslations = {
  EN: {
    finalCtaHeading: "Every Life Has A Story Worth Telling",
    finalCtaSub: "— Start yours today.",
    finalCtaDesc: "Don't let the irreplaceable family stories fade into silence. Let us preserve them — beautifully, professionally, forever as a premium family heirloom.",
    freeQuoteBtn: "Begin Your Legacy",
    textUsBtn: "Text Us: 9889011174",
    brandDesc: "Turning lived stories into lasting physical legacies.",
    address: "📍 Bundelkhand University, Kanpur Road, Jhansi, Uttar Pradesh, India - 284128",
    logoAlt: "Memoir Tale Logo",
    servicesCol: "Our Services",
    lifeStory: "Life Story Book",
    tributeBook: "Obituaries & Tribute Book",
    anniversaryBook: "Anniversary Book",
    animatedShorts: "Animated Shorts",
    audiobooks: "Bespoke Audiobooks",
    genealogy: "Genealogy Family Mapping",
    companyCol: "Company",
    aboutUs: "About Us",
    howItWorks: "How It Works",
    gallery: "Our Gallery",
    testimonials: "Testimonials",
    careers: "Careers",
    hiring: "We're Hiring",
    blog: "Blog / Stories",
    touchCol: "Get In Touch",
    whatsappBtn: "💬 Chat on WhatsApp",
    callBtn: "📞 Call Us Now",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    refund: "Refund Policy",
    madeWithLove: "Made with ❤️ in India",
    emailPlaceholder: "Enter your email address",
    subscribeSuccess: "Subscribed successfully! Thank you."
  },
  HI: {
    finalCtaHeading: "हर जीवन की एक कहानी होती है जो कहे जाने योग्य है",
    finalCtaSub: "— आज ही अपनी कहानी शुरू करें।",
    finalCtaDesc: "अपने परिवार की अनलोम और मूल्यवान कहानियों को समय के साथ ओझल न होने दें। आइए हम उन्हें संजोएं - एक बेहतरीन विरासत पुस्तक के रूप में, हमेशा के लिए।",
    freeQuoteBtn: "अपनी विरासत शुरू करें",
    textUsBtn: "हमें मैसेज करें: 9889011174",
    brandDesc: "जीये गए जीवन की कहानियों को लंबे समय तक चलने वाली भौतिक विरासतों में बदलना।",
    address: "📍 बुंदेलखंड विश्वविद्यालय, कानपुर रोड, झाँसी, उत्तर प्रदेश, भारत - 284128",
    logoAlt: "मेमोयर टेल लोगो",
    servicesCol: "हमारी सेवाएँ",
    lifeStory: "जीवन कहानी पुस्तक (Life Story Book)",
    tributeBook: "श्रद्धांजलि व संस्मरण ग्रंथ",
    anniversaryBook: "वर्षगांठ पुस्तक",
    animatedShorts: "एनिमेटेड लघु चित्र",
    audiobooks: "विशेष ऑडियोबुक्स",
    genealogy: "वंश-वृक्ष वंशावली",
    companyCol: "कंपनी",
    aboutUs: "हमारे बारे में",
    howItWorks: "यह कैसे काम करता है",
    gallery: "हमारी गैलरी",
    testimonials: "प्रशंसापत्र (Testimonials)",
    careers: "करियर",
    hiring: "भर्ती जारी है",
    blog: "ब्लॉग / कहानियाँ",
    touchCol: "संपर्क में रहें",
    whatsappBtn: "💬 व्हाट्सएप पर चैट करें",
    callBtn: "📞 अभी कॉल करें",
    privacy: "गोपनीयता नीति",
    terms: "सेवा की शर्तें",
    refund: "वापसी नीति",
    madeWithLove: "भारत में ❤️ के साथ निर्मित",
    emailPlaceholder: "अपना ईमेल पता दर्ज करें",
    subscribeSuccess: "सफलतापूर्वक सब्सक्राइब किया गया! धन्यवाद।"
  }
};

export default function FooterSection({
  onQuoteClick,
  isMobilePreview,
  onScrollToAbout,
  onScrollToHowItWorks,
  onScrollToServices,
  onScrollToGallery,
  onScrollToTestimonials,
  onOpenPrivacy,
  onOpenTerms,
  onOpenRefund,
  onOpenCareers
}: FooterProps) {
  const { lang, setLang, t } = useLanguage();
  const [emailValue, setEmailValue] = useState("");
  const [newsSubscribed, setNewsSubscribed] = useState(false);

  const curTrans = footerTranslations[lang] || footerTranslations["EN"];

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue.trim()) return;
    setNewsSubscribed(true);
    setEmailValue("");
    setTimeout(() => setNewsSubscribed(false), 3000);
  };

  return (
    <>
      {/* ==========================================
          ▶ SECTION 14 — FINAL CTA BANNER (Background: Dark Purple)
          ========================================== */}
      <section
        id="final-cta"
        className="relative bg-[#2d1e2f] py-20 lg:py-28 text-white text-center overflow-hidden border-t border-white/10"
      >
        {/* Decorative circles */}
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full border border-white/5 pointer-events-none" />

        {/* Large decorative quotation graphic */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="font-serif font-bold text-white/5 text-[300px] sm:text-[400px] leading-none select-none translate-y-[-20px]">
            ❝
          </span>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-6">
          <h2 className="font-serif font-bold text-3xl sm:text-5xl lg:text-[54px] text-white leading-tight">
            {curTrans.finalCtaHeading}
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-white/90">
            {curTrans.finalCtaSub}
          </p>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {curTrans.finalCtaDesc}
          </p>

          {/* Action pills row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 max-w-md mx-auto sm:max-w-none">
            <button
              onClick={onQuoteClick}
              className="h-14 px-8 rounded-full bg-white text-[#2d1e2f] font-sans font-bold text-base hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-[0_8px_30px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              {curTrans.freeQuoteBtn}
            </button>

            <a
              href="https://wa.me/919889011174?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Memoir%20Tale"
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-8 rounded-full border-2 border-white bg-transparent hover:bg-white hover:text-[#2d1e2f] text-white font-sans font-semibold text-base flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{curTrans.textUsBtn}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ==========================================
          ▶ SECTION 15 — FOOTER (Background: Very Dark Purple)
          ========================================== */}
      <footer className="bg-[#140a15] text-white py-16 overflow-hidden relative border-t border-white/10">

        {/* Decorative organic background circle */}
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Top 4-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">

            {/* Column 1: Brand details */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <div className="flex items-center">
                <div className="p-1.5 bg-white/10 rounded backdrop-blur-sm">
                  <img
                    src={logoUrl}
                    alt={curTrans.logoAlt}
                    className="h-12 w-12 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/85 pt-2">
                <a href="https://www.facebook.com/profile.php?id=61570540003417&sk=about" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/memoirtale.co/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/company/memoirtale/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://x.com/Memoirtale91680" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://www.youtube.com/@Memoir_tale" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Services */}
            <div className="lg:col-span-2 space-y-4 text-left">
              <h4 className="font-serif italic text-base text-white mb-5 block font-bold">
                {curTrans.servicesCol}
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-white/85">
                <li><button type="button" onClick={() => onScrollToServices ? onScrollToServices(2) : document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors cursor-pointer text-left">{curTrans.lifeStory}</button></li>
                <li><button type="button" onClick={() => onScrollToServices ? onScrollToServices(1) : document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors cursor-pointer text-left">{curTrans.tributeBook}</button></li>
                <li><button type="button" onClick={() => onScrollToServices ? onScrollToServices(3) : document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors cursor-pointer text-left">{curTrans.anniversaryBook}</button></li>
                <li className="text-white/75 flex items-center"><Sparkles className="h-3 w-3 mr-1 text-[#D4AF37]" /> {curTrans.animatedShorts}</li>
                <li className="text-white/75">{curTrans.audiobooks}</li>
                <li className="text-white/75 text-xs">{curTrans.genealogy}</li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="lg:col-span-2 space-y-4 text-left">
              <h4 className="font-serif italic text-base text-white mb-5 block font-bold">
                {curTrans.companyCol}
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-white/85">
                <li><button type="button" onClick={() => onScrollToAbout ? onScrollToAbout() : document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors cursor-pointer text-left">{curTrans.aboutUs}</button></li>
                <li><button type="button" onClick={() => onScrollToHowItWorks ? onScrollToHowItWorks() : document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors cursor-pointer text-left">{curTrans.howItWorks}</button></li>
                <li><button type="button" onClick={() => onScrollToGallery ? onScrollToGallery() : document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors cursor-pointer text-left">{curTrans.gallery}</button></li>
                <li><button type="button" onClick={() => onScrollToTestimonials ? onScrollToTestimonials() : document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors cursor-pointer text-left">{curTrans.testimonials}</button></li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenCareers}
                    className="hover:text-white transition-colors cursor-pointer text-left text-white/75"
                  >
                    {curTrans.careers} <span className="text-[9px] bg-accent-purple text-white py-0.5 px-1.5 rounded ml-1 uppercase font-bold">{curTrans.hiring}</span>
                  </button>
                </li>
                <li className="text-white/75">{curTrans.blog}</li>
              </ul>
            </div>

            {/* Column 4: Chat / Action panel */}
            <div className="lg:col-span-4 space-y-5 text-left">
              <h4 className="font-serif italic text-base text-white mb-5 block font-bold">
                {curTrans.touchCol}
              </h4>

              <div className="flex flex-wrap gap-2.5">
                {/* Simulated WhatsApp button */}
                <a
                  href="https://wa.me/919889011174"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-sans font-semibold px-3.5 py-2 rounded-full shadow-md transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 fill-current" />
                  <span>{curTrans.whatsappBtn}</span>
                </a>

                {/* Direct Line */}
                <a
                  href="tel:9889011174"
                  className="flex items-center space-x-1.5 border border-white/30 hover:bg-white hover:text-[#140a15] text-white text-xs font-sans font-semibold px-3.5 py-2 rounded-full transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>{curTrans.callBtn}</span>
                </a>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center space-x-2 pt-1">
                <Globe className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-xs text-white/85 font-medium">{lang === "HI" ? "भाषा:" : "Language:"}</span>
                <div className="inline-flex bg-[#2d1e2f] p-0.5 rounded-lg border border-white/20 text-xs">
                  <button
                    type="button"
                    onClick={() => setLang("EN")}
                    className={`px-2.5 py-1 rounded-md font-sans tracking-wide cursor-pointer ${lang === "EN" ? "bg-white text-[#140a15] font-bold" : "text-white/75 hover:text-white"}`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("HI")}
                    className={`px-2.5 py-1 rounded-md font-sans tracking-wide cursor-pointer ${lang === "HI" ? "bg-white text-[#140a15] font-bold" : "text-white/75 hover:text-white"}`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              {/* Newsletter signup */}
              <form onSubmit={handleNewsSubmit} className="space-y-1.5 max-w-sm pt-2">
                <span className="text-xs text-white/85 font-sans block font-medium">{t("latestLaunches")}</span>
                <div className="flex">
                  <input
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder={curTrans.emailPlaceholder}
                    className="flex-grow bg-[#2d1e2f] border border-white/20 rounded-l-lg h-9 px-3 text-xs text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                  />
                  <button
                    type="submit"
                    className="bg-white text-[#140a15] hover:bg-white/90 transition-all px-3 rounded-r-lg flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <Send className="h-3 w-3" />
                  </button>
                </div>
                {newsSubscribed && (
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {curTrans.subscribeSuccess}
                  </p>
                )}
              </form>
            </div>

          </div>

          {/* Bottom Divider */}
          <div className="h-[1px] w-full bg-white/15 my-6" />

          {/* Bottom Row Credits */}
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-white/75 font-sans gap-4 text-center uppercase tracking-widest">
            <div>
              <span>{t("rightsText")}</span>
            </div>

            <div className="flex items-center gap-2 text-white/85">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
              <span>in India</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-white/75">
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="hover:text-white transition-colors font-medium cursor-pointer"
              >
                {curTrans.privacy}
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={onOpenTerms}
                className="hover:text-white transition-colors font-medium cursor-pointer"
              >
                {curTrans.terms}
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={onOpenRefund}
                className="hover:text-white transition-colors font-medium cursor-pointer"
              >
                {curTrans.refund}
              </button>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}

