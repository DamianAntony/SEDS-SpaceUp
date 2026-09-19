import { useState } from 'react'
import CustomCursor from './components/CustomCursor.jsx'
import StarField from './components/StarField.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Speakers from './components/Speakers.jsx'
import Schedule from './components/Schedule.jsx'
import Sponsors from './components/Sponsors.jsx'
import ArcadeGamePage from './components/ArcadeGamePage.jsx'
import Footer from './components/Footer.jsx'
import ScrollReveal from './components/ScrollReveal.jsx'
import MarqueeStrip from './components/MarqueeStrip.jsx'

function App() {
  const [viewMode, setViewMode] = useState('home') // 'home' | 'arcade'

  return (
    <>
      <CustomCursor />
      <div className="crt-overlay" />
      <StarField />
      <Navbar onOpenArcade={() => setViewMode('arcade')} />

      {viewMode === 'arcade' ? (
        <ArcadeGamePage onBack={() => setViewMode('home')} />
      ) : (
        <main>
          <Hero onOpenArcade={() => setViewMode('arcade')} />
          <MarqueeStrip />
          <ScrollReveal>
            <About />
          </ScrollReveal>
          <ScrollReveal>
            <Speakers />
          </ScrollReveal>
          <ScrollReveal>
            <Schedule />
          </ScrollReveal>
          <ScrollReveal>
            <Sponsors />
          </ScrollReveal>
        </main>
      )}

      <Footer />
    </>
  )
}

export default App
