function Sidebar({ activePage, onPageChange }) {
  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Shipments", icon: "▤" },
    { name: "Live Monitoring", icon: "◉" },
    { name: "Map Tracking", icon: "⌖" },
    { name: "Alerts", icon: "⚠" },
    { name: "History", icon: "◷" },
    { name: "Traceability", icon: "⇄" },
    { name: "QR Verification", icon: "▣" },
    { name: "Hash Verification", icon: "#" },
    { name: "Settings", icon: "⚙" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">F</div>

        <div>
          <h2>Fresh Guard</h2>
          <span>Farm-to-Fork Security</span>
        </div>
      </div>

      <div className="sidebar-section-title">
        MAIN MENU
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`nav-item ${
              activePage === item.name ? "active" : ""
            }`}
            onClick={() => onPageChange(item.name)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="system-status">
          <span className="status-dot"></span>

          <div>
            <strong>System Online</strong>
            <small>All services operational</small>
          </div>
        </div>

        <div className="sidebar-version">
          Fresh Guard v1.0
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;