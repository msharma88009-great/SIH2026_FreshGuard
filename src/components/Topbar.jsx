import { useState } from "react";
import { alerts } from "../data/mockData";

function Topbar() {
  const [showNotifications, setShowNotifications] =
    useState(false);

  const highAlerts = alerts.filter(
    (alert) => alert.severity === "High"
  ).length;

  return (
    <header className="topbar">
      <div className="topbar-search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search shipments, batches..."
        />
      </div>

      <div className="topbar-right">
        <div className="notification-wrapper">
          <button
            className="notification-button"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
          >
            🔔

            {alerts.length > 0 && (
              <span className="notification-count">
                {alerts.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <div>
                  <h3>Notifications</h3>
                  <span>
                    {alerts.length} active alerts
                  </span>
                </div>

                <button
                  onClick={() =>
                    setShowNotifications(false)
                  }
                >
                  ×
                </button>
              </div>

              <div className="notification-list">
                {alerts.map((alert) => (
                  <div
                    className="notification-item"
                    key={alert.id}
                  >
                    <div className="notification-icon">
                      ⚠
                    </div>

                    <div>
                      <strong>{alert.type} Alert</strong>

                      <p>{alert.message}</p>

                      <small>
                        {alert.shipmentId} · {alert.time}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="notification-footer">
                <span>
                  {highAlerts} high priority alert
                  {highAlerts !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="topbar-divider"></div>

        <div className="user-profile">
          <div className="user-avatar">
            A
          </div>

          <div className="user-info">
            <strong>Admin</strong>
            <span>Cold Chain Operations</span>
          </div>

          <span className="user-arrow">⌄</span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;