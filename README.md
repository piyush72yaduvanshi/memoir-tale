# 📖 MemoirTale - Life Story Publishing Platform

A beautiful, modern web application for preserving life stories and creating legacy books. Built with React, TypeScript, Vite, and Tailwind CSS with a stunning purple-violet theme.

## ✨ Features

### Core Functionality
- **Interactive Writer Matchmaker** - 3-step quiz to match users with perfect biography writers
- **Scrolling Book Showcase** - Elegant marquee sections displaying published memoirs
- **Story Topics Grid** - 10+ life story categories from Freedom Fighters to Entrepreneurs
- **Animated Statistics** - Count-up animations showing 500+ books published and 4.9★ ratings
- **Portfolio Gallery** - Showcase of published memoir books
- **Multi-language Support** - English & Hindi with Hinglish support

### UI/UX Excellence
- **Dark/Light Mode Toggle** - Seamless theme switching with purple-violet palette
- **Smooth Scroll Animations** - Framer Motion powered transitions
- **Responsive Design** - Mobile-first approach, works on all devices
- **Purple-Violet Theme** - Consistent color palette throughout:
  - Primary: `#8B5CF6` (violet)
  - Dark: `#7C3AED` (deep purple)
  - Light: `#A78BFA` (lavender)
  - Backgrounds: `#2D1B36`, `#3A2447`, `#1A0E24`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd memoir-tale

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run on `http://localhost:3000/`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
memoir-tale/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation with dark mode toggle
│   │   ├── Hero.tsx                # Hero section with CTAs
│   │   ├── MarqueeSection.tsx      # Scrolling book covers
│   │   ├── WriterMatchmaker.tsx    # Interactive quiz tool
│   │   ├── TopicsSection.tsx       # Story type categories
│   │   ├── TrustStatsStrip.tsx     # Animated statistics
│   │   ├── HowItWorksSection.tsx   # Process explanation
│   │   ├── ServicesSection.tsx     # Pricing packages
│   │   ├── GallerySection.tsx      # Portfolio showcase
│   │   ├── TestimonialsSection.tsx # Client reviews
│   │   ├── ContactSection.tsx      # Inquiry form
│   │   ├── FAQSection.tsx          # Questions & Answers
│   │   └── FooterSection.tsx       # Footer with links
│   ├── context/
│   │   └── LanguageContext.tsx     # i18n support
│   ├── lib/
│   │   └── firebase.ts             # Firebase configuration
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles & animations
├── public/
├── index.html
├── vite.config.ts
├── tailwindcss.config.js
└── package.json
```

## 🎨 Color Palette

### Deep Purple-Maroon with White Accents
- **Primary Purple**: `#2D1B36` - Main background
- **Card Purple**: `#3A2447` - Card backgrounds
- **Hover Purple**: `#4A2D5E` - Interactive states
- **Deepest Dark**: `#1B101E` - Navbar, footer
- **Accent White**: `#FFFFFF` - Buttons, icons, text
- **Light Cream**: `#FAF7F0` - Light sections

### Dark Mode
- Body: `bg-[#2D1B36] text-white`
- Navbar: `bg-[#1B101E]/95`
- Cards: `bg-[#3A2447]`
- Borders: `border-white/12`
- Buttons: `bg-white text-[#2D1B36]`

### Light Mode
- Body: `bg-[#faf7f0] text-[#2D1B36]`
- Navbar: `bg-white/95`
- Cards: `bg-white border-[#2D1B36]/10`
- Accents: `text-[#2D1B36]`
- Buttons: `bg-[#2D1B36] text-white`

## 🛠️ Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 6** - Build tool & dev server
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Animations
- **Lucide React** - Icon library
- **Firebase** - Backend (Firestore, Auth)
- **jsPDF** - PDF generation for admin

## 📝 Key Components

### WriterMatchmaker
Interactive 3-step form to match users with writers based on:
1. Story genre (Family, Business, Freedom Fighter, etc.)
2. Language preference (English, Hindi, Hinglish, Regional)
3. Tone (Formal, Warm, Historical, Poetic)

### MarqueeSection
Infinite scrolling showcase of book covers:
- Two rows (left-to-right, right-to-left)
- Pause on hover
- Smooth 40s loop animation

### TrustStatsStrip
Animated statistics with IntersectionObserver:
- Count-up animation on scroll
- 500+ Books, 12+ Countries, 4.9★ Rating
- Easing effect for smooth transitions

## 🌐 Multi-language Support

The app supports:
- **English** (EN)
- **Hindi** (HI)
- Content managed via `LanguageContext`

## 🔥 Firebase Integration

Configuration in `src/lib/firebase.ts`:
- **Firestore** - Store inquiries and user data
- **Auth** - Admin authentication
- **Security Rules** - Defined in `firestore.rules`

## 📦 Scripts

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎯 Features in Detail

### Dark Mode Toggle
- Sun icon in dark mode, Moon icon in light mode
- Persistent across page navigation
- Smooth transitions with CSS

### Responsive Navigation
- Desktop: Full menu with dropdowns
- Mobile: Hamburger menu with slide-out panel
- Language switcher (EN/हिन्दी)

### Smooth Scrolling
- Click navigation items → smooth scroll to section
- Section IDs: `#about`, `#how-it-works`, `#services`, `#gallery`, `#contact`

### Form Handling
- Contact form with Firebase Firestore integration
- Field validation
- Success/error states
- File upload support

## 🚧 Development Notes

### Adding New Components
1. Create component in `src/components/`
2. Import in `App.tsx`
3. Add section ID for scroll navigation
4. Ensure dark mode compatibility

### Color Consistency
Always use the purple-violet palette:
- Primary actions: `bg-[#8B5CF6]`
- Hover states: `hover:bg-[#7C3AED]`
- Text accents: `text-[#A78BFA]`
- Borders: `border-[#8B5CF6]/30`

### Animation Guidelines
- Use `motion` from Framer Motion
- Fade-in on scroll: `whileInView={{ opacity: [0, 1] }}`
- Duration: 0.6s recommended
- `viewport={{ once: true }}` for performance

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For contributions, please contact the project maintainer.

## 📧 Contact

For inquiries about the MemoirTale platform or custom memoir projects:
- Phone: 9889011174
- Location: Bundelkhand University, Jhansi, UP

---

**Built with 💜 using React, TypeScript, and Tailwind CSS**
