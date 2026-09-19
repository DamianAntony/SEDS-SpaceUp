import { useState } from 'react'
import './Sponsors.css'

const sponsorTiers = [
  {
    tier: 'PLATINUM ORBIT',
    tierColor: '#e0e0e0',
    sponsors: [
      { name: 'TITLE SPONSOR', desc: 'Sponsor slot available. Contact SEDS CUSAT to partner with us.' },
      { name: 'CO-SPONSOR', desc: 'Sponsor slot available. Contact SEDS CUSAT to partner with us.' },
    ],
  },
  {
    tier: 'GOLD TRAJECTORY',
    tierColor: '#e8a04c',
    sponsors: [
      { name: 'GOLD PARTNER 01', desc: 'Sponsor slot available. Contact SEDS CUSAT.' },
      { name: 'GOLD PARTNER 02', desc: 'Sponsor slot available. Contact SEDS CUSAT.' },
      { name: 'GOLD PARTNER 03', desc: 'Sponsor slot available. Contact SEDS CUSAT.' },
    ],
  },
  {
    tier: 'SILVER PAYLOAD',
    tierColor: '#8892a4',
    sponsors: [
      { name: 'SILVER PARTNER 01', desc: 'Sponsor slot available.' },
      { name: 'SILVER PARTNER 02', desc: 'Sponsor slot available.' },
      { name: 'SILVER PARTNER 03', desc: 'Sponsor slot available.' },
      { name: 'SILVER PARTNER 04', desc: 'Sponsor slot available.' },
    ],
  },
]

export default function Sponsors() {
  const [hoveredSponsor, setHoveredSponsor] = useState(null)

  return (
    <section className="sponsors section-padding" id="sponsors">
      <div className="container">
        <div className="sponsors-header scroll-reveal">
          <div className="section-tag font-mono">
            <span className="tag-bracket">[</span>
            <span className="tag-number">05</span>
            <span className="tag-bracket">]</span>
            <span className="tag-text">MISSION_PARTNERS</span>
          </div>
          <h2 className="sponsors-title font-display">
            LAUNCH <span className="text-accent-cyan">PARTNERS</span>
          </h2>
          <p className="sponsors-subtitle font-mono">
            // Organizations fueling student space innovation
          </p>
        </div>

        {sponsorTiers.map((tier) => (
          <div key={tier.tier} className="sponsor-tier scroll-reveal">
            <h3
              className="tier-name font-mono"
              style={{ color: tier.tierColor }}
            >
              {'< '}
              {tier.tier}
              {' >'}
            </h3>
            <div className="sponsor-logos">
              {tier.sponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="sponsor-card glass-card interactive"
                  onMouseEnter={() => setHoveredSponsor(sponsor.name)}
                  onMouseLeave={() => setHoveredSponsor(null)}
                >
                  <div className="sponsor-logo-placeholder font-display">
                    {sponsor.name}
                  </div>
                  <div
                    className={`sponsor-desc font-mono ${
                      hoveredSponsor === sponsor.name ? 'visible' : ''
                    }`}
                  >
                    {sponsor.desc}
                  </div>
                  <div className="sponsor-scan-line" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Registration CTA */}
        <div className="register-cta scroll-reveal" id="register">
          <div className="register-cta-inner glass-card">
            <div className="register-glow" />
            <h3 className="register-title font-display">
              READY FOR <span className="text-accent-gold">LAUNCH</span>?
            </h3>
            <p className="register-desc font-mono">
              Secure your spot at SpaceUp CUSAT.
              <br />
              Limited seats. First come, first served.
            </p>
            <div className="register-details font-mono">
              <span>📅 DATE: TO BE ANNOUNCED</span>
              <span>📍 VENUE: CUSAT CAMPUS, KOCHI</span>
              <span>🎫 REGISTRATION OPENING SOON</span>
            </div>
            <button
              className="btn-register register-main-btn interactive"
              id="main-register-btn"
            >
              [ REGISTER NOW ]
            </button>
            <p className="register-fine-print font-mono">
              Registration system coming soon.
            </p>
          </div>
        </div>

        <div className="sponsors-become scroll-reveal">
          <p className="font-mono">
            Interested in partnering with SpaceUp CUSAT?
          </p>
          <a
            href="mailto:seds@cusat.ac.in"
            className="btn-register interactive"
            id="become-sponsor-btn"
          >
            [ BECOME A PARTNER ]
          </a>
        </div>
      </div>
    </section>
  )
}

