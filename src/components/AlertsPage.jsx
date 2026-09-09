import { useState } from "react";

function AlertsPage() {
  const [filter, setFilter] = useState("All");

  const alerts = [
    {
      id: 1,
      type: "Critical",
      icon: "🌡️",
      title: "Temperature above safe limit",
      shipment: "SHIP002",
      description:
        "Temperature reached 8.7°C. Recommended cold-chain range exceeded.",
      time: "8 minutes ago",
      value: "8.7°C",
    },
    {
      id: 2,
      type: "Warning",
      icon: "📍",
      title: "Route deviation detected",
      shipment: "SHIP003",
      description:
        "Vehicle location differs from the planned shipment route.",
      time: "21 minutes ago",
      value: "2.4 km",
    },
    {
      id: 3,
      type: "Warning",
      icon: "🧪",
      title: "Gas level increased",
      shipment: "SHIP002",
      description:
        "Gas concentration is higher than the normal baseline.",
      time: "28 minutes ago",
      value: "214.5 ppm",
    },
    {
      id: 4,
      type: "Info",
      icon: "🔐",
      title: "Container opened",
      shipment: "SHIP001",
      description:
        "Container access was recorded by the IoT security sensor.",
      time: "42 minutes ago",
      value: "Verified",
    },
    {
      id: 5,
      type: "Resolved",
      icon: "✓",
      title: "Humidity returned to normal",
      shipment: "SHIP004",
      description:
        "Humidity level has returned to the acceptable operating range.",
      time: "1 hour ago",
      value: "68.5%",
    },
  ];

  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter((alert) => alert.type === filter);

  return (
    <div className="alerts-page">
      <div className="page-heading">
        <div>
          <span className="section-label">MONITORING</span>
          <h1>Alerts</h1>
          <p>
            Monitor temperature, route, sensor and security events.
          </p>
        </div>

        <div className="alert-count">
          <strong>3</strong>
          <span>Active alerts</span>
        </div>
      </div>

      <div className="alert-filter-bar">
        {["All", "Critical", "Warning", "Info", "Resolved"].map(
          (item) => (
            <button
              key={item}
              className={`filter-button ${
                filter === item ? "active" : ""
              }`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          )
        )}
      </div>

      <div className="alerts-page-list">
        {filteredAlerts.map((alert) => (
          <div
            className={`full-alert-card ${alert.type.toLowerCase()}`}
            key={alert.id}
          >
            <div className="full-alert-icon">
              {alert.icon}
            </div>

            <div className="full-alert-content">
              <div className="full-alert-top">
                <div>
                  <span className="alert-type">
                    {alert.type}
                  </span>

                  <h3>{alert.title}</h3>
                </div>

                <strong>{alert.value}</strong>
              </div>

              <p>{alert.description}</p>

              <div className="full-alert-footer">
                <span>Shipment: {alert.shipment}</span>
                <span>{alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="empty-state">
          <div>✓</div>
          <h2>No alerts found</h2>
          <p>
            There are no alerts in this category.
          </p>
        </div>
      )}
    </div>
  );
}

export default AlertsPage;