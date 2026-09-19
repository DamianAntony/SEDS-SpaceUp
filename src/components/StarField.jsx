import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animFrame

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create stars
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      brightness: Math.random() * 0.5 + 0.5,
      color: Math.random() > 0.85
        ? `rgba(78, 205, 196, ALPHA)`
        : Math.random() > 0.7
        ? `rgba(232, 160, 76, ALPHA)`
        : `rgba(255, 255, 255, ALPHA)`,
    }))

    // Shooting stars
    const shootingStars = []
    const spawnShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() > 0.995) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 4,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          life: 1,
          decay: 0.015,
        })
      }
    }

    let time = 0
    const animate = () => {
      time += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7
        const alpha = star.brightness * twinkle
        const colorWithAlpha = star.color.replace('ALPHA', alpha.toFixed(2))

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = colorWithAlpha
        ctx.fill()

        // Small glow for brighter stars
        if (star.size > 1) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = colorWithAlpha.replace(
            alpha.toFixed(2),
            (alpha * 0.1).toFixed(3)
          )
          ctx.fill()
        }
      })

      // Shooting stars
      spawnShootingStar()
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i]
        ss.x += Math.cos(ss.angle) * ss.speed
        ss.y += Math.sin(ss.angle) * ss.speed
        ss.life -= ss.decay

        if (ss.life <= 0) {
          shootingStars.splice(i, 1)
          continue
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length
        const tailY = ss.y - Math.sin(ss.angle) * ss.length

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y)
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
        gradient.addColorStop(1, `rgba(78, 205, 196, ${ss.life * 0.8})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(ss.x, ss.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Head glow
        ctx.beginPath()
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.life})`
        ctx.fill()
      }

      animFrame = requestAnimationFrame(animate)
    }

    animate()

    // Re-check document height periodically
    const heightCheck = setInterval(resize, 2000)

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
      clearInterval(heightCheck)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}
