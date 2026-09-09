import { useMemo, useState } from 'react'
import { shipments } from '../data/mockData'
import ShipmentCard from './ShipmentCard'
import ShipmentDetails from './ShipmentDetails'

export default function Shipments() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return shipments
    return shipments.filter((item) =>
      [item.id, item.product, item.origin, item.destination, item.container]
        .some((value) => value.toLowerCase().includes(q))
    )
  }, [query])

  if (selected) {
    return <ShipmentDetails shipment={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Shipments</h2>
          <p>Manage and inspect farm-to-fork cold-chain batches.</p>
        </div>
        <button className="primary-button">+ New Shipment</button>
      </div>

      <div className="filter-row">
        <input
          className="filter-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by shipment, product, route or container..."
        />
      </div>

      {filtered.length ? (
        <div className="shipment-grid">
          {filtered.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} onClick={setSelected} />
          ))}
        </div>
      ) : (
        <div className="panel empty-state">No shipments found.</div>
      )}
    </div>
  )
}
