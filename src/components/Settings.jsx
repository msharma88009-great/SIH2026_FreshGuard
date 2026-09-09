import { useState } from 'react'

const initialSettings = [
  ['alerts', 'Sensor alert notifications', 'Receive warnings when configured sensor thresholds are crossed.'],
  ['critical', 'Critical incident notifications', 'Prioritize high-severity spoilage and integrity events.'],
  ['offline', 'Offline buffering', 'Keep sensor records locally until network connectivity returns.'],
]

export default function Settings() {
  const [settings, setSettings] = useState(
    Object.fromEntries(initialSettings.map(([key]) => [key, true]))
  )

  function toggle(key) {
    setSettings((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Settings</h2>
          <p>Configure monitoring, alerts and offline data behavior.</p>
        </div>
      </div>

      <div className="settings-grid">
        {initialSettings.map(([key, title, description]) => (
          <div className="setting-card" key={key}>
            <div>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
            <button
              aria-label={`Toggle ${title}`}
              className={`toggle ${settings[key] ? 'on' : ''}`}
              onClick={() => toggle(key)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
