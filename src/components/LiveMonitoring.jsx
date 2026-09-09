import SensorCard from './SensorCard'
import SensorChart from './SensorChart'

export default function LiveMonitoring() {
  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Live Monitoring</h2>
          <p>Current telemetry from connected ESP32 sensor nodes.</p>
        </div>
        <span className="status-pill status-active">● System Online</span>
      </div>

      <div className="sensor-grid">
        <SensorCard name="Temperature" value="4.2" unit="°C" status="Good" icon="🌡" />
        <SensorCard name="Humidity" value="78" unit="%" status="Good" icon="💧" />
        <SensorCard name="Gas Level" value="0.18" unit=" ppm" status="Good" icon="◌" />
        <SensorCard name="Location" value="Nashik" unit="" status="Good" icon="⌖" />
      </div>

      <div className="dashboard-section dashboard-grid">
        <SensorChart title="Temperature" values={[4.2, 4.1, 4.3, 4.7, 4.4, 4.2, 4.2]} />
        <SensorChart title="Gas Level" values={[0.11, 0.13, 0.15, 0.17, 0.18, 0.16, 0.18]} />
      </div>
    </div>
  )
}
