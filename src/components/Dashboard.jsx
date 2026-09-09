import StatCard from './StatCard'
import SensorCard from './SensorCard'
import FreshnessScore from './FreshnessScore'
import SensorChart from './SensorChart'
import Alerts from './Alerts'
import ShipmentsTable from './ShipmentsTable'

export default function Dashboard({ onNavigate }) {
  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Operations Dashboard</h2>
          <p>Real-time visibility across Fresh Guard's cold-chain network.</p>
        </div>
        <button className="primary-button" onClick={() => onNavigate?.('Shipments')}>View Shipments</button>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Shipments" value="128" change="+12 this month" icon="▣" />
        <StatCard label="Active Shipments" value="24" change="18% of total" icon="◉" />
        <StatCard label="Active Alerts" value="03" change="1 critical" icon="⚠" />
        <StatCard label="Verified Records" value="98.7%" change="+2.4% this week" icon="✓" />
      </div>

      <div className="dashboard-section">
        <div className="section-heading"><h3>Live Sensor Overview</h3><span>Updated just now</span></div>
        <div className="sensor-grid">
          <SensorCard name="Temperature" value="4.2" unit="°C" status="Good" icon="🌡" />
          <SensorCard name="Humidity" value="78" unit="%" status="Good" icon="💧" />
          <SensorCard name="Gas Level" value="0.18" unit=" ppm" status="Good" icon="◌" />
          <SensorCard name="Container" value="C-104" unit="" status="Good" icon="▣" />
        </div>
      </div>

      <div className="dashboard-section dashboard-grid">
        <SensorChart title="Temperature" values={[4.0, 4.4, 4.1, 4.8, 4.2, 4.5, 4.2]} />
        <FreshnessScore score={92} />
      </div>

      <div className="dashboard-section dashboard-grid">
        <Alerts />
        <SensorChart title="Humidity" values={[76, 78, 77, 80, 79, 78, 78]} />
      </div>

      <div className="dashboard-section">
        <ShipmentsTable onSelect={() => onNavigate?.('Shipments')} />
      </div>
    </div>
  )
}
