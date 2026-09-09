import MapCard from "./MapCard";

function MapTracking() {
  return (
    <div className="map-tracking-page">
      <div className="page-heading">
        <div>
          <span className="section-label">
            GPS MONITORING
          </span>
          <h1>Map Tracking</h1>
          <p>
            Track active shipments and their live locations.
          </p>
        </div>

        <div className="live-status">
          <span></span>
          GPS Live
          <small>Updated every 10s</small>
        </div>
      </div>

      <MapCard />

      <div className="location-summary">
        <div className="location-card">
          <div className="location-icon">🚚</div>

          <div>
            <span>SHIP001</span>
            <strong>Nashik → Mumbai</strong>
            <small>Currently near Igatpuri</small>
          </div>

          <b>92%</b>
        </div>

        <div className="location-card">
          <div className="location-icon">🚚</div>

          <div>
            <span>SHIP002</span>
            <strong>Pune → Delhi</strong>
            <small>Currently near Indore</small>
          </div>

          <b>76%</b>
        </div>

        <div className="location-card">
          <div className="location-icon">🚚</div>

          <div>
            <span>SHIP003</span>
            <strong>Ratnagiri → Pune</strong>
            <small>Currently near Kolhapur</small>
          </div>

          <b>95%</b>
        </div>
      </div>
    </div>
  );
}

export default MapTracking;