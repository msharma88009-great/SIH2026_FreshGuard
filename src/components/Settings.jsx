import { useEffect, useState } from 'react'

const defaultSettings = {
  alerts: true,
  critical: true,
  offline: true,
  darkMode: false,
  sound: true,
  autoRefresh: true,
  gps: true,
  smsAlerts: false,
  emailAlerts: true,
}

const defaultThresholds = {
  temperature: 8,
  humidity: 75,
  gas: 100,
}

export default function Settings({ darkMode, onDarkModeChange }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('freshGuardSettings')
      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings
    } catch {
      return defaultSettings
    }
  })

  const [thresholds, setThresholds] = useState(() => {
    try {
      const saved = localStorage.getItem('freshGuardThresholds')
      return saved
        ? { ...defaultThresholds, ...JSON.parse(saved) }
        : defaultThresholds
    } catch {
      return defaultThresholds
    }
  })

  useEffect(() => {
    localStorage.setItem('freshGuardSettings', JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    if (typeof darkMode === 'boolean') {
      setSettings((current) => ({
        ...current,
        darkMode,
      }))
    }
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem(
      'freshGuardThresholds',
      JSON.stringify(thresholds)
    )
  }, [thresholds])

  function toggle(key) {
    const nextValue = !settings[key]

    setSettings((current) => ({
      ...current,
      [key]: nextValue,
    }))

    if (key === 'darkMode' && onDarkModeChange) {
      onDarkModeChange(nextValue)
    }
  }

  function updateThreshold(key, value) {
    setThresholds((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const notificationSettings = [
    [
      'alerts',
      'Sensor alert notifications',
      'Receive warnings when configured sensor thresholds are crossed.',
    ],
    [
      'critical',
      'Critical incident notifications',
      'Prioritize high-severity spoilage and integrity events.',
    ],
    [
      'sound',
      'Alert sound',
      'Play an alert sound when a critical monitoring event occurs.',
    ],
    [
      'smsAlerts',
      'SMS notifications',
      'Enable SMS alerts when real SMS service is connected.',
    ],
    [
      'emailAlerts',
      'Email notifications',
      'Receive important shipment and monitoring updates by email.',
    ],
  ]

  const systemSettings = [
    [
      'offline',
      'Offline buffering',
      'Keep sensor records locally until network connectivity returns.',
    ],
    [
      'autoRefresh',
      'Auto refresh monitoring',
      'Automatically refresh live sensor information.',
    ],
    [
      'gps',
      'Location tracking',
      'Allow shipment location information to be displayed.',
    ],
    [
      'darkMode',
      'Dark Mode',
      'Use a darker interface for low-light environments.',
    ],
  ]

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Settings</h2>
          <p>
            Configure monitoring, alerts, sensor thresholds and
            Fresh Guard preferences.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-section-title">
          <h3>Notifications</h3>
          <p>
            Control how Fresh Guard informs you about important events.
          </p>
        </div>

        {notificationSettings.map(([key, title, description]) => (
          <div className="setting-card" key={key}>
            <div>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>

            <button
              type="button"
              aria-label={`Toggle ${title}`}
              className={`toggle ${settings[key] ? 'on' : ''}`}
              onClick={() => toggle(key)}
            />
          </div>
        ))}

        <div className="settings-section-title">
          <h3>Monitoring & System</h3>
          <p>Configure dashboard behavior and field monitoring.</p>
        </div>

        {systemSettings.map(([key, title, description]) => (
          <div className="setting-card" key={key}>
            <div>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>

            <button
              type="button"
              aria-label={`Toggle ${title}`}
              className={`toggle ${settings[key] ? 'on' : ''}`}
              onClick={() => toggle(key)}
            />
          </div>
        ))}

        <div className="settings-section-title">
          <h3>Sensor Alert Thresholds</h3>
          <p>
            Values above these limits can generate monitoring alerts.
          </p>
        </div>

        <div className="threshold-grid">
          <div className="threshold-card">
            <div>
              <strong>Temperature</strong>
              <span>Critical above configured value</span>
            </div>

            <div className="threshold-input">
              <input
                type="number"
                min="0"
                max="50"
                step="0.1"
                value={thresholds.temperature}
                onChange={(event) =>
                  updateThreshold('temperature', event.target.value)
                }
              />
              <span>°C</span>
            </div>
          </div>

          <div className="threshold-card">
            <div>
              <strong>Humidity</strong>
              <span>Warning above configured value</span>
            </div>

            <div className="threshold-input">
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={thresholds.humidity}
                onChange={(event) =>
                  updateThreshold('humidity', event.target.value)
                }
              />
              <span>%</span>
            </div>
          </div>

          <div className="threshold-card">
            <div>
              <strong>Gas Level</strong>
              <span>Critical above configured value</span>
            </div>

            <div className="threshold-input">
              <input
                type="number"
                min="0"
                step="1"
                value={thresholds.gas}
                onChange={(event) =>
                  updateThreshold('gas', event.target.value)
                }
              />
              <span>ppm</span>
            </div>
          </div>
        </div>

        <div className="settings-section-title">
          <h3>Data & Connectivity</h3>
          <p>Useful controls for field and offline operation.</p>
        </div>

        <div className="setting-card">
          <div>
            <h4>Device Connection</h4>
            <p>ESP32 / LoRa gateway connection status.</p>
          </div>

          <span className="connection-status">● Ready</span>
        </div>

        <div className="setting-card">
          <div>
            <h4>Offline Data Sync</h4>
            <p>
              Buffered records will sync when network connectivity
              becomes available.
            </p>
          </div>

          <span className="sync-status">● Enabled</span>
        </div>

        <div className="setting-card">
          <div>
            <h4>Data Integrity</h4>
            <p>
              Sensor and traceability records support hash verification.
            </p>
          </div>

          <span className="integrity-status">✓ Protected</span>
        </div>

        <div className="settings-section-title">
          <h3>Account & Application</h3>
          <p>Profile and application information.</p>
        </div>

        <div className="setting-card">
          <div>
            <h4>Profile Settings</h4>
            <p>
              Your name, phone, email, role and farm information are
              stored locally for this demo.
            </p>
          </div>

          <span className="setting-value">Profile</span>
        </div>

        <div className="setting-card">
          <div>
            <h4>Security</h4>
            <p>
              OTP-based login is currently running in demo mode.
            </p>
          </div>

          <span className="setting-value">OTP</span>
        </div>

        <div className="setting-card">
          <div>
            <h4>Language</h4>
            <p>Application language preference.</p>
          </div>

          <select className="setting-select" defaultValue="English">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        <div className="about-card">
          <div className="about-logo">FG</div>

          <div>
            <h3>Fresh Guard</h3>
            <p>
              Low-Cost IoT Blockchain Nodes for Farm-to-Fork
              Traceability
            </p>
            <span>Fresh Guard • SIH 2026</span>
          </div>
        </div>
      </div>
    </div>
  )
}