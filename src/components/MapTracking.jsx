import MapCard from './MapCard'
import { shipments } from '../data/mockData'

export default function MapTracking() {
  const active = shipments.filter((item) => item.status !== 'Completed')

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Map Tracking</h2>
          <p>Location-aware shipment tracking across the route.</p>
        </div>
      </div>

      <div className="map-layout">
        <MapCard />
        <section className="panel">
          <div className="section-heading"><h3>Tracked Containers</h3><span>{active.length} active</span></div>
          <div className="location-list">
            {active.map((item) => (
              <div className="location-item" key={item.id}>
                <strong>{item.container} • {item.product}</strong>
                <span>{item.origin} → {item.destination}</span>
                <span>Current temperature: {item.temperature}°C</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
