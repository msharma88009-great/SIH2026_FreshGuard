import { useState } from 'react'
import { alerts } from '../data/mockData'

export default function Topbar({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const criticalCount = alerts.filter((item) => item.severity === 'critical').length

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="page-heading">
          <h1>Fresh Guard</h1>
          <p>Farm-to-Fork Traceability & Cold Chain Intelligence</p>
        </div>
        <label className="search-box">
          <span>⌕</span>
          <input placeholder="Search shipment, batch or container..." />
        </label>
      </div>

      <div className="topbar-actions">
        <button className="icon-button" onClick={() => setOpen((value) => !value)}>
          ♢
          {criticalCount > 0 && <span className="badge-count">{criticalCount}</span>}
        </button>

        <div className="user-box">
          <div className="avatar">AD</div>
          <div className="user-info">
            <div className="user-name">Admin</div>
            <div className="user-role">Cold Chain Operations</div>
          </div>
        </div>

        {open && (
          <div className="notification-panel">
            <h3>Notifications</h3>
            {alerts.map((item) => (
              <button
                className="notification-item"
                key={item.id}
                onClick={() => {
                  setOpen(false)
                  onNavigate('Alerts')
                }}
                style={{ width: '100%', border: 0, background: 'transparent', textAlign: 'left' }}
              >
                <strong>{item.title}</strong>
                <span>{item.time}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
