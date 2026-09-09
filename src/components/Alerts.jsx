function Alerts() {
  const alerts = [
    {
      icon: "🌡️",
      title: "Temperature spike detected",
      description: "Shipment SHIP002 exceeded 8°C",
      time: "8 min ago",
      level: "warning",
    },
    {
      icon: "📍",
      title: "Route deviation detected",
      description: "Shipment SHIP003 moved from planned route",
      time: "21 min ago",
      level: "danger",
    },
    {
      icon: "🔐",
      title: "Container opened",
      description: "Container access recorded for SHIP001",
      time: "42 min ago",
      level: "info",
    },
  ];

  return (
    <div className="alerts-card">
      <div className="card-heading">
        <div>
          <span className="section-label">MONITORING</span>
          <h2>Recent Alerts</h2>
        </div>

        <button className="view-all-button">
          View all
        </button>
      </div>

      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div
            className={`alert-item ${alert.level}`}
            key={index}
          >
            <div className="alert-icon">
              {alert.icon}
            </div>

            <div className="alert-content">
              <strong>{alert.title}</strong>
              <p>{alert.description}</p>
              <span>{alert.time}</span>
            </div>

            <div className="alert-arrow">›</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;