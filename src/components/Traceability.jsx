import { traceabilityEvents } from '../data/mockData'
import TraceabilityTimeline from './TraceabilityTimeline'

export default function Traceability() {
  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Farm-to-Fork Traceability</h2>
          <p>End-to-end product history with event-level integrity records.</p>
        </div>
        <span className="status-pill status-active">Hash chain verified</span>
      </div>

      <section className="panel">
        <div className="detail-head">
          <div>
            <strong>FG-2026-001 • Fresh Tomatoes</strong>
            <div className="shipment-id-small">Nashik Farm → Delhi Retail Hub</div>
          </div>
          <span className="status-pill status-active">Verified</span>
        </div>
        <TraceabilityTimeline events={traceabilityEvents} />
      </section>
    </div>
  )
}
