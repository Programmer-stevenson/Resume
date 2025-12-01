# Brandon Stevenson - Interactive Resume

A modern, interactive portfolio website built with React, TypeScript, Framer Motion, and Tailwind CSS. Features a stunning 3D Saturn background using Three.js and smooth animations throughout.

## 🚀 Technologies Used

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D Graphics
- **Lucide React** - Icons

## 🎨 Features

- Responsive design for all devices
- Interactive 3D Saturn background in hero section
- Smooth scroll animations with Framer Motion
- Typewriter effect for hero text
- Aurora/Borealis background effects
- Timeline-based experience section
- Certification roadmap visualization
- Project slideshow carousel
- Mobile-friendly navigation with hamburger menu
- Progress bar for scroll position

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navigation.tsx      # Navbar with mobile menu
│   ├── Hero.tsx           # Hero section with typewriter
│   ├── SaturnBackground.tsx # Three.js Saturn animation
│   ├── Introduction.tsx   # Role cards section
│   ├── About.tsx          # About section with typing effect
│   ├── Projects.tsx       # Project slideshow
│   ├── Experience.tsx     # Timeline experience
│   ├── Education.tsx      # Education & certifications
│   ├── Skills.tsx         # Skills grid
│   ├── Contact.tsx        # Contact information
│   └── Footer.tsx         # Footer
├── index.css              # Global styles & Tailwind
├── App.tsx                # Main app component
└── main.tsx               # Entry point
```

## 🎯 Color Palette

- **Primary**: Teal (#14b8a6)
- **Secondary**: Cyan (#06b6d4)
- **Accent**: Blue (#3b82f6)
- **Purple**: (#8b5cf6)
- **Background**: Dark grays (#000814, #001d3d)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Development

```bash
# Run development server
npm run dev

# Type checking
npx tsc --noEmit

# Lint
npm run lint
```

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

---

Built with ❤️ by Brandon Stevenson
