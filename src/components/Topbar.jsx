import { useEffect, useMemo, useState } from 'react'
import { getAlerts, getHealth } from '../services/api'

const pages = ['Dashboard','Shipments','Live Monitoring','Map Tracking','Alerts','History','Traceability','QR Verification','Hash Verification','Settings']

export default function Topbar({ onNavigate, profile, onLogout }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [alerts, setAlerts] = useState([])
  const [backendReady, setBackendReady] = useState(false)
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? pages.filter((page) => page.toLowerCase().includes(q)).slice(0, 5) : []
  }, [query])

  useEffect(() => {
    let alive = true
    const checkBackend = async () => {
      try {
        await getHealth()
        if (alive) setBackendReady(true)
      } catch {
        if (alive) { setBackendReady(false); setAlerts([]) }
      }
    }
    const loadAlerts = async () => {
      try {
        const result = await getAlerts()
        if (alive) { setAlerts(result.data || []); setBackendReady(true) }
      } catch {
        if (alive) { setAlerts([]); setBackendReady(false) }
      }
    }
    checkBackend()
    loadAlerts()
    const timer = setInterval(() => { checkBackend(); loadAlerts() }, 10000)
    return () => { alive = false; clearInterval(timer) }
  }, [])

  const critical = alerts.filter((a) => a.severity === 'Critical').length
  const initials = profile?.initials || 'FG'
  const role = profile?.role || 'Cold Chain Operator'

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="page-heading">
          <div className="topbar-title-row"><h1>Fresh Guard</h1><span className={`topbar-status ${backendReady ? '' : 'topbar-status-waiting'}`}><i /> {backendReady ? 'Platform connected' : 'Backend offline'}</span></div>
          <p>IoT telemetry • offline buffering • traceability</p>
        </div>
        <div className="search-wrap">
          <label className="search-box"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && matches[0]) { onNavigate(matches[0]); setQuery('') } }} placeholder="Search pages..." aria-label="Search pages" />{query && <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear">×</button>}</label>
          {matches.length > 0 && <div className="search-results"><span>Quick navigation</span>{matches.map((page) => <button key={page} onClick={() => { onNavigate(page); setQuery('') }}>⌁ {page}</button>)}</div>}
        </div>
      </div>
      <div className="topbar-actions">
        <button className="icon-button notification-button" onClick={() => setOpen((v) => !v)} aria-label="Notifications">♢{critical > 0 && <span className="badge-count">{critical}</span>}</button>
        <div className="user-box"><button className="user-profile-button" onClick={() => onNavigate('Profile')} aria-label="Open profile"><div className="avatar">{initials}</div><div className="user-info"><div className="user-name">{profile?.name || 'Operator'}</div><div className="user-role">{role}</div></div></button><button className="logout-button" onClick={onLogout} title="Logout">↪</button></div>
        {open && <div className="notification-panel"><div className="notification-head"><div><h3>System notifications</h3><span>{critical} critical</span></div><button onClick={() => setOpen(false)}>×</button></div>{alerts.length ? alerts.slice(0, 5).map((a) => <button className="notification-item" key={a.alert_id} onClick={() => { setOpen(false); onNavigate('Alerts') }}><span className={`notification-severity ${a.severity}`}>●</span><span><strong>{a.alert_type}</strong><small>{a.message}</small></span></button>) : <div className="empty-state">No alerts from backend.</div>}<button className="notification-view-all" onClick={() => { setOpen(false); onNavigate('Alerts') }}>Open alert center →</button></div>}
      </div>
    </header>
  )
}
