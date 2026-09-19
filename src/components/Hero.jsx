import { useEffect, useState } from 'react'
import './Hero.css'

import nebulaBg from '../assets/hero/nebula.png'
import starsBg from '../assets/hero/stars_clean.png'
import saturnImg from '../assets/hero/saturn_clean.png'
import moonImg from '../assets/hero/moon_clean.png'
import astronautImg from '../assets/hero/astronaut.png'
import terrainImg from '../assets/hero/terrain_clean.png'

export default function Hero({ onOpenArcade }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const scrollToRegister = () => {
    const el = document.getElementById('register')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      {/* 16-Bit Retro Layered Background */}
      <div className="hero-layers-container">
        {/* Layer 1: Nebula sky */}
        <div
          className="hero-layer hero-layer-nebula"
          style={{ backgroundImage: `url(${nebulaBg})` }}
        />

        {/* Layer 2: Sparkling Stars */}
        <div
          className="hero-layer hero-layer-stars"
          style={{ backgroundImage: `url(${starsBg})` }}
        />

        {/* Layer 3: Saturn Planet + Moon (Anchored relative to Saturn) */}
        <div
          className="hero-saturn-moon-wrapper"
          style={{
            transform: `translate(calc(-50% + ${mousePos.x * -10}px), ${mousePos.y * -6}px)`,
          }}
        >
          <img src={saturnImg} alt="Saturn Planet" className="saturn-image" />
          <img src={moonImg} alt="Moon" className="moon-image" />
        </div>

        {/* Layer 4: Zero-G Floating Astronaut */}
        <div
          className="hero-layer-astronaut"
          style={{
            transform: `translate(calc(-50% + ${mousePos.x * 8}px), calc(-50% + ${mousePos.y * 12}px))`,
          }}
        >
          <img src={astronautImg} alt="Pixel Astronaut" className="astronaut-image" />
        </div>

        {/* Layer 5: Clean Rocky Terrain */}
        <div className="hero-layer-terrain">
          <img src={terrainImg} alt="Pixel Terrain" className="terrain-image" />
        </div>
      </div>

      {/* Main Content Overlay */}
      <div className="hero-content">
        <div className="hero-subtitle-top font-pixel">
          SEDS CUSAT PRESENTS // INDIA&apos;S BIGGEST SPACE UNCONFERENCE
        </div>

        <h1 className="hero-title font-pixel">
          SPACEUP <span className="hero-title-cusat">CUSAT</span>
        </h1>

        <div className="hero-info font-pixel">
          <span>DATE: TO BE ANNOUNCED</span>
          <span className="hero-info-dot">•</span>
          <span>CUSAT CAMPUS, KOCHI</span>
        </div>

        {/* Action Buttons */}
        <div className="hero-actions">
          <button
            className="btn-register hero-btn-main interactive font-pixel"
            onClick={scrollToRegister}
            id="hero-register-btn"
          >
            [ REGISTER ]
          </button>

          <button
            className="btn-arcade-hero interactive font-pixel"
            onClick={onOpenArcade}
          >
            [ 🎮 PLAY ARCADE ]
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="hero-bottom-telemetry font-mono">
        <span className="hero-coords">
          LAT: 10.0435° N / LON: 76.3242° E // TRANSMISSION RX: STANDBY
        </span>
        
      </div>
    </section>
  )
}
