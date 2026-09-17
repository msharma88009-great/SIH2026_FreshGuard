import logoMark from '../assets/images/freshguard-mark.svg'

const items = [
  ['Dashboard', '⌂'],
  ['Shipments', '▣'],
  ['Live Monitoring', '◉'],
  ['Map Tracking', '⌖'],
  ['Alerts', '⚠'],
  ['History', '◷'],
  ['Traceability', '⌁'],
  ['QR Verification', '▦'],
  ['Hash Verification', '#'],
  ['Settings', '⚙'],
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <button className="brand brand-button" type="button" onClick={() => onNavigate('Dashboard')} aria-label="Go to Fresh Guard dashboard">
        <img className="brand-logo" src={logoMark} alt="Fresh Guard logo" />
        <div>
          <div className="brand-title">Fresh Guard</div>
          <div className="brand-subtitle">Cold Chain Control</div>
        </div>
      </button>

      <div className="sidebar-caption">Control Center</div>
      <nav className="nav-list" aria-label="Primary navigation">
        {items.map(([label, icon]) => (
          <button
            key={label}
            type="button"
            className={`nav-item ${activePage === label ? 'active' : ''}`}
            onClick={() => onNavigate(label)}
            aria-current={activePage === label ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">{icon}</span>
            <span>{label}</span>
            {activePage === label && <span className="nav-active-dot" aria-hidden="true" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer-card">
        <span className="sidebar-footer-dot" />
        <div>
          <strong>Node ready</strong>
          <small>Awaiting live telemetry</small>
        </div>
      </div>
    </aside>
  )
}
