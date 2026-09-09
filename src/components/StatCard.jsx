function StatCard({
  icon,
  title,
  value,
  change,
  color = "blue",
}) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-card-top">
        <div className="stat-icon">{icon}</div>

        <span className="stat-indicator">●</span>
      </div>

      <div className="stat-content">
        <span className="stat-title">{title}</span>

        <strong className="stat-value">{value}</strong>

        {change && (
          <span className="stat-change">
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;