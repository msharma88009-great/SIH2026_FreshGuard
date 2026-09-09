import { alerts } from '../data/mockData'

export default function AlertsPage() {
  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Alerts</h2>
          <p>Sensor and cold-chain events requiring attention.</p>
        </div>
      </div>

      <div className="alert-list">
        {alerts.map((item) => (
          <div className="alert-card" key={item.id}>
            <span className={`alert-dot ${item.severity}`} />
            <div className="alert-content">
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
            <span className="alert-time">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
