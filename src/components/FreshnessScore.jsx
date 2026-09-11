export default function FreshnessScore({ score = 92 }) {
  const getSummary = () => {
    if (score >= 90) {
      return 'Excellent condition. Temperature, humidity and gas readings are within the expected cold-chain range.'
    }

    if (score >= 75) {
      return 'Good condition. Some sensor readings require attention, but the shipment remains within an acceptable freshness range.'
    }

    if (score >= 50) {
      return 'Warning condition. Sensor readings indicate increased spoilage risk and require attention.'
    }

    return 'Critical condition. Sensor readings indicate a high spoilage risk and immediate action is recommended.'
  }

  return (
    <section className="panel freshness-card">
      <div className="section-heading">
        <h3>Freshness / Spoilage Score</h3>
        <span>Live model</span>
      </div>

      <div
        className="score-ring"
        style={{
          background: `conic-gradient(#16a36b 0 ${score}%, #e8edf2 ${score}% 100%)`,
        }}
      >
        <div className="score-ring-inner">
          <div>
            <div className="score-number">{score}</div>
            <div className="score-caption">out of 100</div>
          </div>
        </div>
      </div>

      <div className="score-summary">
        {getSummary()}
      </div>
    </section>
  )
}