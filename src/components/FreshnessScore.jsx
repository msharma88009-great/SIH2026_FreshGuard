function FreshnessScore() {
  const score = 92;

  return (
    <div className="freshness-card">
      <div className="freshness-header">
        <div>
          <span className="section-label">PRODUCT CONDITION</span>
          <h2>Freshness Score</h2>
          <p>Calculated from live IoT sensor conditions</p>
        </div>

        <div className="freshness-badge">
          ● Excellent
        </div>
      </div>

      <div className="freshness-content">
        <div className="score-circle">
          <div className="score-inner">
            <strong>{score}</strong>
            <span>/100</span>
          </div>
        </div>

        <div className="freshness-details">
          <div className="freshness-item">
            <span className="freshness-dot"></span>
            <div>
              <strong>Temperature</strong>
              <small>Within safe range</small>
            </div>
            <b>Good</b>
          </div>

          <div className="freshness-item">
            <span className="freshness-dot"></span>
            <div>
              <strong>Humidity</strong>
              <small>Optimal storage condition</small>
            </div>
            <b>Good</b>
          </div>

          <div className="freshness-item">
            <span className="freshness-dot"></span>
            <div>
              <strong>Gas Level</strong>
              <small>No spoilage indication</small>
            </div>
            <b>Good</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreshnessScore;