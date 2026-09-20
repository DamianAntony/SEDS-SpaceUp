import { useState } from 'react'
import './Speakers.css'

const speakers = [
  {
    name: 'SPEAKER 01',
    role: 'KEYNOTE SPEAKER',
    bio: 'Speaker details, background, and session topic will be updated soon. Stay tuned for official announcements!',
    topic: 'TO BE ANNOUNCED',
    color: '#4ecdc4',
  },
  {
    name: 'SPEAKER 02',
    role: 'GUEST SPEAKER',
    bio: 'Speaker details, background, and session topic will be updated soon. Stay tuned for official announcements!',
    topic: 'TO BE ANNOUNCED',
    color: '#e8a04c',
  },
  {
    name: 'SPEAKER 03',
    role: 'PANEL LEAD',
    bio: 'Speaker details, background, and session topic will be updated soon. Stay tuned for official announcements!',
    topic: 'TO BE ANNOUNCED',
    color: '#9b59b6',
  },
  {
    name: 'SPEAKER 04',
    role: 'WORKSHOP LEAD',
    bio: 'Speaker details, background, and session topic will be updated soon. Stay tuned for official announcements!',
    topic: 'TO BE ANNOUNCED',
    color: '#ff6b35',
  },
  {
    name: 'SPEAKER 05',
    role: 'INDUSTRY EXPERT',
    bio: 'Speaker details, background, and session topic will be updated soon. Stay tuned for official announcements!',
    topic: 'TO BE ANNOUNCED',
    color: '#4ecdc4',
  },
  {
    name: 'SPEAKER 06',
    role: 'RESEARCH LEAD',
    bio: 'Speaker details, background, and session topic will be updated soon. Stay tuned for official announcements!',
    topic: 'TO BE ANNOUNCED',
    color: '#e8a04c',
  },
]

export default function Speakers() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [flippedIndex, setFlippedIndex] = useState(null)

  return (
    <section className="speakers section-padding" id="speakers">
      <div className="container">
        <div className="speakers-header scroll-reveal">
          <div className="section-tag font-mono">
            <span className="tag-bracket">[</span>
            <span className="tag-number">02</span>
            <span className="tag-bracket">]</span>
            <span className="tag-text">CREW_MANIFEST</span>
          </div>
          <h2 className="speakers-title font-display">
            MISSION <span className="text-accent-gold">CREW</span>
          </h2>
          <p className="speakers-subtitle font-mono">
            // Speakers & session leads to be announced soon. Propose your session!
          </p>
        </div>

        <div className="speakers-grid">
          {speakers.map((speaker, i) => (
            <div
              key={speaker.name}
              className={`speaker-card scroll-reveal interactive ${
                flippedIndex === i ? 'flipped' : ''
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() =>
                setFlippedIndex(flippedIndex === i ? null : i)
              }
            >
              {/* Front */}
              <div className="speaker-front glass-card">
                <div
                  className="speaker-avatar"
                  style={{ borderColor: speaker.color }}
                >
                  <div
                    className="speaker-avatar-inner"
                    style={{ background: `linear-gradient(135deg, ${speaker.color}22, ${speaker.color}44)` }}
                  >
                    <span className="speaker-initials" style={{ color: speaker.color }}>
                      {`SP${i + 1}`}
                    </span>
                  </div>
                  <div
                    className="speaker-ring"
                    style={{
                      borderColor: hoveredIndex === i ? speaker.color : 'transparent',
                    }}
                  />
                </div>
                <h3 className="speaker-name font-display">{speaker.name}</h3>
                <p className="speaker-role font-mono">{speaker.role}</p>
                <div
                  className="speaker-topic-badge"
                  style={{
                    borderColor: `${speaker.color}40`,
                    color: speaker.color,
                  }}
                >
                  {speaker.topic}
                </div>
                <span className="speaker-flip-hint font-mono">[ CLICK FOR DETAILS ]</span>
              </div>

              {/* Back */}
              <div
                className="speaker-back glass-card"
                style={{ borderColor: `${speaker.color}30` }}
              >
                <div className="speaker-back-header">
                  <span className="speaker-back-name font-display">
                    {speaker.name}
                  </span>
                  <span
                    className="speaker-status font-mono"
                    style={{ color: speaker.color }}
                  >
                    ● ANNOUNCING SOON
                  </span>
                </div>
                <div className="speaker-back-divider" />
                <p className="speaker-bio">{speaker.bio}</p>
                <div className="speaker-back-meta font-mono">
                  <span>TOPIC: {speaker.topic}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="speakers-cta scroll-reveal">
          <p className="font-mono speakers-cta-text">
            Want to lead a session? SpaceUp is participant-driven.
          </p>
          <a
            href="https://spaceup2026.vercel.app/register"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-register interactive font-mono"
            id="propose-session-btn"
          >
            [ PROPOSE A SESSION ]
          </a>
        </div>
      </div>
    </section>
  )
}

