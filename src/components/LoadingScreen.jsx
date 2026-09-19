import './LoadingScreen.css'

export default function LoadingScreen({ isLoading, progress }) {
  return (
    <div className={`loading-screen ${!isLoading ? 'loaded' : ''}`}>
      <div className="loading-logo">
        <span className="loading-logo-bracket">[</span>
        <span className="loading-logo-text">SPACEUP</span>
        <span className="loading-logo-bracket">]</span>
      </div>
      <div className="loading-terminal">
        <p className="loading-line">SYS: INITIALIZING GROUND_CONTROL...</p>
        <p className="loading-line" style={{ animationDelay: '0.3s' }}>
          FREQ: 1420.405 MHz // HYDROGEN_LINE_LOCKED
        </p>
        <p className="loading-line" style={{ animationDelay: '0.6s' }}>
          ORBIT: LEO-240KM // NODE: BLR-STN-08
        </p>
        <p className="loading-line active" style={{ animationDelay: '0.9s' }}>
          TRANSMISSION_STATUS: {progress < 100 ? 'ACQUIRING...' : 'SIGNAL_ACQUIRED ✓'}
        </p>
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="loading-percent font-mono">{progress}%</p>
    </div>
  )
}
