import { useMemo, useState } from 'react'
import { hashRecords } from '../data/mockData'
import HashVerificationCard from './HashVerificationCard'

export default function HashVerification() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return hashRecords
    return hashRecords.filter((record) =>
      [record.id, record.shipmentId, record.hash].some((value) => value.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Hash Verification</h2>
          <p>Inspect tamper-evident event links before blockchain anchoring.</p>
        </div>
        <span className="status-pill status-active">Chain integrity OK</span>
      </div>

      <div className="filter-row">
        <input className="filter-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search hash, shipment or record ID..." />
      </div>

      <div className="hash-grid">
        {filtered.map((record) => <HashVerificationCard key={record.id} record={record} />)}
      </div>
    </div>
  )
}
