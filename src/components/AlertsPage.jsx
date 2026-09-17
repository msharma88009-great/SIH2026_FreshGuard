import { useEffect, useState } from 'react'
import { getAlerts } from '../services/api'

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadAlerts() {
      try {
        setError('')
        const result = await getAlerts()
        setAlerts(result.data || [])
      } catch (error) {
        console.error('Alerts page API error:', error)
        setAlerts([])
        setError(error.message || 'Unable to connect to the backend.')
      } finally {
        setLoading(false)
      }
    }
    loadAlerts()
  }, [])

  return (
    <div>
      <div className="page-title-row"><div><h2>Alerts</h2><p>Cold-chain exceptions and sensor safety events.</p></div></div>
      <section className="panel">
        <div className="section-heading"><h3>Active Alerts</h3><span>{loading ? 'Checking backend…' : error ? 'Connection issue' : `${alerts.length} alerts`}</span></div>
        <div className="alert-list">
          {loading ? <p>Checking the Fresh Guard backend for alerts…</p> : error ? (
            <div className="empty-state alert-connection-state"><strong>Backend unavailable</strong><span>Alerts cannot be loaded until the Flask API is running.</span><small>{error}</small></div>
          ) : alerts.length === 0 ? <p>No active alerts.</p> : alerts.map((alert) => (
            <div className="alert-card" key={alert.alert_id}>
              <div className={`alert-dot ${alert.severity === 'Critical' ? 'critical' : 'info'}`} />
              <div className="alert-content"><strong>{alert.alert_type}</strong><p>{alert.message}</p><p>{alert.shipment_id}</p></div>
              <span className="alert-time">{alert.severity}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
