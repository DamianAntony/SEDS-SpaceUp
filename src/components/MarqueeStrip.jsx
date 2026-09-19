import './MarqueeStrip.css'

export default function MarqueeStrip() {
  const items = [
    'SPACEUP CUSAT',
    '◆',
    'SEDS CUSAT',
    '◆',
    'DATE: TO BE ANNOUNCED',
    '◆',
    'UNCONFERENCE',
    '◆',
    'PARTICIPANT-DRIVEN',
    '◆',
    'VENUE: CUSAT CAMPUS',
    '◆',
    'ASTRONAUTICS',
    '◆',
    'COMMUNITY',
    '◆',
  ]

  return (
    <div className="marquee-strip" role="presentation">
      <div className="marquee-track">
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="marquee-set">
            {items.map((item, i) => (
              <span
                key={i}
                className={`marquee-item ${item === '◆' ? 'marquee-dot' : ''}`}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

