export default function FreshnessScore({ score = 92 }) {
  return (
    <section className="panel freshness-card">
      <div className="section-heading">
        <h3>Freshness / Spoilage Score</h3>
        <span>Live model</span>
      </div>
      <div
        className="score-ring"
        style={{ background: `conic-gradient(#16a36b 0 ${score}%, #e8edf2 ${score}% 100%)` }}
      >
        <div className="score-ring-inner">
          <div>
            <div className="score-number">{score}</div>
            <div className="score-caption">out of 100</div>
          </div>
        </div>
      </div>
      <div className="score-summary">
        Excellent condition. Temperature, humidity and gas readings are
        currently within the expected cold-chain range.
      </div>
    </section>
  )
}
