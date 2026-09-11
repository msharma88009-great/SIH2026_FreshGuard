import { useEffect, useState } from 'react'
import SensorCard from './SensorCard'
import SensorChart from './SensorChart'
import { getSensors } from '../services/api'

export default function LiveMonitoring() {
  const [sensors, setSensors] = useState([])

  useEffect(() => {
    async function loadSensors() {
      try {
        const result = await getSensors()
        setSensors(result.data || [])
      } catch (error) {
        console.error('Sensor API error:', error)
      }
    }

    loadSensors()

    const interval = setInterval(loadSensors, 5000)

    return () => clearInterval(interval)
  }, [])

  const latest = sensors[sensors.length - 1] || {}

  const temperature = latest.temperature ?? 4.2
  const humidity = latest.humidity ?? 78
  const gas = latest.gas_level ?? 0.18

  const temperatureStatus =
    temperature > 8 ? 'Critical' : temperature > 6 ? 'Warning' : 'Good'

  const humidityStatus =
    humidity > 85 ? 'Critical' : humidity > 75 ? 'Warning' : 'Good'

  const gasStatus =
    gas > 100 ? 'Critical' : gas > 50 ? 'Warning' : 'Good'

  const temperatureValues = sensors.length
    ? sensors.slice(-7).map((item) => Number(item.temperature ?? 0))
    : [4.2, 4.1, 4.3, 4.7, 4.4, 4.2, 4.2]

  const gasValues = sensors.length
    ? sensors.slice(-7).map((item) => Number(item.gas_level ?? 0))
    : [0.11, 0.13, 0.15, 0.17, 0.18, 0.16, 0.18]

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Live Monitoring</h2>
          <p>Current telemetry from connected ESP32 sensor nodes.</p>
        </div>
        <span className="status-pill status-active">● System Online</span>
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
          name="Location"
          value={latest.location?.latitude ? 'GPS Demo' : 'Nashik'}
          unit=""
          status="Good"
          icon="⌖"
        />
      </div>

      <div className="dashboard-section dashboard-grid">
        <SensorChart
          title="Temperature"
          values={temperatureValues}
        />

        <SensorChart
          title="Gas Level"
          values={gasValues}
        />
      </div>
    </div>
  )
}