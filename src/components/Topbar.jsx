import { useState } from 'react'
import { alerts } from '../data/mockData'

export default function Topbar({ onNavigate, profile, onLogout }) {
  const [open, setOpen] = useState(false)

  const criticalCount = alerts.filter(
    (item) => item.severity === 'critical'
  ).length

  const initials =
    profile?.initials ||
    profile?.name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ||
    'FG'

  const displayName = profile?.name || 'Fresh Guard User'
  const displayRole = profile?.role || 'Cold Chain Operations'

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
        <button
          className="icon-button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Notifications"
        >
          ♢
          {criticalCount > 0 && (
            <span className="badge-count">{criticalCount}</span>
          )}
        </button>

        <div className="user-box">
          <div className="avatar">{initials}</div>

          <div className="user-info">
            <div className="user-name">{displayName}</div>
            <div className="user-role">{displayRole}</div>
          </div>

          <button
            className="logout-button"
            onClick={onLogout}
            title="Logout"
          >
            ↪
          </button>
        </div>

        {open && (
          <div className="notification-panel">
            <h3>Notifications</h3>

            {alerts.length > 0 ? (
              alerts.map((item) => (
                <button
                  className="notification-item"
                  key={item.id}
                  onClick={() => {
                    setOpen(false)
                    onNavigate('Alerts')
                  }}
                  style={{
                    width: '100%',
                    border: 0,
                    background: 'transparent',
                    textAlign: 'left',
                  }}
                >
                  <strong>{item.title}</strong>
                  <span>{item.time}</span>
                </button>
              ))
            ) : (
              <p className="empty-state">No notifications</p>
            )}
          </div>
        )}
      </div>
    </header>
  )
}