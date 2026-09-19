import { useEffect, useRef, useState } from 'react'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  // Placeholder countdown target (generic future date for demonstration)
  useEffect(() => {
    const target = new Date('2026-03-15T09:00:00+05:30').getTime()
    const update = () => {
      const now = Date.now()
      const diff = Math.max(0, target - now)
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      })
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollToRegister = () => {
    const el = document.getElementById('register')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" ref={heroRef} id="hero">
      {/* Parallax layers */}
      <div className="hero-bg-layers">
        {/* Deep space gradient */}
        <div className="hero-space-gradient" />

        {/* Saturn planet */}
        <div
          className="hero-planet-saturn"
          style={{
            transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -10}px)`,
          }}
        >
          <div className="saturn-body" />
          <div className="saturn-ring" />
        </div>

        {/* Small moon */}
        <div
          className="hero-moon"
          style={{
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)`,
          }}
        />

        {/* Nebula glow */}
        <div className="hero-nebula" />

        {/* Mountain terrain */}
        <div className="hero-terrain" />
      </div>

      {/* Main content */}
      <div className="hero-content">
        <div className="hero-subtitle-top font-mono">
          SEDS CUSAT PRESENTS // SPACE UNCONFERENCE
        </div>

        <h1 className="hero-title" data-text="SPACEUP CUSAT">
          <span className="hero-title-line">SPACEUP</span>
          <span className="hero-title-line hero-title-vol">CUSAT</span>
        </h1>

        <div className="hero-info font-mono">
          <span>DATE: TO BE ANNOUNCED</span>
          <span className="hero-info-dot">•</span>
          <span>VENUE: CUSAT CAMPUS, KOCHI</span>
        </div>

        <p className="hero-tagline font-mono">
          // WHERE ASTRONAUTICS MEETS COMMUNITY
        </p>

        <div className="hero-meta font-mono">
          <span>ORBIT: CUSAT-LEO</span>
          <span className="hero-meta-sep">•</span>
          <span>NODE: CUSAT-STN-01</span>
          <span className="hero-meta-sep">•</span>
          <span>MODE: PARTICIPANT-DRIVEN</span>
        </div>

        {/* Countdown */}
        <div className="hero-countdown">
          <div className="countdown-label font-mono">T-MINUS LAUNCH (DATE TBA):</div>
          <div className="countdown-blocks">
            {[
              { val: countdown.days, label: 'DAYS' },
              { val: countdown.hours, label: 'HRS' },
              { val: countdown.mins, label: 'MIN' },
              { val: countdown.secs, label: 'SEC' },
            ].map((item) => (
              <div key={item.label} className="countdown-block">
                <span className="countdown-value font-display">
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="countdown-unit font-mono">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hero-bottom">
        <span className="hero-coords font-mono">
          LAT: 10.0435° N / LON: 76.3242° E // TRANSMISSION RX: STANDBY
        </span>
        <button
          className="btn-register interactive"
          onClick={scrollToRegister}
          id="hero-register-btn"
        >
          [ REGISTER ]
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <div className="scroll-line" />
        <span className="scroll-text font-mono">SCROLL</span>
      </div>
    </section>
  )
}

