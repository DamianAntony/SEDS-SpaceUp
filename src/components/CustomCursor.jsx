import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)
  const particles = useRef([])
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const mousePos = useRef({ x: -500, y: -500 })
  const trailPos = useRef({ x: -500, y: -500 })

  useEffect(() => {
    if (window.innerWidth < 768) return

    const cursor = cursorRef.current
    const trail = trailRef.current
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Spawn 16-bit pixel thruster spark
    const handleMouseMove = (e) => {
      if (!hasMoved) setHasMoved(true)
      mousePos.current = { x: e.clientX, y: e.clientY }

      if (Math.random() > 0.4) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          size: Math.floor(Math.random() * 3) + 2, // Pixel square size
          speedX: (Math.random() - 0.5) * 1.2,
          speedY: (Math.random() - 0.5) * 1.2 + 0.6,
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
          color: Math.random() > 0.4 ? '#00E5FF' : '#FF4D8D',
        })
      }
    }

    // Spawn retro click burst on click
    const handleMouseDown = (e) => {
      setIsClicking(true)
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2
        const speed = Math.random() * 2 + 1.5
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.floor(Math.random() * 3) + 2,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          life: 1,
          decay: 0.04,
          color: i % 2 === 0 ? '#00E5FF' : '#9B5DE5',
        })
      }
    }

    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => setIsHovering(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    const animate = () => {
      // Smooth lag for outer reticle ring
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.18
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.18

      if (cursor) {
        cursor.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`
      }
      if (trail) {
        trail.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current = particles.current.filter((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.life -= p.decay

        if (p.life <= 0) return false

        // Draw 16-bit pixel square particle
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.life * 0.8
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size)
        ctx.globalAlpha = 1.0
        return true
      })

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [hasMoved])

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" />

      {/* Main 16-Bit Reticle Cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''} ${
          hasMoved ? 'active' : ''
        }`}
        style={{ transform: 'translate(-500px, -500px)' }}
      >
        <div className="retro-reticle">
          {/* Corner brackets */}
          <span className="corner-bracket top-left" />
          <span className="corner-bracket top-right" />
          <span className="corner-bracket bottom-left" />
          <span className="corner-bracket bottom-right" />

          {/* Crosshair lines */}
          <span className="ch-line ch-top" />
          <span className="ch-line ch-right" />
          <span className="ch-line ch-bottom" />
          <span className="ch-line ch-left" />

          {/* Center Pixel Dot */}
          <span className="ch-dot" />

          {/* Micro Telemetry Badge */}
          <span className="cursor-tag font-pixel">
            {isHovering ? 'LOCK' : 'TARGET'}
          </span>
        </div>
      </div>

      {/* Outer Tracking Box */}
      <div
        ref={trailRef}
        className={`cursor-trail ${isHovering ? 'hover' : ''} ${hasMoved ? 'active' : ''}`}
        style={{ transform: 'translate(-500px, -500px)' }}
      />
    </>
  )
}

