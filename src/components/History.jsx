function History() {
  const records = [
    {
      time: "10:32 AM",
      date: "Today",
      event: "Temperature reading recorded",
      shipment: "SHIP001",
      value: "6.4°C",
      status: "Normal",
    },
    {
      time: "10:28 AM",
      date: "Today",
      event: "Humidity reading recorded",
      shipment: "SHIP001",
      value: "74.6%",
      status: "Normal",
    },
    {
      time: "10:21 AM",
      date: "Today",
      event: "Blockchain record verified",
      shipment: "SHIP003",
      value: "Verified",
      status: "Verified",
    },
    {
      time: "10:10 AM",
      date: "Today",
      event: "Shipment location updated",
      shipment: "SHIP002",
      value: "Indore",
      status: "Updated",
    },
    {
      time: "09:54 AM",
      date: "Today",
      event: "Gas level warning generated",
      shipment: "SHIP002",
      value: "214.5 ppm",
      status: "Warning",
    },
    {
      time: "09:30 AM",
      date: "Today",
      event: "Container security check",
      shipment: "SHIP004",
      value: "Closed",
      status: "Secure",
    },
  ];

  return (
    <div className="history-page">
      <div className="page-heading">
        <div>
          <span className="section-label">
            SYSTEM RECORDS
          </span>

          <h1>History</h1>

          <p>
            Historical sensor, shipment and integrity events.
          </p>
        </div>

        <button className="secondary-button">
          ↓ Export Records
        </button>
      </div>

      <div className="history-summary">
        <div>
          <strong>1,284</strong>
          <span>Total Records</span>
        </div>

        <div>
          <strong>342</strong>
          <span>Sensor Events</span>
        </div>

        <div>
          <strong>126</strong>
          <span>Verified Records</span>
        </div>

        <div>
          <strong>18</strong>
          <span>Alerts</span>
        </div>
      </div>

      <div className="history-card">
        <div className="card-heading">
          <div>
            <span className="section-label">AUDIT LOG</span>
            <h2>Recent Activity</h2>
          </div>

          <button className="view-all-button">
            Filter
          </button>
        </div>

        <div className="history-list">
          {records.map((record, index) => (
            <div className="history-item" key={index}>
              <div className="history-time">
                <strong>{record.time}</strong>
                <span>{record.date}</span>
              </div>

              <div className="history-line">
                <span></span>
              </div>

              <div className="history-event">
                <strong>{record.event}</strong>
                <span>
                  Shipment: {record.shipment}
                </span>
              </div>

              <div className="history-value">
                <strong>{record.value}</strong>

                <span
                  className={`history-status ${record.status.toLowerCase()}`}
                >
                  {record.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;