import StatCard from "./StatCard";
import SensorCard from "./SensorCard";
import FreshnessScore from "./FreshnessScore";
import SensorChart from "./SensorChart";
import Alerts from "./Alerts";
import ShipmentsTable from "./ShipmentsTable";

function Dashboard() {
  return (
    <>
      {/* Dashboard Heading */}
      <div className="heading-row">
        <div>
          <h1>Fresh Guard Overview</h1>
          <p>
            Real-time monitoring & tamper-evident traceability
          </p>
        </div>

        <div className="live-status">
          <span></span>
          Live IoT stream
          <small>updated every 3s</small>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <StatCard
          icon="📦"
          title="Total Shipments"
          value="12"
          change="+2 this week"
          color="blue"
        />

        <StatCard
          icon="🚚"
          title="Active Shipments"
          value="5"
          change="Currently in transit"
          color="purple"
        />

        <StatCard
          icon="⚠️"
          title="Active Alerts"
          value="3"
          change="Requires attention"
          color="red"
        />

        <StatCard
          icon="✓"
          title="Verified Records"
          value="28"
          change="Blockchain verified"
          color="green"
        />
      </div>

      {/* Live Sensors */}
      <div className="sensor-grid">
        <SensorCard
          icon="🌡️"
          title="Temperature"
          value="6.4"
          unit="°C"
          status="NORMAL"
          description="Current container temperature"
        />

        <SensorCard
          icon="💧"
          title="Humidity"
          value="74.6"
          unit="%"
          status="NORMAL"
          description="Current humidity level"
        />

        <SensorCard
          icon="🧪"
          title="Gas Level"
          value="166.7"
          unit="ppm"
          status="NORMAL"
          description="Air quality monitoring"
        />

        <SensorCard
          icon="🔒"
          title="Container"
          value="CLOSED"
          unit=""
          status="SECURE"
          description="Container security status"
        />
      </div>

      {/* Freshness */}
      <FreshnessScore />

      {/* Sensor Charts */}
      <div className="charts-grid">
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

      {/* Alerts + Shipments */}
      <div className="bottom-grid">
        <Alerts />
        <ShipmentsTable />
      </div>
    </>
  );
}

export default Dashboard;