export default function FreshnessScore({ score }) {
  const hasScore = Number.isFinite(Number(score))
  const numericScore = hasScore ? Math.max(0, Math.min(100, Number(score))) : null

  const getSummary = () => {
    if (numericScore == null) return 'Waiting for sensor telemetry. Freshness will be calculated when a valid reading is received.'
    if (numericScore >= 90) return 'Excellent condition. Temperature, humidity and gas readings are within the expected cold-chain range.'
    if (numericScore >= 75) return 'Good condition. Some sensor readings require attention, but the shipment remains within an acceptable freshness range.'
    if (numericScore >= 50) return 'Warning condition. Sensor readings indicate increased spoilage risk and require attention.'
    return 'Critical condition. Sensor readings indicate a high spoilage risk and immediate action is recommended.'
  }

  return (
    <section className="panel freshness-card">
      <div className="section-heading">
        <h3>Freshness / Spoilage Score</h3>
        <span>{numericScore == null ? 'Waiting' : 'Live model'}</span>
      </div>
      {numericScore == null ? (
        <div className="score-empty">
          <div className="score-empty-mark">—</div>
          <strong>Awaiting telemetry</strong>
          <span>Score appears after the first valid sensor packet.</span>
        </div>
      ) : (
        <div className="score-ring" style={{ background: `conic-gradient(#16a36b 0 ${numericScore}%, #e8edf2 ${numericScore}% 100%)` }}>
          <div className="score-ring-inner">
            <div>
              <div className="score-number">{numericScore}</div>
              <div className="score-caption">out of 100</div>
            </div>
          </div>
        </div>
      )}
      <div className="score-summary">{getSummary()}</div>
    </section>
  )
}
