import SensorCard from './SensorCard'

export default function ShipmentDetails({ shipment, onBack }) {
  if (!shipment) return null

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Shipment Details</h2>
          <p>{shipment.id} • {shipment.product}</p>
        </div>
        <button className="secondary-button" onClick={onBack}>← Back to shipments</button>
      </div>

      <div className="detail-layout">
        <section className="detail-card">
          <div className="detail-head">
            <div>
              <strong>{shipment.product}</strong>
              <div className="shipment-id-small">{shipment.id}</div>
            </div>
            <span className={`status-pill ${shipment.status === 'Active' ? 'status-active' : shipment.status === 'Delayed' ? 'status-delayed' : 'status-completed'}`}>
              {shipment.status}
            </span>
          </div>
          <div className="detail-list">
            <div className="detail-row"><span>Origin</span><strong>{shipment.origin}</strong></div>
            <div className="detail-row"><span>Destination</span><strong>{shipment.destination}</strong></div>
            <div className="detail-row"><span>Container</span><strong>{shipment.container}</strong></div>
            <div className="detail-row"><span>Driver</span><strong>{shipment.driver}</strong></div>
            <div className="detail-row"><span>ETA</span><strong>{shipment.eta}</strong></div>
          </div>
        </section>

        <section className="detail-card">
          <div className="section-heading"><h3>Sensor Snapshot</h3><span>Live record</span></div>
          <div className="sensor-detail-grid">
            <SensorCard name="Temperature" value={shipment.temperature} unit="°C" status={shipment.temperature > 6 ? 'Warning' : 'Good'} icon="🌡" />
            <SensorCard name="Humidity" value={shipment.humidity} unit="%" status={shipment.humidity > 85 ? 'Warning' : 'Good'} icon="💧" />
            <SensorCard name="Gas Level" value={shipment.gas} unit=" ppm" status={shipment.gas > 0.4 ? 'Critical' : 'Good'} icon="◌" />
            <SensorCard name="Freshness" value={shipment.freshness} unit="%" status={shipment.freshness < 75 ? 'Warning' : 'Good'} icon="✦" />
          </div>
        </section>
      </div>
    </div>
  )
}
