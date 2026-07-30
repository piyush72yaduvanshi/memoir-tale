// Memoir Tale - Content Data Store

import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'life-story',
    title: 'Life Story Books',
    titleHi: 'जीवन कहानी पुस्तक',
    tagline: 'Personal Memoir',
    taglineHi: 'व्यक्तिगत संस्मरण',
    description: 'A beautifully written memoir that captures a lifetime of memories, milestones, and wisdom.',
    descriptionHi: 'एक सुंदर ढंग से लिखा गया संस्मरण जो जीवन भर की यादों, मील के पत्थरों और ज्ञान को संजोता है।',
    image: 'https://picsum.photos/seed/mem_lifestory/600/400',
    linkText: 'Learn More',
    linkTextHi: 'और जानें'
  },
  {
    id: 'family-legacy',
    title: 'Family Legacy Books',
    titleHi: 'पारिवारिक विरासत पुस्तक',
    tagline: 'Family Heritage',
    taglineHi: 'पारिवारिक विरासत',
    description: 'Preserve generations of stories, traditions, and family heritage in one timeless collection.',
    descriptionHi: 'कहानियों, परंपराओं और पारिवारिक विरासत की पीढ़ियों को एक सदाबहार संग्रह में सुरक्षित रखें।',
    image: 'https://picsum.photos/seed/mem_tree/600/400',
    linkText: 'Learn More',
    linkTextHi: 'और जानें'
  },
  {
    id: 'biography-autobiography',
    title: 'Biography & Autobiography',
    titleHi: 'जीवनी और आत्मकथा',
    tagline: 'Remarkable Journeys',
    taglineHi: 'अद्भुत यात्राएं',
    description: 'Celebrate remarkable journeys with professionally written biographies that inspire future generations.',
    descriptionHi: 'पेशेवर रूप से लिखी गई जीवनियों के साथ अद्भुत यात्राओं का जश्न मनाएं जो आने वाली पीढ़ियों को प्रेरित करती हैं।',
    image: 'https://picsum.photos/seed/mem_biography/600/400',
    linkText: 'Learn More',
    linkTextHi: 'और जानें'
  },
  {
    id: 'travel-journals',
    title: 'Travel Journals',
    titleHi: 'यात्रा संस्मरण',
    tagline: 'Unforgettable Adventures',
    taglineHi: 'अविस्मरणीय कारनामे',
    description: 'Transform unforgettable adventures into beautifully designed keepsakes.',
    descriptionHi: 'अविस्मरणीय रोमांचकारी कारनामों को सुंदर ढंग से डिज़ाइन किए गए स्मृति चिन्हों में बदलें।',
    image: 'https://picsum.photos/seed/mem_travel/600/400',
    linkText: 'Learn More',
    linkTextHi: 'और जानें'
  },
  {
    id: 'tribute-memorial',
    title: 'Tribute & Memorial Books',
    titleHi: 'श्रद्धांजलि व संस्मरण ग्रंथ',
    tagline: 'Honor A Loved One',
    taglineHi: 'प्रियजन का सम्मान',
    description: "Honor a loved one's life through stories, photographs, letters, and cherished memories.",
    descriptionHi: 'कहानियों, तस्वीरों, पत्रों और संजोई हुई यादों के माध्यम से अपने प्रियजन के जीवन का सम्मान करें।',
    image: 'https://picsum.photos/seed/mem_tribute/600/400',
    linkText: 'Learn More',
    linkTextHi: 'और जानें'
  },
  {
    id: 'coffee-table',
    title: 'Coffee Table Books',
    titleHi: 'कॉफी टेबल बुक्स',
    tagline: 'Visual Storytelling',
    taglineHi: 'विज़ुअल स्टोरीटेलिंग',
    description: 'Elegant visual storytelling crafted for families, founders, artists, and collectors.',
    descriptionHi: 'परिवारों, संस्थापकों, कलाकारों और संग्रहकर्ताओं के लिए तैयार की गई सुंदर दृश्य कथा (विज़ुअल स्टोरीटेलिंग)।',
    image: 'https://picsum.photos/seed/mem_coffeetable/600/400',
    linkText: 'Learn More',
    linkTextHi: 'और जानें'
  },
  {
    id: 'corporate-founder',
    title: 'Corporate & Founder Stories',
    titleHi: 'कॉर्पोरेट और संस्थापक गाथाएं',
    tagline: 'Business Heritage',
    taglineHi: 'व्यावसायिक विरासत',
    description: 'Document the vision, milestones, and legacy behind businesses and organizations.',
    descriptionHi: 'व्यवसायों और संगठनों के पीछे के दृष्टिकोण, मील के पत्थरों और विरासत को दस्तावेज़ में संजोएं।',
    image: 'https://picsum.photos/seed/mem_corporate/600/400',
    linkText: 'Learn More',
    linkTextHi: 'और जानें'
  },
  {
    id: 'digital-legacy',
    title: 'Digital Legacy Collection',
    titleHi: 'डिजिटल आर्काइव संग्रह',
    tagline: 'Digital Archive',
    taglineHi: 'डिजिटल आर्काइव',
    description: "Secure your family's stories, photographs, videos, and memories for generations to come.",
    descriptionHi: 'आने वाली पीढ़ियों के लिए अपने परिवार की कहानियों, तस्वीरों, वीडियो और यादों को सुरक्षित रखें।',
    image: 'https://picsum.photos/seed/mem_aibot/600/400',
    linkText: 'Learn More',
    linkTextHi: 'और जानें'
  }
];

export interface Topic {
  id: number;
  icon: string;
  imageUrl: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface Package {
  id: number;
  title: string;
  price: string;
  badge: string;
  icon: string;
  isFeatured?: boolean;
  borderLeft?: boolean;
  features: string[];
  ctaText: string;
  additionalNote?: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  type: string;
  category?: string;
  span?: string; // for masonry grid variety
}

export interface Testimonial {
  id: number;
  quote: string;
  rating: number;
  author: string;
  location: string;
  service: string;
  initials: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'process' | 'pricing' | 'privacy' | 'shipping' | 'ownership' | 'support' | 'general';
}

export const TOPICS: Topic[] = [
  {
    id: 1,
    icon: "💍",
    imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600",
    title: "Marriage & Love Stories",
    description: "Celebrate the beautiful journey of your union and early years together."
  },
  {
    id: 2,
    icon: "👨‍👩‍👧",
    imageUrl: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&q=80&w=600",
    title: "Family Heritage",
    description: "Preserve your family tree, ancestral origins, and migration stories."
  },
  {
    id: 3,
    icon: "💼",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    title: "Business Legacy",
    description: "Document your entrepreneurial journey, hard-won values, and industry wisdom."
  },
  {
    id: 4,
    icon: "✈️",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=600",
    title: "Travel Adventures",
    description: "Capture your adventures and transformative travels across this magnificent world."
  },
  {
    id: 5,
    icon: "🌏",
    imageUrl: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&q=80&w=600",
    title: "Immigration Stories",
    description: "Chronicle the brave leap into a new country, community, or culture."
  },
  {
    id: 6,
    icon: "📈",
    imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600",
    title: "Personal Growth",
    description: "Share your transformative journey of inner reflection and self-discovery."
  },
  {
    id: 7,
    icon: "💪",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
    title: "Overcoming Adversity",
    description: "Your inspiring story of resilience, grit, and triumph over life's challenges."
  },
  {
    id: 8,
    icon: "🙏",
    imageUrl: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&q=80&w=600",
    title: "Spiritual Journey",
    description: "Honor the faith, deep devotion, and guiding values that shaped your life."
  },
  {
    id: 9,
    icon: "🎓",
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600",
    title: "Academic & Career",
    description: "Celebrate academic milestones, professional triumphs, and career breakthroughs."
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Share Your Memories",
    description: "Tell us about your life through a simple form. Share voice recordings, text notes, photos — in Hindi or English. Our compassionate team will guide you at every step of compiling your initial materials.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600&h=520" // grandfather looking at book
  },
  {
    number: "02",
    title: "We Interview You",
    description: "Your dedicated writer conducts multiple friendly, guided interview sessions — via phone, video call, or in person. We ask the precise, gentle questions that unlock the precise personal stories your family will treasure forever.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=520" // interview session
  },
  {
    number: "03",
    title: "We Write Your Story",
    description: "Our literary professionals craft your memories into elegant, beautifully polished chapters. You receive and review early drafts, provide structural feedback, and approve every single word before we proceed.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600&h=520" // close up of writing hand
  },
  {
    number: "04",
    title: "Design Your Book",
    description: "Our elite book designers style your layout, seamlessly placing your family photos alongside the text. We customize the canvas cover art, elegant typography headers, and layout every single page precisely.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600&h=520" // open book design
  },
  {
    number: "05",
    title: "Receive Your Masterpiece",
    description: "Your premium custom hardcover memoir is printed with elite, archival materials and delivered straight to your door — anywhere in India. Finally, hold your physical legacy in your hands.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600&h=520" // beautiful stack of books
  }
];

export const PACKAGES: Package[] = [
  {
    id: 1,
    title: "Tribute Book",
    price: "₹14,999",
    badge: "🕊️ HEARTFELT",
    icon: "🕊️",
    features: [
      "Honour loved one's memory",
      "Professional tribute writing",
      "Family photos included",
      "Custom hardcover print",
      "1 physical copy + Digital PDF"
    ],
    ctaText: "Choose This Package"
  },
  {
    id: 2,
    title: "Life Story Book",
    price: "₹24,999",
    badge: "⭐ MOST POPULAR",
    icon: "📖",
    isFeatured: true,
    features: [
      "Professional ghostwriter assigned",
      "5–8 structured interview sessions",
      "Up to 150 pages custom written",
      "Custom premium hardcover design",
      "1 archival physical copy included",
      "High-resolution digital PDF copy",
      "Complimentary Pan-India express delivery"
    ],
    ctaText: "Choose This Package",
    additionalNote: "Extra premium printed copies at only ₹2,999 each"
  },
  {
    id: 3,
    title: "Anniversary Book",
    price: "₹18,999",
    badge: "🎁 GIFT IDEA",
    icon: "🎂",
    borderLeft: true,
    features: [
      "Beautiful couple or family story focus",
      "3–5 direct interview sessions",
      "Rich photo-oriented editorial layout",
      "Custom premium hardcover",
      "1 physical copy + Digital sharing copy",
      "Multiple copies available on demand"
    ],
    ctaText: "Choose This Package"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    title: "The Life & Journey of Major General V. K. Sharma",
    type: "Life Memoirs",
    category: "LIFE_MEMOIRS",
    span: "col-span-1 md:col-span-2"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=600",
    title: "100 Years of the Kapoor Ancestry & Estate",
    type: "Family Legacies",
    category: "FAMILY_LEGACIES"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=600",
    title: "Trans-Siberian & Himalayan Expeditions Journal",
    type: "Travel Journals",
    category: "TRAVEL_JOURNALS"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    title: "50 Years of Textile Innovation & Enterprise",
    type: "Founder Stories",
    category: "FOUNDER_STORIES",
    span: "col-span-1 md:col-span-2"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
    title: "In Loving Memory of Smt. Rukmini Devi",
    type: "Tribute Books",
    category: "TRIBUTE_BOOKS"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600",
    title: "An Heirloom Anthology of Fine Art & Architecture",
    type: "Coffee Table Books",
    category: "COFFEE_TABLE"
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=600",
    title: "Memoirs of a Civil Servant: 1965-2005",
    type: "Life Memoirs",
    category: "LIFE_MEMOIRS"
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600",
    title: "Four Generations of Heritage & Recipes",
    type: "Family Legacies",
    category: "FAMILY_LEGACIES"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Memoir Tale turned my mother's 78 years of life into the most beautiful book I have ever seen. She cried when she held it. Our entire family will treasure this forever.",
    rating: 5,
    author: "Priya Sharma",
    location: "Mumbai",
    service: "Life Story Book",
    initials: "PS"
  },
  {
    id: 2,
    quote: "I gifted this to my father for his 70th birthday. He was absolutely speechless. The writing captured him perfectly — his humor, his wisdom, his journey. Worth every rupee.",
    rating: 5,
    author: "Rajesh Kumar",
    location: "New Delhi",
    service: "Anniversary Book",
    initials: "RK"
  },
  {
    id: 3,
    quote: "After losing my husband, I wanted his story preserved for our grandchildren. The team was so compassionate, patient, and professional. The tribute book is priceless.",
    rating: 5,
    author: "Meera Patel",
    location: "Ahmedabad",
    service: "Tribute Book",
    initials: "MP"
  }
];

export interface FAQItem {
  id: number;
  question: string;
  questionHi?: string;
  answer: string;
  answerHi?: string;
  category?: 'process' | 'pricing' | 'privacy' | 'shipping' | 'ownership' | 'support' | 'general';
}

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "How does the storytelling process begin?",
    questionHi: "कहानी सुनाने की प्रक्रिया कैसे शुरू होती है?",
    answer: "Every project starts with a personal consultation where we understand your story, goals, and vision. From there, our team guides you through interviews, writing, design, review, and final delivery.",
    answerHi: "हर प्रोजेक्ट एक व्यक्तिगत परामर्श के साथ शुरू होता है जहां हम आपकी कहानी, लक्ष्यों और दृष्टिकोण को समझते हैं। वहां से, हमारी टीम आपको साक्षात्कार, लेखन, डिज़ाइन, समीक्षा और अंतिम डिलीवरी के माध्यम से मार्गदर्शन करती है।",
    category: 'process'
  },
  {
    id: 2,
    question: "How long does it take to complete a memoir?",
    questionHi: "एक संस्मरण को पूरा करने में कितना समय लगता है?",
    answer: "Most projects are completed within 8–16 weeks, depending on the complexity, length, revisions, and selected services.",
    answerHi: "ज्यादातर प्रोजेक्ट 8-16 सप्ताह के भीतर पूरे हो जाते हैं, जो जटिलता, लंबाई, संशोधन और चयनित सेवाओं पर निर्भर करता है।",
    category: 'process'
  },
  {
    id: 3,
    question: "Do I need to write anything myself?",
    questionHi: "क्या मुझे खुद कुछ लिखने की जरूरत है?",
    answer: "Not at all. Our experienced storytellers conduct interviews and transform your memories into a beautifully written narrative while preserving your authentic voice.",
    answerHi: "बिल्कुल नहीं। हमारे अनुभवी लेखक साक्षात्कार आयोजित करते हैं और आपकी प्रामाणिक आवाज को बनाए रखते हुए आपकी यादों को एक सुंदर लिखित वर्णन में बदल देते हैं।",
    category: 'process'
  },
  {
    id: 4,
    question: "Can the memoir be written in my preferred language?",
    questionHi: "क्या संस्मरण मेरी पसंदीदा भाषा में लिखा जा सकता है?",
    answer: "Yes. We offer multilingual storytelling and can create memoirs in multiple languages, depending on your preferences.",
    answerHi: "हाँ। हम बहुभाषी कहानी सुनाने की सुविधा प्रदान करते हैं और आपकी प्राथमिकताओं के आधार पर कई भाषाओं (जैसे हिंदी, अंग्रेजी) में संस्मरण बना सकते हैं।",
    category: 'support'
  },
  {
    id: 5,
    question: "Will my information remain private?",
    questionHi: "क्या मेरी जानकारी निजी रहेगी?",
    answer: "Absolutely. Every conversation, photograph, recording, and document is handled with complete confidentiality. Your story belongs to you.",
    answerHi: "बिल्कुल। हर बातचीत, तस्वीर, रिकॉर्डिंग और दस्तावेज़ को पूर्ण गोपनीयता के साथ संभाला जाता है। आपकी कहानी केवल आपकी है।",
    category: 'privacy'
  },
  {
    id: 6,
    question: "Who owns the copyright?",
    questionHi: "कॉपीराइट का मालिक कौन है?",
    answer: "You do. Once your project is complete, the story and its rights remain yours unless otherwise agreed in writing.",
    answerHi: "आप हैं। एक बार जब आपका प्रोजेक्ट पूरा हो जाता है, तो कहानी और उसके अधिकार आपके पास रहते हैं।",
    category: 'ownership'
  },
  {
    id: 7,
    question: "Can family members contribute?",
    questionHi: "क्या परिवार के सदस्य योगदान दे सकते हैं?",
    answer: "Yes. We encourage family members, friends, and colleagues to share memories, photographs, and stories to create a richer and more complete legacy.",
    answerHi: "हाँ। हम एक समृद्ध और अधिक संपूर्ण विरासत बनाने के लिए परिवार के सदस्यों, दोस्तों और सहकर्मियों को यादें, तस्वीरें और कहानियां साझा करने के लिए प्रोत्साहित करते हैं।",
    category: 'support'
  },
  {
    id: 8,
    question: "Do you ship internationally?",
    questionHi: "क्या आप अंतरराष्ट्रीय स्तर पर शिप करते हैं?",
    answer: "Yes. We deliver premium memoirs and legacy books to clients around the world.",
    answerHi: "हाँ। हम दुनिया भर के ग्राहकों को प्रीमियम संस्मरण और विरासत पुस्तकें पहुंचाते हैं।",
    category: 'shipping'
  }
];

export interface BookCover {
  id: number;
  title: string;
  author: string;
  bg: string;
  accent: string;
  image?: string;
}

// Aesthetic mock book covers with Indian memoir motifs for our custom carousel
export const BOOK_COVERS: BookCover[] = [
  { id: 1, title: "Threads of Time", author: "Devi Prasad Sen", bg: "from-[#4E1015] to-[#230205]", accent: "rgba(229,184,72,0.8)" },
  { id: 2, title: "The Coal Merchant's Son", author: "Hiralal Gupta", bg: "from-[#743A15] to-[#421D05]", accent: "rgba(229,184,72,0.9)" },
  { id: 3, title: "Whispers of the Banyan", author: "Lilavati Rao", bg: "from-[#0F3624] to-[#051F13]", accent: "rgba(255,255,255,0.7)" },
  { id: 4, title: "A Life in Steel & Ink", author: "Cmdr. Satish Chandra", bg: "from-[#4A3010] to-[#271704]", accent: "rgba(229,184,72,0.85)" },
  { id: 5, title: "Echoes of Gorakhpur", author: "Kamla Devi", bg: "from-[#521B27] to-[#2D060E]", accent: "rgba(229,184,72,1)" },
  { id: 6, title: "The Ganges Flowed West", author: "Prem Nath Tandon", bg: "from-[#8B612C] to-[#553811]", accent: "rgba(229,184,72,0.75)" },
  { id: 7, title: "Seven Flights of Clay", author: "Rajiv Narula", bg: "from-[#2D2D30] to-[#171719]", accent: "rgba(229,184,72,0.8)" },
  { id: 8, title: "Beyond the Salt Marshes", author: "Anandi Gadhvi", bg: "from-[#503E33] to-[#2E211A]", accent: "rgba(255,255,255,0.8)" },
];

// Feature Icons for "What Makes Every MemoirTale Book Special" section
export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const FEATURES: Feature[] = [
  {
    id: 'personal-interviews',
    title: 'Personal Story Interviews',
    description: 'Every story begins with meaningful conversations that capture your voice, memories, and experiences.',
    iconName: 'Users'
  },
  {
    id: 'professional-writing',
    title: 'Professional Writing',
    description: 'Experienced storytellers transform memories into authentic and engaging narratives.',
    iconName: 'PenTool'
  },
  {
    id: 'thoughtful-design',
    title: 'Thoughtful Design',
    description: 'Elegant layouts, premium typography, and bespoke visual storytelling.',
    iconName: 'Palette'
  },
  {
    id: 'photo-restoration',
    title: 'Photo Restoration',
    description: 'Restore treasured photographs with care while preserving their authenticity.',
    iconName: 'Sparkles'
  },
  {
    id: 'premium-printing',
    title: 'Premium Printing',
    description: 'Museum-quality materials and archival printing designed to last for generations.',
    iconName: 'Award'
  },
  {
    id: 'custom-cover',
    title: 'Custom Cover Design',
    description: 'Every cover is uniquely designed to reflect your story and personality.',
    iconName: 'Layout'
  },
  {
    id: 'multilingual-storytelling',
    title: 'Multilingual Storytelling',
    description: 'Create your memoir in the language that feels most natural to you.',
    iconName: 'Languages'
  },
  {
    id: 'digital-archive',
    title: 'Digital Legacy Archive',
    description: 'Secure digital copies ensure your story remains accessible for future generations.',
    iconName: 'Laptop'
  },
  {
    id: 'private-confidential',
    title: 'Private & Confidential',
    description: 'Your memories remain protected with complete privacy throughout the process.',
    iconName: 'Lock'
  },
  {
    id: 'worldwide-delivery',
    title: 'Worldwide Delivery',
    description: 'Beautifully crafted legacy books delivered safely across the globe.',
    iconName: 'Truck'
  },
  {
    id: 'lifetime-keepsake',
    title: 'Lifetime Keepsake',
    description: 'More than a book—a timeless heirloom to share with future generations.',
    iconName: 'Heart'
  }
];

// Founder Info for "Our Story" section
export interface Founder {
  name: string;
  title: string;
  quote: string;
  avatar: string;
  linkedin: string;
}

export const FOUNDER: Founder = {
  name: 'Abhinav Shakya',
  title: 'Founder & Chief Storyteller',
  quote: '"Every Life is a Story Worth Telling."',
  avatar: 'https://picsum.photos/seed/founder_dev/300/300',
  linkedin: 'https://linkedin.com/'
};

// Translations for all sections
export interface SectionTranslations {
  EN: {
    [key: string]: any;
  };
  HI: {
    [key: string]: any;
  };
}

export const TRANSLATIONS: SectionTranslations = {
  EN: {
    // Hero Section
    hero: {
      badge: "Preserving Memories Since 2024",
      heading1: "Turn Your Life Into",
      heading2: "A Masterpiece",
      subtitle: "We transform your spoken stories, old photos, and precious memories into beautiful handcrafted premium memoir books — a timeless legacy for generations.",
      cta1: "Start Your Memoir",
      cta2: "See Our Work",
      scroll: "Scroll"
    },
    // About Strip Section
    aboutStrip: {
      label: "Our Story",
      heading: "Memoir Tale was founded in 2023 with a simple belief:",
      headingItalic: "every life deserves to be remembered.",
      para1: "Inspired by a deeply personal experience, our founder, Abhinav Shakya, recognized that while time moves forward, the stories that shape our lives are often left untold. That realization sparked a mission to preserve those stories with the care, authenticity, and respect they deserve.",
      para2: "Today, Memoir Tale helps individuals, families, and organizations celebrate life's most meaningful journeys through beautifully crafted legacy experiences.",
      quote: "Every Life is a Story Worth Telling.",
      founderName: "Abhinav Shakya",
      founderTitle: "Founder & Chief Storyteller"
    },
    // Marquee Section
    marquee: {
      heading: "Stories Across",
      headingItalic: "Generations",
      subtitle: "From extraordinary achievements to everyday moments, every life leaves behind a story worth preserving. Explore the diverse journeys we are proud to transform into timeless legacies.",
      by: "by"
    },
    // Topics Section
    topics: {
      label: "STORY CATEGORIES",
      heading: "Every Life Has a Story Worth Telling",
      subtitle: "From family legacies and personal memoirs to entrepreneurial journeys and historic milestones, we preserve stories that deserve to be remembered for generations."
    },
    // Feature Icons Section
    features: {
      label: "CRAFTED WITH PURPOSE",
      heading: "Why Families Choose Memoir Tale",
      subtitle: "Every legacy deserves exceptional care. From thoughtful storytelling and premium craftsmanship to secure preservation, every detail is designed to create a keepsake that will be cherished for generations.",
      footer: "Every page is created with the same care and respect your story deserves."
    },
    // Event Section
    events: {
      label: "OUR EVENTS",
      heading: "Memorable Moments Captured",
      subtitle: "Beautiful moments from our special events and celebrations where we help families preserve their precious memories",
      eventDate: "June 9, 2026",
      eventLocation: "MemoirTale Event",
      eventAttendees: "Families & Friends",
      viewAll: "View All Photos",
      close: "Close",
      back: "← Back to Gallery",
      proTip: "💡 Pro tip: Use ← and → arrows to navigate",
      escTip: "Press Esc to close"
    },
    // Topics Section Items
    topicItems: [
      { title: 'Family Legacy', description: 'Celebrate generations of love, traditions, and cherished memories.' },
      { title: 'Personal Memoir', description: 'Capture a lifetime of experiences, lessons, and unforgettable moments.' },
      { title: 'Biography', description: 'Document a remarkable life with authenticity, depth, and purpose.' },
      { title: 'Travel Journal', description: 'Transform extraordinary journeys into beautifully crafted keepsakes.' },
      { title: 'Tribute & Memorial', description: 'Honor the life, legacy, and memories of someone deeply cherished.' },
      { title: 'Entrepreneur\'s Journey', description: 'Chronicle the vision, challenges, and milestones behind every success.' },
      { title: 'Corporate Legacy', description: 'Preserve the history, culture, and evolution of an organization.' },
      { title: 'Family History', description: 'Connect generations through stories that keep your heritage alive.' },
      { title: 'Wedding & Love Story', description: 'Celebrate the journey of love, commitment, and shared memories.' },
      { title: 'Military & Public Service', description: 'Recognize lives dedicated to courage, duty, and service.' },
      { title: 'Teacher\'s Legacy', description: 'Celebrate educators whose wisdom continues to inspire generations.' },
      { title: 'Historical & Community Stories', description: 'Preserve the people and events that have shaped communities and history.' }
    ],
    topicsFooter: "Whatever your journey, your story deserves to be preserved with the care, authenticity, and craftsmanship it deserves."
  },
  HI: {
    // Hero Section
    hero: {
      badge: "2024 से यादों को संजो रहे हैं",
      heading1: "अपने जीवन को बदलें",
      heading2: "एक कालजयी कृति में",
      subtitle: "हम आपकी सुनाई गई कहानियों, पुरानी तस्वीरों और कीमती यादों को खूबसूरत हस्तनिर्मित प्रीमियम संस्मरण पुस्तकों में बदलते हैं — पीढ़ियों के लिए एक कालजयी विरासत।",
      cta1: "अपना संस्मरण शुरू करें",
      cta2: "हमारा काम देखें",
      scroll: "स्क्रॉल करें"
    },
    // About Strip Section
    aboutStrip: {
      label: "हमारी कहानी",
      heading: "मेमोयर टेल की स्थापना 2023 में एक सरल विश्वास के साथ हुई थी:",
      headingItalic: "हर जीवन याद रखे जाने योग्य है।",
      para1: "एक गहरे व्यक्तिगत अनुभव से प्रेरित होकर, हमारे संस्थापक अभिनव शाक्य ने महसूस किया कि जहाँ समय आगे बढ़ता है, वहीं हमारे जीवन को आकार देने वाली कहानियाँ अक्सर अनकही रह जाती हैं। उसी अहसास ने उन कहानियों को उसी देखभाल, प्रामाणिकता और सम्मान के साथ सहेजने के मिशन को जन्म दिया जिसकी वे हकदार हैं।",
      para2: "आज, मेमोयर टेल खूबसूरत विरासत अनुभवों के माध्यम से व्यक्तियों, परिवारों और संगठनों को जीवन की सबसे सार्थक यात्राओं का जश्न मनाने में मदद करता है।",
      quote: "हर जीवन बताने योग्य एक कहानी है।",
      founderName: "अभिनव शाक्य",
      founderTitle: "संस्थापक और मुख्य कहानीकार"
    },
    // Marquee Section
    marquee: {
      heading: "पीढ़ियों की",
      headingItalic: "कहानियाँ",
      subtitle: "असाधारण उपलब्धियों से लेकर रोज़मर्रा के क्षणों तक, हर जीवन अपने पीछे सहेजने योग्य एक कहानी छोड़ जाता है। उन विविध यात्राओं को देखें जिन्हें हम कालजयी विरासतों में बदलने पर गर्व महसूस करते हैं।",
      by: "द्वारा"
    },
    // Topics Section
    topics: {
      label: "कहानी की श्रेणियां",
      heading: "हर जीवन की एक कहानी है जो सुनाने योग्य है",
      subtitle: "पारिवारिक विरासतों और व्यक्तिगत संस्मरणों से लेकर उद्यमशीलता यात्राओं और ऐतिहासिक मील के पत्थरों तक, हम उन कहानियों को सहेजते हैं जो पीढ़ियों तक याद रखने योग्य हैं।"
    },
    // Feature Icons Section
    features: {
      label: "उद्देश्य के साथ निर्मित",
      heading: "परिवार मेमोयर टेल को क्यों चुनते हैं",
      subtitle: "हर विरासत असाधारण देखभाल की हकदार है। विचारशील कहानी कहने और प्रीमियम शिल्प कौशल से लेकर सुरक्षित संरक्षण तक, हर विवरण एक ऐसी याद तैयार करने के लिए डिज़ाइन किया गया है जिसे पीढ़ियों तक संजोकर रखा जाएगा।",
      footer: "हर पृष्ठ उसी देखभाल और सम्मान के साथ तैयार किया गया है जिसकी आपकी कहानी हकदार है।"
    },
    // Event Section
    events: {
      label: "हमारे आयोजन",
      heading: "यादगार पलों की झलकियां",
      subtitle: "हमारे विशेष कार्यक्रमों और समारोहों से कुछ खूबसूरत पल जहां हम परिवारों को उनकी यादों को संजोने में मदद करते हैं",
      eventDate: "9 जून 2026",
      eventLocation: "मेमोयरटेल कार्यक्रम",
      eventAttendees: "परिवार और मित्र",
      viewAll: "सभी तस्वीरें देखें",
      close: "बंद करें",
      back: "← गैलरी पर वापस",
      proTip: "💡 सुझाव: बदलने के लिए ← और → कुंजियों का उपयोग करें",
      escTip: "Esc दबाएं बंद करने के लिए"
    },
    // Topics Section Items
    topicItems: [
      { title: 'पारिवारिक विरासत', description: 'प्रेम, परंपराओं और कीमती यादों की पीढ़ियों का जश्न मनाएं।' },
      { title: 'व्यक्तिगत संस्मरण', description: 'जीवन भर के अनुभवों, सीखों और अविस्मरणीय क्षणों को संजोएं।' },
      { title: 'जीवनी', description: 'एक उल्लेखनीय जीवन को प्रामाणिकता, गहराई और उद्देश्य के साथ दर्ज करें।' },
      { title: 'यात्रा पत्रिका', description: 'असाधारण यात्राओं को खूबसूरती से तैयार की गई यादों में बदलें।' },
      { title: 'श्रद्धांजलि और स्मारक', description: 'किसी गहरे प्यारे व्यक्ति के जीवन, विरासत और यादों को सम्मानित करें।' },
      { title: 'उद्यमी की यात्रा', description: 'हर सफलता के पीछे के विज़न, चुनौतियों और मील के पत्थरों को रिकॉर्ड करें।' },
      { title: 'कॉर्पोरेट विरासत', description: 'किसी संगठन के इतिहास, संस्कृति और विकास को सुरक्षित रखें।' },
      { title: 'पारिवारिक इतिहास', description: 'अपनी विरासत को जीवित रखने वाली कहानियों के माध्यम से पीढ़ियों को जोड़ें।' },
      { title: 'विवाह और प्रेम कहानी', description: 'प्रेम, प्रतिबद्धता और साझा यादों की यात्रा का जश्न मनाएं।' },
      { title: 'सैन्य और सार्वजनिक सेवा', description: 'साहस, कर्तव्य और सेवा के लिए समर्पित जीवन को पहचानें।' },
      { title: 'शिक्षक की विरासत', description: 'उन शिक्षकों का जश्न मनाएं जिनका ज्ञान पीढ़ियों को प्रेरित करता रहता है।' },
      { title: 'ऐतिहासिक और सामुदायिक कहानियां', description: 'उन लोगों और घटनाओं को सुरक्षित रखें जिन्होंने समुदायों और इतिहास को आकार दिया है।' }
    ],
    topicsFooter: "आपकी यात्रा चाहे जो भी हो, आपकी कहानी उस देखभाल, प्रामाणिकता और शिल्प कौशल के साथ सहेजे जाने की हकदार है जिसकी वह हकदार है।"
  }
};
