import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-divider section-divider" />

      <div className="container footer-content">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <h3 className="footer-logo font-pixel">SPACEUP</h3>
            <p className="footer-logo-sub font-mono">CUSAT // SEDS CHAPTER</p>
            <p className="footer-desc">
              Space unconference organized by SEDS CUSAT at Cochin University of Science and Technology.
            </p>
          </div>

          {/* Quick links */}
          <div className="footer-links">
            <h4 className="footer-heading font-mono">NAVIGATION</h4>
            <a href="#about" className="footer-link interactive">About</a>
            <a href="#speakers" className="footer-link interactive">Speakers</a>
            <a href="#schedule" className="footer-link interactive">Schedule</a>
            <a href="#arcade" className="footer-link interactive">Arcade</a>
            <a href="#sponsors" className="footer-link interactive">Sponsors</a>
          </div>

          {/* Contact */}
          <div className="footer-links">
            <h4 className="footer-heading font-mono">COMMS</h4>
            <a href="mailto:seds@cusat.ac.in" className="footer-link interactive">
              seds@cusat.ac.in
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link interactive">
              Twitter / X
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link interactive">
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link interactive">
              LinkedIn
            </a>
          </div>

          {/* Coordinates */}
          <div className="footer-terminal">
            <h4 className="footer-heading font-mono">TELEMETRY</h4>
            <div className="footer-telemetry font-mono">
              <p><span className="tel-label">LAT:</span> 10.0435° N</p>
              <p><span className="tel-label">LON:</span> 76.3242° E</p>
              <p><span className="tel-label">ALT:</span> 15m ASL</p>
              <p><span className="tel-label">NODE:</span> CUSAT-STN-01</p>
              <p><span className="tel-label">STATUS:</span> <span className="tel-active">ACTIVE</span></p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright font-mono">
            © SEDS CUSAT • SPACEUP • ALL SYSTEMS NOMINAL
          </p>
          <p className="footer-credits font-mono">
            DESIGNED & BUILT BY SEDS TECH TEAM // TRANSMISSION COMPLETE
          </p>
        </div>
      </div>
    </footer>
  )
}

