export default function MapCard({ shipment }) {
  const hasLocation = Boolean(
    shipment &&
      ((Number.isFinite(Number(shipment.latitude)) && Number.isFinite(Number(shipment.longitude))) ||
        (Number.isFinite(Number(shipment.lat)) && Number.isFinite(Number(shipment.lng))))
  )

  return (
    <div className="map-card map-card-modern">
      <div className="map-toolbar">
        <span className={`map-live-dot ${hasLocation ? '' : 'map-live-dot-waiting'}`} />
        {hasLocation ? 'Live shipment location' : shipment ? 'Shipment selected • location pending' : 'Awaiting shipment location'}
        <span className="map-source">Backend GPS data</span>
      </div>
      <div className="map-canvas map-empty-canvas">
        <div className="map-grid-lines" />
        {hasLocation ? (
          <div className="map-location-card">
            <div className="map-location-pin">⌖</div>
            <strong>{shipment.shipment_id}</strong>
            <span>{shipment.product}</span>
            <small>Live GPS coordinates received</small>
          </div>
        ) : (
          <div className="map-empty-message">
            <div>
              <div className="map-empty-icon">⌖</div>
              <strong>{shipment ? 'Location data not available yet' : 'No live shipment location'}</strong>
              <span>{shipment ? 'This shipment exists in the backend, but no GPS coordinates have been received.' : 'Map markers and routes will appear when the ESP32/backend provides valid GPS data.'}</span>
            </div>
          </div>
        )}
      </div>
      {shipment && <div className="map-summary"><div><span>Shipment</span><strong>{shipment.shipment_id}</strong></div><div><span>Product</span><strong>{shipment.product}</strong></div><div><span>Status</span><strong>{shipment.status}</strong></div></div>}
    </div>
  )
}
