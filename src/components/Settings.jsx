import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] =
    useState(true);

  const [temperatureAlerts, setTemperatureAlerts] =
    useState(true);

  const [offlineMode, setOfflineMode] =
    useState(true);

  const [autoSync, setAutoSync] =
    useState(true);

  return (
    <div className="settings-page">

      <div className="page-heading">
        <div>
          <span className="section-label">
            SYSTEM CONFIGURATION
          </span>

          <h1>Settings</h1>

          <p>
            Configure monitoring, alerts and system preferences.
          </p>
        </div>

        <button className="primary-button">
          Save Changes
        </button>
      </div>

      <div className="settings-layout">

        <div className="settings-navigation">

          <button className="settings-nav active">
            ⚙ General
          </button>

          <button className="settings-nav">
            🔔 Notifications
          </button>

          <button className="settings-nav">
            🌡️ Sensor Thresholds
          </button>

          <button className="settings-nav">
            🔐 Security
          </button>

          <button className="settings-nav">
            📡 Connectivity
          </button>

        </div>

        <div className="settings-content">

          <div className="settings-section">

            <div className="settings-section-heading">
              <div>
                <h2>Monitoring Preferences</h2>
                <p>
                  Configure how Fresh Guard monitors the
                  cold chain.
                </p>
              </div>
            </div>

            <div className="setting-row">

              <div>
                <strong>Notifications</strong>
                <span>
                  Receive alerts for important shipment events.
                </span>
              </div>

              <button
                className={`toggle ${
                  notifications ? "on" : ""
                }`}
                onClick={() =>
                  setNotifications(!notifications)
                }
              >
                <span></span>
              </button>

            </div>

            <div className="setting-row">

              <div>
                <strong>Temperature Alerts</strong>
                <span>
                  Alert when temperature exceeds the safe range.
                </span>
              </div>

              <button
                className={`toggle ${
                  temperatureAlerts ? "on" : ""
                }`}
                onClick={() =>
                  setTemperatureAlerts(
                    !temperatureAlerts
                  )
                }
              >
                <span></span>
              </button>

            </div>

            <div className="setting-row">

              <div>
                <strong>Offline Storage</strong>
                <span>
                  Store sensor data locally during network failure.
                </span>
              </div>

              <button
                className={`toggle ${
                  offlineMode ? "on" : ""
                }`}
                onClick={() =>
                  setOfflineMode(!offlineMode)
                }
              >
                <span></span>
              </button>

            </div>

            <div className="setting-row">

              <div>
                <strong>Automatic Sync</strong>
                <span>
                  Synchronize locally stored records when
                  connectivity returns.
                </span>
              </div>

              <button
                className={`toggle ${
                  autoSync ? "on" : ""
                }`}
                onClick={() =>
                  setAutoSync(!autoSync)
                }
              >
                <span></span>
              </button>

            </div>

          </div>

          <div className="settings-section">

            <div className="settings-section-heading">
              <div>
                <h2>System Information</h2>
                <p>
                  Fresh Guard prototype configuration.
                </p>
              </div>
            </div>

            <div className="system-info-grid">

              <div>
                <span>Platform</span>
                <strong>Fresh Guard</strong>
              </div>

              <div>
                <span>IoT Node</span>
                <strong>ESP32-FG-001</strong>
              </div>

              <div>
                <span>Gateway</span>
                <strong>LoRa + MQTT</strong>
              </div>

              <div>
                <span>Storage</span>
                <strong>MicroSD + MongoDB</strong>
              </div>

              <div>
                <span>Integrity</span>
                <strong>Blockchain</strong>
              </div>

              <div>
                <span>Version</span>
                <strong>SIH 2026 Prototype</strong>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Settings;