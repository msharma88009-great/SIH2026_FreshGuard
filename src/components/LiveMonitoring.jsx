import SensorCard from "./SensorCard";
import SensorChart from "./SensorChart";
import FreshnessScore from "./FreshnessScore";

function LiveMonitoring() {
  return (
    <div className="monitoring-page">
      <div className="page-heading">
        <div>
          <span className="section-label">
            IOT MONITORING
          </span>
          <h1>Live Monitoring</h1>
          <p>
            Real-time sensor data from active cold-chain
            containers.
          </p>
        </div>

        <div className="live-status">
          <span></span>
          IoT Connected
          <small>Updated just now</small>
        </div>
      </div>

      <div className="sensor-grid">
        <SensorCard
          icon="🌡️"
          title="Temperature"
          value="6.4"
          unit="°C"
          status="NORMAL"
          description="Safe range: 2°C – 8°C"
        />

        <SensorCard
          icon="💧"
          title="Humidity"
          value="74.6"
          unit="%"
          status="NORMAL"
          description="Safe range: 60% – 80%"
        />

        <SensorCard
          icon="🧪"
          title="Gas Level"
          value="166.7"
          unit="ppm"
          status="NORMAL"
          description="No spoilage indication"
        />

        <SensorCard
          icon="📡"
          title="IoT Gateway"
          value="ONLINE"
          unit=""
          status="SECURE"
          description="Last sync: 3 seconds ago"
        />
      </div>

      <div className="charts-grid monitoring-charts">
        <SensorChart
          title="Temperature"
          unit="°C"
          value="6.4"
          type="temperature"
        />

        <SensorChart
          title="Humidity"
          unit="%"
          value="74.6"
          type="humidity"
        />

        <SensorChart
          title="Gas Level"
          unit="ppm"
          value="166.7"
          type="gas"
        />
      </div>

      <FreshnessScore />

      <div className="monitoring-info-grid">
        <div className="info-panel">
          <span>DEVICE ID</span>
          <strong>ESP32-FG-001</strong>
          <small>Container sensor node</small>
        </div>

        <div className="info-panel">
          <span>NETWORK</span>
          <strong>LoRa + MQTT</strong>
          <small>Low-power data transmission</small>
        </div>

        <div className="info-panel">
          <span>DATA STORAGE</span>
          <strong>MicroSD + MongoDB</strong>
          <small>Offline-first architecture</small>
        </div>

        <div className="info-panel">
          <span>SYNC STATUS</span>
          <strong>✓ Synchronized</strong>
          <small>Last record synced successfully</small>
        </div>
      </div>
    </div>
  );
}

export default LiveMonitoring;