function ShipmentDetails({ shipment, onBack }) {
  if (!shipment) {
    return (
      <div className="empty-state">
        <h2>No shipment selected</h2>
        <button onClick={onBack}>
          ← Back to Shipments
        </button>
      </div>
    );
  }

  return (
    <div className="shipment-details-page">

      <button className="back-button" onClick={onBack}>
        ← Back to Shipments
      </button>

      <div className="details-heading">
        <div>
          <span className="section-label">
            SHIPMENT DETAILS
          </span>

          <h1>{shipment.id}</h1>

          <p>{shipment.product}</p>
        </div>

        <span
          className={`shipment-status ${
            shipment.status?.toLowerCase().replace(/\s+/g, "-")
          }`}
        >
          {shipment.status}
        </span>
      </div>

      <div className="detail-stats-grid">

        <div className="detail-stat">
          <span>🌡️ Temperature</span>
          <strong>
            {shipment.temperature || "6.4°C"}
          </strong>
          <small>Within safe range</small>
        </div>

        <div className="detail-stat">
          <span>💧 Humidity</span>
          <strong>
            {shipment.humidity || "74.6%"}
          </strong>
          <small>Normal condition</small>
        </div>

        <div className="detail-stat">
          <span>🧪 Gas Level</span>
          <strong>
            {shipment.gas || "166.7 ppm"}
          </strong>
          <small>No spoilage indication</small>
        </div>

        <div className="detail-stat">
          <span>🌱 Freshness</span>
          <strong>
            {shipment.freshness || 92}%
          </strong>
          <small>Excellent condition</small>
        </div>

      </div>

      <div className="details-grid">

        {/* Shipment Route */}

        <div className="detail-panel">

          <div className="panel-heading">
            <h2>Shipment Route</h2>
            <span>Live route</span>
          </div>

          <div className="route-timeline">

            <div className="timeline-location">
              <span className="timeline-dot active"></span>

              <div>
                <small>SOURCE</small>

                <strong>
                  {shipment.source}
                </strong>

                <p>Shipment started</p>
              </div>
            </div>

            <div className="timeline-line"></div>

            <div className="timeline-location">
              <span className="timeline-dot current"></span>

              <div>
                <small>CURRENT LOCATION</small>

                <strong>
                  {shipment.currentLocation || "In Transit"}
                </strong>

                <p>
                  IoT location tracking active
                </p>
              </div>
            </div>

            <div className="timeline-line"></div>

            <div className="timeline-location">
              <span className="timeline-dot destination"></span>

              <div>
                <small>DESTINATION</small>

                <strong>
                  {shipment.destination}
                </strong>

                <p>Expected delivery</p>
              </div>
            </div>

          </div>
        </div>

        {/* Integrity Record */}

        <div className="detail-panel">

          <div className="panel-heading">
            <h2>Integrity Record</h2>
            <span>Blockchain</span>
          </div>

          <div className="integrity-record">

            <div className="integrity-row">
              <span>Record Status</span>

              <strong className="verified-text">
                ✓ Verified
              </strong>
            </div>

            <div className="integrity-row">
              <span>Batch ID</span>

              <strong>
                {shipment.batchId || "BATCH-2026-001"}
              </strong>
            </div>

            <div className="integrity-row">
              <span>Previous Hash</span>

              <code>
                8f4a91...c72d
              </code>
            </div>

            <div className="integrity-row">
              <span>Current Hash</span>

              <code>
                a71bc4...91ef
              </code>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ShipmentDetails;