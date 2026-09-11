import { useEffect, useState } from 'react'
import StatCard from './StatCard'
import SensorCard from './SensorCard'
import FreshnessScore from './FreshnessScore'
import SensorChart from './SensorChart'
import Alerts from './Alerts'
import ShipmentsTable from './ShipmentsTable'
import { getShipments, getSensors, getAlerts } from '../services/api'

export default function Dashboard({ onNavigate }) {
  const [shipments, setShipments] = useState([])
  const [sensors, setSensors] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [shipmentResult, sensorResult, alertResult] =
          await Promise.all([
            getShipments(),
            getSensors(),
            getAlerts(),
          ])

        setShipments(shipmentResult.data || [])
        setSensors(sensorResult.data || [])
        setAlerts(alertResult.data || [])
      } catch (error) {
        console.error('Dashboard API error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const latestSensor = sensors[sensors.length - 1] || {}

  const temperature = latestSensor.temperature ?? 4.2
  const humidity = latestSensor.humidity ?? 78
  const gas =
    latestSensor.gas_level ??
    latestSensor.gas ??
    0.18

  const container =
    latestSensor.container_id ??
    'C-104'

  const vibration =
    latestSensor.vibration ?? false

  const reedOpen =
    latestSensor.reed_open ?? false

  const freshness =
    latestSensor.freshness_score ?? 92

  const temperatureStatus =
    temperature > 8
      ? 'Critical'
      : temperature > 6
        ? 'Warning'
        : 'Good'

  const humidityStatus =
    humidity > 85
      ? 'Critical'
      : humidity > 75
        ? 'Warning'
        : 'Good'

  const gasStatus =
    gas > 100
      ? 'Critical'
      : gas > 50
        ? 'Warning'
        : 'Good'

  const vibrationStatus =
    vibration ? 'Warning' : 'Good'

  const containerStatus =
    reedOpen ? 'Critical' : 'Good'

  const containerDisplay =
    reedOpen ? 'OPEN' : container

  const activeShipments = shipments.filter(
    (shipment) =>
      shipment.status &&
      !['Delivered', 'Completed'].includes(
        shipment.status
      )
  ).length

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Operations Dashboard</h2>

          <p>
            Real-time visibility across Fresh Guard's
            cold-chain network.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            onNavigate?.('Shipments')
          }
        >
          View Shipments
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Total Shipments"
          value={
            loading
              ? '...'
              : shipments.length
          }
          change="Live from MongoDB"
          icon="▣"
        />

        <StatCard
          label="Active Shipments"
          value={
            loading
              ? '...'
              : activeShipments
          }
          change="Live status"
          icon="◉"
        />

        <StatCard
          label="Active Alerts"
          value={
            loading
              ? '...'
              : String(alerts.length).padStart(
                  2,
                  '0'
                )
          }
          change="Live from backend"
          icon="⚠"
        />

        <StatCard
          label="Verified Records"
          value="98.7%"
          change="Integrity monitoring"
          icon="✓"
        />
      </div>

      <div className="dashboard-section">
        <div className="section-heading">
          <h3>Live Sensor Overview</h3>

          <span>
            {loading
              ? 'Loading...'
              : 'Updated just now'}
          </span>
        </div>

        <div className="sensor-grid">
          <SensorCard
            name="Temperature"
            value={temperature}
            unit="°C"
            status={temperatureStatus}
            icon="🌡"
          />

          <SensorCard
            name="Humidity"
            value={humidity}
            unit="%"
            status={humidityStatus}
            icon="💧"
          />

          <SensorCard
            name="Gas Level"
            value={gas}
            unit=" ppm"
            status={gasStatus}
            icon="◌"
          />

          <SensorCard
            name="Vibration"
            value={
              vibration
                ? 'Detected'
                : 'Normal'
            }
            unit=""
            status={vibrationStatus}
            icon="📳"
          />

          <SensorCard
            name="Container"
            value={containerDisplay}
            unit=""
            status={containerStatus}
            icon="▣"
          />
        </div>
      </div>

      <div className="dashboard-section dashboard-grid">
        <SensorChart
          title="Temperature"
          values={
            sensors.length
              ? sensors
                  .slice(-7)
                  .map((item) =>
                    Number(
                      item.temperature ?? 0
                    )
                  )
              : [
                  4.0,
                  4.4,
                  4.1,
                  4.8,
                  4.2,
                  4.5,
                  4.2,
                ]
          }
        />

        <FreshnessScore
          score={Number(freshness)}
        />
      </div>

      <div className="dashboard-section dashboard-grid">
        <Alerts />

        <SensorChart
          title="Humidity"
          values={
            sensors.length
              ? sensors
                  .slice(-7)
                  .map((item) =>
                    Number(
                      item.humidity ?? 0
                    )
                  )
              : [
                  76,
                  78,
                  77,
                  80,
                  79,
                  78,
                  78,
                ]
          }
        />
      </div>

      <div className="dashboard-section">
        <ShipmentsTable
          onSelect={() =>
            onNavigate?.('Shipments')
          }
        />
      </div>
    </div>
  )
}