import { useState } from 'react'
import './Schedule.css'

const scheduleData = {
  'DAY 01 (DATE TBA)': [
    { time: '08:00', event: 'REGISTRATION & CHECK-IN', type: 'logistics', desc: 'Badge collection, welcome kit distribution, participant onboarding' },
    { time: '09:00', event: 'OPENING CEREMONY & BRIEFING', type: 'keynote', desc: 'Mission briefing & ground rules for the SpaceUp unconference' },
    { time: '09:30', event: 'SESSION PITCHES', type: 'interactive', desc: 'Participants pitch session ideas — vote and decide the agenda!' },
    { time: '10:30', event: 'PARALLEL SESSIONS — BLOCK 1', type: 'session', desc: 'Multiple parallel tracks running simultaneously. Topics decided by YOU.' },
    { time: '12:00', event: 'LUNCH & NETWORKING', type: 'break', desc: 'Connect with fellow space enthusiasts, students, and mentors' },
    { time: '13:00', event: 'KEYNOTE ADDRESS (SPEAKER TBA)', type: 'keynote', desc: 'Featured keynote session on cutting-edge space technology' },
    { time: '14:00', event: 'PARALLEL SESSIONS — BLOCK 2', type: 'session', desc: 'Second round of participant-driven discussions and talks' },
    { time: '16:00', event: 'HANDS-ON WORKSHOP', type: 'workshop', desc: 'Interactive workshop on rocketry, satellite design, or space-tech' },
    { time: '18:00', event: 'EVENING SOCIAL & OBSERVATION', type: 'social', desc: 'Networking session & stargazing activities' },
  ],
  'DAY 02 (DATE TBA)': [
    { time: '09:00', event: 'DAY 2 KICKOFF & RECAP', type: 'keynote', desc: 'Recap of Day 1 highlights & fresh session pitches for Day 2' },
    { time: '09:30', event: 'LIGHTNING TALKS', type: 'interactive', desc: '5-minute rapid-fire presentations by event participants' },
    { time: '10:30', event: 'PARALLEL SESSIONS — BLOCK 3', type: 'session', desc: 'Final round of participant-led sessions across tracks' },
    { time: '12:00', event: 'LUNCH BREAK', type: 'break', desc: 'Refuel and continue networking discussions' },
    { time: '13:00', event: 'PANEL DISCUSSION (GUESTS TBA)', type: 'keynote', desc: 'Panel featuring researchers, engineers, and student leaders' },
    { time: '14:30', event: 'PROJECT & HACKATHON SHOWCASE', type: 'workshop', desc: 'Teams present their space innovation projects and prototypes' },
    { time: '16:00', event: 'CLOSING CEREMONY & VALEDICTORY', type: 'keynote', desc: 'Event summary, awards distribution, and vote of thanks' },
    { time: '17:00', event: 'FAREWELL & GROUP PHOTO', type: 'social', desc: 'Final networking and closing of SpaceUp CUSAT' },
  ],
}

const typeColors = {
  keynote: '#e8a04c',
  session: '#4ecdc4',
  interactive: '#9b59b6',
  workshop: '#ff6b35',
  break: '#5a6478',
  social: '#27c93f',
  logistics: '#5a6478',
}

export default function Schedule() {
  const days = Object.keys(scheduleData)
  const [activeDay, setActiveDay] = useState(days[0])
  const [expandedIndex, setExpandedIndex] = useState(null)

  return (
    <section className="schedule section-padding" id="schedule">
      <div className="container">
        <div className="schedule-header scroll-reveal">
          <div className="section-tag font-mono">
            <span className="tag-bracket">[</span>
            <span className="tag-number">03</span>
            <span className="tag-bracket">]</span>
            <span className="tag-text">MISSION_TIMELINE</span>
          </div>
          <h2 className="schedule-title font-display">
            FLIGHT <span className="text-accent-cyan">PLAN</span>
          </h2>
        </div>

        {/* Day tabs */}
        <div className="schedule-tabs scroll-reveal">
          {days.map((day) => (
            <button
              key={day}
              className={`schedule-tab font-mono interactive ${
                activeDay === day ? 'active' : ''
              }`}
              onClick={() => {
                setActiveDay(day)
                setExpandedIndex(null)
              }}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="schedule-timeline">
          {scheduleData[activeDay].map((item, i) => (
            <div
              key={i}
              className={`timeline-item scroll-reveal interactive ${
                expandedIndex === i ? 'expanded' : ''
              }`}
              style={{ transitionDelay: `${i * 0.05}s` }}
              onClick={() =>
                setExpandedIndex(expandedIndex === i ? null : i)
              }
            >
              <div className="timeline-connector">
                <div
                  className="timeline-dot"
                  style={{ background: typeColors[item.type] }}
                />
                <div className="timeline-line" />
              </div>

              <div className="timeline-time font-mono">{item.time}</div>

              <div className="timeline-content glass-card">
                <div className="timeline-content-header">
                  <h3 className="timeline-event font-display">{item.event}</h3>
                  <span
                    className="timeline-type font-mono"
                    style={{
                      color: typeColors[item.type],
                      borderColor: `${typeColors[item.type]}40`,
                    }}
                  >
                    {item.type.toUpperCase()}
                  </span>
                </div>
                <div
                  className={`timeline-desc ${
                    expandedIndex === i ? 'show' : ''
                  }`}
                >
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="schedule-note font-mono scroll-reveal">
          * Tentative schedule. As an unconference, the final agenda is shaped by participants on the day of the event.
        </p>
      </div>
    </section>
  )
}

