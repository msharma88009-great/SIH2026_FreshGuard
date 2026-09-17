import { useEffect, useState } from 'react'
import { getShipments, getTraceability } from '../services/api'
import TraceabilityTimeline from './TraceabilityTimeline'

export default function Traceability() {
  const [shipments, setShipments] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadShipments() {
      try {
        const result = await getShipments()
        const data = result.data || []
        setShipments(data)

        if (data.length > 0) {
          setSelectedId(data[0].shipment_id)
        }
      } catch (error) {
        console.error('Traceability shipment API error:', error)
      }
    }

    loadShipments()
  }, [])

  useEffect(() => {
    if (!selectedId) return

    async function loadTraceability() {
      setLoading(true)

      try {
        const result = await getTraceability(selectedId)
        setEvents(result.data || [])
      } catch (error) {
        console.error('Traceability API error:', error)
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    loadTraceability()
  }, [selectedId])

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Traceability</h2>
          <p>Follow each shipment stage from origin to destination with backend records.</p>
        </div>
      </div>

      <section className="traceability-overview"><div className="trace-step"><b>01</b><span>Farm</span><small>Source record</small></div><div className="trace-line" /><div className="trace-step"><b>02</b><span>Collection</span><small>Handoff</small></div><div className="trace-line" /><div className="trace-step"><b>03</b><span>Transport</span><small>IoT telemetry</small></div><div className="trace-line" /><div className="trace-step"><b>04</b><span>Destination</span><small>Final record</small></div></section>
      <section className="panel">
        <div className="section-heading">
          <h3>Select Shipment</h3>
          <span>{shipments.length} available</span>
        </div>

        <select
          value={selectedId}
          onChange={(event) => setSelectedId(event.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '20px' }}
        >
          <option value="">Select shipment</option>

          {shipments.map((shipment) => (
            <option
              key={shipment.shipment_id}
              value={shipment.shipment_id}
            >
              {shipment.shipment_id} — {shipment.product}
            </option>
          ))}
        </select>

        {loading ? (
          <p>Loading traceability...</p>
        ) : events.length > 0 ? (
          <TraceabilityTimeline events={events} />
        ) : (
          <p>No traceability events found for this shipment.</p>
        )}
      </section>
    </div>
  )
}