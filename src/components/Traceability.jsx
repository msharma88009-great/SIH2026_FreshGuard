import TraceabilityTimeline from "./TraceabilityTimeline";

function Traceability() {
  return (
    <div className="traceability-page">
      <div className="page-heading">
        <div>
          <span className="section-label">
            FARM TO FORK
          </span>

          <h1>Traceability</h1>

          <p>
            Follow a product through every stage of its journey.
          </p>
        </div>

        <div className="verified-header">
          <span>✓</span>
          Blockchain Verified
        </div>
      </div>

      <div className="trace-search-card">
        <div>
          <span className="section-label">
            TRACE A BATCH
          </span>

          <h2>Find Product Journey</h2>

          <p>
            Enter a shipment or batch ID to view its complete
            history.
          </p>
        </div>

        <div className="trace-search">
          <input
            type="text"
            placeholder="Enter Batch ID e.g. BATCH-2026-001"
            defaultValue="BATCH-2026-001"
          />

          <button className="primary-button">
            Trace Batch
          </button>
        </div>
      </div>

      <div className="trace-product-card">
        <div className="product-icon">🍅</div>

        <div className="product-info">
          <span>PRODUCT</span>
          <h2>Fresh Tomatoes</h2>
          <p>Batch ID: BATCH-2026-001</p>
        </div>

        <div className="product-status">
          <span>Current Status</span>
          <strong>✓ In Transit</strong>
        </div>

        <div className="product-freshness">
          <span>Freshness</span>
          <strong>92%</strong>
        </div>
      </div>

      <TraceabilityTimeline />
    </div>
  );
}

export default Traceability;