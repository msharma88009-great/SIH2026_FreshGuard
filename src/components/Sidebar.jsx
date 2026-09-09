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
      <div className="brand">
        <div className="brand-mark">FG</div>
        <div>
          <div className="brand-title">Fresh Guard</div>
          <div className="brand-subtitle">Cold Chain Control</div>
        </div>
      </div>

      <div className="nav-label">Operations</div>
      <nav className="nav-list">
        {items.map(([label, icon]) => (
          <button
            key={label}
            className={`nav-item ${activePage === label ? 'active' : ''}`}
            onClick={() => onNavigate(label)}
          >
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
