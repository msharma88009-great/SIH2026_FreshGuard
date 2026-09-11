import { useEffect, useState } from 'react'
import SensorCard from './SensorCard'
import { getSensors } from '../services/api'

export default function ShipmentDetails({ shipment, onBack }) {
  const [sensor, setSensor] = useState(null)

  useEffect(() => {
    if (!shipment?.shipment_id) return

    async function loadSensor() {
      try {
        const result = await getSensors(shipment.shipment_id)
        const readings = result.data || []
        setSensor(readings[readings.length - 1] || null)
      } catch (error) {
        console.error('Shipment sensor API error:', error)
      }
    }

    loadSensor()
  }, [shipment])

  if (!shipment) return null

  const temperature = sensor?.temperature ?? '—'
  const humidity = sensor?.humidity ?? '—'
  const gas = sensor?.gas_level ?? '—'
  const freshness =
    sensor?.freshness_score ?? shipment.freshness_score ?? '—'

  const temperatureStatus =
    temperature !== '—'
      ? temperature > 8
        ? 'Critical'
        : temperature > 6
          ? 'Warning'
          : 'Good'
      : 'Good'

  const humidityStatus =
    humidity !== '—'
      ? humidity > 85
        ? 'Critical'
        : humidity > 75
          ? 'Warning'
          : 'Good'
      : 'Good'

  const gasStatus =
    gas !== '—'
      ? gas > 100
        ? 'Critical'
        : gas > 50
          ? 'Warning'
          : 'Good'
      : 'Good'

  const freshnessStatus =
    freshness !== '—'
      ? freshness < 50
        ? 'Critical'
        : freshness < 75
          ? 'Warning'
          : 'Good'
      : 'Good'

  const statusClass =
    shipment.status === 'Active' || shipment.status === 'In Transit'
      ? 'status-active'
      : shipment.status === 'Delayed'
        ? 'status-delayed'
        : 'status-completed'

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Shipment Details</h2>
          <p>
            {shipment.shipment_id} • {shipment.product}
          </p>
        </div>

        <button className="secondary-button" onClick={onBack}>
          ← Back to shipments
        </button>
      </div>

      <div className="detail-layout">
        <section className="detail-card">
          <div className="detail-head">
            <div>
              <strong>{shipment.product}</strong>
              <div className="shipment-id-small">
                {shipment.shipment_id}
              </div>
            </div>

            <span className={`status-pill ${statusClass}`}>
              {shipment.status}
            </span>
          </div>

          <div className="detail-list">
            <div className="detail-row">
              <span>Origin</span>
              <strong>{shipment.origin}</strong>
            </div>

            <div className="detail-row">
              <span>Destination</span>
              <strong>{shipment.destination}</strong>
            </div>

            <div className="detail-row">
              <span>Container</span>
              <strong>{sensor?.container_id ?? 'C-104'}</strong>
            </div>

            <div className="detail-row">
              <span>Created</span>
              <strong>
                {shipment.created_at
                  ? new Date(shipment.created_at).toLocaleString()
                  : '—'}
              </strong>
            </div>

            <div className="detail-row">
              <span>Shipment ID</span>
              <strong>{shipment.shipment_id}</strong>
            </div>
          </div>
        </section>

        <section className="detail-card">
          <div className="section-heading">
            <h3>Sensor Snapshot</h3>
            <span>Live record</span>
          </div>

          <div className="sensor-detail-grid">
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
              name="Freshness"
              value={freshness}
              unit="%"
              status={freshnessStatus}
              icon="✦"
            />
          </div>
        </section>
      </div>
    </div>
  )
}