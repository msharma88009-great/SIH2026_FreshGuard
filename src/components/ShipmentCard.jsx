export default function ShipmentCard({ shipment, onClick }) {
  const statusClass =
    shipment.status === 'Active' || shipment.status === 'In Transit'
      ? 'status-active'
      : shipment.status === 'Delayed'
        ? 'status-delayed'
        : 'status-completed'

  return (
    <button
      className="shipment-card"
      onClick={() => onClick?.(shipment)}
      style={{
        width: '100%',
        border: '1px solid var(--line)',
        textAlign: 'left',
      }}
    >
      <div className="shipment-card-head">
        <div>
          <div className="shipment-product">{shipment.product}</div>
          <div className="shipment-id-small">
            {shipment.shipment_id}
          </div>
        </div>

        <span className={`status-pill ${statusClass}`}>
          {shipment.status}
        </span>
      </div>

      <div className="shipment-route">
        {shipment.origin} → {shipment.destination}
      </div>

      <div className="shipment-metrics">
        <div className="mini-metric">
          <span>Freshness</span>
          <strong>
            {shipment.freshness_score ?? '—'}%
          </strong>
        </div>

        <div className="mini-metric">
          <span>Created</span>
          <strong>
            {shipment.created_at
              ? new Date(shipment.created_at).toLocaleDateString()
              : '—'}
          </strong>
        </div>

        <div className="mini-metric">
          <span>Status</span>
          <strong>{shipment.status}</strong>
        </div>
      </div>
    </button>
  )
}