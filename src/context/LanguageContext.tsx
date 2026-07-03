import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "EN" | "HI";

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // announcement / alerts
    announcement: "✨ India's first dedicated premium life story book writing & publication service. Reserve your legacy now.",
    alertEnglish: "Selected Language: English Interface loaded!",
    alertHindi: "Selected Language: हिन्दी. (हम आपके जीवन के अनमोल अध्यायों को खूबसूरत हिंदी किताबों में संजोते हैं!)",

    // navbar
    home: "Home",
    howItWorks: "How It Works",
    services: "Services",
    gallery: "Our Work & Gallery",
    aboutUs: "About Us",
    contact: "Contact",
    getQuote: "Get Quote",
    anniversaryBook: "Anniversary Book",
    obituariesBook: "Obituaries & Tribute Book",
    lifeStoryBook: "Life Story Book",
    moreSoon: "MORE COMING SOON",

    // Hero
    preservingSince: "PRESERVING LEGACIES SINCE 2024",
    turnLifeInto: "Turn Your Life Into",
    masterpiece: "A Masterpiece",
    tagline: '"Stories Unfolded, Memories Preserved."',
    heroBody: "We craft beautifully written, professionally designed memoir books that preserve your life stories for generations to come. Told by expert writers. Printed as hardcover books. Delivered with elite care across India.",
    startStory: "Start Your Story",
    viewBooks: "View Our Books",

    // About Section
    aboutLabel: "WHO WE ARE",
    aboutHeadingPrimary: "Every Life Deserves",
    aboutHeadingSecondary: "A Documented Legacy",
    aboutPara1: "Memoir Tale is India's first dedicated premium life story book service. We believe that every person — regardless of their background, fame, or calling — has a unique, profound story worth preserving intact for future generations.",
    aboutPara2: "Through guided offline interviews across India, our sensitive senior journalists record your memories, lessons, and values. Our archival-grade book design team then crafts this into a rich heirloom coffee-table book that will sit proud on your mantlepiece forever.",
    foundedTitle: "Founded in India",
    foundedDesc: "Dedicated to preserving family history across diverse heritages.",
    interviewsTitle: "Guided Storytelling",
    interviewsDesc: "Done through comfort-focused private recording session interviews.",
    deliveryTitle: "Archival Quality Books",
    deliveryDesc: "Printed on premium custom sheets designed to last 200+ years.",

    // Topics Section
    topicsLabel: "PREVIEW OF MEMOIR GENRES",
    topicsHeading: "Every Life Deserves A Documented Legacy",
    topicsDesc: "We craft custom chapters based on the special phases and stories of your life.",

    // How It Works
    howLabel: "THE SEAMLESS PROCESS",
    howHeading: "How Your Memoir Comes to Life",
    howDesc: "We handle everything — from friendly recording chat sessions to professional writing, deep editing, and archival printing.",
    step1Num: "01",
    step1Title: "Welcome Discovery Calls",
    step1Desc: "Meet your dedicated memoirs counselor over coffee or Zoom. We select your themes, design layout options, and schedule comfortable talk sessions.",
    step2Num: "02",
    step2Title: "Comforting Recording Chats",
    step2Desc: "Our polite biographer visits you in person or connects via video. We guide you through zero-stress story sessions covering your favorite life milestones.",
    step3Num: "03",
    step3Title: "Drafting & Elite Design",
    step3Desc: "Our author writes your chapters. We scan family photos, layout elegant pages, and design personalized leatherette or hardcover jackets for approvals.",
    step4Num: "04",
    step4Title: "Hand-Delivered Legacy Book",
    step4Desc: "Your final gorgeous heirloom book is printed on timeless archival sheet papers, hand-bound with gold-gilding, and shipped beautifully to your doorstep.",
    howCta: "Book Your Legacy Book Call Today",

    // Services
    servicesLabel: "CHOOSE YOUR PRESETS",
    servicesHeading: "Our Bespoke Heirloom Memoirs",
    servicesDesc: "Whether it is your complete life story, a tribute to an ancestor, or a milestone wedding anniversary.",
    startsAt: "Starts at",
    inclusiveGst: "*All prices are fully inclusive of writer, photographer, layout design and premium printing GST charges.",
    choosePreset: "Choose Preset & Book Call",

    // Gallery
    galleryLabel: "PREVIEWS & PORTFOLIO",
    galleryHeading: "Explore Our Legacy Gallery",
    galleryDesc: "Sneak previews of premium custom hardcovers, golden hour storytelling interviews, and beautiful unboxing memories across Indian households.",
    allWorks: "All Works",
    finishedHardcovers: "Finished Hardcovers",
    interviewsSmiles: "Interviews & Smiles",
    emptyCategory: "No items match your category selection.",
    slideshowBtn: "Launch Interactive Slideshow",
    zoomTips: "💡 Pro tip: Use ← and → keyboard arrows to scroll",
    escapeClose: "Esc to close",

    // Testimonials
    testimonialsLabel: "HEARTWARMING LEGACIES",
    testimonialsHeading: "Loved & Cherished in Homes",
    testimonialsDesc: "Families share their deepest gratitude. Read how a physical memoir book rekindled connections across generations.",
    videoSectionTitle: "A Visual Unboxing Love",
    videoSectionDesc: "Watch beautiful storytelling cinematic footage of families laying their eyes on their personalized legacy hardcovers for the first time.",
    liveCinema: "🎥 Memoir Tale Cinema",

    // Contact
    contactLabel: "INQUIRE & BOOK NOW",
    contactHeading: "Let Us Write Your Story Book",
    contactDesc: "Submit your details. Our friendly senior storyteller will call you within 24 hours to guide you affectionately on how to start.",
    fullName: "Your Full Name *",
    emailAddr: "Your Email Address *",
    phoneNum: "Phone Number (WhatsApp Preferred) *",
    selectBookPreset: "Select Book Preset",
    writingLanguage: "For whom are you creating this book? *",
    languageDropdownLabel: "Preferred Book Language",
    placeholderChoose: "Choose...",
    messageLabel: "Tell us a bit about whose life is being written (optional)",
    submitting: "Submitting Legacy Call Book...",
    submitSuccess: "✨ Legacy Reservation Request Submitted! ✨",
    submitSuccessDesc: "Thank you so much. Our friendly Memoir Tale biographer will call you affectionately within 24 hours to schedule your free consultation.",
    requestBtn: "Schedule Free Consultation Block →",
    disclaimer: "🔒 We respect absolute confidentiality. Your life content is never shared with anyone.",

    // FAQ
    faqLabel: "YOUR DOUBTS SOLVED",
    faqHeading: "Common Heirloom Questions",
    faqDesc: "Frequently asked questions about writing timelines, interview steps, privacy protection, and book deliveries.",

    // Footer
    latestLaunches: "Stay updated on memoir launches:",
    submittingEmail: "Submitting...",
    emailSubscribed: "Thank you for subscribing! We'll keep you updated.",
    subscribe: "Subscribe",
    servicesLinksTitle: "Memoir Books",
    quickLinksTitle: "Quick Links",
    contactUsTitle: "Contact Us",
    phoneText: "Direct Line:",
    emailText: "Email Support:",
    rightsText: "© 2026 Memoir Tale Pvt. Ltd. All rights reserved.",
    craftedText: "Handcrafted in India with deep love."
  },
  HI: {
    // announcement / alerts
    announcement: "✨ भारत की पहली समर्पित प्रीमियम जीवन इतिहास पुस्तक लेखन और प्रकाशन सेवा। अपनी विरासत को अभी सुरक्षित करें।",
    alertEnglish: "चयनित भाषा: अंग्रेजी इंटरफेस लोड हो गया है!",
    alertHindi: "चयनित भाषा: हिन्दी। हम आपके जीवन के अनमोल अध्यायों को खूबसूरत हिंदी किताबों में संजोते हैं!",

    // navbar
    home: "मुख्य पृष्ठ",
    howItWorks: "यह कैसे काम करता है",
    services: "सेवाएँ",
    gallery: "हमारा काम और गैलरी",
    aboutUs: "हमारे बारे में",
    contact: "संपर्क करें",
    getQuote: "कोट प्राप्त करें",
    anniversaryBook: "वर्षगांठ पुस्तक (Anniversary Book)",
    obituariesBook: "श्रद्धांजलि पुस्तक (Tribute Book)",
    lifeStoryBook: "जीवन इतिहास पुस्तक (Life Story Book)",
    moreSoon: "जल्द ही और आ रहा है",

    // Hero
    preservingSince: "वर्ष 2024 से विरासतों को संजोते हुए",
    turnLifeInto: "अपने जीवन को बदलें",
    masterpiece: "एक उत्कृष्ट कृति में",
    tagline: '"अनकही कहानियाँ, सहेजी गयी यादें।"',
    heroBody: "हम आपके जीवन की कहानियों को आने वाली पीढ़ियों के लिए सुरक्षित रखने के लिए खूबसूरती से लिखी गई, पेशेवर रूप से डिज़ाइन की गई संस्मरण पुस्तकें तैयार करते हैं। जीवनी लेखकों व शोधकर्ताओं द्वारा लिखित। हार्डकवर पुस्तकों के रूप में मुद्रित। भारत भर में विशिष्ट देखभाल के साथ वितरित।",
    startStory: "अपनी कहानी शुरू करें",
    viewBooks: "हमारी पुस्तकें देखें",

    // About Section
    aboutLabel: "हम कौन हैं",
    aboutHeadingPrimary: "हर जीवन हकदार है",
    aboutHeadingSecondary: "सहेजे हुए इतिहास का",
    aboutPara1: "मेमोयर टेल (Memoir Tale) भारत की पहली समर्पित प्रीमियम जीवन कहानी पुस्तक सेवा है। हमारा मानना ​​है कि हर व्यक्ति - चाहे उसकी पृष्ठभूमि, प्रसिद्धि, या पेशा कुछ भी हो - उसकी एक अनूठी, गहरी कहानी होती है जो आने वाली पीढ़ियों के लिए सुरक्षित रखने योग्य है।",
    aboutPara2: "भारत भर में निर्देशित ऑफ़लाइन साक्षात्कारों के माध्यम से, हमारे संवेदनशील वरिष्ठ पत्रकार आपकी यादों, सीखों और मूल्यों को रिकॉर्ड करते हैं। हमारी दस्तावेजी-गुणवत्ता वाली पुस्तक डिज़ाइन टीम तब इसे एक समृद्ध विरासत पुस्तक (Heirloom Coffee-Table Book) का रूप देती है जो आपके घर की शान बनेगी।",
    foundedTitle: "भारत में स्थापित",
    foundedDesc: "विविध सांस्कृतिक विरासतों में पारिवारिक इतिहास को संरक्षित करने के लिए समर्पित।",
    interviewsTitle: "निर्देशित कहानी कहना",
    interviewsDesc: "आरामदायक, व्यक्तिगत और निजी रिकॉर्डिंग सत्रों के साक्षात्कारों के माध्यम से किया जाता है।",
    deliveryTitle: "दस्तावेजी गुणवत्ता वाली पुस्तकें",
    deliveryDesc: "प्रीमियम और स्थायी कागज़ात पर मुद्रित जो 200+ वर्षों से अधिक समय तक सुरक्षित रहती हैं।",

    // Topics Section
    topicsLabel: "संस्मरण शैलियों की झलक",
    topicsHeading: "हर जीवन हकदार है एक सहेजी हुई विरासत का",
    topicsDesc: "हम आपके जीवन के विशेष चरणों और कहानियों के आधार पर कस्टम अध्याय तैयार करते हैं।",

    // How It Works
    howLabel: "निर्बाध प्रक्रिया",
    howHeading: "आपका संस्मरण कैसे सजीव होता है",
    howDesc: "हम दोस्ताना रिकॉर्डिंग बातचीत सत्रों से लेकर पेशेवर लेखन, संपादन और गुणवत्ता मुद्रण तक सब कुछ संभालते हैं।",
    step1Num: "01",
    step1Title: "परिचयात्मक कॉल",
    step1Desc: "चाय/कॉफ़ी या ज़ूम पर अपनी समर्पित संस्मरण सलाहकार से मिलें। हम आपकी पसंद की थीम चुनते हैं, डिज़ाइन लेआउट तय करते हैं, और सुविधानुसार बातचीत सत्र तय करते हैं।",
    step2Num: "02",
    step2Title: "आरामदायक रिकॉर्डिंग सत्र",
    step2Desc: "हमारे सौम्य जीवनी लेखक व्यक्तिगत रूप से आपसे मिलने आते हैं या वीडियो के माध्यम से जुड़ते हैं। हम आपके जीवन के पसंदीदा पड़ावों की कहानियों को रिकॉर्ड करते हैं।",
    step3Num: "03",
    step3Title: "लेखन और उत्कृष्ट डिज़ाइन",
    step3Desc: "हमारे लेखक आपके अध्यायों को लिखते हैं। हम पारिवारिक तस्वीरों को स्कैन करते हैं, सुंदर पन्नों का लेआउट बनाते हैं, और अंतिम मंज़ूरी के लिए कवर डिज़ाइन करते हैं।",
    step4Num: "04",
    step4Title: "सप्रेम भेंट की गयी संस्मरण पुस्तक",
    step4Desc: "आपकी शानदार विरासत पुस्तक को सदाबहार कागजों पर छापा जाता है, सोने की परत के साथ हाथ से बांधा जाता है, और सुरक्षित रीति से आपके घर पहुँचाया जाता है।",
    howCta: "आज ही अपनी मुफ़्त विरासत योजना कॉल बुक करें",

    // Services
    servicesLabel: "अपनी ज़रूरत चुनें",
    servicesHeading: "हमारी विशेष विरासत पुस्तकें (Bespoke Memoirs)",
    servicesDesc: "चाहे वह आपके संपूर्ण जीवन की कहानी हो, किसी पूर्वज को श्रद्धांजलि हो, या शादी की सालगिरह का मील का पत्थर हो।",
    startsAt: "शुरुआती कीमत",
    inclusiveGst: "*सभी कीमतें लेखक, फोटोग्राफर, लेआउट डिजाइन और प्रीमियम प्रिंटिंग जीएसटी शुल्कों सहित हैं।",
    choosePreset: "योजना चुनें और कॉल बुक करें",

    // Gallery
    galleryLabel: "कलाकृतियाँ और तस्वीरें",
    galleryHeading: "हमारी सहेजी हुई विरासत गैलरी देखें",
    galleryDesc: "भारतीय घरों में प्रीमियम कस्टम हार्डकवर पुस्तकों, कहानी सत्रों और अनबॉक्सिंग की खूबसूरत यादों की अनन्य झलकियाँ।",
    allWorks: "सभी काम",
    finishedHardcovers: "मुद्रित हार्डकवर",
    interviewsSmiles: "बातचीत और मुस्कान",
    emptyCategory: "आपकी चुनी हुई श्रेणी के लिए कोई तस्वीर उपलब्ध नहीं है।",
    slideshowBtn: "इंटरैक्टिव स्लाइड शो शुरू करें",
    zoomTips: "💡 प्रो टिप: आगे-पीछे करने के लिए कीबोर्ड के ← और → तीरों का उपयोग करें",
    escapeClose: "बंद करने के लिए Esc दबाएं",

    // Testimonials
    testimonialsLabel: "दिल को छू लेने वाली विरासतें",
    testimonialsHeading: "भारतीय परिवारों का प्यार और गहरा लगाव",
    testimonialsDesc: "परिवारों ने अपना स्नेह व्यक्त किया। जानें कि कैसे एक भौतिक संस्मरण पुस्तक ने पीढ़ियों के बीच के प्रेम संबंधों को दोबारा जीवंत कर दिया।",
    videoSectionTitle: "खुशी से भरी अनबॉक्सिंग के वीडियो",
    videoSectionDesc: "परिवारों द्वारा पहली बार अपने व्यक्तिगत विरासत हार्डकवर को देखने और उसे छूने के खूबसूरत और भावनात्मक पलों को सिनेमाई फुटेज में देखें।",
    liveCinema: "🎥 मेमोयर टेल सिनेमा",

    // Contact
    contactLabel: "पूछताछ और बुकिंग",
    contactHeading: "आइये आपके जीवन की पुस्तक लिखें",
    contactDesc: "अपना विवरण यहाँ दर्ज करें। हमारे वरिष्ठ जीवनी सलाहकार 24 घंटे के भीतर आपसे स्नेहपूर्वक बात करेंगे और आपको शुरू करने के लिए मार्गदर्शन करेंगे।",
    fullName: "आपका पूरा नाम *",
    emailAddr: "आपका ईमेल पता *",
    phoneNum: "फ़ोन नंबर / व्हाट्सएप नंबर *",
    selectBookPreset: "पुस्तक का प्रकार चुनें",
    writingLanguage: "यह पुस्तक किसके लिए लिखी जा रही है? *",
    languageDropdownLabel: "पसंदीदा पुस्तक की भाषा",
    placeholderChoose: "चुनें...",
    messageLabel: "हमें संक्षेप में बताएं कि यह पुस्तक किसके विषय में है (वैकल्पिक)",
    submitting: "विवरण भेजा जा रहा है...",
    submitSuccess: "✨ आपकी विरासत योजना कॉल बुक हो गई है! ✨",
    submitSuccessDesc: "बहुत-बहुत धन्यवाद। हमारी समर्पित टीम 24 घंटे के भीतर आपसे प्रेमपूर्वक संपर्क करेगी और मुफ़्त परामर्श सत्र निर्धारित करेगी।",
    requestBtn: "मुफ़्त परामर्श सत्र बुक करें →",
    disclaimer: "🔒 हम पूर्ण गोपनीयता बनाए रखते हैं। आपकी जीवन की जानकारियाँ कभी किसी के साथ साझा नहीं की जाती हैं।",

    // FAQ
    faqLabel: "आपकी शंकाओं का समाधान",
    faqHeading: "आम पारिवारिक प्रश्न",
    faqDesc: "पुस्तक लेखन की समय-सीमा, साक्षात्कार प्रक्रिया, गोपनीयता सुरक्षा और पुस्तक वितरण के बारे में अक्सर पूछे जाने वाले प्रश्न।",

    // Footer
    latestLaunches: "नए संस्मरण प्रकाशनों के बारे में अपडेट रहें:",
    submittingEmail: "दर्ज किया जा रहा है...",
    emailSubscribed: "सदस्यता के लिए धन्यवाद! हम आपको अपडेट भेजते रहेंगे।",
    subscribe: "सदस्यता लें",
    servicesLinksTitle: "संस्मरण पुस्तकें",
    quickLinksTitle: "महत्वपूर्ण लिंक्स",
    contactUsTitle: "संपर्क करें",
    phoneText: "सीधा संपर्क:",
    emailText: "ईमेल सपोर्ट:",
    rightsText: "© 2026 मेमोयर टेल प्रा. लि. सर्वाधिकार सुरक्षित।",
    craftedText: "भारत में गहरे प्रेम और श्रम के साथ हस्तनिर्मित।"
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("memoir_lang");
    return (saved === "HI" || saved === "EN") ? saved as Language : "EN";
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("memoir_lang", newLang);
  };

  const t = (key: string): string => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    // Fallback to English, then the key itself
    return translations["EN"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
