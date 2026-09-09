import { useState } from 'react'
import { hashRecords, traceabilityEvents } from '../data/mockData'
import QRScanner from './QRScanner'

export default function QRVerification() {
  const [code, setCode] = useState('')
  const [verified, setVerified] = useState(false)

  function verify(value = code) {
    const normalized = value.trim().toUpperCase()
    setCode(value)
    setVerified(normalized === 'FG-2026-001' || normalized === 'SHIP001')
  }

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>QR Verification</h2>
          <p>Scan a product passport to verify origin, journey and integrity.</p>
        </div>
      </div>

      <div className="qr-layout">
        <section className="panel">
          <div className="section-heading"><h3>Scan Product QR</h3><span>Digital Product Passport</span></div>
          <QRScanner onDemo={() => verify('FG-2026-001')} />
          <div className="filter-row" style={{ marginTop: 14, marginBottom: 0 }}>
            <input className="filter-input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter batch / shipment ID" />
            <button className="primary-button" onClick={() => verify()}>Verify</button>
          </div>
        </section>

        <section className="panel">
          <div className="section-heading"><h3>Verification Result</h3><span>Trust layer</span></div>
          {!verified ? (
            <div className="empty-state">Scan or enter <strong>FG-2026-001</strong> to view a verified product record.</div>
          ) : (
            <>
              <div className="verification-result verification-success">
                <strong>✓ Verified product record</strong>
                <div style={{ marginTop: 5, fontSize: 10 }}>FG-2026-001 • Fresh Tomatoes • Integrity record matched.</div>
              </div>
              <div className="detail-list">
                <div className="detail-row"><span>Origin</span><strong>Nashik Farm</strong></div>
                <div className="detail-row"><span>Journey</span><strong>Farm → Collection → Processing → Transport → Retail</strong></div>
                <div className="detail-row"><span>Events</span><strong>{traceabilityEvents.length} verified events</strong></div>
                <div className="detail-row"><span>Latest hash</span><strong>{hashRecords[1].hash}</strong></div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
