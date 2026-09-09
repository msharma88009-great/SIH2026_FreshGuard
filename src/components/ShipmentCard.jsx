export default function ShipmentCard({ shipment, onClick }) {
  return (
    <button className="shipment-card" onClick={() => onClick?.(shipment)} style={{ width: '100%', border: '1px solid var(--line)', textAlign: 'left' }}>
      <div className="shipment-card-head">
        <div>
          <div className="shipment-product">{shipment.product}</div>
          <div className="shipment-id-small">{shipment.id} • {shipment.container}</div>
        </div>
        <span className={`status-pill ${
          shipment.status === 'Active' ? 'status-active' :
          shipment.status === 'Delayed' ? 'status-delayed' : 'status-completed'
        }`}>{shipment.status}</span>
      </div>
      <div className="shipment-route">{shipment.origin} → {shipment.destination}<br />ETA: {shipment.eta}</div>
      <div className="shipment-metrics">
        <div className="mini-metric"><span>Temp</span><strong>{shipment.temperature}°C</strong></div>
        <div className="mini-metric"><span>Humidity</span><strong>{shipment.humidity}%</strong></div>
        <div className="mini-metric"><span>Freshness</span><strong>{shipment.freshness}%</strong></div>
      </div>
    </button>
  )
}
