import './About.css'

export default function About() {
  const stats = [
    { value: 'TBA', label: 'EDITIONS', suffix: '' },
    { value: 'TBA', label: 'PARTICIPANTS', suffix: '' },
    { value: 'TBA', label: 'SPEAKERS', suffix: '' },
    { value: 'TBA', label: 'EVENT DAYS', suffix: '' },
  ]

  return (
    <section className="about section-padding" id="about">
      <div className="container">
        {/* Section header */}
        <div className="about-header scroll-reveal">
          <div className="section-tag font-mono">
            <span className="tag-bracket">[</span>
            <span className="tag-number">01</span>
            <span className="tag-bracket">]</span>
            <span className="tag-text">ABOUT_MISSION</span>
          </div>
          <h2 className="about-title font-display">
            WHAT IS <span className="text-accent-cyan">SPACEUP</span>?
          </h2>
        </div>

        <div className="about-grid">
          {/* Description */}
          <div className="about-description scroll-reveal-left">
            <div className="about-terminal glass-card">
              <div className="terminal-header">
                <span className="terminal-dot" style={{ background: '#ff5f56' }} />
                <span className="terminal-dot" style={{ background: '#ffbd2e' }} />
                <span className="terminal-dot" style={{ background: '#27c93f' }} />
                <span className="terminal-title font-mono">mission_brief.log</span>
              </div>
              <div className="terminal-body">
                <p className="terminal-prefix font-mono">&gt; cat mission_brief.log</p>
                <p className="about-text">
                  SpaceUp is an <span className="highlight">unconference</span> — an event
                  where participants decide the agenda. No predetermined speakers, no fixed
                  schedule. Just passionate people sharing ideas about{' '}
                  <span className="highlight">space exploration</span>,{' '}
                  <span className="highlight">rocket science</span>, and the{' '}
                  <span className="highlight">future of humanity</span> among the stars.
                </p>
                <p className="about-text" style={{ marginTop: '12px' }}>
                  Organized by <span className="highlight-gold">SEDS CUSAT</span>, SpaceUp
                  brings together students, researchers, industry professionals, and
                  space enthusiasts at Cochin University of Science and Technology (CUSAT)
                  for an immersive experience of innovation, networking, and boundary-pushing discussions.
                </p>
                <p className="terminal-prefix font-mono" style={{ marginTop: '12px' }}>
                  &gt; <span className="terminal-cursor" />
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="about-stats scroll-reveal-right">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-card glass-card interactive"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="stat-value font-display">
                  {stat.value}
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <div className="stat-label font-mono">{stat.label}</div>
                <div className="stat-decoration" />
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="about-features">
          {[
            {
              icon: '🚀',
              title: 'PARTICIPANT-DRIVEN',
              desc: 'You propose the sessions. You vote. The best ideas take the stage.',
            },
            {
              icon: '🛰️',
              title: 'NETWORKING HUB',
              desc: 'Connect with space scientists, researchers, and fellow enthusiasts.',
            },
            {
              icon: '🔭',
              title: 'HANDS-ON WORKSHOPS',
              desc: 'Build, launch, and learn — from rocketry concepts to satellite design.',
            },
            {
              icon: '🌍',
              title: 'GLOBAL COMMUNITY',
              desc: 'Join the international SpaceUp network spanning chapters worldwide.',
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="feature-card glass-card scroll-reveal interactive"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title font-display">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
              <div className="feature-corner top-left" />
              <div className="feature-corner top-right" />
              <div className="feature-corner bottom-left" />
              <div className="feature-corner bottom-right" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

