# 🚀 SpaceUp CUSAT — Official Web Platform

> **SpaceUp CUSAT** is a retro pixel-art space-themed web application built for **SEDS CUSAT** (Students for the Exploration and Development of Space - CUSAT Chapter at Cochin University of Science and Technology). Designed for high visual impact, smooth scroll-driven animations, rich interactivity, and an embedded 60FPS space arcade shooter.

---

## 📸 Tech Stack & Badges

![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-6.0.0-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)
![License](https://img.shields.io/badge/License-SEDS_CUSAT-gold)

---

## ✨ Features Overview

### 🎨 Retro Space Aesthetics & Animations
- **Custom Space Cursor** ([CustomCursor.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/CustomCursor.jsx)): Canvas-driven crosshair cursor with animated star particle trails and element hover detection.
- **Twinkling Starfield & Meteors** ([StarField.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/StarField.jsx)): Dynamic canvas background with twinkling stars and passing shooting stars.
- **Parallax Hero** ([Hero.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/Hero.jsx)): Layered Saturn planet, moon, and terrain responding smoothly to mouse movement.
- **TEDxCUSAT-Style Scroll Reveal** ([ScrollReveal.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/ScrollReveal.jsx)): `IntersectionObserver`-powered reveal animations for smooth entrance transitions.
- **Terminal Boot Loading Screen** ([LoadingScreen.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/LoadingScreen.jsx)): Retro CLI boot sequence with progress bar.
- **Marquee Ticker** ([MarqueeStrip.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/MarqueeStrip.jsx)): Infinite scrolling keyword strip.

### 📑 Content & Placeholder Architecture
All sections preserve their grid layouts, containers, and card structures so spacing remains flawless while upcoming event details can be populated:
- **About Mission** ([About.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/About.jsx)): Mission overview, animated stats, and feature cards.
- **Crew Manifest (Speakers)** ([Speakers.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/Speakers.jsx)): 3D flip cards with neon avatar badges (`SP1`–`SP6`) and placeholder speaker details.
- **Flight Plan (Schedule)** ([Schedule.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/Schedule.jsx)): Tabbed days (`DAY 01 (DATE TBA)`, `DAY 02 (DATE TBA)`) with expandable timeline entries.
- **Launch Partners (Sponsors)** ([Sponsors.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/Sponsors.jsx)): Platinum, Gold, and Silver tier cards with scanline hover effects.
- **Comms & Telemetry** ([Footer.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/Footer.jsx)): Chapter contacts (`seds@cusat.ac.in`) and CUSAT campus telemetry coordinates (`10.0435° N, 76.3242° E`).

### 🕹️ Space Arcade Mini-Game ([ArcadeGame.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/ArcadeGame.jsx))
- **Ref-Backed 60FPS Game Engine**: Uses mutable `useRef` state to eliminate React closure races during high-frame-rate execution.
- **Controls**: Arrow Keys, WASD, Spacebar, touch drag tracking for mobile, and on-screen D-Pad buttons.
- **Mechanics**: Dual auto-firing cyan lasers, randomized asteroid polygon generation, particle explosions, progressive difficulty scaling, and `localStorage` high score saving.

---

## 📁 Directory & Code Walkthrough

```
SEDS-SpaceUp/
├── public/
│   └── favicon.svg           # Space rocket SVG favicon
├── src/
│   ├── components/           # Component modular library
│   │   ├── About.jsx         # Mission brief terminal & stats
│   │   ├── About.css         # About section styling
│   │   ├── ArcadeGame.jsx    # Ref-backed space arcade shooter
│   │   ├── ArcadeGame.css    # Arcade CRT screen & D-Pad styles
│   │   ├── CustomCursor.jsx  # Particle trail crosshair cursor
│   │   ├── CustomCursor.css  # Cursor styles
│   │   ├── Footer.jsx        # Telemetry & contact footer
│   │   ├── Footer.css        # Footer styles
│   │   ├── Hero.jsx          # Parallax layers & launch info
│   │   ├── Hero.css          # Hero styles & Saturn CSS art
│   │   ├── LoadingScreen.jsx # Retro CLI loading animation
│   │   ├── LoadingScreen.css # Terminal loader styling
│   │   ├── MarqueeStrip.jsx  # Infinite scrolling ticker band
│   │   ├── MarqueeStrip.css  # Marquee track styling
│   │   ├── Navbar.jsx        # Fixed glassmorphism nav & signal monitor
│   │   ├── Navbar.css        # Navbar & mobile menu drawer styles
│   │   ├── Schedule.jsx      # Interactive timeline & day switcher
│   │   ├── Schedule.css      # Timeline styling
│   │   ├── ScrollReveal.jsx  # Scroll-triggered entrance wrapper
│   │   ├── Speakers.jsx      # 3D card flip crew manifest
│   │   ├── Speakers.css      # Speaker card flip styles
│   │   ├── Sponsors.jsx      # Tiered sponsors & registration CTA
│   │   ├── Sponsors.css      # Sponsor card styles
│   │   ├── StarField.jsx     # Canvas twinkling stars background
│   │   └── StarField.css     # Canvas background layout
│   ├── App.jsx               # Application root & section layout
│   ├── main.jsx              # React DOM render entry point
│   └── index.css             # CSS design system (tokens, fonts, utilities)
├── index.html                # Entry HTML with meta tags & Google Fonts
├── package.json              # Project dependencies & scripts
└── vite.config.js            # Vite build configuration (Port 3000)
```

---

## 🛠️ Getting Started & Local Setup

### Prerequisites
Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your machine.

### 1. Clone & Install Dependencies
```bash
# Clone repository
git clone <repository-url>
cd SEDS-SpaceUp

# Install dependencies
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will launch automatically at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized production build in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🛠️ Guide for Coworkers & Future Updates

### Updating Placeholder Content
When event dates, venue details, speaker profiles, or sponsors are finalized, update the following data files:

1. **Dates & Venue**:
   - Edit [Hero.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/Hero.jsx): Update `hero-info` text and target timestamp in the `useEffect` countdown.
   - Edit [Sponsors.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/Sponsors.jsx): Update `register-details` text.

2. **Speaker Manifest**:
   - Edit [Speakers.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/Speakers.jsx): Update the `speakers` array with speaker names, titles, bios, topics, and color accents.

3. **Schedule / Timeline**:
   - Edit [Schedule.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/Schedule.jsx): Modify the `scheduleData` object to update times, session titles, event types, and descriptions.

4. **Sponsor Logos**:
   - Edit [Sponsors.jsx](file:///c:/Users/hp/Desktop/SEDS/SpaceUp/SEDS-SpaceUp/src/components/Sponsors.jsx): Replace placeholder names in `sponsorTiers` with company names or image paths.

5. **Connecting Backend Registrations**:
   - The registration action buttons are pre-configured with unique element IDs:
     - `#hero-register-btn` (Hero section)
     - `#main-register-btn` (Sponsors/Registration CTA)
     - `#propose-session-btn` (Speakers section)
     - `#become-sponsor-btn` (Sponsors CTA)
   - Connect modal triggers or API submission handlers to these IDs in React state or custom event handlers.

---

## 🎨 Design Tokens (`src/index.css`)

- `--color-space-black`: `#07080f` (Primary deep space background)
- `--color-accent-gold`: `#e8a04c` (Primary brand accent)
- `--color-accent-cyan`: `#4ecdc4` (Secondary cyber accent)
- `--color-accent-orange`: `#ff6b35` (Warning / Highlight accent)
- `--font-pixel`: `'Press Start 2P', monospace`
- `--font-mono`: `'Share Tech Mono', monospace`
- `--font-display`: `'Orbitron', sans-serif`
- `--font-body`: `'Inter', sans-serif`

---

## 🤝 Contributing & License

Developed with ❤️ by the **SEDS CUSAT Technical Team** for **SpaceUp CUSAT**.
