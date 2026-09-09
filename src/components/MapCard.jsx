function MapCard() {
  return (
    <div className="map-card">
      <div className="map-header">
        <div>
          <span className="section-label">
            LIVE LOCATION
          </span>
          <h2>Active Shipment Routes</h2>
        </div>

        <div className="map-legend">
          <span>
            <i className="legend-dot active"></i>
            Active
          </span>

          <span>
            <i className="legend-dot alert"></i>
            Alert
          </span>
        </div>
      </div>

      <div className="map-area">
        <div className="map-grid"></div>

        <div className="map-road road-one"></div>
        <div className="map-road road-two"></div>
        <div className="map-road road-three"></div>

        <div className="map-route route-one"></div>
        <div className="map-route route-two"></div>
        <div className="map-route route-three"></div>

        <div className="map-marker marker-one">
          🚚
          <span>SHIP001</span>
        </div>

        <div className="map-marker marker-two alert-marker">
          🚚
          <span>SHIP002</span>
        </div>

        <div className="map-marker marker-three">
          🚚
          <span>SHIP003</span>
        </div>

        <div className="map-location location-nashik">
          <span></span>
          Nashik
        </div>

        <div className="map-location location-pune">
          <span></span>
          Pune
        </div>

        <div className="map-location location-mumbai">
          <span></span>
          Mumbai
        </div>

        <div className="map-location location-delhi">
          <span></span>
          Delhi
        </div>

        <div className="map-overlay">
          <strong>3 Active Vehicles</strong>
          <span>GPS data received</span>
        </div>
      </div>
    </div>
  );
}

export default MapCard;