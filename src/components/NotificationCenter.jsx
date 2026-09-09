import { alerts } from '../data/mockData'

export default function NotificationCenter() {
  return (
    <div className="panel">
      <div className="section-heading"><h3>Notification Center</h3><span>{alerts.length} events</span></div>
      <div className="alert-list">
        {alerts.map((item) => (
          <div className="alert-card" key={item.id}>
            <span className={`alert-dot ${item.severity}`} />
            <div className="alert-content">
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
