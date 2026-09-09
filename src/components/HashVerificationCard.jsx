function HashVerificationCard({
  shipment,
  batch,
  status,
  hash,
  time,
}) {
  return (
    <div className="hash-verification-card">

      <div className="hash-card-top">

        <div className="hash-card-icon">
          🔐
        </div>

        <span
          className={`hash-status ${
            status?.toLowerCase()
          }`}
        >
          ✓ {status}
        </span>

      </div>

      <div className="hash-card-content">

        <span className="section-label">
          SHIPMENT
        </span>

        <h3>{shipment}</h3>

        <div className="hash-info">

          <div>
            <span>Batch ID</span>
            <strong>{batch}</strong>
          </div>

          <div>
            <span>Verified</span>
            <strong>{time}</strong>
          </div>

        </div>

        <div className="hash-value">

          <span>Record Hash</span>

          <code>{hash}</code>

          <button
            title="Copy hash"
            onClick={() =>
              navigator.clipboard?.writeText(hash)
            }
          >
            ⧉
          </button>

        </div>

      </div>
    </div>
  );
}

export default HashVerificationCard;