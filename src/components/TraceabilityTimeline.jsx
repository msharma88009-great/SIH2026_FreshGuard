function TraceabilityTimeline() {
  const stages = [
    {
      icon: "🌱",
      stage: "FARM",
      title: "Harvest & Registration",
      location: "Nashik, Maharashtra",
      time: "08 Sep 2026 • 06:30 AM",
      status: "Verified",
      details:
        "Product batch registered and initial quality data captured.",
    },
    {
      icon: "📦",
      stage: "COLLECTION",
      title: "Collection Center",
      location: "Nashik Collection Center",
      time: "08 Sep 2026 • 10:15 AM",
      status: "Verified",
      details:
        "Temperature and humidity conditions recorded before dispatch.",
    },
    {
      icon: "🏭",
      stage: "PROCESSING",
      title: "Processing & Packaging",
      location: "Nashik Processing Unit",
      time: "08 Sep 2026 • 02:40 PM",
      status: "Verified",
      details:
        "Batch processed, packaged and assigned a traceability record.",
    },
    {
      icon: "🚚",
      stage: "TRANSPORT",
      title: "Cold Chain Transit",
      location: "Nashik → Mumbai",
      time: "09 Sep 2026 • 08:00 AM",
      status: "Live",
      details:
        "ESP32 sensor node is transmitting temperature, humidity and gas data.",
    },
    {
      icon: "🏪",
      stage: "RETAIL",
      title: "Retail Distribution",
      location: "Mumbai",
      time: "Expected • 09 Sep 2026",
      status: "Pending",
      details:
        "Shipment will be received and verified at the retail location.",
    },
    {
      icon: "👤",
      stage: "CONSUMER",
      title: "Scan & Trust",
      location: "Final Consumer",
      time: "After Delivery",
      status: "Pending",
      details:
        "Consumer can scan the QR code to verify product history.",
    },
  ];

  return (
    <div className="timeline-card">
      <div className="card-heading">
        <div>
          <span className="section-label">
            JOURNEY
          </span>

          <h2>Farm to Fork Timeline</h2>
        </div>

        <span className="timeline-progress">
          4 / 6 stages
        </span>
      </div>

      <div className="trace-timeline">
        {stages.map((stage, index) => (
          <div
            className={`trace-stage ${stage.status.toLowerCase()}`}
            key={stage.stage}
          >
            <div className="trace-stage-marker">
              <span>{stage.icon}</span>
            </div>

            {index < stages.length - 1 && (
              <div className="trace-stage-line"></div>
            )}

            <div className="trace-stage-content">
              <div className="trace-stage-top">
                <div>
                  <span>{stage.stage}</span>
                  <h3>{stage.title}</h3>
                </div>

                <strong>{stage.status}</strong>
              </div>

              <p>{stage.details}</p>

              <div className="trace-stage-meta">
                <span>📍 {stage.location}</span>
                <span>◷ {stage.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TraceabilityTimeline;