import { useState } from "react";
import {
  shipments,
  traceabilityEvents,
  hashRecords,
} from "../data/mockData";

function QRVerification() {
  const [batchId, setBatchId] = useState("");
  const [result, setResult] = useState(null);

  const verifyBatch = () => {
    const value = batchId.trim().toLowerCase();

    if (!value) {
      setResult({
        found: false,
        empty: true,
      });
      return;
    }

    const shipment = shipments.find(
      (item) =>
        item.id.toLowerCase() === value ||
        item.id.toLowerCase().includes(value)
    );

    if (!shipment) {
      setResult({
        found: false,
        empty: false,
      });
      return;
    }

    const hashRecord = hashRecords.find(
      (item) => item.recordId === shipment.id
    );

    setResult({
      found: true,
      shipment,
      hashRecord,
    });
  };

  const useDemoBatch = () => {
    setBatchId("FG-2026-001");
    setResult(null);
  };

  return (
    <div className="qr-verification-page">
      <div className="page-heading">
        <div>
          <h1>QR Verification</h1>
          <p>
            Verify product authenticity and complete farm-to-fork
            traceability.
          </p>
        </div>
      </div>

      <div className="qr-verification-card">
        <div className="qr-icon">▣</div>

        <h2>Scan & Trust</h2>

        <p>
          Enter a Shipment ID or Batch ID to verify the product.
        </p>

        <div className="qr-search">
          <input
            type="text"
            placeholder="Enter ID e.g. FG-2026-001"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                verifyBatch();
              }
            }}
          />

          <button onClick={verifyBatch}>
            Verify
          </button>
        </div>

        <button
          className="demo-link-button"
          onClick={useDemoBatch}
        >
          Try Demo: FG-2026-001
        </button>
      </div>

      {result?.empty && (
        <div className="verification-result error">
          <div className="result-icon">!</div>

          <div>
            <h3>Enter a Batch ID</h3>
            <p>
              Please enter a Shipment ID or Batch ID to continue.
            </p>
          </div>
        </div>
      )}

      {result && !result.found && !result.empty && (
        <div className="verification-result error">
          <div className="result-icon">✕</div>

          <div>
            <h3>Record Not Found</h3>
            <p>
              No verified shipment record was found for:
              <strong> {batchId}</strong>
            </p>
          </div>
        </div>
      )}

      {result?.found && (
        <div className="verification-result success">
          <div className="verification-header">
            <div>
              <span className="verified-badge">
                ✓ VERIFIED RECORD
              </span>

              <h2>{result.shipment.product}</h2>

              <p>
                Shipment ID: {result.shipment.id}
              </p>
            </div>

            <div className="freshness-result">
              <span>Freshness Score</span>
              <strong>
                {result.shipment.freshness}%
              </strong>
            </div>
          </div>

          <div className="verification-grid">
            <div className="verification-info">
              <span>Origin</span>
              <strong>{result.shipment.origin}</strong>
            </div>

            <div className="verification-info">
              <span>Destination</span>
              <strong>{result.shipment.destination}</strong>
            </div>

            <div className="verification-info">
              <span>Temperature</span>
              <strong>
                {result.shipment.temperature}°C
              </strong>
            </div>

            <div className="verification-info">
              <span>Humidity</span>
              <strong>
                {result.shipment.humidity}%
              </strong>
            </div>

            <div className="verification-info">
              <span>Status</span>
              <strong>{result.shipment.status}</strong>
            </div>

            <div className="verification-info">
              <span>Last Update</span>
              <strong>{result.shipment.lastUpdate}</strong>
            </div>
          </div>

          <div className="traceability-section">
            <h3>Farm-to-Fork Traceability</h3>

            <div className="verification-timeline">
              {traceabilityEvents.map((event, index) => (
                <div
                  className="verification-event"
                  key={event.stage}
                >
                  <div className="event-number">
                    {index + 1}
                  </div>

                  <div className="event-content">
                    <div className="event-top">
                      <strong>{event.stage}</strong>

                      <span
                        className={`event-status ${event.status.toLowerCase()}`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <p>{event.location}</p>

                    <small>{event.time}</small>

                    <div className="event-description">
                      {event.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="blockchain-verification">
            <div>
              <span>Blockchain Status</span>

              <strong>
                ✓ {result.hashRecord?.status || "Verified"}
              </strong>
            </div>

            <div>
              <span>Network</span>

              <strong>
                {result.hashRecord?.blockchain ||
                  "Hyperledger Fabric"}
              </strong>
            </div>

            <div className="hash-value">
              <span>Record Hash</span>

              <code>
                {result.hashRecord?.hash ||
                  "Hash unavailable"}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QRVerification;