import { alerts } from '../data/mockData'

export default function Alerts({ limit = 3 }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h3>Recent Alerts</h3>
        <span>{alerts.length} total</span>
      </div>
      <div className="alert-list">
        {alerts.slice(0, limit).map((item) => (
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
    </section>
  )
}
