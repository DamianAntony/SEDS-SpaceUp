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

    const handleMouseMove = (e) => {
      if (!hasMoved) setHasMoved(true)
      mousePos.current = { x: e.clientX, y: e.clientY }

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

    const animate = () => {
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.15
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.15

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

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.6})`
        ctx.fill()
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
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''} ${hasMoved ? 'active' : ''}`}
        style={{ transform: 'translate(-500px, -500px)' }}
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
        className={`cursor-trail ${isHovering ? 'hover' : ''} ${hasMoved ? 'active' : ''}`}
        style={{ transform: 'translate(-500px, -500px)' }}
      />
    </>
  )
}
