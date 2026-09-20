// Web Audio API Retro Sound Effects & Chiptune Music Generator

class RetroAudioEngine {
  constructor() {
    this.ctx = null
    this.isMuted = false
    this.bgMusicTimer = null
    this.isPlayingMusic = false
    this.stepIndex = 0
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    if (this.isMuted) {
      this.stopBgMusic()
    } else {
      this.startBgMusic()
    }
    return this.isMuted
  }

  playLaser() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'square'
      const now = this.ctx.currentTime

      // Retro laser pitch drop 880Hz -> 110Hz
      osc.frequency.setValueAtTime(880, now)
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.12)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.12)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.12)
    } catch (e) {
      // Audio fallback
    }
  }

  playExplosion() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.22)
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
      const output = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }

      const whiteNoise = this.ctx.createBufferSource()
      whiteNoise.buffer = buffer

      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(600, now)
      filter.frequency.linearRampToValueAtTime(80, now + 0.22)

      const gain = this.ctx.createGain()
      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.22)

      whiteNoise.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      whiteNoise.start(now)
      whiteNoise.stop(now + 0.22)
    } catch (e) {
      // Audio fallback
    }
  }

  playStartSound() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return

    try {
      const notes = [261.63, 329.63, 392.0, 523.25]
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'triangle'

        const now = this.ctx.currentTime + idx * 0.08
        osc.frequency.setValueAtTime(freq, now)

        gain.gain.setValueAtTime(0.18, now)
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.08)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now)
        osc.stop(now + 0.08)
      })
    } catch (e) {
      // Audio fallback
    }
  }

  playGameOverSound() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return

    try {
      const notes = [400, 350, 300, 220]
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sawtooth'

        const now = this.ctx.currentTime + idx * 0.12
        osc.frequency.setValueAtTime(freq, now)

        gain.gain.setValueAtTime(0.2, now)
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.12)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now)
        osc.stop(now + 0.12)
      })
    } catch (e) {
      // Audio fallback
    }
  }

  startBgMusic() {
    if (this.isMuted || this.isPlayingMusic) return
    this.init()
    if (!this.ctx) return

    this.isPlayingMusic = true
    this.stepIndex = 0

    // Catchy synth chiptune melody line (8-bit style)
    const melody = [
      196.0, 261.63, 329.63, 392.0, 329.63, 261.63, 196.0, 261.63,
      174.61, 220.0, 261.63, 349.23, 261.63, 220.0, 174.61, 220.0,
      164.81, 246.94, 293.66, 329.63, 293.66, 246.94, 164.81, 246.94,
      146.83, 220.0, 261.63, 293.66, 261.63, 220.0, 196.0, 246.94
    ]

    const tempo = 135
    const stepDuration = (60 / tempo) / 2

    const tick = () => {
      if (!this.isPlayingMusic || this.isMuted || !this.ctx) return

      const freq = melody[this.stepIndex % melody.length]
      if (freq > 0) {
        try {
          const osc = this.ctx.createOscillator()
          const gain = this.ctx.createGain()

          osc.type = 'square'
          const now = this.ctx.currentTime

          osc.frequency.setValueAtTime(freq, now)

          gain.gain.setValueAtTime(0.04, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 0.9)

          osc.connect(gain)
          gain.connect(this.ctx.destination)

          osc.start(now)
          osc.stop(now + stepDuration * 0.9)
        } catch (e) {}
      }

      this.stepIndex++
      this.bgMusicTimer = setTimeout(tick, stepDuration * 1000)
    }

    tick()
  }

  stopBgMusic() {
    this.isPlayingMusic = false
    if (this.bgMusicTimer) {
      clearTimeout(this.bgMusicTimer)
      this.bgMusicTimer = null
    }
  }
}

export const retroAudio = new RetroAudioEngine()
