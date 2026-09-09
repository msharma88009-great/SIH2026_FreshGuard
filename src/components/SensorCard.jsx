function SensorCard({
  icon,
  title,
  value,
  unit,
  status,
  description,
}) {
  const statusClass =
    status?.toLowerCase() === "normal"
      ? "normal"
      : status?.toLowerCase() === "secure"
      ? "secure"
      : "warning";

  return (
    <div className="sensor-card">
      <div className="sensor-card-header">
        <div className="sensor-icon">{icon}</div>

        <span className={`sensor-status ${statusClass}`}>
          <span className="status-dot"></span>
          {status}
        </span>
      </div>

      <div className="sensor-title">
        {title}
      </div>

      <div className="sensor-value">
        <strong>{value}</strong>

        {unit && (
          <span>{unit}</span>
        )}
      </div>

      <p className="sensor-description">
        {description}
      </p>
    </div>
  );
}

export default SensorCard;