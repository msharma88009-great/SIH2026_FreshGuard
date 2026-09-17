import { useEffect, useState } from 'react'
import { getAlerts } from '../services/api'

export default function NotificationCenter() {
  const [alerts, setAlerts] = useState([])
  useEffect(() => { getAlerts().then((r) => setAlerts(r.data || [])).catch(() => setAlerts([])) }, [])
  return <div className="panel"><div className="section-heading"><h3>Notification Center</h3><span>{alerts.length} events</span></div><div className="alert-list">{alerts.length ? alerts.map((item) => <div className="alert-card" key={item.alert_id}><span className={`alert-dot ${item.severity}`} /><div className="alert-content"><strong>{item.alert_type}</strong><p>{item.message}</p></div></div>) : <div className="empty-state">No alerts from backend.</div>}</div></div>
}
