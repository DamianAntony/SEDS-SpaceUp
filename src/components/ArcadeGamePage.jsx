import { useEffect, useRef, useState, useCallback } from 'react'
import './ArcadeGamePage.css'

export default function ArcadeGamePage({ onBack }) {
  const canvasRef = useRef(null)
  const [gameState, setGameState] = useState('idle') // idle, playing, gameover
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('spaceup-highscore') || '0', 10)
  })

  // Mutable refs for high-FPS game loop
  const gameStateRef = useRef('idle')
  const scoreRef = useRef(0)
  const highScoreRef = useRef(highScore)
  const animationFrameRef = useRef(null)
  const keysRef = useRef({})
  const touchTargetRef = useRef(null)

  useEffect(() => {
    highScoreRef.current = highScore
  }, [highScore])

  const updateGameState = (newState) => {
    gameStateRef.current = newState
    setGameState(newState)
  }

  const setKey = (key, isPressed) => {
    keysRef.current[key] = isPressed
  }

  const startGame = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    updateGameState('playing')
    scoreRef.current = 0
    setScore(0)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = canvas.offsetWidth || 640
    canvas.height = canvas.offsetHeight || 420

    const W = canvas.width
    const H = canvas.height

    const ship = {
      x: W / 2,
      y: H - 50,
      radius: 14,
      speed: 6,
      bullets: [],
      bulletCooldown: 0,
    }

    let asteroids = []
    let particles = []
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.8 + 0.3,
    }))

    let frameCount = 0

    const spawnAsteroid = (difficulty) => {
      const size = Math.random() * 18 + 12
      asteroids.push({
        x: Math.random() * (W - size * 2) + size,
        y: -size,
        size,
        speed: (Math.random() * 1.8 + 1.2) * difficulty,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        vertices: Math.floor(Math.random() * 3) + 5,
        offsets: Array.from({ length: 8 }, () => Math.random() * 0.4 + 0.8),
      })
    }

    const spawnExplosion = (x, y, color, count = 10) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
        const speed = Math.random() * 3.5 + 1
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: Math.random() * 0.03 + 0.02,
          size: Math.random() * 3 + 1.5,
          color,
        })
      }
    }

    const loop = () => {
      if (gameStateRef.current !== 'playing') return

      ctx.clearRect(0, 0, W, H)

      // 1. Starfield
      stars.forEach((s) => {
        s.y += s.speed
        if (s.y > H) {
          s.y = 0
          s.x = Math.random() * W
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${s.size / 2})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
      })

      frameCount++
      const difficulty = 1 + scoreRef.current / 300

      // 2. Input handling
      if (keysRef.current['ArrowLeft'] || keysRef.current['a']) {
        ship.x = Math.max(ship.radius, ship.x - ship.speed)
      }
      if (keysRef.current['ArrowRight'] || keysRef.current['d']) {
        ship.x = Math.min(W - ship.radius, ship.x + ship.speed)
      }
      if (keysRef.current['ArrowUp'] || keysRef.current['w']) {
        ship.y = Math.max(ship.radius + 10, ship.y - ship.speed)
      }
      if (keysRef.current['ArrowDown'] || keysRef.current['s']) {
        ship.y = Math.min(H - ship.radius - 10, ship.y + ship.speed)
      }

      if (touchTargetRef.current) {
        const tx = touchTargetRef.current.x
        const ty = touchTargetRef.current.y
        ship.x += (tx - ship.x) * 0.2
        ship.y += (ty - ship.y) * 0.2
        ship.x = Math.max(ship.radius, Math.min(W - ship.radius, ship.x))
        ship.y = Math.max(ship.radius + 10, Math.min(H - ship.radius - 10, ship.y))
      }

      // 3. Fire Lasers
      ship.bulletCooldown--
      if (ship.bulletCooldown <= 0) {
        ship.bullets.push({ x: ship.x - 6, y: ship.y - 12, speed: 8 })
        ship.bullets.push({ x: ship.x + 6, y: ship.y - 12, speed: 8 })
        ship.bulletCooldown = 10
      }

      // 4. Update Bullets
      ship.bullets = ship.bullets.filter((b) => {
        b.y -= b.speed
        if (b.y < -10) return false

        ctx.beginPath()
        ctx.moveTo(b.x, b.y)
        ctx.lineTo(b.x, b.y + 10)
        ctx.strokeStyle = '#4ecdc4'
        ctx.lineWidth = 2.5
        ctx.shadowColor = '#4ecdc4'
        ctx.shadowBlur = 6
        ctx.stroke()
        ctx.shadowBlur = 0

        for (let i = asteroids.length - 1; i >= 0; i--) {
          const a = asteroids[i]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.hypot(dx, dy)

          if (dist < a.size + 4) {
            spawnExplosion(a.x, a.y, '#e8a04c', 12)
            asteroids.splice(i, 1)

            scoreRef.current += 10
            setScore(scoreRef.current)
            return false
          }
        }
        return true
      })

      // 5. Spawn Asteroids
      const spawnInterval = Math.max(12, Math.floor(40 - difficulty * 4))
      if (frameCount % spawnInterval === 0) {
        spawnAsteroid(difficulty)
      }

      // 6. Update Asteroids
      let shipHit = false
      asteroids = asteroids.filter((a) => {
        a.y += a.speed
        a.rotation += a.rotSpeed

        if (a.y > H + a.size) return false

        ctx.save()
        ctx.translate(a.x, a.y)
        ctx.rotate(a.rotation)
        ctx.beginPath()
        for (let i = 0; i < a.vertices; i++) {
          const angle = (Math.PI * 2 * i) / a.vertices
          const offset = a.offsets[i] || 1
          const px = Math.cos(angle) * a.size * offset
          const py = Math.sin(angle) * a.size * offset
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.fillStyle = 'rgba(70, 60, 50, 0.85)'
        ctx.fill()
        ctx.strokeStyle = '#e8a04c'
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()

        const dx = ship.x - a.x
        const dy = ship.y - a.y
        const dist = Math.hypot(dx, dy)
        if (dist < a.size + ship.radius) {
          shipHit = true
          return false
        }
        return true
      })

      // 7. Render Particles
      particles = particles.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay

        if (p.life <= 0) return false

        ctx.fillStyle =
          p.color === '#ff3333'
            ? `rgba(255, 51, 51, ${p.life})`
            : `rgba(232, 160, 76, ${p.life})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
        return true
      })

      // 8. Render Ship
      if (!shipHit) {
        ctx.save()
        ctx.translate(ship.x, ship.y)

        if (frameCount % 4 < 2) {
          ctx.beginPath()
          ctx.moveTo(-5, 12)
          ctx.lineTo(0, 12 + Math.random() * 10 + 6)
          ctx.lineTo(5, 12)
          ctx.fillStyle = '#ff6b35'
          ctx.fill()

          ctx.beginPath()
          ctx.moveTo(-2, 12)
          ctx.lineTo(0, 12 + Math.random() * 5 + 3)
          ctx.lineTo(2, 12)
          ctx.fillStyle = '#4ecdc4'
          ctx.fill()
        }

        ctx.beginPath()
        ctx.moveTo(0, -14)
        ctx.lineTo(-12, 12)
        ctx.lineTo(-6, 8)
        ctx.lineTo(0, 10)
        ctx.lineTo(6, 8)
        ctx.lineTo(12, 12)
        ctx.closePath()
        ctx.fillStyle = '#162238'
        ctx.fill()
        ctx.strokeStyle = '#4ecdc4'
        ctx.lineWidth = 2
        ctx.shadowColor = '#4ecdc4'
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.shadowBlur = 0

        ctx.beginPath()
        ctx.arc(0, 0, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#e8a04c'
        ctx.fill()

        ctx.restore()
      } else {
        spawnExplosion(ship.x, ship.y, '#ff3333', 25)

        const finalScore = scoreRef.current
        if (finalScore > highScoreRef.current) {
          setHighScore(finalScore)
          localStorage.setItem('spaceup-highscore', String(finalScore))
        }

        updateGameState('gameover')
        return
      }

      ctx.font = '12px "Share Tech Mono", monospace'
      ctx.fillStyle = '#4ecdc4'
      ctx.textAlign = 'left'
      ctx.fillText(`SCORE: ${scoreRef.current}`, 12, 22)
      ctx.textAlign = 'right'
      ctx.fillText(`HI: ${Math.max(scoreRef.current, highScoreRef.current)}`, W - 12, 22)

      animationFrameRef.current = requestAnimationFrame(loop)
    }

    animationFrameRef.current = requestAnimationFrame(loop)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd'].includes(e.key)) {
        if (gameStateRef.current === 'playing') {
          e.preventDefault()
        }
      }

      keysRef.current[e.key] = true

      if (e.key === ' ') {
        if (gameStateRef.current === 'idle' || gameStateRef.current === 'gameover') {
          startGame()
        }
      }
    }

    const handleKeyUp = (e) => {
      keysRef.current[e.key] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [startGame])

  const handleTouchMove = (e) => {
    if (gameState !== 'playing' || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    if (touch) {
      touchTargetRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }
    }
  }

  const handleTouchEnd = () => {
    touchTargetRef.current = null
  }

  return (
    <div className="arcade-page">
      <div className="arcade-page-header">
        <button className="btn-register arcade-back-btn interactive" onClick={onBack}>
          [ &larr; BACK TO MISSION ]
        </button>
        <div className="arcade-page-title font-pixel">ASTEROID BELT ARCADE</div>
        <div className="arcade-page-score font-mono">
          HIGH SCORE: <span className="text-accent-gold">{highScore}</span>
        </div>
      </div>

      <div className="arcade-cabinet glass-card">
        <div className="arcade-screen-bezel">
          <div className="arcade-scanlines" />

          {/* Idle overlay */}
          {gameState === 'idle' && (
            <div className="arcade-overlay">
              <h3 className="arcade-overlay-title font-pixel">ASTEROID BELT</h3>
              <p className="arcade-overlay-sub font-mono">16-BIT RETRO SPACE SHOOTER</p>
              <div className="arcade-instructions font-mono">
                <p>[ ARROW KEYS / WASD ] TO MOVE</p>
                <p>[ AUTO-FIRE LASERS ACTIVE ]</p>
                <p>[ SPACEBAR ] TO LAUNCH</p>
              </div>
              <button
                className="btn-register arcade-launch-btn interactive"
                onClick={startGame}
              >
                [ LAUNCH MISSION ]
              </button>
            </div>
          )}

          {/* Gameover overlay */}
          {gameState === 'gameover' && (
            <div className="arcade-overlay gameover">
              <h3 className="arcade-overlay-title font-pixel text-accent-orange">
                MISSION FAILED
              </h3>
              <p className="arcade-score-final font-mono">
                FINAL SCORE: <span className="text-accent-cyan">{score}</span>
              </p>
              {score >= highScore && score > 0 && (
                <div className="new-highscore-badge font-pixel">NEW HIGH SCORE!</div>
              )}
              <button
                className="btn-register arcade-launch-btn interactive"
                onClick={startGame}
              >
                [ TRY AGAIN ]
              </button>
            </div>
          )}

          <canvas
            ref={canvasRef}
            className="arcade-canvas"
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>

        {/* Touch D-Pad */}
        <div className="arcade-controls-dpad">
          <div className="dpad-grid">
            <button
              className="dpad-btn dpad-up"
              onMouseDown={() => setKey('ArrowUp', true)}
              onMouseUp={() => setKey('ArrowUp', false)}
              onTouchStart={() => setKey('ArrowUp', true)}
              onTouchEnd={() => setKey('ArrowUp', false)}
            >
              &ring;
            </button>
            <button
              className="dpad-btn dpad-left"
              onMouseDown={() => setKey('ArrowLeft', true)}
              onMouseUp={() => setKey('ArrowLeft', false)}
              onTouchStart={() => setKey('ArrowLeft', true)}
              onTouchEnd={() => setKey('ArrowLeft', false)}
            >
              &larr;
            </button>
            <button
              className="dpad-btn dpad-right"
              onMouseDown={() => setKey('ArrowRight', true)}
              onMouseUp={() => setKey('ArrowRight', false)}
              onTouchStart={() => setKey('ArrowRight', true)}
              onTouchEnd={() => setKey('ArrowRight', false)}
            >
              &rarr;
            </button>
            <button
              className="dpad-btn dpad-down"
              onMouseDown={() => setKey('ArrowDown', true)}
              onMouseUp={() => setKey('ArrowDown', false)}
              onTouchStart={() => setKey('ArrowDown', true)}
              onTouchEnd={() => setKey('ArrowDown', false)}
            >
              &cularr;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
