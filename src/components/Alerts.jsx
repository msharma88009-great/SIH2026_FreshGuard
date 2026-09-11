import { useEffect, useState } from 'react'
import { getAlerts } from '../services/api'

export default function Alerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    async function loadAlerts() {
      try {
        const result = await getAlerts()
        setAlerts(result.data || [])
      } catch (error) {
        console.error('Alerts API error:', error)
      }
    }

    loadAlerts()
  }, [])

  return (
    <section className="panel">
      <div className="section-heading">
        <h3>Recent Alerts</h3>
        <span>{alerts.length} active</span>
      </div>

      <div className="alert-list">
        {alerts.length === 0 ? (
          <p>No active alerts.</p>
        ) : (
          alerts.map((alert) => (
            <div className="alert-card" key={alert.alert_id}>
              <div
                className={`alert-dot ${
                  alert.severity === 'Critical' ? 'critical' : 'info'
                }`}
              />

              <div className="alert-content">
                <strong>{alert.alert_type}</strong>
                <p>{alert.message}</p>
              </div>

              <span className="alert-time">
                {alert.severity}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  )
}