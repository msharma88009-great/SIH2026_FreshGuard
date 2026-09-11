import { useEffect, useState } from 'react'
import { getShipments, getSensors } from '../services/api'

export default function ShipmentsTable({ onSelect }) {
  const [shipments, setShipments] = useState([])
  const [temperatures, setTemperatures] = useState({})

  useEffect(() => {
    async function loadData() {
      try {
        const shipmentResult = await getShipments()
        const shipmentData = shipmentResult.data || []
        setShipments(shipmentData)

        const sensorResult = await getSensors()
        const sensorData = sensorResult.data || []

        const latest = {}

        sensorData.forEach((sensor) => {
          latest[sensor.shipment_id] = sensor
        })

        setTemperatures(latest)
      } catch (error) {
        console.error('Shipments table API error:', error)
      }
    }

    loadData()
  }, [])

  const activeCount = shipments.filter(
    (item) => !['Completed', 'Delivered'].includes(item.status)
  ).length

  return (
    <section className="panel">
      <div className="section-heading">
        <h3>Active Shipments</h3>
        <span>{activeCount} in operation</span>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Shipment</th>
              <th>Product</th>
              <th>Route</th>
              <th>Temp</th>
              <th>Freshness</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {shipments.length === 0 ? (
              <tr>
                <td colSpan="6">No shipments found.</td>
              </tr>
            ) : (
              shipments.map((item) => {
                const sensor = temperatures[item.shipment_id]
                const temperature = sensor?.temperature ?? '—'
                const freshness =
                  sensor?.freshness_score ?? item.freshness_score ?? '—'

                return (
                  <tr
                    key={item.shipment_id}
                    onClick={() => onSelect?.(item)}
                    style={{
                      cursor: onSelect ? 'pointer' : 'default',
                    }}
                  >
                    <td className="shipment-id">
                      {item.shipment_id}
                    </td>

                    <td>{item.product}</td>

                    <td>
                      {item.origin} → {item.destination}
                    </td>

                    <td>
                      {temperature}
                      {temperature !== '—' ? '°C' : ''}
                    </td>

                    <td>{freshness !== '—' ? `${freshness}%` : '—'}</td>

                    <td>
                      <span
                        className={`status-pill ${
                          item.status === 'Active' ||
                          item.status === 'In Transit'
                            ? 'status-active'
                            : item.status === 'Delayed'
                              ? 'status-delayed'
                              : 'status-completed'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}