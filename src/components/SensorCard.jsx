export default function SensorCard({ name, value, unit, status = 'Good', icon = '◉' }) {
  const statusClass =
    status === 'Critical' ? 'status-critical' :
    status === 'Warning' ? 'status-warning' :
    status === 'Waiting' ? 'status-waiting' : 'status-good'

  return (
    <article className="sensor-card">
      <div className="sensor-head">
        <span className="sensor-name">{name}</span>
        <span className="sensor-icon">{icon}</span>
      </div>
      <div className="sensor-value">
        {value}<span className="sensor-unit">{unit}</span>
      </div>
      <span className={`sensor-status ${statusClass}`}>{status}</span>
    </article>
  )
}
