export default function HashVerificationCard({ record }) {
  return (
    <article className="hash-card">
      <div className="hash-head">
        <div>
          <strong>{record.id} • {record.shipmentId}</strong>
          <div className="shipment-id-small">{record.timestamp}</div>
        </div>
        <span className="status-pill status-active">✓ {record.status}</span>
      </div>
      <div className="hash-code">Current hash: {record.hash}<br />Previous hash: {record.previousHash}</div>
      <div className="hash-meta"><span>SHA-256 chain record</span><span>Tamper-evident link</span></div>
    </article>
  )
}
