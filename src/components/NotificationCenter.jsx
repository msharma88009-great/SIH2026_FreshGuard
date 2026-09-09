import { useState } from "react";

function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: "🌡️",
      title: "Temperature alert",
      message:
        "SHIP002 temperature reached 8.7°C.",
      time: "8 min ago",
      unread: true,
      type: "warning",
    },
    {
      id: 2,
      icon: "📍",
      title: "Route deviation",
      message:
        "SHIP003 has moved from the planned route.",
      time: "21 min ago",
      unread: true,
      type: "danger",
    },
    {
      id: 3,
      icon: "🔐",
      title: "Record verified",
      message:
        "BATCH-2026-001 integrity verification completed.",
      time: "42 min ago",
      unread: false,
      type: "success",
    },
    {
      id: 4,
      icon: "📡",
      title: "IoT sync completed",
      message:
        "Offline sensor records synchronized successfully.",
      time: "1 hour ago",
      unread: false,
      type: "info",
    },
  ]);

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  return (
    <div className="notification-center">

      <div className="page-heading">
        <div>
          <span className="section-label">
            SYSTEM UPDATES
          </span>

          <h1>Notification Center</h1>

          <p>
            Alerts and important Fresh Guard system updates.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={markAllRead}
        >
          ✓ Mark all as read
        </button>
      </div>

      <div className="notification-summary">

        <div>
          <strong>
            {
              notifications.filter(
                (item) => item.unread
              ).length
            }
          </strong>

          <span>Unread</span>
        </div>

        <div>
          <strong>{notifications.length}</strong>
          <span>Total notifications</span>
        </div>

      </div>

      <div className="notification-list">

        {notifications.map((notification) => (
          <div
            className={`notification-item ${
              notification.unread ? "unread" : ""
            }`}
            key={notification.id}
          >

            <div
              className={`notification-icon ${notification.type}`}
            >
              {notification.icon}
            </div>

            <div className="notification-content">

              <div className="notification-title">
                <strong>
                  {notification.title}
                </strong>

                {notification.unread && (
                  <span className="unread-dot"></span>
                )}
              </div>

              <p>{notification.message}</p>

              <span>
                {notification.time}
              </span>

            </div>

            <button className="notification-more">
              ⋮
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default NotificationCenter;