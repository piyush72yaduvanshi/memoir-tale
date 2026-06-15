// Memoir Tale - Content Data Store

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
  category: 'process' | 'shipping' | 'privacy' | 'general';
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
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500", // editorial book reading
    title: "Elegantly Crafted Hardcover",
    type: "Book Showcase",
    span: "col-span-1 md:col-span-2"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=500", // warm library stack
    title: "Preserving Wisdom on Shelves",
    type: "Archival"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=500", // premium gold foil book covers
    title: "Exquisite Print Quality",
    type: "Craftsmanship"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=500", // reading older person hands
    title: "Stories Held Dearly",
    type: "Emotional Legacy",
    span: "col-span-1 md:col-span-2"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=500", // book leather back
    title: "Custom Binding Artistry",
    type: "Design"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=500", // elder storytelling
    title: "The Golden Era Narratives",
    type: "Interviews"
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1553060146-71667aa3f223?auto=format&fit=crop&q=80&w=500", // open vintage book
    title: "Timeless Keepsake Details",
    type: "Heirloom"
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1518375246755-cf6c8e30a629?auto=format&fit=crop&q=80&w=500", // happy senior laughter
    title: "Honoring Indian Seniors",
    type: "Family Smiles"
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

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "How does the interview and memory gathering process work?",
    answer: "Our process is designed to be gentle and completely stress-free. After an initial consultation, one of our compassionate, professional human biographers will conduct a series of virtual or in-person conversational interviews (usually 3 to 6 sessions). We ask simple, evoking questions about your earliest memories, family lore, and life milestones.",
    category: 'process'
  },
  {
    id: 2,
    question: "What materials can we include in the book?",
    answer: "You can include almost any physical or digital item that holds meaning. This includes classic photographs, scans of handwritten letters, family recipes, journal snippets, diplomas, lineage documents, and newspaper clippings. Our team handles high-resolution digital restoration of faded or creased snapshots.",
    category: 'process'
  },
  {
    id: 3,
    question: "How long does the entire process take?",
    answer: "Typically 8–12 weeks from your first interview call to the physical book delivery, depending on the volume of revisions and the package chosen.",
    category: 'process'
  },
  {
    id: 4,
    question: "Do you deliver outside my city?",
    answer: "Absolutely! We provide premium, insured nationwide delivery across India. International shipping and distribution can also be arranged on request.",
    category: 'shipping'
  },
  {
    id: 5,
    question: "Can I order extra copies of my book?",
    answer: "Yes, you can order additional archival copies of your memoir book anytime, both during initial production or months later, at a special discounted pricing of ₹2,999 per copy.",
    category: 'shipping'
  },
  {
    id: 6,
    question: "Is my personal information and family stories kept confidential?",
    answer: "Absolutely. We treat your family memories with the highest level of confidentiality and respect. All interviews, photos, and materials are stored securely with end-to-end encryption. We never share your content with third parties, and you retain full ownership of your story.",
    category: 'privacy'
  }
];

// Aesthetic mock book covers with Indian memoir motifs for our custom carousel
export const BOOK_COVERS = [
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
    id: 'expert-editors',
    title: 'Expert Human Editors',
    description: 'Our literary biographers hold advanced degrees and handle each memory with profound sensitivity.',
    iconName: 'Users'
  },
  {
    id: 'layout-design',
    title: 'Professional Layout Design',
    description: 'Classic book typography crafted with deliberate margins to respect the natural rhythm of reading.',
    iconName: 'Layout'
  },
  {
    id: 'archival-printing',
    title: 'Archival-Grade Printing',
    description: 'Acid-free German paper and heavy canvas covers designed to last over 300 years without yellowing.',
    iconName: 'Award'
  },
  {
    id: 'photo-restoration',
    title: 'Photo Restoration',
    description: 'We manually remove dust scratches, balance contrast, and color-correct old family photographs.',
    iconName: 'Sparkles'
  },
  {
    id: 'audiobook-version',
    title: 'Audiobook Version',
    description: 'Exquisite ambient companion track so you can listen along or enjoy on late-night evenings.',
    iconName: 'Volume2'
  },
  {
    id: 'custom-cover',
    title: 'Custom Cover Design',
    description: 'Bespoke designs featuring linen textures, gilded gold foil stamping, and personalized monograms.',
    iconName: 'Palette'
  },
  {
    id: 'family-maps',
    title: 'GPS-Tagged Family Maps',
    description: 'Custom maps embedded within pages documenting the geographic migration of your ancestors.',
    iconName: 'MapPin'
  },
  {
    id: 'multilingual-support',
    title: 'Multilingual Support',
    description: 'Our team writes, translates, and edits beautifully in several major languages to unite diverse generations.',
    iconName: 'Languages'
  },
  {
    id: 'express-delivery',
    title: 'Express Delivery Option',
    description: 'Accelerated layout and binding processes for milestone birthdays or urgent memorial services.',
    iconName: 'Truck'
  },
  {
    id: 'digital-combo',
    title: 'Digital + Print Combo',
    description: 'Access an elegant, interactive digital storybook website accessible via a secure link or QR code.',
    iconName: 'Laptop'
  },
  {
    id: 'secure-vault',
    title: 'Password-Protected Copy',
    description: 'Top-tier cloud security and end-to-end encryption ensure your family journals stay strictly private.',
    iconName: 'Lock'
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
  name: 'Devendra Nath Prasad',
  title: 'Founder & Chief Storyteller',
  quote: '"We are not a publishing company. We are guardians of human warmth. Every life contains a literary masterpiece, waiting to be bound, touched, and passed down. We ensure that what was loved is never truly lost."',
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
      heading: "Born from a desire to preserve what",
      headingItalic: "matters most",
      para1: "MemoirTale arose from a deeply personal realization. When Devendra Nath lost his grand-uncle Rameshwar, he searched for journals, photographs, and records, only to find scraps. The rich, historic Bundelkhand telegraph chronicles Rameshwar often told were lost to gravity, surviving only as fading oral fragments. To ensure no other family goes through this quiet erasure, MemoirTale was established.",
      quote: "We are not a publishing company. We are guardians of human warmth. Every life contains a literary masterpiece, waiting to be bound, touched, and passed down. We ensure that what was loved is never truly lost.",
      founderName: "Devendra Nath Prasad",
      founderTitle: "Founder & Chief Storyteller"
    },
    // Marquee Section
    marquee: {
      heading: "Stories Across",
      headingItalic: "Generations",
      subtitle: "Every book tells a unique story, preserving memories for future generations",
      by: "by"
    },
    // Topics Section
    topics: {
      label: "Story Types We Craft",
      heading: "Every Life Has a Story Worth Telling",
      subtitle: "From freedom fighters to entrepreneurs, we help preserve every unique journey"
    },
    // Feature Icons Section
    features: {
      label: "Pure Craftsmanship",
      heading: "What Makes Every MemoirTale Book Special",
      subtitle: "From historical research to acid-free binding materials, we marry classical print principles with cutting-edge technology to immortalize your memories for five generations."
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
      { title: 'Freedom Fighter Legacy', description: 'Preserve the story of India\'s independence heroes' },
      { title: 'Immigrant Journey', description: 'Document the journey across borders and cultures' },
      { title: 'Business Empire Story', description: 'Chronicle the path from startup to success' },
      { title: 'Partition Memories', description: 'Record the stories of 1947 and resilience' },
      { title: 'Love & Marriage Chronicle', description: 'Celebrate a lifetime of love and partnership' },
      { title: 'Village to City Migration', description: 'The journey from rural roots to urban dreams' },
      { title: 'Military Service Memoir', description: 'Honor the sacrifice and service to the nation' },
      { title: 'Teacher\'s Wisdom Book', description: 'Share decades of knowledge and inspiration' },
      { title: 'Entrepreneur\'s Journey', description: 'Document the risks, failures, and triumphs' },
      { title: 'Family Tree Legacy', description: 'Connect generations through shared history' }
    ],
    topicsFooter: "Don't see your story type? We craft custom memoirs for every unique journey.",
    // Portfolio Section
    portfolio: {
      label: "PORTFOLIO",
      heading: "Stories We've Helped",
      headingItalic: "Tell",
      subtitle: "Click on any volume below to open our immersive storybook interactive reader and experience the literary depth and formatting of a finished MemoirTale chapter.",
      readExcerpt: "Read Story Excerpt",
      clickToOpen: "Click to Open",
      customBind: "Custom Bind",
      bookCta: "Book Your Autobiography",
      modalChronicle: "A MemoirTale Chronicle",
      modalLifeArchives: "The life archives of",
      modalCommission: "Commission My Book",
      stories: [
        {
          title: 'The Whispering Pines of Jhansi',
          subject: 'Rameshwar Nath Prasad',
          year: '2024 Release',
          excerpt: 'A brilliant account of an ambitious student finding his purpose in pre-independence UP, setting up a telegraph line across small villages.',
          pageCount: '194 Pages'
        },
        {
          title: 'Threads of the Silk Loom',
          subject: 'Anjali Deshmukh',
          year: '2025 Release',
          excerpt: 'Three generations of silk weavers preserved in an epic tapestry of heirloom stories, color dye recipes, and family letters.',
          pageCount: '240 Pages'
        },
        {
          title: "The Navigator's Hourglass",
          subject: 'Capt. Hector Sterling',
          year: '2024 Release',
          excerpt: "A sea captain's journals recounting ocean voyages, high-seas squalls, and the tranquil starlight of the Southern Hemisphere.",
          pageCount: '312 Pages'
        },
        {
          title: 'Echoes from the Railway Quarters',
          subject: 'Balwant Singh Rathore',
          year: '2025 Release',
          excerpt: 'A railwayman\'s memoir spanning four decades of service, documenting the evolution of Indian Railways and countless journeys across the subcontinent.',
          pageCount: '256 Pages'
        },
        {
          title: 'The Herbalist\'s Daughter',
          subject: 'Dr. Meera Kulkarni',
          year: '2024 Release',
          excerpt: 'From traditional Ayurvedic remedies to modern medicine, a pioneering woman doctor\'s journey breaking barriers in rural Maharashtra.',
          pageCount: '218 Pages'
        },
        {
          title: 'Letters from the Himalayan Outpost',
          subject: 'Col. Rajendra Thapa',
          year: '2025 Release',
          excerpt: 'A decorated army officer\'s chronicles from the highest military posts, blending duty with deep spiritual reflection in the mountain solitude.',
          pageCount: '289 Pages'
        }
      ]
    }
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
      heading: "उन चीजों को संरक्षित करने की इच्छा से जन्मा जो",
      headingItalic: "सबसे महत्वपूर्ण हैं",
      para1: "मेमोयरटेल एक गहरे व्यक्तिगत एहसास से उत्पन्न हुआ। जब देवेंद्र नाथ ने अपने परदादा रामेश्वर को खो दिया, तो उन्होंने पत्रिकाओं, तस्वीरों और रिकॉर्ड की खोज की, केवल टुकड़े ही मिले। बुंदेलखंड के समृद्ध, ऐतिहासिक टेलीग्राफ इतिहास जो रामेश्वर अक्सर सुनाते थे, वे गुरुत्वाकर्षण में खो गए, केवल मौखिक टुकड़ों के रूप में बचे रहे। यह सुनिश्चित करने के लिए कि कोई अन्य परिवार इस शांत मिटने से न गुजरे, मेमोयरटेल की स्थापना की गई।",
      quote: "हम एक प्रकाशन कंपनी नहीं हैं। हम मानवीय गर्मजोशी के संरक्षक हैं। हर जीवन में एक साहित्यिक कृति है, जो बंधी हुई, छुई हुई और पीढ़ियों तक पहुंचाई जाने के लिए प्रतीक्षारत है। हम सुनिश्चित करते हैं कि जो प्यार किया गया था वह कभी सच में खोया नहीं है।",
      founderName: "देवेंद्र नाथ प्रसाद",
      founderTitle: "संस्थापक और मुख्य कहानीकार"
    },
    // Marquee Section
    marquee: {
      heading: "पीढ़ियों की",
      headingItalic: "कहानियाँ",
      subtitle: "हर पुस्तक एक अनोखी कहानी बयां करती है, भविष्य की पीढ़ियों के लिए यादों को संरक्षित करती है",
      by: "द्वारा"
    },
    // Topics Section
    topics: {
      label: "हम किस प्रकार की कहानियां तैयार करते हैं",
      heading: "हर जीवन की एक कहानी है जो सुनाने योग्य है",
      subtitle: "स्वतंत्रता सेनानियों से लेकर उद्यमियों तक, हम हर अनोखी यात्रा को संरक्षित करने में मदद करते हैं"
    },
    // Feature Icons Section
    features: {
      label: "शुद्ध शिल्प कौशल",
      heading: "हर मेमोयरटेल पुस्तक को विशेष क्या बनाता है",
      subtitle: "ऐतिहासिक शोध से लेकर एसिड-फ्री बाइंडिंग सामग्री तक, हम पांच पीढ़ियों के लिए आपकी यादों को अमर बनाने के लिए शास्त्रीय प्रिंट सिद्धांतों को अत्याधुनिक तकनीक के साथ जोड़ते हैं।"
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
      { title: 'स्वतंत्रता सेनानी की विरासत', description: 'भारत के स्वतंत्रता नायकों की कहानी संजोएं' },
      { title: 'प्रवासी यात्रा', description: 'सीमाओं और संस्कृतियों की यात्रा का दस्तावेज़ीकरण' },
      { title: 'व्यावसायिक साम्राज्य की कहानी', description: 'स्टार्टअप से सफलता तक का सफर' },
      { title: 'विभाजन की यादें', description: '1947 की कहानियों और लचीलेपन का रिकॉर्ड' },
      { title: 'प्रेम और विवाह की गाथा', description: 'प्यार और साझेदारी के जीवन का जश्न मनाएं' },
      { title: 'गांव से शहर का प्रवास', description: 'ग्रामीण जड़ों से शहरी सपनों की यात्रा' },
      { title: 'सैन्य सेवा संस्मरण', description: 'राष्ट्र की सेवा और बलिदान का सम्मान करें' },
      { title: 'शिक्षक की ज्ञान पुस्तक', description: 'दशकों का ज्ञान और प्रेरणा साझा करें' },
      { title: 'उद्यमी की यात्रा', description: 'जोखिम, असफलताओं और विजय का दस्तावेज़ीकरण' },
      { title: 'पारिवारिक वृक्ष की विरासत', description: 'साझा इतिहास के माध्यम से पीढ़ियों को जोड़ें' }
    ],
    topicsFooter: "अपनी कहानी का प्रकार नहीं दिखा? हम हर अनोखी यात्रा के लिए कस्टम संस्मरण तैयार करते हैं।",
    // Portfolio Section
    portfolio: {
      label: "पोर्टफोलियो",
      heading: "जो कहानियाँ हमने बताने में मदद की",
      headingItalic: "",
      subtitle: "हमारे इमर्सिव स्टोरीबुक इंटरैक्टिव रीडर को खोलने और एक समाप्त मेमोयरटेल अध्याय की साहित्यिक गहराई का अनुभव करने के लिए नीचे किसी भी वॉल्यूम पर क्लिक करें।",
      readExcerpt: "कहानी का अंश पढ़ें",
      clickToOpen: "खोलने के लिए क्लिक करें",
      customBind: "कस्टम बाइंड",
      bookCta: "अपनी आत्मकथा बुक करें",
      modalChronicle: "एक मेमोयरटेल क्रॉनिकल",
      modalLifeArchives: "के जीवन अभिलेख",
      modalCommission: "मेरी पुस्तक कमीशन करें",
      stories: [
        {
          title: 'झांसी के फुसफुसाते पाइंस',
          subject: 'रामेश्वर नाथ प्रसाद',
          year: '2024 रिलीज',
          excerpt: 'स्वतंत्रता-पूर्व यूपी में अपने उद्देश्य को खोजते एक महत्वाकांक्षी छात्र का शानदार विवरण, जो छोटे गांवों में टेलीग्राफ लाइन स्थापित कर रहा था।',
          pageCount: '194 पृष्ठ'
        },
        {
          title: 'रेशम करघे के धागे',
          subject: 'अंजलि देशमुख',
          year: '2025 रिलीज',
          excerpt: 'रेशम बुनकरों की तीन पीढ़ियां विरासती कहानियों, रंग रसायन व्यंजनों और पारिवारिक पत्रों की एक महाकाव्य टेपेस्ट्री में संरक्षित।',
          pageCount: '240 पृष्ठ'
        },
        {
          title: 'नाविक की रेतघड़ी',
          subject: 'कैप्टन हेक्टर स्टर्लिंग',
          year: '2024 रिलीज',
          excerpt: 'एक समुद्री कप्तान की पत्रिकाएं जो महासागर यात्राओं, उच्च-समुद्र तूफानों और दक्षिणी गोलार्ध की शांत तारों की रोशनी का वर्णन करती हैं।',
          pageCount: '312 पृष्ठ'
        },
        {
          title: 'रेलवे क्वार्टर से गूंज',
          subject: 'बलवंत सिंह राठौर',
          year: '2025 रिलीज',
          excerpt: 'चार दशकों की सेवा का एक रेलवे कर्मचारी का संस्मरण, भारतीय रेलवे के विकास और उपमहाद्वीप में अनगिनत यात्राओं का दस्तावेजीकरण।',
          pageCount: '256 पृष्ठ'
        },
        {
          title: 'हर्बलिस्ट की बेटी',
          subject: 'डॉ. मीरा कुलकर्णी',
          year: '2024 रिलीज',
          excerpt: 'पारंपरिक आयुर्वेदिक उपचार से आधुनिक चिकित्सा तक, ग्रामीण महाराष्ट्र में बाधाओं को तोड़ती एक अग्रणी महिला डॉक्टर की यात्रा।',
          pageCount: '218 पृष्ठ'
        },
        {
          title: 'हिमालयी चौकी से पत्र',
          subject: 'कर्नल राजेंद्र थापा',
          year: '2025 रिलीज',
          excerpt: 'एक सजाए गए सेना अधिकारी का उच्चतम सैन्य चौकियों से वृत्तांत, पहाड़ी एकांत में कर्तव्य को गहन आध्यात्मिक चिंतन के साथ मिश्रित करते हुए।',
          pageCount: '289 पृष्ठ'
        }
      ]
    }
  }
};
