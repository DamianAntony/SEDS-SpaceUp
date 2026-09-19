import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const particles = useRef([])
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const trailPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Skip on mobile
    if (window.innerWidth < 768) return

    const cursor = cursorRef.current
    const trail = trailRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      // Spawn trail particles
      if (Math.random() > 0.5) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8 - 0.5,
          life: 1,
          decay: Math.random() * 0.02 + 0.015,
          color: Math.random() > 0.5 ? '78, 205, 196' : '232, 160, 76',
        })
      }
    }

    const handleMouseDown = () => setIsClicking(true)
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

    // Animation loop
    const animate = () => {
      // Smooth trail follow
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.15
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.15

      if (cursor) {
        cursor.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`
      }
      if (trail) {
        trail.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`
      }

      // Draw particles
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current = particles.current.filter((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.life -= p.decay

        if (p.life <= 0) return false

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.6})`
        ctx.fill()

        // Draw tiny connecting line to nearby particles
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
  }, [])

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" />
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
      >
        <div className="cursor-crosshair">
          <span className="ch-line ch-top" />
          <span className="ch-line ch-right" />
          <span className="ch-line ch-bottom" />
          <span className="ch-line ch-left" />
          <span className="ch-dot" />
        </div>
      </div>
      <div
        ref={trailRef}
        className={`cursor-trail ${isHovering ? 'hover' : ''}`}
      />
    </>
  )
}
